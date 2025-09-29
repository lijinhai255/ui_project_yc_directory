# @ycdirectory/wallet-sdk

现代化的 Web3 钱包连接 SDK，支持多种钱包和多链环境。

## ✨ 特性

- 🔗 **多钱包支持**: MetaMask、OKX、Coinbase、Trust Wallet、Rabby 等
- ⚡ **EIP-6963**: 支持最新的钱包检测标准
- 🔐 **安全性**: 类型安全的 TypeScript 实现
- 🎨 **主题支持**: 支持明暗主题
- 📱 **响应式**: 适配桌面和移动设备
- 🔄 **自动连接**: 支持自动重连上次使用的钱包
- 📦 **轻量级**: Tree-shaking 友好，按需加载
- 🎯 **React 优先**: 提供 React 组件和 Hooks

## 📦 安装

```bash
npm install @ycdirectory/wallet-sdk
# 或
yarn add @ycdirectory/wallet-sdk
# 或
pnpm add @ycdirectory/wallet-sdk
```

## 🚀 快速开始

### 基础使用

```tsx
import React from 'react';
import { WalletProvider, ConnectButton } from '@ycdirectory/wallet-sdk';

function App() {
  return (
    <WalletProvider
      config={{
        appName: 'My DApp',
        projectId: 'your-project-id',
        autoConnect: true,
      }}
    >
      <div className="App">
        <header className="App-header">
          <h1>My DApp</h1>
          <ConnectButton />
        </header>
      </div>
    </WalletProvider>
  );
}
```

### 使用 Hooks

```tsx
import { useWallet, useWalletState, useBalance } from '@ycdirectory/wallet-sdk';

function WalletInfo() {
  const { isConnected, address, chainId, wallet } = useWalletState();
  const { getBalance, getTokenBalance } = useBalance();
  const { connect, disconnect } = useWallet();

  const handleConnect = async () => {
    const result = await connect();
    if (result.success) {
      console.log('连接成功:', result.address);
    }
  };

  const handleGetBalance = async () => {
    const balance = await getBalance();
    console.log('ETH 余额:', balance);

    const tokenBalance = await getTokenBalance('0xTokenAddress...');
    console.log('代币余额:', tokenBalance);
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <p>已连接: {address}</p>
          <p>链: {chainId}</p>
          <p>钱包: {wallet?.name}</p>
          <button onClick={disconnect}>断开连接</button>
          <button onClick={handleGetBalance}>查询余额</button>
        </div>
      ) : (
        <button onClick={handleConnect}>连接钱包</button>
      )}
    </div>
  );
}
```

### 核心 SDK 使用

```tsx
import { WalletSDK } from '@ycdirectory/wallet-sdk';

const sdk = new WalletSDK({
  appName: 'My DApp',
  projectId: 'your-project-id',
  autoConnect: true,
});

// 初始化
await sdk.initialize();

// 连接钱包
const result = await sdk.connect('metamask');

if (result.success) {
  console.log('连接成功:', result.address);

  // 获取余额
  const balance = await sdk.getBalance();
  console.log('余额:', balance);

  // 监听事件
  sdk.on('disconnect', () => {
    console.log('钱包已断开');
  });
}
```

## 📖 API 文档

### WalletProvider Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| config | `WalletSDKConfig` | 必需 | SDK 配置对象 |
| children | `ReactNode` | 必需 | 子组件 |

### WalletSDKConfig

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| appName | `string` | 必需 | 应用名称 |
| projectId | `string` | 可选 | WalletConnect 项目 ID |
| autoConnect | `boolean` | `true` | 是否自动连接 |
| storage | `Storage` | `localStorage` | 存储实例 |
| theme | `'light' \| 'dark' \| 'auto'` | `'auto'` | 主题设置 |

### ConnectButton Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| label | `string` | `'连接钱包'` | 按钮文本 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 按钮大小 |
| variant | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | 按钮样式 |
| showBalance | `boolean` | `false` | 是否显示余额 |
| showChain | `boolean` | `false` | 是否显示链信息 |
| onConnect | `(result: ConnectionResult) => void` | 可选 | 连接回调 |
| onDisconnect | `() => void` | 可选 | 断开回调 |

## 🔧 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/ycdirectory-ui.git
cd ycdirectory-ui/packages/wallet-sdk

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动 Storybook
pnpm storybook

# 构建
pnpm build
```

### 测试

```bash
# 运行测试
pnpm test

# 类型检查
pnpm type-check

# 代码检查
pnpm lint
```

## 📝 更新日志

### v0.1.0

- 🎉 初始版本发布
- ✨ 支持多种钱包连接
- 🎨 React 组件和 Hooks
- 📖 完整的 TypeScript 类型
- 📚 Storybook 文档

## 🤝 贡献

欢迎提交 Pull Request 和 Issue！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Storybook 文档](https://yourusername.github.io/ycdirectory-ui/)
- [GitHub 仓库](https://github.com/yourusername/ycdirectory-ui)
- [npm 包](https://www.npmjs.com/package/@ycdirectory/wallet-sdk)