import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { WalletProvider, useWallet } from '../src/wallet-sdk/components/WalletProvider';
import WalletModal from '../src/wallet-sdk/components/WalletModal';
import { ConnectionResult } from '../src/wallet-sdk/types';

const meta: Meta<typeof WalletModal> = {
  title: 'Wallet SDK/WalletModal',
  component: WalletModal,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WalletModal>;

// 模拟连接处理函数
const mockConnectHandler = async (walletId: string): Promise<ConnectionResult> => {
  console.log('连接钱包:', walletId);

  // 模拟连接延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟随机成功/失败
  const success = Math.random() > 0.3;

  if (success) {
    return {
      success: true,
      address: '0x' + Math.random().toString(16).substr(2, 40),
      chainId: 1,
      wallet: {
        id: walletId,
        name: getWalletName(walletId),
        installed: true,
      },
    };
  } else {
    return {
      success: false,
      error: '连接失败，请重试',
    };
  }
};

function getWalletName(walletId: string): string {
  const names: Record<string, string> = {
    metamask: 'MetaMask',
    okx: 'OKX Wallet',
    coinbase: 'Coinbase Wallet',
    trust: 'Trust Wallet',
    rabby: 'Rabby Wallet',
  };
  return names[walletId] || walletId;
}

// 模拟钱包数据
const mockWallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTE2IDJMMTMgN0g1TDMgMTNWMjVIMTNWMjlIMTlWMjVIMjlWMTNIMTlMNyAxM0gxOUwxNiAyWiIgZmlsbD0iI0Y2ODkxQyIvPjwvc3ZnPg==',
    installed: true,
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwQzlGRiIvPjwvc3ZnPg==',
    installed: true,
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMDUyRkYiLz48L3N2Zz4=',
    installed: true,
  },
];

const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const { getAvailableWallets } = useWallet();

  // 模拟钱包列表
  const availableWallets = mockWallets;

  return (
    <WalletProvider
      config={{
        appName: 'Wallet SDK Demo',
        projectId: 'demo-project-id',
        autoConnect: false,
      }}
    >
      <div className="p-8">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            打开钱包弹窗
          </button>
        </div>

        <WalletModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConnect={mockConnectHandler}
        />

        <div className="mt-4 text-sm text-gray-600">
          <p>💡 这是一个模拟的钱包连接弹窗，包含以下功能：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>支持网格和列表两种视图模式</li>
            <li>显示已安装的钱包</li>
            <li>模拟连接过程（有70%成功率）</li>
            <li>支持明暗主题切换</li>
            <li>响应式设计，适配移动端</li>
          </ul>
        </div>
      </div>
    </WalletProvider>
  );
};

export const Default: Story = {
  args: {
    title: '连接钱包',
    description: '请选择要连接的钱包',
    theme: 'light',
  },
  render: Template,
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
  render: Template,
};

export const CustomTitle: Story = {
  args: {
    ...Default.args,
    title: '选择您的 Web3 钱包',
    description: '连接钱包以开始使用去中心化应用',
  },
  render: Template,
};

export const Minimal: Story = {
  args: {
    title: '连接',
    description: '',
  },
  render: Template,
};

// 自定义装饰器来显示不同状态
const StateDemoDecorator = (Story: any) => (
  <WalletProvider
    config={{
      appName: 'Wallet SDK Demo',
      projectId: 'demo-project-id',
      autoConnect: false,
    }}
  >
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">钱包弹窗状态演示</h3>
        <Story />
      </div>
    </div>
  </WalletProvider>
);

export const StatesDemo: Story = {
  args: {
    title: '连接钱包',
    description: '请选择要连接的钱包',
  },
  decorators: [StateDemoDecorator],
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-medium mb-2">默认状态</h4>
        <WalletModal
          {...args}
          isOpen={true}
          onClose={() => {}}
          onConnect={mockConnectHandler}
        />
      </div>

      <div>
        <h4 className="font-medium mb-2">暗色主题</h4>
        <WalletModal
          {...args}
          isOpen={true}
          onClose={() => {}}
          onConnect={mockConnectHandler}
          theme="dark"
        />
      </div>
    </div>
  ),
};