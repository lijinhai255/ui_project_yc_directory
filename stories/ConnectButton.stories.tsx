import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { WalletProvider } from '../src/wallet-sdk/components/WalletProvider';
import ConnectButton from '../src/wallet-sdk/components/ConnectButton';
import { WalletSDKConfig, ChainInfo } from '../src/wallet-sdk/types';
import { chains, projectId, walletConfig } from '../src/wallet-sdk/wagmi';

// 转换 wagmi chains 为 ChainInfo 格式
const convertedChains: ChainInfo[] = chains.map(chain => ({
  id: chain.id,
  name: chain.name,
  network: chain.name.toLowerCase().replace(/\s+/g, '-'),
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [chain.rpcUrl || ''],
    },
  },
}));

// 使用新的配置格式
const defaultConfig: WalletSDKConfig = {
  appName: walletConfig.appName,
  projectId: projectId,
  autoConnect: true,
  chains: convertedChains,
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
};

const meta: Meta<typeof ConnectButton> = {
  title: 'Wallet SDK/ConnectButton',
  component: ConnectButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <WalletProvider config={defaultConfig}>
        <div className="p-8">
          <Story />
        </div>
      </WalletProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    showBalance: {
      control: { type: 'boolean' },
    },
    showChain: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectButton>;

export const Default: Story = {
  args: {
    label: '连接钱包',
    size: 'md',
    variant: 'primary',
    showBalance: false,
    showChain: false,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    label: '连接',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    label: '连接钱包',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const WithBalance: Story = {
  args: {
    ...Default.args,
    showBalance: true,
    showChain: true,
  },
  decorators: [
    (Story) => (
      <WalletProvider config={defaultConfig}>
        <div className="p-8">
          <Story />
          <div className="mt-4 text-sm text-gray-600">
            💡 此示例显示余额和链信息（需要实际连接钱包才能看到效果）
          </div>
        </div>
      </WalletProvider>
    ),
  ],
};

export const CustomLabel: Story = {
  args: {
    ...Default.args,
    label: '连接 Web3 钱包',
  },
};

export const WithCallback: Story = {
  args: {
    ...Default.args,
    onConnect: (result) => {
      console.log('连接结果:', result);
      alert(`连接${result.success ? '成功' : '失败'}: ${result.error || ''}`);
    },
    onDisconnect: () => {
      console.log('钱包已断开连接');
      alert('钱包已断开连接');
    },
  },
  render: (args) => (
    <div>
      <ConnectButton {...args} />
      <div className="mt-4 text-sm text-gray-600">
        💡 打开控制台查看连接和断开连接的回调事件
      </div>
    </div>
  ),
};

export const CompleteFlow: Story = {
  args: {
    ...Default.args,
    label: '🚀 完整连接流程演示',
    size: 'lg',
    showBalance: true,
    showChain: true,
    onConnect: (result) => {
      console.log('🚀 完整流程 - 连接结果:', result);
      if (result.success) {
        alert(`✅ 连接成功!\n地址: ${result.address?.slice(0, 6)}...${result.address?.slice(-4)}\n钱包: ${result.wallet?.name}`);
      } else {
        alert(`❌ 连接失败: ${result.error}`);
      }
    },
    onDisconnect: () => {
      console.log('🔌 完整流程 - 钱包已断开连接');
      alert('🔌 钱包已断开连接');
    },
  },
  render: (args) => (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          🎯 完整钱包连接流程演示
        </h3>
        <p className="text-gray-600 mb-4">
          这个演示展示了完整的钱包连接流程，包括：
        </p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 自动检测已安装的钱包</li>
          <li>• 单钱包自动连接，多钱包显示选择弹窗</li>
          <li>• 连接状态管理和实时反馈</li>
          <li>• 地址格式化和余额显示</li>
          <li>• 完整的错误处理和用户提示</li>
        </ul>
      </div>

      <div className="flex justify-center">
        <ConnectButton {...args} />
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded">
        <p className="font-semibold mb-2">🔍 测试步骤：</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>确保已安装钱包扩展程序（如MetaMask）</li>
          <li>点击"🚀 完整连接流程演示"按钮</li>
          <li>观察是否自动连接或显示选择弹窗</li>
          <li>在钱包中确认连接请求</li>
          <li>查看连接后的地址和余额显示</li>
          <li>点击地址按钮断开连接</li>
          <li>打开控制台查看详细日志</li>
        </ol>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## 完整连接流程演示

这个演示展示了钱包SDK的完整连接流程，实现了与my-app项目类似的用户体验。

### 🎯 主要特性

**智能钱包检测**
- 自动检测浏览器中已安装的钱包扩展程序
- 过滤只显示可用的钱包选项

**智能连接逻辑**
- 单钱包：自动直接连接
- 多钱包：显示美观的选择弹窗
- 无钱包：提示用户安装钱包

**完整状态管理**
- 连接中状态显示加载动画
- 连接成功显示地址和余额
- 连接失败显示错误信息
- 支持断开连接操作

**用户体验优化**
- 详细的控制台日志便于调试
- 友好的错误提示信息
- 响应式设计适配各种屏幕
- 支持明暗主题切换

### 🔧 技术实现

- **EIP-6963标准**: 使用最新的钱包检测标准
- **TypeScript**: 完整的类型安全保障
- **React Hooks**: 现代化的状态管理
- **模态框组件**: 美观的钱包选择界面
- **事件系统**: 完整的连接事件处理

### 📱 支持的钱包

- MetaMask
- OKX Wallet
- Coinbase Wallet
- Trust Wallet
- Rabby Wallet
- 其他支持EIP-6963标准的钱包

### 💡 使用建议

1. **开发调试**: 打开控制台查看详细日志
2. **用户体验**: 根据需要调整按钮样式和文字
3. **错误处理**: 自定义onConnect回调处理各种连接场景
4. **主题定制**: 通过theme属性适配应用UI风格
        `,
      },
    },
  },
};