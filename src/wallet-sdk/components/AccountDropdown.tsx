"use client";

import React, { useState } from 'react';
import { useWallet } from './WalletProvider';

interface AccountDropdownProps {
  className?: string;
  showBalance?: boolean;
  showChainSwitcher?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onDisconnect?: () => void;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({
  className = '',
  showBalance = false,
  showChainSwitcher = true,
  size = 'md',
  onDisconnect,
}) => {
  const {
    address,
    balance,
    chainId,
    isConnected,
    disconnect,
    switchChain,
    fetchBalance,
    balanceLoading,
  } = useWallet();

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [switchingChain, setSwitchingChain] = useState<number | null>(null);

  // 如果未连接，不显示组件
  if (!isConnected || !address) {
    return null;
  }

  // 尺寸样式
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  // 格式化地址
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // 格式化余额
  const formatBalance = (bal: string) => {
    const num = parseFloat(bal);
    return num.toFixed(4);
  };

  // 获取链名称
  const getChainName = (id: number | null) => {
    const chainNames: Record<number, string> = {
      31337: 'Localhost',
      1: 'Ethereum',
      11155111: 'Sepolia',
      137: 'Polygon',
      56: 'BSC',
      42161: 'Arbitrum',
      10: 'Optimism',
    };
    return id ? chainNames[id] || `Chain ${id}` : 'Unknown';
  };

  // 获取链图标
  const getChainIcon = (id: number | null) => {
    const chainColors: Record<number, string> = {
      31337: 'bg-orange-500',
      1: 'bg-blue-500',
      11155111: 'bg-purple-500',
      137: 'bg-purple-600',
      56: 'bg-yellow-500',
      42161: 'bg-blue-600',
      10: 'bg-red-500',
    };
    return id ? chainColors[id] || 'bg-gray-500' : 'bg-gray-500';
  };

  // 复制地址
  const copyAddress = async () => {
    if (address && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('复制地址失败:', error);
      }
    }
  };

  // 处理断开连接
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsOpen(false);
      if (onDisconnect) {
        onDisconnect();
      }
    } catch (error) {
      console.error('断开连接失败:', error);
    }
  };

  // 处理切换链
  const handleSwitchChain = async (newChainId: number) => {
    if (newChainId === chainId) return;

    try {
      setSwitchingChain(newChainId);
      await switchChain(newChainId);
      setIsOpen(false);
    } catch (error) {
      console.error('切换链失败:', error);
    } finally {
      setSwitchingChain(null);
    }
  };

  // 支持的链列表
  const supportedChains = [
    { id: 31337, name: 'Localhost (Hardhat)', shortName: 'Local' },
    { id: 1, name: 'Ethereum', shortName: 'ETH' },
    { id: 11155111, name: 'Sepolia Testnet', shortName: 'Sepolia' },
    { id: 137, name: 'Polygon', shortName: 'MATIC' },
    { id: 56, name: 'BNB Smart Chain', shortName: 'BSC' },
    { id: 42161, name: 'Arbitrum One', shortName: 'ARB' },
    { id: 10, name: 'Optimism', shortName: 'OP' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex items-center justify-center rounded-lg border border-gray-300
          bg-white hover:bg-gray-50 text-gray-900 font-medium
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${sizeClasses[size]} ${className}
        `}
      >
        <div className="flex items-center space-x-2">
          {/* 连接状态指示器 */}
          <div className={`w-2 h-2 rounded-full ${getChainIcon(chainId)}`}></div>

          {/* 地址 */}
          <span className="font-mono">{formatAddress(address)}</span>

          {/* 余额 */}
          {showBalance && balance && (
            <span className="text-sm text-gray-900 font-medium">{formatBalance(balance)} ETH</span>
          )}

          {/* 下拉箭头 */}
          <svg
            className={`w-4 h-4 transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* 账户信息头部 */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-3 h-3 rounded-full ${getChainIcon(chainId)}`}></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">已连接</div>
                <div className="text-sm text-gray-600">{getChainName(chainId)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600 font-mono break-all">
                {address}
              </div>

              {showBalance && balance && (
                <div className="text-sm text-gray-600">
                  余额: {formatBalance(balance)} ETH
                </div>
              )}
            </div>
          </div>

          <div className="p-2">
            {/* 复制地址 */}
            <button
              onClick={copyAddress}
              className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md flex items-center space-x-3"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copied ? '已复制!' : '复制地址'}</span>
              {copied && (
                <svg className="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* 刷新余额 */}
            <button
              onClick={() => {
                fetchBalance();
              }}
              disabled={balanceLoading}
              className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md flex items-center space-x-3"
            >
              <svg className={`w-4 h-4 text-gray-400 ${balanceLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{balanceLoading ? '刷新中...' : '刷新余额'}</span>
            </button>

            {/* 在浏览器中查看 */}
            <button
              onClick={() => {
                const explorerUrls: Record<number, string> = {
                  31337: 'http://127.0.0.1:8545',
                  1: 'https://etherscan.io',
                  11155111: 'https://sepolia.etherscan.io',
                  137: 'https://polygonscan.com',
                  56: 'https://bscscan.com',
                  42161: 'https://arbiscan.io',
                  10: 'https://optimistic.etherscan.io',
                };
                const explorerUrl = chainId ? explorerUrls[chainId] : null;
                if (explorerUrl) {
                  // 对于本地网络，提示用户无法在浏览器中查看
                  if (chainId === 31337) {
                    alert('本地网络不支持浏览器查看，请使用开发工具进行调试');
                  } else {
                    window.open(`${explorerUrl}/address/${address}`, '_blank');
                  }
                }
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md flex items-center space-x-3"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>在浏览器中查看</span>
            </button>

            {/* 切换网络 */}
            {showChainSwitcher && (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <div className="px-3 py-1 text-xs text-gray-500 font-medium">切换网络</div>

                <div className="max-h-48 overflow-y-auto">
                  {supportedChains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => handleSwitchChain(chain.id)}
                      disabled={switchingChain === chain.id}
                      className={`
                        w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md
                        flex items-center justify-between transition-colors
                        ${chainId === chain.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}
                        ${switchingChain === chain.id ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getChainIcon(chain.id)}`}></div>
                        <div>
                          <div className="font-medium">{chain.shortName}</div>
                          <div className="text-xs text-gray-500">{chain.name}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {switchingChain === chain.id && (
                          <svg className="animate-spin w-4 h-4 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}

                        {chainId === chain.id && switchingChain !== chain.id && (
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* 断开连接 */}
            <div className="border-t border-gray-100 my-2"></div>
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>断开连接</span>
            </button>
          </div>
        </div>
      )}

      {/* 点击外部关闭下拉菜单 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AccountDropdown;