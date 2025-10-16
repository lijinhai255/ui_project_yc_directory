"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from './WalletProvider';

interface EIP1193Event {
  id: string;
  type: 'accountsChanged' | 'chainChanged' | 'connect' | 'disconnect';
  timestamp: Date;
  data: any;
  details: string;
}

interface EIP1193DemoProps {
  className?: string;
  showBalance?: boolean;
  showChain?: boolean;
}

const EIP1193EventDemo: React.FC<EIP1193DemoProps> = ({
  className = '',
  showBalance = false,
  showChain = false,
}) => {
  const {
    isConnected,
    isConnecting,
    address,
    balance,
    chainId,
    wallet,
    provider: walletProvider,
    connect,
    disconnect,
    openModal,
    walletInstances,
    detectedWallets,
  } = useWallet();

  const [events, setEvents] = useState<EIP1193Event[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [internalProvider, setInternalProvider] = useState<any>(null);

  // 格式化地址显示
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 获取链名称
  const getChainName = (chainId: number | null) => {
    if (!chainId) return 'Unknown Chain';

    const chainMap: Record<number, string> = {
      1: 'Ethereum',
      56: 'BSC',
      137: 'Polygon',
      43114: 'Avalanche',
      42161: 'Arbitrum',
      8453: 'Base',
      11155111: 'Sepolia',
    };

    return chainMap[chainId] || `Chain ${chainId}`;
  };

  // 添加事件到列表
  const addEvent = useCallback((type: EIP1193Event['type'], data: any, details: string) => {
    const newEvent: EIP1193Event = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      timestamp: new Date(),
      data,
      details,
    };

    setEvents(prev => [newEvent, ...prev.slice(0, 49)]); // 保持最新50条事件
  }, []);

  
  // 在钱包连接后设置事件监听
  useEffect(() => {
    if (isConnected && walletProvider && !isListening) {
      console.log('🔍 EIP1193EventDemo - 开始设置监听器', {
        isConnected,
        walletName: wallet?.name,
        isListening,
        hasProvider: !!walletProvider
      });

      // 直接同步调用，不使用异步
      const setupListeners = () => {
        if (!walletProvider) {
          console.log('🔍 EIP1193EventDemo - 没有 provider');
          return;
        }

        console.log('🔍 EIP1193EventDemo - Provider 信息:', {
          wallet: wallet,
          provider: walletProvider,
          providerType: typeof walletProvider,
          providerMethods: Object.getOwnPropertyNames(walletProvider),
          hasOn: typeof walletProvider.on === 'function',
          hasRemoveListener: typeof walletProvider.removeListener === 'function',
          hasOff: typeof walletProvider.off === 'function'
        });

        setInternalProvider(walletProvider);
        setIsListening(true);

        console.log('🔍 EIP1193EventDemo - 开始设置 EIP-1193 事件监听');

        // accountsChanged 事件
        const handleAccountsChanged = (accounts: string[]) => {
          console.log('🔄 EIP-1193 accountsChanged:', accounts);
          addEvent('accountsChanged', { accounts },
            `账户变更: ${accounts.length > 0 ? accounts.map(formatAddress).join(', ') : '无账户'}`
          );
        };

        // chainChanged 事件
        const handleChainChanged = (chainId: string) => {
          const decimalChainId = parseInt(chainId, 16);
          console.log('⛓️ EIP-1193 chainChanged:', chainId, `(${decimalChainId})`);
          addEvent('chainChanged', { chainId, decimalChainId },
            `链切换: ${getChainName(decimalChainId)} (ID: ${decimalChainId})`
          );
        };

        // connect 事件 (EIP-1193)
        const handleConnect = (connectInfo: { chainId: string }) => {
          const decimalChainId = parseInt(connectInfo.chainId, 16);
          console.log('✅ EIP-1193 connect:', connectInfo);
          addEvent('connect', connectInfo,
            `连接事件: ${getChainName(decimalChainId)} (ID: ${decimalChainId})`
          );
        };

        // disconnect 事件 (EIP-1193)
        const handleDisconnect = (error: { code: number; message: string }) => {
          console.log('❌ EIP-1193 disconnect:', error);
          addEvent('disconnect', error,
            `断开事件: ${error.message || '未知原因'} (代码: ${error.code})`
          );
        };

        // 注册事件监听器
        try {
          walletProvider.on('accountsChanged', handleAccountsChanged);
          walletProvider.on('chainChanged', handleChainChanged);
          walletProvider.on('connect', handleConnect);
          walletProvider.on('disconnect', handleDisconnect);

          console.log('✅ EIP-1193 事件监听器设置成功');

          // 添加初始事件
          addEvent('connect', { chainId: `0x${(chainId || 1).toString(16)}` },
            `监听器已设置: ${getChainName(chainId || 1)}`
          );

          // 返回清理函数
          return () => {
            try {
              if (walletProvider && typeof walletProvider.removeListener === 'function') {
                walletProvider.removeListener('accountsChanged', handleAccountsChanged);
                walletProvider.removeListener('chainChanged', handleChainChanged);
                walletProvider.removeListener('connect', handleConnect);
                walletProvider.removeListener('disconnect', handleDisconnect);
              } else if (walletProvider && typeof walletProvider.off === 'function') {
                // 有些 provider 使用 off 方法
                walletProvider.off('accountsChanged', handleAccountsChanged);
                walletProvider.off('chainChanged', handleChainChanged);
                walletProvider.off('connect', handleConnect);
                walletProvider.off('disconnect', handleDisconnect);
              }
              console.log('🧹 EIP-1193 事件监听器已清理');
            } catch (error) {
              console.error('❌ 清理 EIP-1193 事件监听器失败:', error);
            }
          };
        } catch (error) {
          console.error('❌ 设置 EIP-1193 事件监听器失败:', error);
          addEvent('disconnect', { code: -1, message: '设置监听器失败' },
            `错误: ${error instanceof Error ? error.message : '未知错误'}`
          );
          return () => {}; // 返回空的清理函数
        }
      };

      const cleanup = setupListeners();

      return cleanup;
    } else if (!isConnected && isListening) {
      setIsListening(false);
      setInternalProvider(null);
      addEvent('disconnect', { code: 0, message: '钱包已断开连接' },
        '钱包断开连接，监听器已停止'
      );
    }
  }, [isConnected, walletProvider, isListening, chainId, addEvent, wallet]);

  // 处理连接/断开
  const handleConnect = async () => {
    try {
      if (isConnected) {
        await disconnect();
        setEvents([]);
        setIsListening(false);
      } else {
        openModal();
      }
    } catch (error) {
      console.error('❌ 连接操作失败:', error);
    }
  };

  // 清空事件日志
  const clearEvents = () => {
    setEvents([]);
  };

  // 测试触发事件
  const testTriggerEvent = () => {
    console.log('🧪 手动触发测试事件');
    addEvent('accountsChanged', { accounts: [address || '0x0000000000000000000000000000000000000000'] },
      '测试事件: 手动触发账户变更'
    );
  };

  // 获取事件类型的颜色
  const getEventColor = (type: EIP1193Event['type']) => {
    switch (type) {
      case 'accountsChanged':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'chainChanged':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'connect':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'disconnect':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // 获取事件图标
  const getEventIcon = (type: EIP1193Event['type']) => {
    switch (type) {
      case 'accountsChanged':
        return '👤';
      case 'chainChanged':
        return '⛓️';
      case 'connect':
        return '✅';
      case 'disconnect':
        return '❌';
      default:
        return '📝';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          EIP-1193 事件监听演示
        </h2>
        <p className="text-sm text-gray-600">
          对比标准 EIP-1193 事件与钱包 SDK 的状态管理
        </p>
      </div>

      {/* 连接状态和操作区域 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {/* 连接状态指示器 */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'} ${isListening ? 'animate-pulse' : ''}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? '已连接' : '未连接'}
                {isListening && ' (监听中)'}
              </span>
            </div>

            {/* 钱包信息 */}
            {isConnected && wallet && (
              <div className="flex items-center space-x-2">
                {wallet.icon && (
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-5 h-5 rounded"
                  />
                )}
                <span className="text-sm font-medium text-gray-900">
                  {wallet.name}
                </span>
              </div>
            )}

            {/* 链信息 */}
            {showChain && chainId && (
              <div className="text-sm text-gray-600">
                {getChainName(chainId)}
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center space-x-2">
            {isConnecting ? (
              <button
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed"
                disabled
              >
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  连接中...
                </div>
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isConnected
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isConnected ? '断开连接' : '连接钱包'}
              </button>
            )}

            {events.length > 0 && (
              <button
                onClick={clearEvents}
                className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                清空日志
              </button>
            )}

            {isConnected && (
              <button
                onClick={testTriggerEvent}
                className="px-3 py-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
              >
                测试事件
              </button>
            )}
          </div>
        </div>

        {/* 账户和余额信息 */}
        {isConnected && (
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
            <div className="text-sm">
              <span className="text-gray-600">地址:</span>
              <span className="ml-2 font-mono font-medium text-gray-900">
                {formatAddress(address)}
              </span>
            </div>
            {showBalance && (
              <div className="text-sm">
                <span className="text-gray-600">余额:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {parseFloat(balance).toFixed(4)} ETH
                </span>
              </div>
            )}
            {chainId && (
              <div className="text-sm">
                <span className="text-gray-600">链ID:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {chainId}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 事件日志区域 */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">
            EIP-1193 事件日志 ({events.length}/50)
          </h3>
          {isListening && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600">实时监听中</span>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 max-h-80 overflow-y-auto">
          {events.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              {isConnected
                ? '连接钱包后，这里将显示 EIP-1193 事件...'
                : '请先连接钱包以开始监听 EIP-1193 事件'
              }
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 ${getEventColor(event.type)} border-l-4`}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">{getEventIcon(event.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-wide">
                          {event.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{event.details}</p>
                      {event.data && (
                        <details className="mt-2">
                          <summary className="text-xs cursor-pointer text-gray-600 hover:text-gray-800">
                            查看详细数据
                          </summary>
                          <pre className="text-xs mt-1 p-2 bg-white bg-opacity-60 rounded border overflow-x-auto">
                            {JSON.stringify(event.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 使用说明 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-900 mb-1">📋 监听的事件类型</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li><strong>accountsChanged:</strong> 钱包账户变更时触发</li>
          <li><strong>chainChanged:</strong> 钱包切换链时触发</li>
          <li><strong>connect:</strong> 钱包连接时触发 (EIP-1193)</li>
          <li><strong>disconnect:</strong> 钱包断开连接时触发 (EIP-1193)</li>
        </ul>
      </div>
    </div>
  );
};

export default EIP1193EventDemo;