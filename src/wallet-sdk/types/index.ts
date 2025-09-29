import { ethers } from 'ethers';
import { Address } from 'viem';

// 以太坊提供者接口
export interface EthereumProvider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on?(event: string, handler: (...args: unknown[]) => void): void;
  removeListener?(event: string, handler: (...args: unknown[]) => void): void;
  isConnected?(): boolean;
  enable?(): boolean;
  isMetaMask?: boolean;
  isOkxWallet?: boolean;
  isCoinbaseWallet?: boolean;
  isRabby?: boolean;
  isTrust?: boolean;
}

// 链信息类型
export interface ChainConfig {
  id: number;
  name: string;
  symbol?: string;
  rpcUrl?: string;
  blockExplorer?: string;
  icon?: string;
}

export interface ChainInfo {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  blockExplorers?: {
    default: {
      name: string;
      url: string;
    };
  };
}

// 钱包连接器返回类型
export interface WalletConnectResult {
  accounts: string[];
  chainId?: number;
  networkVersion?: string;
  provider?: EthereumProvider;
}

// 钱包签名器接口
export interface WalletSigner {
  provider?: EthereumProvider;
  getAddress: () => string;
  signMessage: (message: string) => Promise<string>;
  connect?: (provider: EthereumProvider) => WalletSigner;
  getNonce?: (blockTag?: string) => Promise<number>;
  signTransaction?: (transaction: any) => Promise<string>;
  sendTransaction?: (transaction: any) => Promise<unknown>;
}

// 钱包连接器接口
export interface WalletConnector {
  id: string;
  name: string;
  icon?: string;
  provider: EthereumProvider;
  connect: () => Promise<WalletConnectResult>;
  disconnect?: () => Promise<void>;
  createConnector?: () => WalletConnector;
}

// 基础钱包信息
export interface WalletInfo {
  id: string;
  name: string;
  rdns?: string;
  icon?: string;
  installed: boolean | undefined;
  type?: 'eip6963' | 'legacy' | 'walletconnect';
  description?: string;
}

// 扩展钱包接口
export interface ExtendedWalletInfo extends WalletInfo {
  iconUrl?: string | (() => Promise<string>);
  iconBackground?: string;
  platforms?: string[];
  downloadUrl?: string;
  iconUrlResolved?: string;
  iconLoaded?: boolean;
  createConnector?: () => WalletConnector;
  detectionType?: 'eip6963' | 'legacy' | 'walletconnect';
  provider?: EthereumProvider;
}

// 检测到的钱包
export interface DetectedWallet {
  id: string;
  name: string;
  icon: string;
  rdns: string;
  provider: EthereumProvider;
  installed: boolean;
  type?: 'eip6963' | 'legacy' | 'walletconnect' | undefined;
  createConnector?: () => WalletConnector;
}

// 钱包连接结果
export interface ConnectionResult {
  success: boolean;
  address?: Address;
  chainId?: number;
  wallet?: WalletInfo;
  provider?: EthereumProvider;
  signer?: WalletSigner;
  error?: string;
}

// 钱包连接结果（来自 my-app）
export interface WalletConnectionResult {
  success: boolean;
  address?: Address;
  chainId?: number;
  wallet?: WalletInfo;
  provider?: EthereumProvider;
  signer?: WalletSigner;
  error?: string;
}

// 代币余额
export interface TokenBalance {
  balance: string;
  decimals: number;
  symbol: string;
  loading?: boolean;
  error?: string | null;
}

// 钱包状态
export interface WalletState {
  address: Address;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  isDisconnected: boolean;
  isReconnecting: boolean;
  ensName: string | null;
  error: Error | null;
  chains: ChainInfo[];
  provider?: EthereumProvider;
  balance: string;
  wallet?: {
    id: string;
    name: string;
    icon?: string;
    installed: boolean | undefined;
  };
  signer?: WalletSigner | ethers.Signer;
}

// Context类型
export interface WalletContextValue extends WalletState {
  connect: (walletId: string) => Promise<ConnectionResult>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  walletInstances?: { [groupName: string]: ExtendedWalletInfo[] };
  detectedWallets?: DetectedWallet[];
  walletsLoading?: boolean;
  fetchBalance: () => Promise<void>;
  balanceLoading: boolean;
  getTokenBalance: (tokenAddress: Address) => Promise<TokenBalance>;
}

// Hook返回类型
export interface UseWalletReturn extends WalletContextValue {
  isReady: boolean;
}

// 钱包创建函数类型
export interface WalletCreateConfig {
  projectId: string;
  appName: string;
}

export type WalletCreateFunction = (config: WalletCreateConfig) => ExtendedWalletInfo;

// 钱包组配置
export interface WalletGroup {
  groupName: string;
  wallets: WalletCreateFunction[];
}

// SDK配置类型
export interface WalletSDKConfig {
  appName: string;
  appIcon?: string;
  appUrl?: string;
  projectId?: string;
  chains?: ChainInfo[];
  autoConnect?: boolean;
  storage?: Storage;
  theme?: 'light' | 'dark' | 'auto';
  wallets?: WalletGroup[];
  provider?: EthereumProvider;
}

// Provider属性
export interface WalletProviderProps {
  children: React.ReactNode;
  config: WalletSDKConfig;
  chains?: ChainInfo[];
  provider?: EthereumProvider;
  autoConnect?: boolean;
  wallets?: WalletGroup[];
}

// 事件类型
export type WalletEvent =
  | 'connect'
  | 'disconnect'
  | 'chainChanged'
  | 'accountChanged'
  | 'error';

export type EventHandler = (data?: any) => void;

// 组件Props类型
export interface ConnectButtonProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  showBalance?: boolean;
  showChain?: boolean;
  onConnect?: (result: ConnectionResult) => void;
  onDisconnect?: () => void;
}

export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => Promise<ConnectionResult>;
  title?: string;
  description?: string;
  theme?: 'light' | 'dark';
  walletInstances?: { [groupName: string]: ExtendedWalletInfo[] };
  detectedWallets?: DetectedWallet[];
  walletsLoading?: boolean;
}

// 类型守卫函数
export const isEthersSigner = (signer: unknown): signer is ethers.Signer => {
  return (
    typeof signer === 'object' &&
    signer !== null &&
    'connect' in signer &&
    'getAddress' in signer &&
    'signMessage' in signer &&
    'signTransaction' in signer &&
    'sendTransaction' in signer
  );
};

export const isWalletSigner = (signer: unknown): signer is WalletSigner => {
  return (
    typeof signer === 'object' &&
    signer !== null &&
    'getAddress' in signer &&
    'signMessage' in signer
  );
};