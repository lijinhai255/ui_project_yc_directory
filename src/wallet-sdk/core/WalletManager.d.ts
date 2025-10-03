import { DetectedWallet, EthereumProvider, ExtendedWalletInfo, WalletConnectionResult } from '../types';
declare global {
    interface Window {
        okxwallet?: EthereumProvider;
        rabby?: EthereumProvider;
        trustWallet?: EthereumProvider;
    }
}
export declare class WalletManager {
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
//# sourceMappingURL=WalletManager.d.ts.map