// 核心 SDK
export { WalletSDK } from './core/WalletSDK';
export { WalletManager } from './core/WalletManager';

// React 组件
export { WalletProvider, useWallet } from './components/WalletProvider';
export { default as ConnectButton } from './components/ConnectButton';
export { default as WalletModal } from './components/WalletModal';
export { default as AccountDropdown } from './components/AccountDropdown';
export { default as EnhancedConnectButton } from './components/EnhancedConnectButton';

// Hooks
export {
  useWallet as useWalletHook,
  useWalletState,
  useWalletActions,
  useBalance,
  useWalletList,
} from './hooks/useWallet';

// 类型定义
export type * from './types';

// 默认导出
export { WalletSDK as default } from './core/WalletSDK';

// 版本信息
export const version = '0.1.0';