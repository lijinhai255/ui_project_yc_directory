import { useWallet } from '../components/WalletProvider';
import { UseWalletReturn } from '../types';

/**
 * 主要的钱包 Hook，提供完整的钱包功能
 * @returns {UseWalletReturn} 钱包状态和方法
 */
export const useWallet = (): UseWalletReturn => {
  const walletContext = useWallet();

  return {
    ...walletContext,
    isReady: true, // 可以在这里添加更多的就绪检查逻辑
  };
};

/**
 * 简化的钱包状态 Hook，只提供状态信息
 * @returns 钱包连接状态
 */
export const useWalletState = () => {
  const { isConnected, isConnecting, address, chainId, balance, error, wallet } = useWallet();

  return {
    isConnected,
    isConnecting,
    address,
    chainId,
    balance,
    error,
    wallet,
  };
};

/**
 * 钱包操作 Hook，只提供操作方法
 * @returns 钱包操作方法
 */
export const useWalletActions = () => {
  const { connect, disconnect, switchChain, openModal, closeModal } = useWallet();

  return {
    connect,
    disconnect,
    switchChain,
    openModal,
    closeModal,
  };
};

/**
 * 余额查询 Hook
 * @returns 余额相关功能
 */
export const useBalance = () => {
  const { getBalance, getTokenBalance, balance } = useWallet();

  return {
    balance,
    getBalance,
    getTokenBalance,
  };
};

/**
 * 钱包列表 Hook
 * @returns 可用钱包列表
 */
export const useWalletList = () => {
  const { getAvailableWallets } = useWallet();

  return {
    wallets: getAvailableWallets(),
    getAvailableWallets,
  };
};