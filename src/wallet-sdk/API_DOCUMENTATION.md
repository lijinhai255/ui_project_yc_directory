# YC Directory Wallet SDK API 文档

## 📖 概述

YC Directory Wallet SDK 是一个现代化的钱包连接解决方案，支持多钱包连接、EIP-6963 和 EIP-1193 标准，提供完整的 React 组件和 TypeScript 支持。

### 🌟 核心特性

- ✅ **EIP-6963 支持**: 多钱包发现标准，避免钱包冲突
- ✅ **EIP-1193 兼容**: 标准的以太坊 Provider 接口
- ✅ **多钱包支持**: MetaMask、OKX、Coinbase、Rabby、Trust Wallet 等
- ✅ **React 集成**: 完整的 React Hook 和组件
- ✅ **TypeScript**: 完整的类型定义
- ✅ **双模式架构**: 自定义模式 + RainbowKit 集成
- ✅ **智能去重**: 自动去重重复的钱包
- ✅ **事件系统**: 完整的钱包事件监听

---

## 🏗️ 架构设计

### 目录结构
```
packages/ui/src/wallet-sdk/
├── core/                    # 核心管理器
│   ├── WalletSDK.ts        # 主入口类
│   └── WalletManager.ts    # 钱包管理器
├── components/              # React 组件
│   ├── WalletProvider.tsx  # Context Provider
│   ├── ConnectButton.tsx   # 连接按钮
│   ├── WalletModal.tsx     # 钱包选择弹窗
│   └── AccountDropdown.tsx # 账户下拉菜单
├── utils/                   # 工具类
│   ├── SignerFactory.ts    # 签名器工厂
│   └── WalletDeduplicator.ts # 钱包去重器
├── types/index.ts           # 类型定义
└── wagmi.ts                # Wagmi 配置
```

### 双模式架构
- **自定义模式**: 完全自主的钱包管理和检测
- **RainbowKit 模式**: 集成 RainbowKit 作为钱包连接解决方案

---

# 🔌 EIP-6963 实现详解

## 什么是 EIP-6963？

EIP-6963 是"Multi-Provider Wallet Discovery"标准，旨在解决多钱包环境下的钱包冲突问题，允许 DApp 同时发现多个钱包提供者。

## 实现架构

### 1. 接口定义

```typescript
interface EIP6963ProviderInfo {
  uuid: string;      // 唯一标识符
  name: string;      // 钱包名称
  icon: string;      // 钱包图标
  rdns: string;      // 逆向域名标识符
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EthereumProvider;
}

interface EIP6963AnnounceEvent extends Event {
  detail: EIP6963ProviderDetail;
}
```

### 2. 钱包发现机制

```typescript
private detectEIP6963Wallets(): void {
  const announceEvent = 'eip6963:announceProvider';
  const requestEvent = 'eip6963:requestProvider';

  const handleAnnounce = (event: Event): void => {
    const announceEvent = event as EIP6963AnnounceEvent;
    const detail: EIP6963ProviderDetail = announceEvent.detail;
    this.addWallet(detail);
  };

  // 监听钱包公告事件
  window.addEventListener(announceEvent, handleAnnounce);
  // 触发钱包请求事件
  window.dispatchEvent(new Event(requestEvent));
}
```

### 3. 钱包注册

```typescript
private addWallet(detail: EIP6963ProviderDetail): void {
  const wallet: DetectedWallet = {
    id: this.normalizeWalletId(detail.info.rdns),
    name: detail.info.name,
    icon: detail.info.icon,
    rdns: detail.info.rdns,
    provider: detail.provider,
    installed: true,
    type: 'eip6963',
    createConnector: () => this.createStandardConnector(detail.provider, detail.info.name)
  };

  this.wallets.set(wallet.id, wallet);
}
```

### 4. 钱包 ID 规范化

```typescript
private normalizeWalletId(rdns: string): string {
  const idMap: Record<string, string> = {
    'io.metamask': 'metamask',
    'com.okex.wallet': 'okx',
    'com.coinbase.wallet': 'coinbase',
    'io.rabby': 'rabby',
    'com.trustwallet.app': 'trust'
  };

  return idMap[rdns] || rdns.split('.').pop() || rdns;
}
```

## EIP-6963 优势

✅ **避免钱包冲突**: 通过 RDNS 唯一标识钱包
✅ **多钱包并存**: 支持同时连接多个钱包
✅ **标准发现**: 统一的钱包发现机制
✅ **减少误操作**: 明确的钱包标识和选择

---

# 🔌 EIP-1193 实现详解

## 什么是 EIP-1193？

EIP-1193 是"Ethereum Provider JavaScript API"标准，定义了 DApp 与以太坊钱包交互的标准接口。

## 实现详情

### 1. Provider 接口

```typescript
export interface EthereumProvider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on?(event: string, handler: (...args: unknown[]) => void): void;
  removeListener?(event: string, handler: (...args: unknown[]) => void): void;
  isConnected?(): boolean;
  enable?(): boolean;
}
```

### 2. RPC 方法调用

#### 账户请求
```typescript
// 请求用户账户
const accounts = await provider.request({
  method: 'eth_requestAccounts'
});
```

#### 链信息获取
```typescript
// 获取当前链ID
const chainIdHex = await provider.request({
  method: "eth_chainId"
});

// 获取账户余额
const balanceHex = await provider.request({
  method: 'eth_getBalance',
  params: [address, 'latest'],
});
```

#### 链切换
```typescript
// 切换到指定链
await provider.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: chainIdHex }],
});

// 添加新链
await provider.request({
  method: 'wallet_addEthereumChain',
  params: [chainConfig],
});
```

#### 合约交互
```typescript
// ERC-20 余额查询
const balanceResult = await provider.request({
  method: 'eth_call',
  params: [{
    to: tokenAddress,
    data: balanceOfSelector + encodedAddress,
  }, 'latest'],
});
```

#### 签名操作
```typescript
// 消息签名
await provider.request({
  method: "personal_sign",
  params: [message, address],
});

// 交易签名
await provider.request({
  method: "eth_signTransaction",
  params: [transaction],
});

// 发送交易
await provider.request({
  method: "eth_sendTransaction",
  params: [transaction],
});
```

### 3. 事件处理

#### 自定义事件系统
```typescript
// 连接事件
manager.on('connect', (data) => {
  console.log('钱包已连接:', data);
});

// 断开事件
manager.on('disconnect', () => {
  console.log('钱包已断开');
});

// 链变更事件
manager.on('chainChanged', (data) => {
  console.log('链已切换:', data.chainId);
});

// 账户变更事件
manager.on('accountChanged', (data) => {
  console.log('账户已变更:', data.accounts);
});
```

## EIP-1193 实现状态

| 特性 | 实现状态 | 说明 |
|------|----------|------|
| `request()` 方法 | ✅ 完整实现 | 支持所有标准 RPC 方法 |
| `on()` 事件监听 | ✅ 接口支持 | 自定义事件系统 |
| `removeListener()` | ✅ 接口支持 | 事件移除功能 |
| `isConnected()` | ✅ 接口支持 | 连接状态检查 |
| 标准事件监听 | ❌ 未实现 | accountsChanged, chainChanged 等 |

---

# 🚀 快速开始

## 安装

```bash
npm install @ycdirectory/wallet-sdk
```

## 基础使用

### 1. 自定义模式

```tsx
import { WalletSDK, WalletProvider } from '@ycdirectory/wallet-sdk';

// 初始化 SDK
const sdk = new WalletSDK({
  appName: 'My DApp',
  autoConnect: true
});

await sdk.initialize();

// 在应用中使用
function App() {
  return (
    <WalletProvider config={{
      appName: 'My DApp',
      autoConnect: true
    }}>
      <MyComponent />
    </WalletProvider>
  );
}
```

### 2. RainbowKit 模式

```tsx
import { WalletSDK } from '@ycdirectory/wallet-sdk';

// 使用 RainbowKit
const sdk = new WalletSDK({}, true); // 第二个参数启用 RainbowKit
await sdk.initialize();

// 获取 Wagmi 配置
const wagmiConfig = sdk.getWagmiConfig();
const connectors = sdk.getConnectors();
```

---

# 📚 API 参考

## WalletSDK

主入口类，提供完整的钱包管理功能。

### 构造函数

```typescript
constructor(config: WalletSDKConfig = {}, useRainbowKit: boolean = false)
```

### 方法

#### `initialize(): Promise<void>`
初始化 SDK，检测可用钱包。

```typescript
const sdk = new WalletSDK(config);
await sdk.initialize();
```

#### `connect(walletId?: string): Promise<ConnectionResult>`
连接指定钱包。

```typescript
const result = await sdk.connect('metamask');
if (result.success) {
  console.log('连接成功:', result.address);
}
```

#### `disconnect(): Promise<void>`
断开当前钱包连接。

```typescript
await sdk.disconnect();
```

#### `getAvailableWallets(): ExtendedWalletInfo[]`
获取所有可用钱包列表。

```typescript
const wallets = sdk.getAvailableWallets();
console.log('可用钱包:', wallets);
```

#### `isConnected(): boolean`
检查是否已连接钱包。

```typescript
const connected = sdk.isConnected();
```

#### `getAddress(): string | null`
获取当前连接的地址。

```typescript
const address = sdk.getAddress();
```

#### `getChainId(): number | null`
获取当前链 ID。

```typescript
const chainId = sdk.getChainId();
```

#### `getBalance(): Promise<string>`
获取 ETH 余额。

```typescript
const balance = await sdk.getBalance();
console.log('余额:', balance, 'ETH');
```

#### `switchChain(chainId: number): Promise<void>`
切换到指定链。

```typescript
await sdk.switchChain(137); // 切换到 Polygon
```

---

## WalletProvider

React Context Provider，为应用提供钱包状态和方法。

### Props

```typescript
interface WalletProviderProps {
  children: React.ReactNode;
  config: WalletSDKConfig;
  chains?: ChainInfo[];
  provider?: EthereumProvider;
  autoConnect?: boolean;
  wallets?: WalletGroup[];
}
```

### 使用示例

```tsx
import { WalletProvider, useWallet } from '@ycdirectory/wallet-sdk';

function App() {
  return (
    <WalletProvider
      config={{
        appName: 'My DApp',
        autoConnect: true,
        chains: [
          { id: 1, name: 'Ethereum', rpcUrl: 'https://eth.public-rpc.com' },
          { id: 137, name: 'Polygon', rpcUrl: 'https://polygon-rpc.com' }
        ]
      }}
    >
      <MyComponent />
    </WalletProvider>
  );
}
```

---

## useWallet Hook

提供钱包状态和操作方法。

### 返回值

```typescript
interface UseWalletReturn {
  // 状态
  address: Address;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  balance: string;
  error: Error | null;

  // 方法
  connect: (walletId: string) => Promise<ConnectionResult>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  fetchBalance: () => Promise<void>;
  getTokenBalance: (tokenAddress: Address) => Promise<TokenBalance>;

  // 钱包信息
  walletInstances: { [groupName: string]: ExtendedWalletInfo[] };
  detectedWallets: DetectedWallet[];
  walletsLoading: boolean;
}
```

### 使用示例

```tsx
import { useWallet } from '@ycdirectory/wallet-sdk';

function WalletComponent() {
  const {
    isConnected,
    address,
    balance,
    connect,
    disconnect,
    openModal
  } = useWallet();

  if (!isConnected) {
    return (
      <button onClick={() => openModal()}>
        连接钱包
      </button>
    );
  }

  return (
    <div>
      <p>地址: {address}</p>
      <p>余额: {balance} ETH</p>
      <button onClick={() => disconnect()}>
        断开连接
      </button>
    </div>
  );
}
```

---

## 组件

### ConnectButton

钱包连接按钮组件。

```tsx
import ConnectButton from '@ycdirectory/wallet-sdk';

function MyComponent() {
  return (
    <ConnectButton
      label="连接钱包"
      size="md"
      variant="primary"
      showBalance={true}
      onConnect={(result) => {
        console.log('连接成功:', result);
      }}
      onDisconnect={() => {
        console.log('已断开连接');
      }}
    />
  );
}
```

### WalletModal

钱包选择弹窗组件。

```tsx
import WalletModal from '@ycdirectory/wallet-sdk';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WalletModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConnect={async (walletId) => {
        const result = await connect(walletId);
        return result;
      }}
      title="选择钱包"
      description="请选择要连接的钱包"
    />
  );
}
```

### AccountDropdown

账户信息下拉菜单组件。

```tsx
import AccountDropdown from '@ycdirectory/wallet-sdk';

function MyComponent() {
  return (
    <AccountDropdown
      showBalance={true}
      showChain={true}
      onDisconnect={() => {
        console.log('已断开连接');
      }}
    />
  );
}
```

---

# 🔧 配置选项

## WalletSDKConfig

```typescript
interface WalletSDKConfig {
  appName: string;           // 应用名称
  appIcon?: string;          // 应用图标
  appUrl?: string;           // 应用 URL
  projectId?: string;        // 项目 ID (用于 WalletConnect)
  chains?: ChainInfo[];      // 支持的链配置
  autoConnect?: boolean;     // 自动连接
  storage?: Storage;         // 存储引擎
  theme?: 'light' | 'dark' | 'auto'; // 主题
  wallets?: WalletGroup[];   // 钱包分组
  provider?: EthereumProvider; // 自定义 Provider
}
```

### 链配置

```typescript
interface ChainInfo {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: string[] };
  };
  blockExplorers?: {
    default: { name: string; url: string };
  };
}
```

### 钱包分组

```typescript
interface WalletGroup {
  groupName: string;
  wallets: WalletCreateFunction[];
}
```

---

# 🎯 使用示例

## 完整的 DApp 集成

```tsx
import React from 'react';
import { WalletProvider, useWallet, ConnectButton } from '@ycdirectory/wallet-sdk';

// 配置
const config = {
  appName: 'My DApp',
  autoConnect: true,
  chains: [
    {
      id: 1,
      name: 'Ethereum',
      network: 'homestead',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: {
        default: { http: ['https://eth.public-rpc.com'] },
      },
    },
    {
      id: 137,
      name: 'Polygon',
      network: 'matic',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: {
        default: { http: ['https://polygon-rpc.com'] },
      },
    },
  ],
};

function AppContent() {
  const {
    isConnected,
    address,
    balance,
    chainId,
    connect,
    disconnect,
    switchChain,
    getTokenBalance
  } = useWallet();

  const handleGetTokenBalance = async () => {
    // USDT 合约地址 (Polygon)
    const usdtAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
    const tokenBalance = await getTokenBalance(usdtAddress as Address);
    console.log('USDT 余额:', tokenBalance);
  };

  return (
    <div>
      <h1>My DApp</h1>

      <ConnectButton />

      {isConnected && (
        <div>
          <p>地址: {address}</p>
          <p>余额: {balance} ETH</p>
          <p>链ID: {chainId}</p>

          <button onClick={() => switchChain(137)}>
            切换到 Polygon
          </button>

          <button onClick={handleGetTokenBalance}>
            获取 USDT 余额
          </button>

          <button onClick={() => disconnect()}>
            断开连接
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <WalletProvider config={config}>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
```

## 高级配置

```tsx
import { WalletSDK } from '@ycdirectory/wallet-sdk';

// 自定义 SDK 初始化
const sdk = new WalletSDK({
  appName: 'Advanced DApp',
  appIcon: 'https://my-dapp.com/icon.png',
  appUrl: 'https://my-dapp.com',
  projectId: 'your-project-id',
  autoConnect: true,
  storage: window.localStorage,
  theme: 'dark',
  wallets: [
    {
      groupName: '推荐钱包',
      wallets: [
        // 自定义钱包创建函数
      ]
    }
  ]
});

// 监听事件
sdk.on('connect', (data) => {
  console.log('钱包连接:', data);
});

sdk.on('disconnect', () => {
  console.log('钱包断开');
});

sdk.on('chainChanged', (data) => {
  console.log('链切换:', data.chainId);
});

// 初始化
await sdk.initialize();
```

---

# 🔍 类型定义

## 核心类型

```typescript
// 连接结果
interface ConnectionResult {
  success: boolean;
  address?: Address;
  chainId?: number;
  wallet?: WalletInfo;
  provider?: EthereumProvider;
  signer?: WalletSigner;
  error?: string;
}

// 钱包信息
interface WalletInfo {
  id: string;
  name: string;
  rdns?: string;
  icon?: string;
  installed: boolean;
  type?: 'eip6963' | 'legacy' | 'walletconnect';
}

// 检测到的钱包
interface DetectedWallet {
  id: string;
  name: string;
  icon: string;
  rdns: string;
  provider: EthereumProvider;
  installed: boolean;
  type?: 'eip6963' | 'legacy' | 'walletconnect';
  createConnector?: () => WalletConnector;
}

// 代币余额
interface TokenBalance {
  balance: string;
  decimals: number;
  symbol: string;
  loading?: boolean;
  error?: string | null;
}

// 钱包状态
interface WalletState {
  address: Address;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
  isReconnecting: boolean;
  ensName: string | null;
  error: Error | null;
  chains: ChainInfo[];
  provider?: EthereumProvider;
  balance: string;
  wallet?: WalletInfo;
  signer?: WalletSigner;
}
```

---

# 🐛 故障排除

## 常见问题

### 1. 钱包检测失败

**问题**: 没有检测到任何钱包

**解决方案**:
- 确保钱包已正确安装
- 检查钱包是否支持 EIP-6963 标准
- 尝试刷新页面

```typescript
// 重新检测钱包
sdk.redetectWallets();
```

### 2. 连接失败

**问题**: 点击连接后没有反应

**解决方案**:
- 检查钱包是否已解锁
- 确保网络连接正常
- 查看控制台错误信息

```typescript
try {
  const result = await sdk.connect('metamask');
  if (!result.success) {
    console.error('连接失败:', result.error);
  }
} catch (error) {
  console.error('连接异常:', error);
}
```

### 3. 链切换失败

**问题**: 无法切换到目标链

**解决方案**:
- 确保钱包支持该链
- 检查链配置是否正确
- 尝试手动添加链

```typescript
// 检查链配置
const chainConfig = {
  chainId: '0x89',
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-rpc.com'],
  blockExplorerUrls: ['https://polygonscan.com'],
};

await provider.request({
  method: 'wallet_addEthereumChain',
  params: [chainConfig],
});
```

### 4. 余额获取失败

**问题**: 无法获取账户余额

**解决方案**:
- 确保网络连接正常
- 检查 RPC 端点是否可用
- 尝试手动刷新

```typescript
// 手动刷新余额
await fetchBalance();
```

## 调试工具

### 启用调试模式

```typescript
const sdk = new WalletSDK({
  ...config,
  debug: true // 启用详细日志
});
```

### 获取检测详情

```typescript
const details = sdk.getDetectionDetails();
console.log('钱包检测详情:', details);
```

### 检查钱包状态

```typescript
const wallets = sdk.getAvailableWallets();
console.log('可用钱包:', wallets);

const connected = sdk.isConnected();
console.log('连接状态:', connected);

const address = sdk.getAddress();
console.log('当前地址:', address);
```

---

# 📄 许可证

MIT License

---

# 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

# 📞 支持

如有问题，请通过以下方式联系我们：

- GitHub Issues: [项目地址]
- 邮箱: support@ycdirectory.com
- 文档: [文档地址]

---

*最后更新: 2024年*