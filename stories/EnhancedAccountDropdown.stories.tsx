import type { Meta, StoryObj } from '@storybook/react';
import EnhancedAccountDropdown from '../src/wallet-sdk/components/EnhancedAccountDropdown';
import { WalletProvider } from '../src/wallet-sdk/components/WalletProvider';
import { useWallet } from '../src/wallet-sdk/components/WalletProvider';
import { useState } from 'react';

// 模拟钱包提供者
const MockWalletProvider = ({ children, connected = true }: { children: React.ReactNode; connected?: boolean }) => {
  const [isConnected, setIsConnected] = useState(connected);
  const mockAddress = '0x1234567890123456789012345678901234567890';
  const mockBalance = '2.5432';
  const mockChainId = 1;

  return (
    <WalletProvider
      config={{
        appName: 'EIP-1193 Test DApp',
        autoConnect: false,
        chains: [],
      }}
    >
      <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>🔌 EIP-1193 模拟钱包状态</h3>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
            <button
              onClick={() => setIsConnected(!isConnected)}
              style={{
                padding: '8px 16px',
                backgroundColor: isConnected ? '#dc3545' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {isConnected ? '断开连接' : '连接钱包'}
            </button>
            <span style={{ padding: '8px 16px', background: '#e9ecef', borderRadius: '4px' }}>
              状态: {isConnected ? '已连接' : '未连接'}
            </span>
          </div>
          {isConnected && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              <div>地址: {mockAddress}</div>
              <div>余额: {mockBalance} ETH</div>
              <div>链ID: {mockChainId}</div>
            </div>
          )}
        </div>
        {children}
      </div>
    </WalletProvider>
  );
};

// 真实的钱包连接测试
const WalletConnectionTest = ({ children }: { children: React.ReactNode }) => {
  // 从 useWallet 中获取真实状态
  const {
    address,
    balance,
    chainId,
    isConnected,
    connect,
    disconnect,
    switchChain,
    openModal,
    fetchBalance,
    balanceLoading,
  } = useWallet();

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>🔌 真实钱包连接状态</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          {isConnected ? (
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅ 已连接</span>
          ) : (
            <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌ 未连接</span>
          )}
          {isConnected && (
            <button
              onClick={() => disconnect()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              断开连接
            </button>
          )}
          {!isConnected && (
            <button
              onClick={() => openModal()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              连接钱包
            </button>
          )}
        </div>
        {isConnected && (
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>地址: {address || '未连接'}</div>
            <div>余额: {balance || '0'} ETH</div>
            <div>链ID: {chainId || '未连接'}</div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const meta: Meta<typeof EnhancedAccountDropdown> = {
  title: 'Wallet SDK/EIP-1193 EnhancedAccountDropdown',
  component: EnhancedAccountDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: 'Enhanced AccountDropdown 组件，支持 EIP-1193 标准事件监听，提供实时钱包状态同步功能。',
    },
  },
  tags: ['autodocs', 'eip-1193'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '组件尺寸',
    },
    showBalance: {
      control: { type: 'boolean' },
      description: '是否显示余额',
    },
    showChainSwitcher: {
      control: { type: 'boolean' },
      description: '是否显示链切换器',
    },
    enableEIP1193Events: {
      control: { type: 'boolean' },
      description: '启用 EIP-1193 事件监听',
    },
    showEventHistory: {
      control: { type: 'boolean' },
      description: '显示事件历史面板',
    },
    showNotifications: {
      control: { type: 'boolean' },
      description: '显示实时通知',
    },
  },
  decorators: [
    (Story) => (
      <WalletProvider
        config={{
          appName: 'YC Directory UI - Storybook',
          autoConnect: false,
          chains: [
            {
              id: 1,
              name: 'Ethereum Mainnet',
              rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18,
              },
            },
            {
              id: 11155111,
              name: 'Sepolia Testnet',
              rpcUrls: ['https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
              nativeCurrency: {
                name: 'Sepolia Ether',
                symbol: 'SepoliaETH',
                decimals: 18,
              },
            },
            {
              id: 137,
              name: 'Polygon Mainnet',
              rpcUrls: ['https://polygon-rpc.com'],
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18,
              },
            },
          ],
        }}
      >
        <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh', minWidth: '400px' }}>
          <div style={{ marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3>🔌 钱包连接测试</h3>
            <p style={{ margin: '10px 0', fontSize: '14px', color: '#666' }}>
              点击下方的 EnhancedAccountDropdown 组件来连接真实的钱包。支持 MetaMask、WalletConnect 等主流钱包。
            </p>
          </div>
          <Story />
        </div>
      </WalletProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 🔥 EIP-1193 功能测试故事

export const Default: Story = {
  args: {
    showBalance: true,
    showChainSwitcher: true,
    size: 'md',
    enableEIP1193Events: false,
    showEventHistory: true,
    showNotifications: true,
  },
  parameters: {
    docs: {
      description: '基础版本，不启用 EIP-1193 事件监听。点击组件可以真实连接钱包，支持 MetaMask 等浏览器插件钱包。',
    },
  },
};

export const EIP1193Enabled: Story = {
  args: {
    showBalance: true,
    showChainSwitcher: true,
    size: 'md',
    enableEIP1193Events: true,
    showEventHistory: true,
    showNotifications: true,
  },
  parameters: {
    docs: {
      description: '启用 EIP-1193 事件监听的完整功能版本。可以看到实时监听指示器（绿色闪烁点）和"实时监听"标签。连接钱包后可以实时监听账户变更、链切换等事件。',
    },
  },
};

export const WithoutNotifications: Story = {
  args: {
    showBalance: true,
    showChainSwitcher: true,
    size: 'md',
    enableEIP1193Events: true,
    showEventHistory: true,
    showNotifications: false,
  },
  parameters: {
    docs: {
      description: '启用 EIP-1193 事件监听但不显示通知面板，专注于事件历史记录。',
    },
  },
};

export const WithoutEventHistory: Story = {
  args: {
    showBalance: true,
    showChainSwitcher: true,
    size: 'md',
    enableEIP1193Events: true,
    showEventHistory: false,
    showNotifications: true,
  },
  parameters: {
    docs: {
      description: '启用 EIP-1193 事件监听但不显示事件历史，专注于实时通知。',
    },
  },
};

export const MinimalSize: Story = {
  args: {
    showBalance: false,
    showChainSwitcher: false,
    size: 'sm',
    enableEIP1193Events: true,
    showEventHistory: true,
    showNotifications: true,
  },
  parameters: {
    docs: {
      description: '最小尺寸版本，适合空间有限的场景。',
    },
  },
};

export const LargeSize: Story = {
  args: {
    showBalance: true,
    showChainSwitcher: true,
    size: 'lg',
    enableEIP1193Events: true,
    showEventHistory: true,
    showNotifications: true,
  },
  parameters: {
    docs: {
      description: '大尺寸版本，提供更好的可读性和更大的点击区域。',
    },
  },
};

// 🔥 交互式测试故事

export const InteractiveDemo: Story = {
  render: () => {
    const { isConnected, address, balance, chainId, disconnect, openModal } = useWallet();

    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>🔌 真实钱包交互演示</h2>

        <div style={{ marginBottom: '20px', padding: '15px', background: '#e8f4fd', borderRadius: '8px', border: '1px solid #bee5eb' }}>
          <h3>使用说明</h3>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>点击下方的 EnhancedAccountDropdown 组件连接真实钱包</li>
            <li>支持 MetaMask、WalletConnect 等主流钱包</li>
            <li>连接后可以查看余额、切换网络、断开连接</li>
            <li>启用 EIP-1193 事件监听可以实时响应钱包状态变化</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <EnhancedAccountDropdown
            enableEIP1193Events={true}
            showEventHistory={true}
            showNotifications={true}
            showBalance={true}
            showChainSwitcher={true}
          />
        </div>

        {isConnected && (
          <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h4>🔗 当前钱包状态</h4>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <div><strong>地址:</strong> {address}</div>
              <div><strong>余额:</strong> {balance} ETH</div>
              <div><strong>链ID:</strong> {chainId}</div>
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => disconnect()}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  断开连接
                </button>
                <button
                  onClick={() => openModal()}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  重新选择钱包
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: '真实钱包交互演示，可以连接真实的钱包并测试完整功能。',
    },
  },
};

export const Disconnected: Story = {
  args: {
    showBalance: false,
    showChainSwitcher: false,
    size: 'md',
    enableEIP1193Events: false,
    showEventHistory: true,
    showNotifications: true,
  },
  decorators: [
    (Story) => (
      <MockWalletProvider connected={false}>
        <Story />
      </MockWalletProvider>
    ),
  ],
  parameters: {
    docs: {
      description: '未连接状态下的组件表现（组件不会显示）。',
    },
  },
};