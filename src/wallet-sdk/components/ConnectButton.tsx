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
      console.log("🔍 ConnectButton - 开始连接钱包", {
        isConnected,
        isConnecting,
        walletInstances,
        detectedWallets
      });

      // 如果已经连接，直接断开连接
      if (isConnected) {
        console.log("🔍 ConnectButton - 钱包已连接，执行断开操作");
        await handleDisconnect();
        return;
      }

      // 强制打开弹窗，让用户选择钱包
      console.log("🔍 ConnectButton - 打开钱包弹窗");
      openModal();

      console.log("🔍 ConnectButton - 已打开钱包弹窗");
    } catch (error) {
      console.error('❌ 连接钱包失败:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();

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