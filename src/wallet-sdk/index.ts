// 核心管理器
export { WalletManager } from './core/WalletManager';

// React 组件
export { WalletProvider, useWallet } from './components/WalletProvider';
export { default as ConnectButton } from './components/ConnectButton';
export { default as WalletModal } from './components/WalletModal';
export { default as AccountDropdown } from './components/AccountDropdown';
export { default as EnhancedConnectButton } from './components/EnhancedConnectButton';

// 类型定义
export type * from './types';

// 版本信息
export const version = '0.1.0';