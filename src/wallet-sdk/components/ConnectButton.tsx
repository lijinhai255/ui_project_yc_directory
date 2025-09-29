"use client";

import React from 'react';
import { useWallet } from './WalletProvider';
import { ConnectButtonProps } from '../types';

const ConnectButton: React.FC<ConnectButtonProps> = ({
  label,
  size = 'md',
  variant = 'primary',
  className = '',
  showBalance = false,
  showChain = false,
  onConnect,
  onDisconnect,
}) => {
  const {
    isConnected,
    isConnecting,
    address,
    balance,
    chainId,
    wallet,
    connect,
    disconnect,
    openModal,
    closeModal,
    walletInstances,
    detectedWallets,
  } = useWallet();

  const getButtonClasses = () => {
    const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300',
      outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    };

    const sizeClasses = {
      sm: 'py-1 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };

  const handleConnect = async () => {
    try {
      console.log('🔍 ConnectButton - 开始连接，详细调试信息:');
      console.log('📋 walletInstances:', walletInstances);
      console.log('📋 detectedWallets:', detectedWallets);

      // 使用已经去重的钱包实例（WalletProvider已处理去重）
      const allWallets: any[] = [];

      // 只使用钱包实例中的钱包（已去重）
      if (walletInstances) {
        console.log('🔄 处理钱包实例组:');
        Object.entries(walletInstances).forEach(([groupName, walletGroup]) => {
          console.log(`  🏷️ 组名: ${groupName}, 钱包数量: ${walletGroup.length}`);
          walletGroup.forEach(wallet => {
            console.log(`    🪪 钱包: ${wallet.name} (${wallet.id}) - 已安装: ${wallet.installed}`);
          });
          allWallets.push(...walletGroup);
        });
      }

      console.log('📦 合并后的所有钱包数量:', allWallets.length);
      console.log('📦 合并后的所有钱包:', allWallets.map(w => ({name: w.name, id: w.id, installed: w.installed})));

      if (allWallets.length === 0) {
        console.warn('没有找到可用的钱包，请安装钱包扩展程序');
        return;
      }

      // 获取已安装的钱包
      const installedWallets = allWallets.filter(wallet => wallet.installed);

      if (installedWallets.length === 0) {
        console.warn('没有已安装的钱包，请先安装钱包扩展程序');
        return;
      }

      // 如果只有一个已安装的钱包，直接连接
      if (installedWallets.length === 1) {
        console.log('🚀 开始连接钱包:', installedWallets[0].name);
        const result = await connect(installedWallets[0].id);
        if (onConnect) {
          onConnect(result);
        }

        // 连接成功后关闭弹窗（如果打开的话）
        if (result.success) {
          closeModal();
        }
      } else {
        // 多个已安装的钱包，打开选择弹窗
        console.log('📱 打开钱包选择弹窗，可用的钱包:', installedWallets.map(w => w.name));
        openModal();
      }
    } catch (error) {
      console.error('❌ 连接钱包失败:', error);

      // 错误处理：如果是用户拒绝，提供更友好的提示
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('user rejected') ||
          errorMessage.includes('user denied') ||
          errorMessage.includes('user cancelled') ||
          errorMessage.includes('拒绝') ||
          errorMessage.includes('取消')
        ) {
          console.log('ℹ️ 用户拒绝了钱包授权请求');
        }
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('🔌 开始断开钱包连接');
      await disconnect();
      console.log('✅ 钱包已断开连接');

      if (onDisconnect) {
        onDisconnect();
      }
    } catch (error) {
      console.error('❌ 断开连接失败:', error);
    }
  };

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

  if (isConnecting) {
    return (
      <button className={getButtonClasses()} disabled>
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          连接中...
        </div>
      </button>
    );
  }

  if (!isConnected) {
    return (
      <button onClick={handleConnect} className={getButtonClasses()}>
        {label || '连接钱包'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {showChain && chainId && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {getChainName(chainId)}
        </div>
      )}

      <button onClick={handleDisconnect} className={getButtonClasses()}>
        <div className="flex items-center">
          {wallet?.icon && (
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="w-4 h-4 mr-2 rounded"
            />
          )}
          {formatAddress(address)}
        </div>
      </button>

      {showBalance && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {parseFloat(balance).toFixed(4)} ETH
        </div>
      )}
    </div>
  );
};

export default ConnectButton;