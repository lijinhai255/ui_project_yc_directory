import { ethers } from 'ethers';
import { Address } from 'viem';
export interface EthereumProvider {
    request(args: {
        method: string;
        params?: unknown[];
    }): Promise<unknown>;
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
export interface WalletConnectResult {
    accounts: string[];
    chainId?: number;
    networkVersion?: string;
    provider?: EthereumProvider;
}
export interface WalletSigner {
    provider?: EthereumProvider;
    getAddress: () => string;
    signMessage: (message: string) => Promise<string>;
    connect?: (provider: EthereumProvider) => WalletSigner;
    getNonce?: (blockTag?: string) => Promise<number>;
    signTransaction?: (transaction: any) => Promise<string>;
    sendTransaction?: (transaction: any) => Promise<unknown>;
}
export interface WalletConnector {
    id: string;
    name: string;
    icon?: string;
    provider: EthereumProvider;
    connect: () => Promise<WalletConnectResult>;
    disconnect?: () => Promise<void>;
    createConnector?: () => WalletConnector;
}
export interface WalletInfo {
    id: string;
    name: string;
    rdns?: string;
    icon?: string;
    installed: boolean | undefined;
    type?: 'eip6963' | 'legacy' | 'walletconnect';
    description?: string;
}
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
export interface ConnectionResult {
    success: boolean;
    address?: Address;
    chainId?: number;
    wallet?: WalletInfo;
    provider?: EthereumProvider;
    signer?: WalletSigner;
    error?: string;
}
export interface WalletConnectionResult {
    success: boolean;
    address?: Address;
    chainId?: number;
    wallet?: WalletInfo;
    provider?: EthereumProvider;
    signer?: WalletSigner;
    error?: string;
}
export interface TokenBalance {
    balance: string;
    decimals: number;
    symbol: string;
    loading?: boolean;
    error?: string | null;
}
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
export interface WalletContextValue extends WalletState {
    connect: (walletId: string) => Promise<ConnectionResult>;
    disconnect: () => Promise<void>;
    switchChain: (chainId: number) => Promise<void>;
    openModal: () => void;
    closeModal: () => void;
    walletInstances?: {
        [groupName: string]: ExtendedWalletInfo[];
    };
    detectedWallets?: DetectedWallet[];
    walletsLoading?: boolean;
    fetchBalance: () => Promise<void>;
    balanceLoading: boolean;
    getTokenBalance: (tokenAddress: Address) => Promise<TokenBalance>;
}
export interface UseWalletReturn extends WalletContextValue {
    isReady: boolean;
}
export interface WalletCreateConfig {
    projectId: string;
    appName: string;
}
export type WalletCreateFunction = (config: WalletCreateConfig) => ExtendedWalletInfo;
export interface WalletGroup {
    groupName: string;
    wallets: WalletCreateFunction[];
}
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
export interface WalletProviderProps {
    children: React.ReactNode;
    config: WalletSDKConfig;
    chains?: ChainInfo[];
    provider?: EthereumProvider;
    autoConnect?: boolean;
    wallets?: WalletGroup[];
}
export type WalletEvent = 'connect' | 'disconnect' | 'chainChanged' | 'accountChanged' | 'error';
export type EventHandler = (data?: any) => void;
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
    walletInstances?: {
        [groupName: string]: ExtendedWalletInfo[];
    };
    detectedWallets?: DetectedWallet[];
    walletsLoading?: boolean;
}
export declare const isEthersSigner: (signer: unknown) => signer is ethers.Signer;
export declare const isWalletSigner: (signer: unknown) => signer is WalletSigner;
//# sourceMappingURL=index.d.ts.map