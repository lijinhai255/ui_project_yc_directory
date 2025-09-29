"use client";

import React, { useState } from 'react';
import { WalletModalProps, ExtendedWalletInfo, DetectedWallet } from '../types';

const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  title = '连接钱包',
  description = '请选择要连接的钱包',
  theme = 'light',
  walletInstances = {},
  detectedWallets = [],
  walletsLoading = false,
}) => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [isGridLayout, setIsGridLayout] = useState(true);

  // 合并所有可用的钱包（WalletProvider已经处理了去重）
  const allWallets: ExtendedWalletInfo[] = [];

  console.log('🔍 WalletModal - 开始处理钱包，详细调试信息:');
  console.log('📋 walletInstances:', walletInstances);
  console.log('📋 detectedWallets:', detectedWallets);

  // 添加配置的钱包实例（这些已经经过去重处理）
  Object.entries(walletInstances).forEach(([groupName, walletGroup]) => {
    console.log(`  🏷️ 组名: ${groupName}, 钱包数量: ${walletGroup.length}`);
    walletGroup.forEach(wallet => {
      console.log(`    🪪 钱包: ${wallet.name} (${wallet.id}) - 已安装: ${wallet.installed}`);
    });
    allWallets.push(...walletGroup);
  });

  console.log('📦 WalletModal 合并后的所有钱包数量:', allWallets.length);
  console.log('📦 WalletModal 合并后的所有钱包:', allWallets.map(w => ({name: w.name, id: w.id, installed: w.installed})));

  // 只显示已安装的钱包
  const installedWallets = allWallets.filter(wallet => wallet.installed);
  console.log('📦 WalletModal 已安装钱包数量:', installedWallets.length);
  console.log('📦 WalletModal 已安装钱包:', installedWallets.map(w => ({name: w.name, id: w.id, installed: w.installed})));

  const handleWalletSelect = async (walletId: string) => {
    console.log('🚀 用户选择钱包:', walletId);
    console.log('🔍 WalletModal - 开始连接钱包，详细信息:');
    console.log('  🪪 钱包ID:', walletId);

    // 查找选中的钱包信息
    const selectedWallet = installedWallets.find(wallet => wallet.id === walletId);
    console.log('  🔎 找到的钱包信息:', selectedWallet);

    if (!selectedWallet) {
      console.error('❌ 未找到选中的钱包:', walletId);
      return;
    }

    setConnectingWallet(walletId);

    try {
      console.log('  🔌 调用 onConnect，参数:', walletId);
      const result = await onConnect(walletId);
      console.log('  ✅ onConnect 返回结果:', result);

      // 连接成功或失败后都关闭弹窗
      if (result.success) {
        console.log('✅ 钱包连接成功，关闭弹窗');
      } else {
        console.log('❌ 钱包连接失败:', result.error);
      }

      // 无论成功与否都关闭弹窗
      onClose();
    } catch (error) {
      console.error('❌ 连接钱包过程中发生错误:', error);
      console.error('  📋 错误详情:', {
        message: error instanceof Error ? error.message : '未知错误',
        stack: error instanceof Error ? error.stack : undefined,
        walletId,
        selectedWallet: selectedWallet.name
      });
      // 发生错误时也关闭弹窗
      onClose();
    } finally {
      setConnectingWallet(null);
    }
  };

  if (!isOpen) return null;

  const themeClasses = {
    light: {
      background: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-900',
      secondaryText: 'text-gray-600',
      hover: 'hover:bg-gray-50',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    },
    dark: {
      background: 'bg-gray-800',
      border: 'border-gray-700',
      text: 'text-gray-100',
      secondaryText: 'text-gray-400',
      hover: 'hover:bg-gray-700',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      cancelButton: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
    },
  };

  const classes = themeClasses[theme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`w-full max-w-2xl mx-4 rounded-lg border ${classes.background} ${classes.border}`}>
        {/* 头部 */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-semibold ${classes.text}`}>{title}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsGridLayout(true)}
                className={`p-2 rounded ${isGridLayout ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="网格视图"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setIsGridLayout(false)}
                className={`p-2 rounded ${!isGridLayout ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="列表视图"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <p className={`${classes.secondaryText}`}>{description}</p>
        </div>

        {/* 钱包列表 */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {walletsLoading ? (
            <div className={`text-center ${classes.secondaryText}`}>
              <svg className="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              检测钱包中...
            </div>
          ) : installedWallets.length === 0 ? (
            <div className={`text-center ${classes.secondaryText}`}>
              没有找到已安装的钱包，请安装钱包扩展程序
            </div>
          ) : (
            <div className={isGridLayout ? 'grid grid-cols-2 gap-4' : 'space-y-3'}>
              {installedWallets.map((wallet) => {
                const iconSrc = typeof wallet.iconUrl === 'string'
                  ? wallet.iconUrl
                  : wallet.icon;
                return (
                  <button
                    key={wallet.id}
                    onClick={() => handleWalletSelect(wallet.id)}
                    disabled={connectingWallet === wallet.id}
                    className={`
                      w-full p-5 rounded-lg border transition-all duration-200
                      ${classes.border} ${classes.hover}
                      ${connectingWallet === wallet.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      flex flex-col items-center justify-center text-center min-h-[130px]
                      hover:shadow-md
                    `}
                  >
                    {iconSrc && (
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <img
                          src={iconSrc}
                          alt={wallet.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className={`font-medium text-base ${classes.text} mb-1`}>{wallet.name}</div>
                    {wallet.installed && (
                      <div className={`text-sm ${classes.secondaryText}`}>
                        已安装
                      </div>
                    )}
                    {connectingWallet === wallet.id && (
                      <div className="mt-3">
                        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${classes.cancelButton}`}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;