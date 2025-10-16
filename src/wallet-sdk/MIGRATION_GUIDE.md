# WalletConnect 集成迁移指南

## 概述

本指南帮助开发者从现有 wallet-sdk 平滑升级到支持 WalletConnect 的版本。升级过程完全向后兼容，现有代码无需修改即可继续工作。

## 升级前准备

### 1. 获取 WalletConnect Project ID

1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 注册/登录账户
3. 创建新项目或使用现有项目
4. 复制 Project ID

### 2. 依赖版本检查

确保你的项目使用兼容的依赖版本：

```json
{
  "@yc-sdk/ui": "^0.2.0", // 支持 WalletConnect 的版本
  "react": ">=18.0.0",
  "typescript": ">=5.0.0"
}
```

## 升级步骤

### 步骤 1: 安装新版本

```bash
# 使用 pnpm
pnpm upgrade @yc-sdk/ui@latest

# 或使用 npm
npm install @yc-sdk/ui@latest

# 或使用 yarn
yarn upgrade @yc-sdk/ui@latest
```

### 步骤 2: 添加 WalletConnect 配置

如果你已经使用了 wallet-sdk，只需要在现有配置中添加 WalletConnect 相关参数：

```typescript
// 现有配置
const walletSDK = new WalletSDK({
  appName: 'My DApp',
  appUrl: 'https://mydapp.com',
  appIcon: 'https://mydapp.com/icon.png',
  chains: [
    { id: 1, name: 'Ethereum', rpcUrl: 'https://mainnet.infura.io/v3/...' },
    { id: 137, name: 'Polygon', rpcUrl: 'https://polygon-rpc.com' }
  ]
});

// 升级后配置 - 只需添加 projectId
const walletSDK = new WalletSDK({
  appName: 'My DApp',
  appUrl: 'https://mydapp.com',
  appIcon: 'https://mydapp.com/icon.png',
  projectId: 'your-walletconnect-project-id', // 新增
  chains: [
    { id: 1, name: 'Ethereum', rpcUrl: 'https://mainnet.infura.io/v3/...' },
    { id: 137, name: 'Polygon', rpcUrl: 'https://polygon-rpc.com' }
  ]
});
```

### 步骤 3: 可选 - 添加 WalletConnect UI 组件

如果你想在钱包选择器中显示 WalletConnect 选项：

```typescript
import { WalletProvider } from '@yc-sdk/ui';

function App() {
  return (
    <WalletProvider
      config={{
        appName: 'My DApp',
        projectId: 'your-walletconnect-project-id',
        // WalletConnect 特定配置（可选）
        walletConnect: {
          projectId: 'your-walletconnect-project-id',
          metadata: {
            name: 'My DApp',
            description: 'My awesome DApp',
            url: 'https://mydapp.com',
            icons: ['https://mydapp.com/icon.png']
          },
          requiredNamespaces: {
            eip155: {
              methods: ['eth_sendTransaction', 'personal_sign'],
              chains: ['eip155:1', 'eip155:137'],
              events: ['accountsChanged']
            }
          }
        }
      }}
    >
      {/* 你的应用组件 */}
    </WalletProvider>
  );
}
```

## 代码变更示例

### 场景 1: 现有连接逻辑保持不变

```typescript
// 升级前 - 代码保持不变
const handleConnect = async (walletId: string) => {
  try {
    const result = await walletSDK.connect(walletId);
    console.log('Connected:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

// 升级后 - 代码完全相同
const handleConnect = async (walletId: string) => {
  try {
    const result = await walletSDK.connect(walletId);
    console.log('Connected:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

### 场景 2: 新增 WalletConnect 连接

```typescript
// 新增 WalletConnect 连接选项
const connectWalletConnect = async () => {
  try {
    const result = await walletSDK.connect('walletconnect');
    console.log('WalletConnect connected:', result);

    // 获取 QR 码信息（如果需要）
    if (result.qrInfo) {
      console.log('QR Code URI:', result.qrInfo.uri);
    }
  } catch (error) {
    console.error('WalletConnect connection failed:', error);
  }
};
```

### 场景 3: React Hook 使用

```typescript
// 升级前 - 现有代码保持不变
import { useWallet } from '@yc-sdk/ui';

function MyComponent() {
  const { connect, disconnect, address, chainId } = useWallet();

  return (
    <div>
      {address ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => connect('metamask')}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
}

// 升级后 - 添加 WalletConnect 选项
function MyComponent() {
  const { connect, disconnect, address, chainId, getAvailableWallets } = useWallet();

  const availableWallets = getAvailableWallets();
  const hasWalletConnect = availableWallets.some(w => w.id === 'walletconnect');

  return (
    <div>
      {address ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={() => connect('metamask')}>
            Connect MetaMask
          </button>
          {hasWalletConnect && (
            <button onClick={() => connect('walletconnect')}>
              Connect WalletConnect
            </button>
          )}
        </div>
      )}
    </div>
  );
}
```

## 环境配置

### 开发环境

```typescript
// 开发环境配置
const devConfig = {
  appName: 'My DApp (Dev)',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || 'dev-project-id',
  appUrl: 'http://localhost:3000',
  chains: [
    { id: 1, name: 'Ethereum', rpcUrl: 'https://mainnet.infura.io/v3/...' },
    { id: 137, name: 'Polygon', rpcUrl: 'https://polygon-rpc.com' },
    { id: 80001, name: 'Mumbai', rpcUrl: 'https://rpc-mumbai.maticvigil.com' }
  ]
};
```

### 生产环境

```typescript
// 生产环境配置
const prodConfig = {
  appName: 'My DApp',
  projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
  appUrl: 'https://mydapp.com',
  chains: [
    { id: 1, name: 'Ethereum', rpcUrl: 'https://mainnet.infura.io/v3/...' },
    { id: 137, name: 'Polygon', rpcUrl: 'https://polygon-rpc.com' }
  ]
};
```

## 环境变量设置

创建或更新 `.env` 文件：

```bash
# .env
REACT_APP_WALLETCONNECT_PROJECT_ID=your_production_project_id

# .env.development
REACT_APP_WALLETCONNECT_PROJECT_ID=your_development_project_id

# .env.local
REACT_APP_WALLETCONNECT_PROJECT_ID=your_local_project_id
```

## 测试升级

### 1. 功能测试

```typescript
// 测试脚本
async function testWalletConnectIntegration() {
  try {
    // 测试初始化
    await walletSDK.initialize();
    console.log('✅ SDK initialized');

    // 测试钱包列表
    const wallets = walletSDK.getAvailableWallets();
    console.log('✅ Available wallets:', wallets.map(w => w.name));

    // 测试 WalletConnect 连接
    if (wallets.some(w => w.id === 'walletconnect')) {
      console.log('✅ WalletConnect is available');

      // 注意：实际连接需要用户交互
      const result = await walletSDK.connect('walletconnect');
      console.log('✅ WalletConnect connected:', result);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}
```

### 2. UI 测试

```typescript
// 测试 WalletConnect QR 码显示
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletModal } from '@yc-sdk/ui';

test('should show WalletConnect option', () => {
  const mockOnConnect = jest.fn();
  const mockOnClose = jest.fn();

  render(
    <WalletModal
      isOpen={true}
      onClose={mockOnClose}
      onConnect={mockOnConnect}
      walletInstances={{
        'Popular': [
          { id: 'metamask', name: 'MetaMask', installed: true },
          { id: 'walletconnect', name: 'WalletConnect', installed: true }
        ]
      }}
    />
  );

  const walletConnectButton = screen.getByText('WalletConnect');
  expect(walletConnectButton).toBeInTheDocument();

  fireEvent.click(walletConnectButton);
  expect(mockOnConnect).toHaveBeenCalledWith('walletconnect');
});
```

## 常见问题

### Q1: 升级后现有钱包连接会受影响吗？

**A**: 不会。升级完全向后兼容，所有现有的钱包连接逻辑和用户体验保持不变。

### Q2: WalletConnect Project ID 如何获取？

**A**:
1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 注册/登录
3. 创建项目
4. 复制 Project ID

### Q3: 如何在生产环境使用？

**A**: 在生产环境中使用真实的 Project ID，并确保在 WalletConnect Cloud 中配置了正确的域名和元数据。

### Q4: 移动端支持如何？

**A**: WalletConnect 主要用于连接移动端钱包。用户可以：
- 扫描 QR 码连接
- 点击深度链接连接
- 使用支持的钱包应用

### Q5: 错误处理如何改进？

**A**: 新版本提供了更好的错误处理：

```typescript
try {
  await walletSDK.connect('walletconnect');
} catch (error) {
  // 错误信息更加友好
  console.log('Error:', error.message);

  // 可以根据错误类型进行处理
  if (error.code === 4001) {
    // 用户拒绝连接
  }
}
```

### Q6: 如何自定义支持的链？

**A**: 在配置中指定支持的链：

```typescript
const walletSDK = new WalletSDK({
  appName: 'My DApp',
  projectId: 'your-project-id',
  chains: [
    { id: 1, name: 'Ethereum', rpcUrl: '...' },
    { id: 137, name: 'Polygon', rpcUrl: '...' },
    { id: 56, name: 'BSC', rpcUrl: '...' }
  ],
  walletConnect: {
    projectId: 'your-project-id',
    requiredNamespaces: {
      eip155: {
        chains: ['eip155:1', 'eip155:137', 'eip155:56'],
        methods: ['eth_sendTransaction', 'personal_sign'],
        events: ['accountsChanged']
      }
    }
  }
});
```

## 性能优化建议

### 1. 延迟初始化

```typescript
// 只在用户点击连接时初始化 WalletConnect
const handleWalletConnect = async () => {
  if (!walletSDK.isInitialized()) {
    await walletSDK.initialize();
  }

  const result = await walletSDK.connect('walletconnect');
};
```

### 2. 错误缓存

```typescript
// 缓存连接错误以避免重复尝试
let lastErrorTime = 0;
const ERROR_COOLDOWN = 5000; // 5秒

const handleConnect = async (walletId: string) => {
  if (walletId === 'walletconnect') {
    const now = Date.now();
    if (now - lastErrorTime < ERROR_COOLDOWN) {
      return; // 在冷却期内，不重复尝试
    }
  }

  try {
    const result = await walletSDK.connect(walletId);
    lastErrorTime = 0; // 重置错误时间
    return result;
  } catch (error) {
    lastErrorTime = Date.now();
    throw error;
  }
};
```

### 3. 会话管理

```typescript
// 检查是否有活跃的 WalletConnect 会话
const checkExistingSession = () => {
  const savedSession = localStorage.getItem('walletconnect_session');
  return savedSession && JSON.parse(savedSession);
};

// 如果有活跃会话，自动重连
const autoReconnect = async () => {
  const session = checkExistingSession();
  if (session) {
    try {
      await walletSDK.connect('walletconnect');
      console.log('✅ Auto-reconnected to WalletConnect');
    } catch (error) {
      console.log('❌ Auto-reconnect failed:', error);
    }
  }
};
```

## 监控和调试

### 1. 连接状态监控

```typescript
// 监控连接状态
walletSDK.on('connect', (data) => {
  console.log('Connected:', data);
  // 发送分析事件
  analytics.track('wallet_connected', {
    wallet_type: data.wallet?.id,
    chain_id: data.chainId
  });
});

walletSDK.on('disconnect', (data) => {
  console.log('Disconnected:', data);
  analytics.track('wallet_disconnected', {
    reason: data.message
  });
});
```

### 2. 错误监控

```typescript
// 错误监控
const handleConnectionError = (error: any, walletId: string) => {
  console.error(`Failed to connect ${walletId}:`, error);

  // 发送错误报告
  errorReporting.captureException(error, {
    tags: {
      component: 'wallet-sdk',
      wallet_type: walletId
    },
    extra: {
      error_code: error.code,
      error_message: error.message
    }
  });
};
```

## 总结

WalletConnect 集成的升级过程非常简单：

1. **无需代码修改**: 现有功能完全兼容
2. **只需配置 Project ID**: 添加一行配置即可启用 WalletConnect
3. **渐进式采用**: 可以逐步添加 WalletConnect 支持到特定功能
4. **更好的用户体验**: 用户可以使用移动钱包连接 DApp

升级后，你的 DApp 将支持：
- ✅ 所有现有的桌面钱包
- ✅ 新增的移动钱包连接（通过 WalletConnect）
- ✅ QR 码扫描连接
- ✅ 深度链接连接
- ✅ 统一的错误处理和事件系统

这将大大提升你的 DApp 的可访问性和用户体验！