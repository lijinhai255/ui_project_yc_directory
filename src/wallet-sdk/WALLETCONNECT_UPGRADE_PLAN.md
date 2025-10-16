# WalletConnect 集成技术文档

## 概述

本文档详细描述了在现有的 `@yc-sdk/ui` wallet-sdk 中集成 WalletConnect v2 的完整技术方案和实施计划。

## 当前架构分析

### 现有钱包管理架构

#### 核心组件
- **WalletManager**: 钱包检测和连接管理
- **WalletSDK**: 主SDK入口，提供统一API
- **WalletProvider**: React Context提供者
- **类型系统**: 完整的TypeScript类型定义

#### 支持的钱包类型
- **EIP6963**: 现代钱包标准（MetaMask、OKX等）
- **Legacy**: 传统钱包检测方式
- **现有钱包**: MetaMask、OKX、Coinbase、Rabby、Trust Wallet

### 架构优势
- 🎯 **统一接口**: 所有钱包通过相同的API访问
- 🔧 **模块化设计**: 清晰的职责分离
- 📱 **React集成**: 完善的Context和Hook支持
- 🛡️ **类型安全**: 完整的TypeScript类型定义

## WalletConnect 集成方案

### 技术选型

#### WalletConnect v2 核心库
```json
{
  "@walletconnect/web3-provider": "^2.12.0",
  "@walletconnect/client": "^2.12.0",
  "@walletconnect/utils": "^2.12.0",
  "@walletconnect/sign-client": "^2.12.0",
  "qrcode": "^1.5.3",
  "@types/qrcode": "^1.5.2"
}
```

#### 架构设计原则
- ✅ **向后兼容**: 不破坏现有API
- ✅ **无缝集成**: 与现有钱包管理统一
- ✅ **类型安全**: 完整TypeScript支持
- ✅ **移动优先**: 支持移动端深度链接

## 详细技术方案

### 1. 类型系统扩展

#### 1.1 WalletConnect相关类型定义

```typescript
// packages/ui/src/wallet-sdk/types/index.ts

// WalletConnect配置
export interface WalletConnectConfig {
  projectId: string;
  relayUrl?: string;
  metadata: {
    name: string;
    description: string;
    url: string;
    icons: string[];
  };
  optionalNamespaces?: Record<string, NamespaceMetadata>;
  requiredNamespaces?: Record<string, NamespaceMetadata>;
}

// 会话信息
export interface WalletConnectSession {
  topic: string;
  relay: { protocol: string; data: string };
  namespaces: Record<string, Namespace>;
  expiry?: number;
}

// 命名空间定义
export interface Namespace {
  accounts: string[];
  methods: string[];
  events: string[];
  chains?: string[];
}

export interface NamespaceMetadata {
  chains?: string[];
  methods: string[];
  events: string[];
}

// QR码信息
export interface WalletConnectQRInfo {
  uri: string;
  qrCode?: string;
  topic: string;
}

// 扩展现有钱包信息类型
export interface ExtendedWalletInfo {
  // ... 现有字段
  type?: 'eip6963' | 'legacy' | 'walletconnect';
  walletConnectConfig?: WalletConnectConfig;
}
```

#### 1.2 事件系统扩展

```typescript
// WalletConnect专用事件
export type WalletConnectEvent =
  | 'walletconnect_qr_display'
  | 'walletconnect_session_approved'
  | 'walletconnect_session_rejected'
  | 'walletconnect_session_deleted'
  | 'walletconnect_session_updated';

export interface WalletConnectEventHandlers {
  onQRDisplay?: (qrInfo: WalletConnectQRInfo) => void;
  onSessionApproved?: (session: WalletConnectSession) => void;
  onSessionRejected?: (error: Error) => void;
  onSessionDeleted?: (topic: string) => void;
  onSessionUpdated?: (topic: string, namespaces: Record<string, Namespace>) => void;
}
```

### 2. WalletConnect连接器实现

#### 2.1 WalletConnectProvider类

```typescript
// packages/ui/src/wallet-sdk/providers/WalletConnectProvider.ts

import { EthereumProvider } from '../types';
import { SignClient } from '@walletconnect/sign-client';
import QRCode from 'qrcode';

export class WalletConnectProvider implements EthereumProvider {
  private signClient: SignClient | null = null;
  private session: WalletConnectSession | null = null;
  private config: WalletConnectConfig;
  private eventHandlers = new Map<string, Function[]>();

  constructor(config: WalletConnectConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    this.signClient = await SignClient.init({
      projectId: this.config.projectId,
      relayUrl: this.config.relayUrl || 'wss://relay.walletconnect.com',
      metadata: this.config.metadata,
    });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.signClient) return;

    this.signClient.on('session_proposal', this.handleSessionProposal.bind(this));
    this.signClient.on('session_request', this.handleSessionRequest.bind(this));
    this.signClient.on('session_delete', this.handleSessionDelete.bind(this));
  }

  async request(args: { method: string; params?: unknown[] }): Promise<unknown> {
    if (!this.signClient || !this.session) {
      throw new Error('WalletConnect not initialized or no active session');
    }

    const result = await this.signClient.request({
      topic: this.session.topic,
      chainId: this.getChainId(),
      request: {
        method: args.method,
        params: args.params || [],
      },
    });

    return result;
  }

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
    return this.session !== null;
  }

  // 连接流程
  async connect(): Promise<WalletConnectQRInfo> {
    if (!this.signClient) {
      await this.initialize();
    }

    const { uri, approval } = await this.signClient!.connect({
      requiredNamespaces: this.config.requiredNamespaces || {
        eip155: {
          methods: [
            'eth_sendTransaction',
            'eth_signTransaction',
            'eth_sign',
            'personal_sign',
            'eth_signTypedData',
            'eth_signTypedData_v4'
          ],
          chains: ['eip155:1', 'eip155:137'], // Ethereum & Polygon
          events: ['chainChanged', 'accountsChanged']
        }
      }
    });

    if (uri) {
      const qrCode = await QRCode.toDataURL(uri);
      const qrInfo: WalletConnectQRInfo = { uri, qrCode, topic: '' };

      // 触发QR码显示事件
      this.emit('walletconnect_qr_display', qrInfo);

      // 等待会话批准
      try {
        const session = await approval();
        this.session = session as WalletConnectSession;
        this.emit('walletconnect_session_approved', session);
        return qrInfo;
      } catch (error) {
        this.emit('walletconnect_session_rejected', error as Error);
        throw error;
      }
    }

    throw new Error('Failed to generate WalletConnect URI');
  }

  async disconnect(): Promise<void> {
    if (this.signClient && this.session) {
      await this.signClient.disconnect({
        topic: this.session.topic,
        reason: { code: 6000, message: 'USER_DISCONNECTED' }
      });
      this.session = null;
    }
  }

  private emit(event: string, data?: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`WalletConnect event handler error [${event}]:`, error);
        }
      });
    }
  }

  private getChainId(): string {
    // 从会话中获取当前链ID
    return 'eip155:1'; // 默认以太坊主网
  }

  // 事件处理器
  private async handleSessionProposal(proposal: any): Promise<void> {
    // 处理会话提议
  }

  private async handleSessionRequest(request: any): Promise<void> {
    // 处理会话请求
  }

  private async handleSessionDelete(event: any): Promise<void> {
    this.session = null;
    this.emit('walletconnect_session_deleted', event.topic);
  }
}
```

#### 2.2 集成到WalletManager

```typescript
// packages/ui/src/wallet-sdk/core/WalletManager.ts (扩展)

export class WalletManager {
  // ... 现有代码

  private addWalletConnectWallet(): void {
    const walletConnectInfo: ExtendedWalletInfo = {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+',
      installed: true, // WalletConnect不需要安装
      type: 'walletconnect',
      description: 'Connect to mobile wallets via QR code',
      createConnector: () => this.createWalletConnectConnector()
    };

    this.wallets.set('walletconnect', walletConnectInfo as DetectedWallet);
  }

  private createWalletConnectConnector(): WalletConnector {
    const connector: WalletConnector = {
      id: 'walletconnect',
      name: 'WalletConnect',
      provider: new WalletConnectProvider(this.getWalletConnectConfig()),

      connect: async (): Promise<WalletConnectResult> => {
        const wcProvider = connector.provider as WalletConnectProvider;

        try {
          // 生成QR码信息
          const qrInfo = await wcProvider.connect();

          // 等待用户扫描QR码并批准连接
          await new Promise((resolve, reject) => {
            const onApproved = (session: WalletConnectSession) => resolve(session);
            const onRejected = (error: Error) => reject(error);

            wcProvider.on('walletconnect_session_approved', onApproved);
            wcProvider.on('walletconnect_session_rejected', onRejected);

            // 设置超时
            setTimeout(() => {
              wcProvider.removeListener('walletconnect_session_approved', onApproved);
              wcProvider.removeListener('walletconnect_session_rejected', onRejected);
              reject(new Error('Connection timeout'));
            }, 300000); // 5分钟超时
          });

          // 获取账户信息
          const accounts = await wcProvider.request({
            method: 'eth_accounts'
          }) as string[];

          if (!accounts || accounts.length === 0) {
            throw new Error('No accounts received from WalletConnect');
          }

          const chainId = await this.getChainIdAsNumber(wcProvider);

          return {
            accounts,
            chainId,
            provider: wcProvider
          };

        } catch (error) {
          console.error('WalletConnect connection failed:', error);
          throw error;
        }
      },

      disconnect: async (): Promise<void> => {
        const wcProvider = connector.provider as WalletConnectProvider;
        await wcProvider.disconnect();
      }
    };

    return connector;
  }

  private getWalletConnectConfig(): WalletConnectConfig {
    // 从SDK配置中获取WalletConnect配置
    return {
      projectId: this.config.projectId || '',
      metadata: {
        name: this.config.appName || 'DApp',
        description: 'Decentralized Application',
        url: this.config.appUrl || window.location.origin,
        icons: this.config.appIcon ? [this.config.appIcon] : []
      }
    };
  }

  // 重写detectWallets方法，包含WalletConnect
  private detectWallets(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.detectEIP6963Wallets();
    this.detectLegacyWallets();
    this.addWalletConnectWallet(); // 添加WalletConnect支持
  }
}
```

### 3. UI组件扩展

#### 3.1 QR码显示组件

```typescript
// packages/ui/src/wallet-sdk/components/WalletConnectQR.tsx

import React, { useState, useEffect } from 'react';
import { WalletConnectQRInfo } from '../types';

interface WalletConnectQRProps {
  qrInfo: WalletConnectQRInfo | null;
  onClose: () => void;
  onCopyLink?: () => void;
}

export const WalletConnectQR: React.FC<WalletConnectQRProps> = ({
  qrInfo,
  onClose,
  onCopyLink
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (qrInfo?.uri) {
      await navigator.clipboard.writeText(qrInfo.uri);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopyLink?.();
    }
  };

  if (!qrInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {qrInfo.qrCode && (
            <div className="p-4 bg-white border rounded-lg">
              <img
                src={qrInfo.qrCode}
                alt="WalletConnect QR Code"
                className="w-48 h-48"
              />
            </div>
          )}

          <p className="text-sm text-gray-600 text-center">
            Scan this QR code with your mobile wallet
          </p>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};
```

#### 3.2 扩展WalletModal

```typescript
// packages/ui/src/wallet-sdk/components/WalletModal.tsx (修改)

import React, { useState } from 'react';
import { WalletConnectQR } from './WalletConnectQR';
import { WalletConnectQRInfo } from '../types';

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  walletInstances,
  detectedWallets,
  // ... 其他props
}) => {
  const [walletConnectQR, setWalletConnectQR] = useState<WalletConnectQRInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (walletId: string) => {
    if (walletId === 'walletconnect') {
      // 特殊处理WalletConnect
      await handleWalletConnect();
    } else {
      // 其他钱包的连接逻辑
      setIsConnecting(true);
      try {
        await onConnect(walletId);
        onClose();
      } catch (error) {
        console.error('Connection failed:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    try {
      const result = await onConnect('walletconnect');

      // 如果返回QR码信息，显示QR码
      if (result && 'qrInfo' in result) {
        setWalletConnectQR(result.qrInfo);
      } else {
        onClose();
      }
    } catch (error) {
      console.error('WalletConnect connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleWalletConnectClose = () => {
    setWalletConnectQR(null);
    onClose();
  };

  return (
    <>
      {/* 原有的Modal内容 */}
      {isOpen && !walletConnectQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>

            <div className="space-y-3">
              {/* WalletConnect选项 */}
              <button
                onClick={() => handleConnect('walletconnect')}
                disabled={isConnecting}
                className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">WC</span>
                </div>
                <span className="font-medium">WalletConnect</span>
                <span className="text-sm text-gray-500 ml-auto">QR Code</span>
              </button>

              {/* 其他钱包选项 */}
              {detectedWallets?.map(wallet => (
                <button
                  key={wallet.id}
                  onClick={() => handleConnect(wallet.id)}
                  disabled={isConnecting}
                  className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                  <span className="font-medium">{wallet.name}</span>
                  {wallet.installed && (
                    <span className="text-xs text-green-500 ml-auto">Installed</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* WalletConnect QR码弹窗 */}
      <WalletConnectQR
        qrInfo={walletConnectQR}
        onClose={handleWalletConnectClose}
        onCopyLink={() => console.log('Link copied')}
      />
    </>
  );
};
```

### 4. 配置和使用

#### 4.1 SDK配置

```typescript
// 使用示例
import { WalletSDK } from '@yc-sdk/ui';

const walletSDK = new WalletSDK({
  appName: 'My DApp',
  appUrl: 'https://mydapp.com',
  appIcon: 'https://mydapp.com/icon.png',
  projectId: 'your-walletconnect-project-id', // 从 https://cloud.walletconnect.com 获取

  // WalletConnect特定配置
  walletConnect: {
    projectId: 'your-walletconnect-project-id',
    metadata: {
      name: 'My DApp',
      description: 'My awesome decentralized application',
      url: 'https://mydapp.com',
      icons: ['https://mydapp.com/icon.png']
    },
    requiredNamespaces: {
      eip155: {
        methods: ['eth_sendTransaction', 'eth_signTransaction', 'personal_sign'],
        chains: ['eip155:1', 'eip155:137'], // 支持的链
        events: ['accountsChanged', 'chainChanged']
      }
    }
  }
});

// 初始化
await walletSDK.initialize();

// 连接WalletConnect
const result = await walletSDK.connect('walletconnect');
console.log('Connected:', result);
```

#### 4.2 React组件集成

```typescript
// App.tsx
import React from 'react';
import { WalletProvider, ConnectButton } from '@yc-sdk/ui';

function App() {
  return (
    <WalletProvider
      config={{
        appName: 'My DApp',
        projectId: 'your-walletconnect-project-id',
      }}
    >
      <div className="app">
        <header>
          <ConnectButton
            showBalance={true}
            showChain={true}
          />
        </header>

        <main>
          {/* 你的应用内容 */}
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;
```

### 5. 错误处理和优化

#### 5.1 错误处理策略

```typescript
// packages/ui/src/wallet-sdk/utils/WalletConnectErrorHandler.ts

export class WalletConnectErrorHandler {
  static handleConnectionError(error: any): string {
    if (error.code === 4001) {
      return 'User rejected the connection request';
    }
    if (error.code === -32000) {
      return 'Connection timeout. Please try again.';
    }
    if (error.message?.includes('No matching session')) {
      return 'Session expired. Please reconnect.';
    }
    return 'Failed to connect. Please try again.';
  }

  static handleSessionError(error: any): string {
    if (error.code === 5000) {
      return 'Session rejected by user';
    }
    if (error.code === 6000) {
      return 'User disconnected';
    }
    return 'Session error. Please reconnect.';
  }
}
```

#### 5.2 性能优化

```typescript
// 连接状态缓存
class WalletConnectSessionManager {
  private static readonly SESSION_KEY = 'walletconnect_session';

  static saveSession(session: WalletConnectSession): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  static loadSession(): WalletConnectSession | null {
    const stored = localStorage.getItem(this.SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static isSessionValid(session: WalletConnectSession): boolean {
    return session.expiry ? Date.now() < session.expiry * 1000 : true;
  }
}
```

## 实施计划

### 阶段1: 核心集成 (1-2天)
- [x] 类型定义扩展
- [ ] WalletConnect Provider实现
- [ ] WalletManager集成
- [ ] 基础连接测试

### 阶段2: UI组件 (1-2天)
- [ ] QR码显示组件
- [ ] WalletModal扩展
- [ ] 错误状态处理
- [ ] 加载状态优化

### 阶段3: 测试和文档 (1天)
- [ ] 单元测试
- [ ] 集成测试
- [ ] 文档完善
- [ ] 示例代码

### 阶段4: 部署和监控 (0.5天)
- [ ] 版本发布
- [ ] 错误监控集成
- [ ] 性能监控设置

## 兼容性说明

### 向后兼容
- ✅ 现有API保持不变
- ✅ 现有钱包继续工作
- ✅ 渐进式升级支持

### 浏览器支持
- ✅ Chrome/Firefox/Safari/Edge (桌面端)
- ✅ iOS Safari (移动端)
- ✅ Android Chrome (移动端)
- ✅ 支持深度链接的移动钱包

### 支持的移动钱包
- ✅ MetaMask Mobile
- ✅ Trust Wallet
- ✅ imToken
- ✅ TokenPocket
- ✅ SafePal
- ✅ Rainbow
- ✅ Argent
- ✅ 其他支持WalletConnect v2的钱包

## 最佳实践

### 1. Project ID管理
- 从 [WalletConnect Cloud](https://cloud.walletconnect.com) 获取Project ID
- 为不同环境使用不同的Project ID
- 定期轮换Project ID以提高安全性

### 2. 用户体验优化
- 提供清晰的连接引导
- 支持复制链接功能
- 设置合理的连接超时时间
- 提供连接状态反馈

### 3. 错误处理
- 提供用户友好的错误信息
- 支持重试机制
- 记录错误日志用于调试

### 4. 安全考虑
- 验证URL参数
- 使用HTTPS连接
- 定期清理过期的会话
- 监控异常连接行为

## 总结

本方案提供了完整的WalletConnect v2集成解决方案，具有以下特点：

- 🎯 **无缝集成**: 与现有架构完美融合
- 🔧 **类型安全**: 完整的TypeScript支持
- 📱 **移动优先**: 优秀的移动端体验
- 🛡️ **错误处理**: 完善的错误处理机制
- 📊 **可监控**: 集成错误和性能监控
- 🔄 **向后兼容**: 不破坏现有功能

实施此方案后，用户可以通过扫描QR码或点击深度链接的方式，轻松连接各种移动钱包到DApp，大大提升了用户体验和可访问性。