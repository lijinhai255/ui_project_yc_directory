import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { WalletSDK } from '../src/wallet-sdk';
import { WalletSDKConfig, ConnectionResult } from '../src/wallet-sdk/types';

const meta: Meta = {
  title: 'Wallet SDK/Core SDK',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Wallet SDK 核心功能演示

Wallet SDK 提供了一个完整的钱包连接解决方案，支持多种钱包和多链环境。

## 主要特性

- 🔗 **多钱包支持**: MetaMask、OKX、Coinbase、Trust Wallet、Rabby 等
- ⚡ **EIP-6963**: 支持最新的钱包检测标准
- 🔐 **安全性**: 类型安全的 TypeScript 实现
- 🎨 **主题支持**: 支持明暗主题
- 📱 **响应式**: 适配桌面和移动设备
- 🔄 **自动连接**: 支持自动重连上次使用的钱包
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// 模拟 SDK 实例
let sdkInstance: WalletSDK | null = null;

const createSDK = (config: WalletSDKConfig) => {
  return new WalletSDK(config);
};

const SDKDemo: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState<{
    address?: string;
    chainId?: number;
    wallet?: string;
  }>({});
  const [logs, setLogs] = useState<string[]>([]);
  const [config] = useState<WalletSDKConfig>({
    appName: 'Wallet SDK Demo',
    projectId: 'demo-project-id',
    autoConnect: false,
  });

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const initializeSDK = async () => {
    try {
      addLog('正在初始化 SDK...');
      sdkInstance = createSDK(config);
      await sdkInstance.initialize();
      setIsInitialized(true);
      addLog('✅ SDK 初始化成功');

      // 设置事件监听
      sdkInstance.on('connect', (data) => {
        addLog(`🔗 钱包连接成功: ${data.address?.slice(0, 6)}...${data.address?.slice(-4)}`);
        setIsConnected(true);
        setConnectionInfo({
          address: data.address,
          chainId: data.chainId,
          wallet: data.wallet?.name,
        });
      });

      sdkInstance.on('disconnect', () => {
        addLog('🔌 钱包已断开连接');
        setIsConnected(false);
        setConnectionInfo({});
      });

      sdkInstance.on('chainChanged', (data) => {
        addLog(`⛓️ 链已切换: ${data.chainId}`);
        setConnectionInfo(prev => ({ ...prev, chainId: data.chainId }));
      });

      sdkInstance.on('accountChanged', (data) => {
        addLog(`👤 账户已变更: ${data.accounts[0]?.slice(0, 6)}...${data.accounts[0]?.slice(-4)}`);
        setConnectionInfo(prev => ({ ...prev, address: data.accounts[0] }));
      });

      sdkInstance.on('error', (data) => {
        addLog(`❌ 错误: ${data.error}`);
      });

    } catch (error) {
      addLog(`❌ SDK 初始化失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const connectWallet = async () => {
    if (!sdkInstance) return;

    try {
      addLog('正在连接钱包...');
      const result = await sdkInstance.connect();
      if (result.success) {
        addLog(`✅ 连接成功: ${result.wallet?.name}`);
      } else {
        addLog(`❌ 连接失败: ${result.error}`);
      }
    } catch (error) {
      addLog(`❌ 连接异常: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const disconnectWallet = async () => {
    if (!sdkInstance) return;

    try {
      addLog('正在断开连接...');
      await sdkInstance.disconnect();
      addLog('✅ 已断开连接');
    } catch (error) {
      addLog(`❌ 断开连接失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const getBalance = async () => {
    if (!sdkInstance || !isConnected) return;

    try {
      addLog('正在获取余额...');
      const balance = await sdkInstance.getBalance();
      addLog(`💰 余额: ${balance} ETH`);
    } catch (error) {
      addLog(`❌ 获取余额失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const getAvailableWallets = () => {
    if (!sdkInstance) return [];

    const wallets = sdkInstance.getAvailableWallets();
    addLog(`🔍 找到 ${wallets.length} 个可用钱包`);
    return wallets;
  };

  const clearLogs = () => {
    setLogs([]);
  };

  useEffect(() => {
    return () => {
      if (sdkInstance) {
        sdkInstance.off('connect', () => {});
        sdkInstance.off('disconnect', () => {});
        sdkInstance.off('chainChanged', () => {});
        sdkInstance.off('accountChanged', () => {});
        sdkInstance.off('error', () => {});
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Wallet SDK 核心功能演示</h2>

        {/* 状态面板 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div className="text-sm text-blue-600 dark:text-blue-400">SDK 状态</div>
            <div className={`font-semibold ${isInitialized ? 'text-green-600' : 'text-gray-500'}`}>
              {isInitialized ? '✅ 已初始化' : '❌ 未初始化'}
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
            <div className="text-sm text-green-600 dark:text-green-400">连接状态</div>
            <div className={`font-semibold ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
              {isConnected ? '✅ 已连接' : '❌ 未连接'}
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
            <div className="text-sm text-purple-600 dark:text-purple-400">钱包信息</div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">
              {connectionInfo.wallet || '无'}
            </div>
          </div>
        </div>

        {/* 连接信息 */}
        {isConnected && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded">
            <h3 className="font-semibold mb-2">连接详情</h3>
            <div className="space-y-1 text-sm">
              <div><span className="text-gray-600 dark:text-gray-400">地址:</span> {connectionInfo.address}</div>
              <div><span className="text-gray-600 dark:text-gray-400">链ID:</span> {connectionInfo.chainId}</div>
              <div><span className="text-gray-600 dark:text-gray-400">钱包:</span> {connectionInfo.wallet}</div>
            </div>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-wrap gap-3 mb-6">
          {!isInitialized ? (
            <button
              onClick={initializeSDK}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              初始化 SDK
            </button>
          ) : (
            <>
              {!isConnected ? (
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  连接钱包
                </button>
              ) : (
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  断开连接
                </button>
              )}
              {isConnected && (
                <button
                  onClick={getBalance}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  查询余额
                </button>
              )}
              <button
                onClick={() => {
                  const wallets = getAvailableWallets();
                  addLog(`可用钱包: ${wallets.map(w => w.name).join(', ')}`);
                }}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                获取钱包列表
              </button>
              <button
                onClick={clearLogs}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                清除日志
              </button>
            </>
          )}
        </div>

        {/* 日志面板 */}
        <div>
          <h3 className="font-semibold mb-2">操作日志</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            ) : (
              <div className="text-gray-500">暂无日志，请点击上方按钮开始操作...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SDKDemoStory: Story = {
  render: () => <SDKDemo />,
  parameters: {
    docs: {
      description: {
        story: `
## SDK 功能演示

这个演示展示了 Wallet SDK 的核心功能：

1. **初始化**: 创建和配置 SDK 实例
2. **连接钱包**: 检测并连接可用的钱包
3. **状态管理**: 跟踪连接状态和钱包信息
4. **事件监听**: 监听连接、断开、链切换等事件
5. **余额查询**: 查询 ETH 和代币余额
6. **钱包管理**: 获取可用钱包列表

## 使用说明

1. 点击"初始化 SDK"开始
2. 点击"连接钱包"选择要连接的钱包
3. 查看日志面板了解详细的操作过程
4. 测试其他功能如查询余额、获取钱包列表等

**注意**: 这是一个演示环境，实际的区块链交互需要真实的钱包和网络连接。
        `,
      },
    },
  },
};