import React$1 from 'react';
import { ethers } from 'ethers';
import { Address } from 'viem';

interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * 按钮变体
     */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    /**
     * 按钮大小
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 是否为全宽按钮
     */
    fullWidth?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 加载状态
     */
    loading?: boolean;
}
declare const Button: React$1.FC<ButtonProps>;

interface CardProps {
    /**
     * 卡片标题
     */
    title?: string;
    /**
     * 卡片内容
     */
    children: React$1.ReactNode;
    /**
     * 卡片底部内容
     */
    footer?: React$1.ReactNode;
    /**
     * 是否有阴影
     */
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    /**
     * 自定义类名
     */
    className?: string;
}
declare const Card: React$1.FC<CardProps>;

interface InputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix"> {
    /**
     * 输入框标签
     */
    label?: string;
    /**
     * 帮助文本
     */
    helpText?: string;
    /**
     * 错误信息
     */
    error?: string;
    /**
     * 输入框大小
     */
    size?: "sm" | "md" | "lg";
    /**
     * 前缀图标或元素
     */
    prefix?: React$1.ReactNode;
    /**
     * 后缀图标或元素
     */
    suffix?: React$1.ReactNode;
    /**
     * 是否为全宽
     */
    fullWidth?: boolean;
}
declare const Input: React$1.FC<InputProps>;

interface BadgeProps {
    /**
     * 徽章内容
     */
    children: React$1.ReactNode;
    /**
     * 徽章变体
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    /**
     * 徽章大小
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 是否为圆形徽章
     */
    rounded?: boolean;
    /**
     * 自定义类名
     */
    className?: string;
}
declare const Badge: React$1.FC<BadgeProps>;

interface EthereumProvider {
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
interface ChainConfig {
    id: number;
    name: string;
    symbol?: string;
    rpcUrl?: string;
    blockExplorer?: string;
    icon?: string;
}
interface ChainInfo {
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
interface WalletConnectResult {
    accounts: string[];
    chainId?: number;
    networkVersion?: string;
    provider?: EthereumProvider;
}
interface WalletSigner {
    provider?: EthereumProvider;
    getAddress: () => string;
    signMessage: (message: string) => Promise<string>;
    connect?: (provider: EthereumProvider) => WalletSigner;
    getNonce?: (blockTag?: string) => Promise<number>;
    signTransaction?: (transaction: any) => Promise<string>;
    sendTransaction?: (transaction: any) => Promise<unknown>;
}
interface WalletConnector {
    id: string;
    name: string;
    icon?: string;
    provider: EthereumProvider;
    connect: () => Promise<WalletConnectResult>;
    disconnect?: () => Promise<void>;
    createConnector?: () => WalletConnector;
}
interface WalletInfo {
    id: string;
    name: string;
    rdns?: string;
    icon?: string;
    installed: boolean | undefined;
    type?: 'eip6963' | 'legacy' | 'walletconnect';
    description?: string;
}
interface ExtendedWalletInfo extends WalletInfo {
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
interface DetectedWallet {
    id: string;
    name: string;
    icon: string;
    rdns: string;
    provider: EthereumProvider;
    installed: boolean;
    type?: 'eip6963' | 'legacy' | 'walletconnect' | undefined;
    createConnector?: () => WalletConnector;
}
interface ConnectionResult {
    success: boolean;
    address?: Address;
    chainId?: number;
    wallet?: WalletInfo;
    provider?: EthereumProvider;
    signer?: WalletSigner;
    error?: string;
}
interface WalletConnectionResult {
    success: boolean;
    address?: Address;
    chainId?: number;
    wallet?: WalletInfo;
    provider?: EthereumProvider;
    signer?: WalletSigner;
    error?: string;
}
interface TokenBalance {
    balance: string;
    decimals: number;
    symbol: string;
    loading?: boolean;
    error?: string | null;
}
interface WalletState {
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
interface WalletContextValue extends WalletState {
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
interface UseWalletReturn extends WalletContextValue {
    isReady: boolean;
}
interface WalletCreateConfig {
    projectId: string;
    appName: string;
}
type WalletCreateFunction = (config: WalletCreateConfig) => ExtendedWalletInfo;
interface WalletGroup {
    groupName: string;
    wallets: WalletCreateFunction[];
}
interface WalletSDKConfig {
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
interface WalletProviderProps {
    children: React.ReactNode;
    config: WalletSDKConfig;
    chains?: ChainInfo[];
    provider?: EthereumProvider;
    autoConnect?: boolean;
    wallets?: WalletGroup[];
}
type WalletEvent = 'connect' | 'disconnect' | 'chainChanged' | 'accountChanged' | 'error';
type EventHandler = (data?: any) => void;
interface ConnectButtonProps {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    showBalance?: boolean;
    showChain?: boolean;
    onConnect?: (result: ConnectionResult) => void;
    onDisconnect?: () => void;
}
interface WalletModalProps {
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
declare const isEthersSigner: (signer: unknown) => signer is ethers.Signer;
declare const isWalletSigner: (signer: unknown) => signer is WalletSigner;

declare global {
    interface Window {
        okxwallet?: EthereumProvider;
        rabby?: EthereumProvider;
        trustWallet?: EthereumProvider;
    }
}
declare class WalletManager {
    private wallets;
    private initialized;
    constructor();
    initialize(): DetectedWallet[];
    isInitialized(): boolean;
    connectWallet(walletId: string): Promise<WalletConnectionResult>;
    disconnectWallet(walletId: string): Promise<void>;
    disconnectAll(): Promise<void>;
    private getChainIdSafe;
    private detectWallets;
    private detectEIP6963Wallets;
    private detectLegacyWallets;
    private getEthereumProvider;
    private getCoinbaseWalletExtension;
    private addWallet;
    private addLegacyWallet;
    private createStandardConnector;
    private getChainIdAsNumber;
    private normalizeWalletId;
    private getDefaultIcon;
    getWallets(): DetectedWallet[];
    getWalletById(id: string): DetectedWallet | null;
    isWalletInstalled(id: string): boolean;
    getAvailableWallets(): ExtendedWalletInfo[];
    getExtendedWalletById(id: string): ExtendedWalletInfo | null;
    private eventHandlers;
    on(event: string, handler: (data?: any) => void): void;
    off(event: string, handler: (data?: any) => void): void;
    private emit;
}

declare const WalletProvider: React$1.FC<WalletProviderProps>;
declare const useWallet: () => WalletContextValue;

declare const ConnectButton: React$1.FC<ConnectButtonProps>;

declare const WalletModal: React$1.FC<WalletModalProps>;

interface AccountDropdownProps {
    className?: string;
    showBalance?: boolean;
    showChainSwitcher?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onDisconnect?: () => void;
}
declare const AccountDropdown: React$1.FC<AccountDropdownProps>;

interface EnhancedConnectButtonProps {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    showBalance?: boolean;
    showChainSwitcher?: boolean;
    onConnect?: (result: {
        success: boolean;
        error?: string;
    }) => void;
    onDisconnect?: () => void;
}
declare const EnhancedConnectButton: React$1.FC<EnhancedConnectButtonProps>;

declare const version = "0.1.0";

export { AccountDropdown, Badge, type BadgeProps, Button, type ButtonProps, Card, type CardProps, type ChainConfig, type ChainInfo, ConnectButton, type ConnectButtonProps, type ConnectionResult, type DetectedWallet, EnhancedConnectButton, type EthereumProvider, type EventHandler, type ExtendedWalletInfo, Input, type InputProps, type TokenBalance, type UseWalletReturn, type WalletConnectResult, type WalletConnectionResult, type WalletConnector, type WalletContextValue, type WalletCreateConfig, type WalletCreateFunction, type WalletEvent, type WalletGroup, type WalletInfo, WalletManager, WalletModal, type WalletModalProps, WalletProvider, type WalletProviderProps, type WalletSDKConfig, type WalletSigner, type WalletState, isEthersSigner, isWalletSigner, useWallet, version };
