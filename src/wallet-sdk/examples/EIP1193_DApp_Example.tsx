import React, { useState, useEffect } from 'react';
import {
  WalletProvider,
  AccountDropdown,
  ConnectButton,
  useWallet
} from '../index';
import { Address } from 'viem';

// 🔥 EIP-1193 事件监听 DApp 示例
export const EIP1193DAppExample: React.FC = () => {
  return (
    <WalletProvider
      config={{
        appName: 'EIP-1193 DApp Example',
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
      }}
    >
      <DAppContent />
    </WalletProvider>
  );
};

const DAppContent: React.FC = () => {
  const {
    isConnected,
    address,
    balance,
    chainId,
    connect,
    disconnect,
    switchChain,
    openModal,
    fetchBalance,
    getTokenBalance,
  } = useWallet();

  // 🔥 EIP-1193 事件历史记录
  const [eventHistory, setEventHistory] = useState<Array<{
    timestamp: number;
    type: string;
    data: any;
    message: string;
  }>>([]);

  // 🔥 实时状态监控
  const [realtimeStatus, setRealtimeStatus] = useState({
    isListening: false,
    lastEvent: null as any,
    notifications: [] as Array<{
      id: string;
      message: string;
      type: 'info' | 'success' | 'warning' | 'error';
      timestamp: number;
    }>
  });

  // 🔥 添加事件到历史记录
  const addEventToHistory = (type: string, data: any, message: string) => {
    const event = {
      timestamp: Date.now(),
      type,
      data,
      message
    };

    setEventHistory(prev => [event, ...prev.slice(0, 9)]); // 保留最近10条
    setRealtimeStatus(prev => ({
      ...prev,
      lastEvent: event
    }));
  };

  // 🔥 显示通知
  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    const notification = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      type,
      timestamp: Date.now()
    };

    setRealtimeStatus(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification]
    }));

    // 5秒后自动移除通知
    setTimeout(() => {
      setRealtimeStatus(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== notification.id)
      }));
    }, 5000);
  };

  // 🔥 EIP-1193 事件处理函数
  const handleEIP1193Event = (event: any) => {
    console.log('🔌 EIP-1193 事件:', event);

    switch (event.type) {
      case 'accountsChanged':
        addEventToHistory('accountsChanged', event.data, `账户变更: ${event.data.address}`);
        showNotification('钱包账户已变更', 'info');
        break;

      case 'chainChanged':
        addEventToHistory('chainChanged', event.data, `链切换到: ${event.data.chainId}`);
        showNotification(`已切换到链 ${event.data.chainId}`, 'success');
        break;

      case 'eip1193_connect':
        addEventToHistory('eip1193_connect', event.data, `EIP-1193 连接: 链 ${event.data.chainId}`);
        showNotification('钱包已连接 (EIP-1193)', 'success');
        break;

      case 'eip1193_disconnect':
        addEventToHistory('eip1193_disconnect', event.data, `EIP-1193 断开: ${event.data.error?.message}`);
        showNotification('钱包已断开连接 (EIP-1193)', 'warning');
        break;

      default:
        addEventToHistory('unknown', event.data, `未知事件: ${event.type}`);
        showNotification('收到未知钱包事件', 'info');
    }
  };

  // 🔥 监听钱包状态变化
  useEffect(() => {
    if (isConnected) {
      setRealtimeStatus(prev => ({ ...prev, isListening: true }));
      showNotification('钱包连接成功，已启用实时监听', 'success');
    } else {
      setRealtimeStatus(prev => ({ ...prev, isListening: false }));
      showNotification('钱包已断开连接', 'warning');
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* 标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              EIP-1193 实时事件监听 DApp 示例
            </h1>
            <p className="text-gray-600">
              演示如何使用 EIP-1193 标准事件监听实现实时钱包状态同步
            </p>
          </div>

          {/* 🔥 连接状态面板 */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              🔌 EIP-1193 实时监听状态
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${realtimeStatus.isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-700">
                  {realtimeStatus.isListening ? '实时监听中' : '未监听'}
                </span>
              </div>

              <div className="text-sm text-gray-700">
                连接状态: <span className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {isConnected ? '已连接' : '未连接'}
                </span>
              </div>

              <div className="text-sm text-gray-700">
                当前链: <span className="font-medium">{chainId || '未知'}</span>
              </div>
            </div>
          </div>

          {/* 连接控制 */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              {!isConnected ? (
                <ConnectButton
                  label="连接钱包"
                  size="lg"
                  variant="primary"
                  onConnect={(result) => {
                    if (result.success) {
                      showNotification('钱包连接成功！', 'success');
                    } else {
                      showNotification(`连接失败: ${result.error}`, 'error');
                    }
                  }}
                />
              ) : (
                <AccountDropdown
                  showBalance={true}
                  showChainSwitcher={true}
                  size="lg"
                  onDisconnect={() => {
                    showNotification('钱包已断开连接', 'warning');
                  }}
                  // 🔥 假设升级后的 AccountDropdown 支持这些属性
                  // enableEIP1193Events={true}
                  // onEIP1193Event={handleEIP1193Event}
                />
              )}
            </div>

            {/* 账户信息 */}
            {isConnected && address && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">地址: </span>
                    <span className="font-mono text-gray-900">{address}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">余额: </span>
                    <span className="font-medium text-gray-900">{balance || '0.0000'} ETH</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 🔥 通知面板 */}
          {realtimeStatus.notifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 实时通知</h3>
              <div className="space-y-2">
                {realtimeStatus.notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                      notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                      notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                      'bg-blue-50 border-blue-200 text-blue-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{notification.message}</span>
                      <span className="text-xs opacity-75">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🔥 EIP-1193 事件历史 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                📜 EIP-1193 事件历史
              </h3>
              <button
                onClick={() => setEventHistory([])}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                清空历史
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              {eventHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  暂无事件记录，请尝试切换账户或网络
                </p>
              ) : (
                <div className="space-y-2">
                  {eventHistory.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <span className="text-gray-400 font-mono text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                      <div className="flex-1">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          event.type === 'accountsChanged' ? 'bg-blue-100 text-blue-700' :
                          event.type === 'chainChanged' ? 'bg-green-100 text-green-700' :
                          event.type === 'eip1193_connect' ? 'bg-purple-100 text-purple-700' :
                          event.type === 'eip1193_disconnect' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {event.type}
                        </span>
                        <span className="ml-2 text-gray-700">{event.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 测试操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => fetchBalance()}
                disabled={!isConnected}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                刷新余额
              </button>

              <button
                onClick={() => switchChain(137)}
                disabled={!isConnected}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                切换到 Polygon
              </button>

              <button
                onClick={() => switchChain(1)}
                disabled={!isConnected}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                切换到 Ethereum
              </button>

              <button
                onClick={() => disconnect()}
                disabled={!isConnected}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                断开连接
              </button>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 测试说明</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 连接钱包后，系统会自动启用 EIP-1193 事件监听</li>
              <li>• 在钱包中切换账户，观察"账户变更"事件</li>
              <li>• 在钱包中切换网络，观察"链切换"事件</li>
              <li>• 断开钱包连接，观察"断开连接"事件</li>
              <li>• 所有事件都会显示在事件历史中，并伴有实时通知</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EIP1193DAppExample;