"use client";

import React from 'react';
import { useWallet } from './WalletProvider';
import AccountDropdown from './AccountDropdown';

interface EnhancedConnectButtonProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  showBalance?: boolean;
  showChainSwitcher?: boolean;
  onConnect?: (result: { success: boolean; error?: string }) => void;
  onDisconnect?: () => void;
}

const EnhancedConnectButton: React.FC<EnhancedConnectButtonProps> = ({
  label = '连接钱包',
  size = 'md',
  variant = 'primary',
  className = '',
  showBalance = false,
  showChainSwitcher = true,
  onConnect,
  onDisconnect,
}) => {
  const walletContext = useWallet();

  console.log("🔍 EnhancedConnectButton - Wallet Context:", {
    isConnected: walletContext.isConnected,
    isConnecting: walletContext.isConnecting,
    address: walletContext.address,
    hasOpenModal: typeof walletContext.openModal === 'function',
    hasWalletInstances: !!walletContext.walletInstances,
    error: walletContext.error
  });

  const {
    isConnected,
    isConnecting,
    address,
    error,
    openModal,
  } = walletContext;

  // 尺寸样式
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // 变体样式
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-900 border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
  };

  // 基础样式
  const baseClasses = `
    inline-flex items-center justify-center rounded-lg border font-medium
    transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  // 处理连接
  const handleConnect = async () => {
    console.log("🔍 EnhancedConnectButton - handleConnect 被调用", {
      isConnected,
      isConnecting
    });

    // 如果已经连接，直接断开连接
    if (isConnected) {
      console.log("🔍 EnhancedConnectButton - 钱包已连接，执行断开操作");
      if (onDisconnect) {
        onDisconnect();
      }
      return;
    }

    if (!openModal) {
      console.error("❌ openModal 函数不存在，可能没有在 WalletProvider 中使用");
      if (onConnect) {
        onConnect({
          success: false,
          error: '钱包上下文未正确初始化，请确保组件被 WalletProvider 包裹'
        });
      }
      return;
    }

    try {
      console.log("🔍 EnhancedConnectButton - 调用 openModal()");
      openModal();

      console.log("🔍 EnhancedConnectButton - openModal 调用成功");

      // 不要在这里调用 onConnect，应该在真正连接成功后才调用
      // if (onConnect) {
      //   onConnect({ success: true });
      // }
    } catch (error) {
      console.error('❌ 连接失败:', error);
      if (onConnect) {
        onConnect({
          success: false,
          error: error instanceof Error ? error.message : '连接失败'
        });
      }
    }
  };

  // 如果已连接，显示账户下拉菜单
  if (isConnected && address) {
    return (
      <AccountDropdown
        className={className}
        showBalance={showBalance}
        showChainSwitcher={showChainSwitcher}
        size={size}
        onDisconnect={onDisconnect}
      />
    );
  }

  // 未连接时显示连接按钮
  return (
    <div className="relative">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={buttonClasses}
      >
        {isConnecting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            连接中...
          </>
        ) : (
          label
        )}
      </button>

      {error && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 whitespace-nowrap">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default EnhancedConnectButton;