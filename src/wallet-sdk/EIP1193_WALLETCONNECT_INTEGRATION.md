# EIP1193 与 WalletConnect 集成技术文档

## 概述

本文档详细说明了如何在现有 EIP1193 实现的基础上，集成 WalletConnect v2 支持，确保统一的 Provider 接口和一致的交互体验。

## EIP1193 标准回顾

### EIP1193 Provider 接口
```typescript
interface EthereumProvider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on(event: string, handler: (...args: unknown[]) => void): void;
  removeListener(event: string, handler: (...args: unknown[]) => void): void;
  isConnected?(): boolean;
  enable?(): boolean;
}
```

### 标准事件
- `connect`: 连接建立
- `disconnect`: 连接断开
- `accountsChanged`: 账户变更
- `chainChanged`: 链变更
- `message`: 接收消息

## WalletConnect 与 EIP1193 适配器设计

### 核心设计原则
1. **接口统一**: WalletConnect Provider 完全实现 EIP1193 接口
2. **事件映射**: WalletConnect 事件映射到 EIP1193 标准事件
3. **方法适配**: WalletConnect 方法映射到 EIP1193 标准方法
4. **错误处理**: 统一的错误处理机制

### 适配器架构

```typescript
// packages/ui/src/wallet-sdk/providers/WalletConnectEIP1193Adapter.ts

import { EthereumProvider } from '../types';
import { SignClient } from '@walletconnect/sign-client';

export class WalletConnectEIP1193Adapter implements EthereumProvider {
  private signClient: SignClient | null = null;
  private session: any = null;
  private eventHandlers = new Map<string, Function[]>();
  private chainId: number = 1; // 默认以太坊主网
  private accounts: string[] = [];

  constructor(private config: WalletConnectConfig) {}

  // EIP1193 核心方法实现
  async request(args: { method: string; params?: unknown[] }): Promise<unknown> {
    const { method, params = [] } = args;

    if (!this.signClient || !this.session) {
      throw new Error('WalletConnect not connected');
    }

    try {
      switch (method) {
        case 'eth_requestAccounts':
          return await this.handleEthRequestAccounts();

        case 'eth_accounts':
          return this.accounts;

        case 'eth_chainId':
          return `0x${this.chainId.toString(16)}`;

        case 'eth_sendTransaction':
          return await this.handleEthSendTransaction(params[0]);

        case 'eth_signTransaction':
          return await this.handleEthSignTransaction(params[0]);

        case 'personal_sign':
          return await this.handlePersonalSign(params);

        case 'eth_signTypedData':
        case 'eth_signTypedData_v4':
          return await this.handleSignTypedData(params);

        case 'wallet_switchEthereumChain':
          return await this.handleSwitchChain(params[0]);

        case 'wallet_addEthereumChain':
          return await this.handleAddChain(params[0]);

        default:
          // 透传其他方法
          return await this.signClient.request({
            topic: this.session.topic,
            chainId: `eip155:${this.chainId}`,
            request: { method, params }
          });
      }
    } catch (error) {
      // 转换错误格式为EIP1193标准格式
      throw this.normalizeError(error);
    }
  }

  // EIP1193 事件监听
  on(event: string, handler: (...args: unknown[]) => void): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  removeListener(event: string, handler: (...args: unknown[]) => void): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  isConnected(): boolean {
    return this.session !== null && this.accounts.length > 0;
  }

  // WalletConnect 特定方法
  async connect(): Promise<{ uri: string; approval: Promise<any> }> {
    if (!this.signClient) {
      await this.initialize();
    }

    const { uri, approval } = await this.signClient!.connect({
      requiredNamespaces: this.config.requiredNamespaces || {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'personal_sign',
            'eth_signTypedData',
            'eth_signTypedData_v4',
            'wallet_switchEthereumChain',
            'wallet_addEthereumChain'
          ],
          chains: ['eip155:1', 'eip155:137'], // 默认支持以太坊和Polygon
          events: ['accountsChanged', 'chainChanged']
        }
      }
    });

    // 设置会话批准处理
    approval.then((session) => {
      this.handleSessionApproved(session);
    }).catch((error) => {
      this.emit('disconnect', error);
    });

    return { uri, approval };
  }

  async disconnect(): Promise<void> {
    if (this.signClient && this.session) {
      await this.signClient.disconnect({
        topic: this.session.topic,
        reason: { code: 6000, message: 'USER_DISCONNECTED' }
      });
      this.handleSessionDisconnected();
    }
  }

  // 私有方法
  private async initialize(): Promise<void> {
    this.signClient = await SignClient.init({
      projectId: this.config.projectId,
      relayUrl: this.config.relayUrl || 'wss://relay.walletconnect.com',
      metadata: this.config.metadata,
    });

    this.setupWalletConnectEventListeners();
  }

  private setupWalletConnectEventListeners(): void {
    if (!this.signClient) return;

    this.signClient.on('session_event', (event) => {
      const { chainId, accounts } = event.params.event.data;

      if (chainId) {
        this.chainId = parseInt(chainId.split(':')[1]);
        this.emit('chainChanged', `0x${this.chainId.toString(16)}`);
      }

      if (accounts && accounts.length > 0) {
        this.accounts = accounts;
        this.emit('accountsChanged', accounts);
      }
    });

    this.signClient.on('session_delete', () => {
      this.handleSessionDisconnected();
    });
  }

  private handleSessionApproved(session: any): void {
    this.session = session;

    // 提取账户和链信息
    const accounts: string[] = [];
    let chainId = 1;

    Object.values(session.namespaces).forEach((namespace: any) => {
      if (namespace.accounts) {
        namespace.accounts.forEach((account: string) => {
          const [namespaceId, address] = account.split(':');
          if (namespaceId === 'eip155') {
            accounts.push(address);
            const currentChainId = parseInt(account.split(':')[1]);
            chainId = currentChainId;
          }
        });
      }
    });

    this.accounts = accounts;
    this.chainId = chainId;

    // 触发 EIP1193 标准事件
    this.emit('connect', { chainId: `0x${chainId.toString(16)}` });
    this.emit('accountsChanged', accounts);
    this.emit('chainChanged', `0x${chainId.toString(16)}`);
  }

  private handleSessionDisconnected(): void {
    this.session = null;
    this.accounts = [];
    this.emit('disconnect', { code: 6000, message: 'USER_DISCONNECTED' });
  }

  // 方法处理实现
  private async handleEthRequestAccounts(): Promise<string[]> {
    if (this.accounts.length === 0) {
      throw new Error('No accounts connected');
    }
    return this.accounts;
  }

  private async handleEthSendTransaction(transaction: any): Promise<string> {
    return await this.signClient!.request({
      topic: this.session.topic,
      chainId: `eip155:${this.chainId}`,
      request: {
        method: 'eth_sendTransaction',
        params: [transaction]
      }
    });
  }

  private async handlePersonalSign(params: unknown[]): Promise<string> {
    const [message, address] = params as [string, string];

    return await this.signClient!.request({
      topic: this.session.topic,
      chainId: `eip155:${this.chainId}`,
      request: {
        method: 'personal_sign',
        params: [message, address]
      }
    });
  }

  private async handleSignTypedData(params: unknown[]): Promise<string> {
    const [address, typedData] = params as [string, any];

    return await this.signClient!.request({
      topic: this.session.topic,
      chainId: `eip155:${this.chainId}`,
      request: {
        method: 'eth_signTypedData_v4',
        params: [address, typedData]
      }
    });
  }

  private async handleSwitchChain(params: { chainId: string }): Promise<void> {
    const chainId = parseInt(params.chainId, 16);

    // 检查链是否在支持的命名空间中
    const supportedChains = this.getSupportedChains();
    if (!supportedChains.includes(chainId)) {
      throw new Error(`Chain ${chainId} not supported`);
    }

    this.chainId = chainId;
    this.emit('chainChanged', params.chainId);
  }

  private getSupportedChains(): number[] {
    // 从配置中获取支持的链
    const chains: number[] = [];

    if (this.config.requiredNamespaces?.eip155?.chains) {
      this.config.requiredNamespaces.eip155.chains.forEach(chain => {
        const chainId = parseInt(chain.split(':')[1]);
        chains.push(chainId);
      });
    }

    return chains.length > 0 ? chains : [1]; // 默认只支持以太坊主网
  }

  private normalizeError(error: any): Error {
    // 将 WalletConnect 错误转换为 EIP1193 标准错误
    if (error.code) {
      const eip1193Error = new Error(error.message);
      (eip1193Error as any).code = error.code;
      return eip1193Error;
    }

    return error instanceof Error ? error : new Error(String(error));
  }

  private emit(event: string, ...args: unknown[]): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`EIP1193 Adapter event handler error [${event}]:`, error);
        }
      });
    }
  }
}
```

## 统一的钱包管理系统

### 扩展 WalletManager 支持 WalletConnect

```typescript
// packages/ui/src/wallet-sdk/core/WalletManager.ts (修改)

export class WalletManager {
  // ... 现有代码

  public async connectWallet(walletId: string): Promise<WalletConnectionResult> {
    if (walletId === 'walletconnect') {
      return await this.connectWalletConnect();
    }

    // 现有连接逻辑
    const wallet = this.getWalletById(walletId);
    if (!wallet) {
      throw new Error(`钱包 ${walletId} 未找到或未安装`);
    }

    // ... 现有连接代码
  }

  private async connectWalletConnect(): Promise<WalletConnectionResult> {
    const walletConnectConfig = this.getWalletConnectConfig();
    const adapter = new WalletConnectEIP1193Adapter(walletConnectConfig);

    try {
      const { uri, approval } = await adapter.connect();

      // 生成QR码
      const qrCode = await QRCode.toDataURL(uri);

      // 等待会话批准
      const session = await approval;

      // 获取连接结果
      const accounts = await adapter.request({ method: 'eth_accounts' }) as string[];
      const chainIdHex = await adapter.request({ method: 'eth_chainId' }) as string;
      const chainId = parseInt(chainIdHex, 16);

      return {
        success: true,
        address: accounts[0] as Address,
        chainId,
        wallet: {
          id: 'walletconnect',
          name: 'WalletConnect',
          installed: true,
          type: 'walletconnect'
        },
        provider: adapter,
        signer: SignerFactory.createFromProvider(adapter, accounts[0]),
        qrInfo: { uri, qrCode, topic: session.topic }
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'WalletConnect连接失败';
      console.error('❌ WalletConnect 连接失败:', error);
      throw new Error(`WalletConnect连接失败: ${errorMessage}`);
    }
  }

  private getWalletConnectConfig(): WalletConnectConfig {
    return {
      projectId: this.config.projectId || '',
      relayUrl: this.config.relayUrl,
      metadata: {
        name: this.config.appName || 'DApp',
        description: 'Decentralized Application',
        url: this.config.appUrl || window.location.origin,
        icons: this.config.appIcon ? [this.config.appIcon] : []
      },
      requiredNamespaces: {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'personal_sign',
            'eth_signTypedData',
            'eth_signTypedData_v4',
            'wallet_switchEthereumChain',
            'wallet_addEthereumChain'
          ],
          chains: this.getSupportedChains().map(chain => `eip155:${chain}`),
          events: ['accountsChanged', 'chainChanged']
        }
      }
    };
  }

  private getSupportedChains(): number[] {
    // 从配置中获取支持的链，默认支持主要网络
    return this.config.chains?.map(chain => chain.id) || [
      1,   // Ethereum Mainnet
      137, // Polygon
      56,  // BSC
      43114 // Avalanche
    ];
  }

  // 在钱包检测中添加 WalletConnect
  private detectWallets(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.detectEIP6963Wallets();
    this.detectLegacyWallets();
    this.addWalletConnectWallet(); // 新增
  }

  private addWalletConnectWallet(): void {
    const walletConnectInfo: DetectedWallet = {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: this.getDefaultIcon('walletconnect'),
      rdns: 'walletconnect.org',
      provider: new WalletConnectEIP1193Adapter(this.getWalletConnectConfig()),
      installed: true, // WalletConnect 不需要安装
      type: 'walletconnect',
      createConnector: () => this.createWalletConnectConnector()
    };

    this.wallets.set('walletconnect', walletConnectInfo);
  }

  private createWalletConnectConnector(): WalletConnector {
    const adapter = new WalletConnectEIP1193Adapter(this.getWalletConnectConfig());

    return {
      id: 'walletconnect',
      name: 'WalletConnect',
      provider: adapter,

      connect: async (): Promise<WalletConnectResult> => {
        const { uri, approval } = await adapter.connect();
        const session = await approval;

        const accounts = await adapter.request({ method: 'eth_accounts' }) as string[];
        const chainId = await this.getChainIdAsNumber(adapter);

        return {
          accounts,
          chainId,
          provider: adapter
        };
      },

      disconnect: async (): Promise<void> => {
        await adapter.disconnect();
      }
    };
  }
}
```

## 事件系统统一

### EIP1193 事件映射管理器

```typescript
// packages/ui/src/wallet-sdk/utils/EIP1193EventManager.ts

export class EIP1193EventManager {
  private eventHandlers = new Map<string, Function[]>();
  private provider: EthereumProvider | null = null;

  constructor(provider: EthereumProvider) {
    this.provider = provider;
    this.setupProviderEventForwarding();
  }

  private setupProviderEventForwarding(): void {
    if (!this.provider) return;

    // 监听 Provider 事件并转发
    this.provider.on('connect', (data) => this.emit('connect', data));
    this.provider.on('disconnect', (error) => this.emit('disconnect', error));
    this.provider.on('accountsChanged', (accounts) => this.emit('accountsChanged', accounts));
    this.provider.on('chainChanged', (chainId) => this.emit('chainChanged', chainId));
    this.provider.on('message', (message) => this.emit('message', message));
  }

  // 添加事件监听器
  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  // 移除事件监听器
  off(event: string, handler: Function): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // 触发事件
  private emit(event: string, data?: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Event handler error [${event}]:`, error);
        }
      });
    }
  }

  // 清理事件监听器
  cleanup(): void {
    this.eventHandlers.clear();
    this.provider = null;
  }
}
```

## 统一的错误处理

### EIP1193 标准错误处理

```typescript
// packages/ui/src/wallet-sdk/utils/EIP1193ErrorHandler.ts

export class EIP1193ErrorHandler {
  // EIP1193 标准错误代码
  static readonly ERROR_CODES = {
    USER_REJECTED: 4001,
    UNAUTHORIZED: 4100,
    UNSUPPORTED_METHOD: 4200,
    DISCONNECTED: 4900,
    CHAIN_DISCONNECTED: 4901,
    RESOURCE_NOT_FOUND: 32001,
    RESOURCE_UNAVAILABLE: 32002,
    TRANSACTION_REJECTED: 32003,
    METHOD_NOT_SUPPORTED: 32004,
    LIMIT_EXCEEDED: 32005,
    JSON_RPC_VERSION_NOT_SUPPORTED: 32006,
  };

  static normalizeError(error: any): Error {
    const eip1193Error = new Error(error.message || 'Unknown error');

    // 映射错误代码
    if (error.code) {
      (eip1193Error as any).code = error.code;
    } else {
      // 根据错误信息推断错误代码
      const code = this.inferErrorCode(error);
      if (code) {
        (eip1193Error as any).code = code;
      }
    }

    return eip1193Error;
  }

  private static inferErrorCode(error: any): number | null {
    const message = error.message?.toLowerCase() || '';

    if (message.includes('user rejected') || message.includes('user denied')) {
      return this.ERROR_CODES.USER_REJECTED;
    }

    if (message.includes('unauthorized') || message.includes('not authorized')) {
      return this.ERROR_CODES.UNAUTHORIZED;
    }

    if (message.includes('not supported') || message.includes('unsupported')) {
      return this.ERROR_CODES.UNSUPPORTED_METHOD;
    }

    if (message.includes('disconnected')) {
      return this.ERROR_CODES.DISCONNECTED;
    }

    return null;
  }

  static getErrorMessage(error: any): string {
    const normalizedError = this.normalizeError(error);

    switch ((normalizedError as any).code) {
      case this.ERROR_CODES.USER_REJECTED:
        return '用户拒绝了请求';
      case this.ERROR_CODES.UNAUTHORIZED:
        return '未授权，请连接钱包';
      case this.ERROR_CODES.UNSUPPORTED_METHOD:
        return '当前钱包不支持此方法';
      case this.ERROR_CODES.DISCONNECTED:
        return '钱包已断开连接';
      case this.ERROR_CODES.CHAIN_DISCONNECTED:
        return '链已断开连接';
      default:
        return normalizedError.message || '发生未知错误';
    }
  }
}
```

## 使用示例

### 基础使用

```typescript
// 使用 WalletConnect 与其他钱包完全相同的方式
import { WalletSDK } from '@yc-sdk/ui';

const walletSDK = new WalletSDK({
  appName: 'My DApp',
  projectId: 'your-walletconnect-project-id'
});

await walletSDK.initialize();

// 连接 WalletConnect
const result = await walletSDK.connect('walletconnect');
console.log('Connected with:', result);

// 使用标准 EIP1193 方法
const balance = await result.provider?.request({
  method: 'eth_getBalance',
  params: [result.address, 'latest']
});

// 发送交易
const txHash = await result.provider?.request({
  method: 'eth_sendTransaction',
  params: [{
    from: result.address,
    to: '0x...',
    value: '0x16345785D8A0000' // 0.1 ETH
  }]
});
```

### React 组件中的使用

```typescript
import { useWallet } from '@yc-sdk/ui';

function MyComponent() {
  const { connect, disconnect, provider, address, chainId } = useWallet();

  const handleConnectWalletConnect = async () => {
    try {
      const result = await connect('walletconnect');
      console.log('Connected:', result);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleSignMessage = async () => {
    if (!provider || !address) return;

    try {
      const signature = await provider.request({
        method: 'personal_sign',
        params: ['Hello World!', address]
      });
      console.log('Signature:', signature);
    } catch (error) {
      console.error('Sign failed:', error);
    }
  };

  return (
    <div>
      {address ? (
        <div>
          <p>Connected: {address}</p>
          <p>Chain: {chainId}</p>
          <button onClick={handleSignMessage}>Sign Message</button>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnectWalletConnect}>
          Connect WalletConnect
        </button>
      )}
    </div>
  );
}
```

## 测试策略

### 单元测试

```typescript
// packages/ui/src/wallet-sdk/__tests__/WalletConnectEIP1193Adapter.test.ts

import { WalletConnectEIP1193Adapter } from '../providers/WalletConnectEIP1193Adapter';

describe('WalletConnectEIP1193Adapter', () => {
  let adapter: WalletConnectEIP1193Adapter;
  let mockSignClient: jest.Mocked<SignClient>;

  beforeEach(() => {
    adapter = new WalletConnectEIP1193Adapter({
      projectId: 'test-project-id',
      metadata: {
        name: 'Test DApp',
        description: 'Test',
        url: 'https://test.com',
        icons: []
      }
    });
  });

  test('should implement EIP1193 interface', () => {
    expect(typeof adapter.request).toBe('function');
    expect(typeof adapter.on).toBe('function');
    expect(typeof adapter.removeListener).toBe('function');
    expect(typeof adapter.isConnected).toBe('function');
  });

  test('should handle eth_requestAccounts', async () => {
    // Mock implementation
    const mockAccounts = ['0x1234567890123456789012345678901234567890'];
    jest.spyOn(adapter, 'request').mockResolvedValue(mockAccounts);

    const result = await adapter.request({
      method: 'eth_requestAccounts'
    });

    expect(result).toEqual(mockAccounts);
  });

  test('should handle personal_sign', async () => {
    const mockSignature = '0xsignature';
    jest.spyOn(adapter, 'request').mockResolvedValue(mockSignature);

    const result = await adapter.request({
      method: 'personal_sign',
      params: ['Hello', '0x1234567890123456789012345678901234567890']
    });

    expect(result).toEqual(mockSignature);
  });
});
```

### 集成测试

```typescript
// packages/ui/src/wallet-sdk/__tests__/WalletConnect.integration.test.ts

describe('WalletConnect Integration', () => {
  let walletSDK: WalletSDK;

  beforeEach(() => {
    walletSDK = new WalletSDK({
      appName: 'Test DApp',
      projectId: 'test-project-id'
    });
  });

  test('should connect via WalletConnect', async () => {
    await walletSDK.initialize();

    // Mock QR code display
    const mockQRDisplay = jest.fn();
    walletSDK.on('walletconnect_qr_display', mockQRDisplay);

    const result = await walletSDK.connect('walletconnect');

    expect(result.success).toBe(true);
    expect(result.wallet?.id).toBe('walletconnect');
    expect(mockQRDisplay).toHaveBeenCalled();
  });

  test('should handle EIP1193 methods after connection', async () => {
    const result = await walletSDK.connect('walletconnect');

    if (result.provider) {
      const accounts = await result.provider.request({
        method: 'eth_accounts'
      });

      expect(Array.isArray(accounts)).toBe(true);
    }
  });
});
```

## 总结

通过 EIP1193 与 WalletConnect 的集成，我们实现了：

1. **统一接口**: 所有钱包（包括 WalletConnect）都通过相同的 EIP1193 接口访问
2. **事件一致性**: 标准化的事件处理机制
3. **错误处理**: 统一的错误处理和用户友好的错误信息
4. **类型安全**: 完整的 TypeScript 类型支持
5. **向后兼容**: 不影响现有钱包的连接方式

这种设计确保了开发者可以使用相同的代码逻辑处理所有类型的钱包连接，大大简化了开发复杂度并提高了用户体验的一致性。