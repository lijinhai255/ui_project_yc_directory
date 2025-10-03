import { DetectedWallet, EthereumProvider, ExtendedWalletInfo, WalletConnectionResult, WalletConnector, WalletConnectResult } from '../types';
import { SignerFactory } from '../utils/SignerFactory';
import { Address } from 'viem';

interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EthereumProvider;
}

interface EIP6963AnnounceEvent extends Event {
  detail: EIP6963ProviderDetail;
}

interface WalletProvider extends EthereumProvider {
  isMetaMask?: boolean;
  isOkxWallet?: boolean;
  isCoinbaseWallet?: boolean;
  isRabby?: boolean;
  isTrust?: boolean;
}

interface DisconnectableProvider extends EthereumProvider {
  disconnect?: () => Promise<void>;
}

declare global {
  interface Window {
    okxwallet?: EthereumProvider;
    rabby?: EthereumProvider;
    trustWallet?: EthereumProvider;
  }
}

interface WindowEthereum {
  ethereum?: unknown;
  okxwallet?: EthereumProvider;
  rabby?: EthereumProvider;
  trustWallet?: EthereumProvider;
  coinbaseWalletExtension?: unknown;
}

export class WalletManager {
  private wallets = new Map<string, DetectedWallet>();
  private initialized = false;

  constructor() {
    // 不在构造函数中自动初始化，等待手动调用
  }

  public initialize(): DetectedWallet[] {
    if (this.initialized) {
      return this.getWallets();
    }

    this.detectWallets();
    this.initialized = true;
    return this.getWallets();
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public async connectWallet(walletId: string): Promise<WalletConnectionResult> {
    const wallet = this.getWalletById(walletId);
    if (!wallet) {
      throw new Error(`钱包 ${walletId} 未找到或未安装`);
    }

    if (!wallet.createConnector) {
      throw new Error(`钱包 ${wallet.name} 缺少连接器`);
    }

    try {
      const connector = wallet.createConnector();
      const result = await connector.connect();

      if (!result.accounts || result.accounts.length === 0) {
        throw new Error("连接器未返回账户信息");
      }

      const address = result.accounts[0];
      const provider: EthereumProvider = connector.provider || wallet.provider;
      const chainId = result.chainId || await this.getChainIdSafe(provider);

      const connectionResult = {
        success: true,
        address: address as Address,
        chainId,
        wallet: {
          id: wallet.id,
          name: wallet.name,
          installed: wallet.installed,
        },
        provider,
        signer: SignerFactory.createFromProvider(provider, address),
      };

      
      // 触发连接事件
      this.emit('connect', {
        address,
        chainId,
        walletId: wallet.id,
        wallet: {
          id: wallet.id,
          name: wallet.name,
          installed: wallet.installed,
        },
        provider,
      });

      return connectionResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      console.error(`❌ 连接钱包 ${wallet.name} 失败:`, error);
      throw new Error(`连接钱包失败: ${errorMessage}`);
    }
  }

  public async disconnectWallet(walletId: string): Promise<void> {
    if (!walletId) {
      return;
    }

    const wallet = this.getWalletById(walletId);
    if (!wallet) {
      return;
    }

    if (!wallet.createConnector) {
      return;
    }

    try {
      const connector = wallet.createConnector();
      if (connector.disconnect) {
        await connector.disconnect();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      console.error(`❌ 断开钱包 ${wallet.name} 失败:`, error);
    }
  }

  public async disconnectAll(): Promise<void> {
    const wallets = this.getWallets();
    const disconnectPromises = wallets.map(wallet =>
      this.disconnectWallet(wallet.id).catch(error => {
        console.warn(`断开钱包 ${wallet.name} 时出错:`, error);
      })
    );

    await Promise.allSettled(disconnectPromises);
  }

  private async getChainIdSafe(provider: EthereumProvider): Promise<number | undefined> {
    try {
      const chainIdHex = await provider.request({ method: "eth_chainId" });
      if (typeof chainIdHex === 'string' && /^0x[0-9a-fA-F]+$/.test(chainIdHex)) {
        return parseInt(chainIdHex, 16);
      }
    } catch (error) {
      console.warn("获取链 ID 失败:", error);
    }
    return undefined;
  }

  private detectWallets(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.detectEIP6963Wallets();
    this.detectLegacyWallets();
  }

  private detectEIP6963Wallets(): void {
    const announceEvent = 'eip6963:announceProvider';
    const requestEvent = 'eip6963:requestProvider';

    const handleAnnounce = (event: Event): void => {
      const announceEvent = event as EIP6963AnnounceEvent;
      const detail: EIP6963ProviderDetail = announceEvent.detail;
      this.addWallet(detail);
    };

    window.addEventListener(announceEvent, handleAnnounce);
    window.dispatchEvent(new Event(requestEvent));
  }

  private detectLegacyWallets(): void {
    const windowEth = window as unknown as WindowEthereum;
    const ethereum = this.getEthereumProvider(windowEth);

    if (!ethereum) {
      return;
    }

    const provider = ethereum as WalletProvider;

    // MetaMask
    if (provider.isMetaMask) {
      this.addLegacyWallet('metamask', 'MetaMask', provider);
    }

    // OKX
    if (provider.isOkxWallet || windowEth.okxwallet) {
      const okxProvider = windowEth.okxwallet || provider;
      this.addLegacyWallet('okx', 'OKX Wallet', okxProvider);
    }

    // Coinbase
    if (provider.isCoinbaseWallet) {
      this.addLegacyWallet('coinbase', 'Coinbase Wallet', provider);
    } else {
      const coinbaseProvider = this.getCoinbaseWalletExtension(windowEth);
      if (coinbaseProvider) {
        this.addLegacyWallet('coinbase', 'Coinbase Wallet', coinbaseProvider);
      }
    }

    // Rabby
    if (provider.isRabby || windowEth.rabby) {
      const rabbyProvider = windowEth.rabby || provider;
      this.addLegacyWallet('rabby', 'Rabby Wallet', rabbyProvider);
    }

    // Trust Wallet
    if (provider.isTrust || windowEth.trustWallet) {
      const trustProvider = windowEth.trustWallet || provider;
      this.addLegacyWallet('trust', 'Trust Wallet', trustProvider);
    }
  }

  private getEthereumProvider(windowEth: WindowEthereum): EthereumProvider | null {
    try {
      const ethereum = windowEth.ethereum;

      if (
        ethereum &&
        typeof ethereum === 'object' &&
        'request' in ethereum &&
        typeof (ethereum as { request: unknown }).request === 'function'
      ) {
        return ethereum as EthereumProvider;
      }
    } catch (error) {
      console.warn("获取 ethereum provider 失败:", error);
    }
    return null;
  }

  private getCoinbaseWalletExtension(windowEth: WindowEthereum): EthereumProvider | null {
    try {
      const coinbaseExtension = windowEth.coinbaseWalletExtension;

      if (
        coinbaseExtension &&
        typeof coinbaseExtension === 'object' &&
        'request' in coinbaseExtension &&
        typeof (coinbaseExtension as { request: unknown }).request === 'function'
      ) {
        return coinbaseExtension as EthereumProvider;
      }
    } catch (error) {
      console.warn("获取 Coinbase Wallet Extension 失败:", error);
    }
    return null;
  }

  private addWallet(detail: EIP6963ProviderDetail): void {
    const wallet: DetectedWallet = {
      id: this.normalizeWalletId(detail.info.rdns),
      name: detail.info.name,
      icon: detail.info.icon,
      rdns: detail.info.rdns,
      provider: detail.provider,
      installed: true,
      type: 'eip6963',
      createConnector: () => this.createStandardConnector(detail.provider, detail.info.name)
    };

        this.wallets.set(wallet.id, wallet);
  }

  private addLegacyWallet(id: string, name: string, provider: EthereumProvider): void {
    if (this.wallets.has(id)) {
      return;
    }

    const wallet: DetectedWallet = {
      id,
      name,
      icon: this.getDefaultIcon(id),
      rdns: `legacy.${id}`,
      provider,
      installed: true,
      type: 'legacy',
      createConnector: () => this.createStandardConnector(provider, name)
    };

        this.wallets.set(wallet.id, wallet);
  }

  private createStandardConnector(provider: EthereumProvider, walletName: string): WalletConnector {
    const connector: WalletConnector = {
      id: '',
      name: walletName,
      provider,

      connect: async (): Promise<WalletConnectResult> => {
        try {
          const accounts = await provider.request({
            method: 'eth_requestAccounts'
          });

          const accountsArray = Array.isArray(accounts)
            ? accounts.filter((acc): acc is string => typeof acc === 'string')
            : typeof accounts === 'string'
              ? [accounts]
              : [];

          if (accountsArray.length === 0) {
            throw new Error('未获取到有效的账户地址');
          }

          const chainId = await this.getChainIdAsNumber(provider);

          const result: WalletConnectResult = {
            accounts: accountsArray,
            chainId,
            provider
          };

          return result;

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : '连接失败';
          console.error(`❌ ${walletName} 连接失败:`, error);
          throw new Error(`${walletName} 连接失败: ${errorMessage}`);
        }
      },

      disconnect: async (): Promise<void> => {
        try {
          const disconnectableProvider = provider as DisconnectableProvider;
          if (disconnectableProvider.disconnect && typeof disconnectableProvider.disconnect === 'function') {
            await disconnectableProvider.disconnect();
          }
        } catch (error) {
          console.warn(`⚠️ ${walletName} 断开连接时出错:`, error);
        }
      }
    };

    return connector;
  }

  private async getChainIdAsNumber(provider: EthereumProvider): Promise<number | undefined> {
    try {
      const chainIdHex = await provider.request({ method: "eth_chainId" });
      if (typeof chainIdHex === 'string' && /^0x[0-9a-fA-F]+$/.test(chainIdHex)) {
        return parseInt(chainIdHex, 16);
      }
      if (typeof chainIdHex === 'number') {
        return chainIdHex;
      }
    } catch (error) {
      console.warn("获取链 ID 失败:", error);
    }
    return undefined;
  }

  private normalizeWalletId(rdns: string): string {
    const idMap: Record<string, string> = {
      'io.metamask': 'metamask',
      'com.okex.wallet': 'okx',
      'com.coinbase.wallet': 'coinbase',
      'io.rabby': 'rabby',
      'com.trustwallet.app': 'trust'
    };

    return idMap[rdns] || rdns.split('.').pop() || rdns;
  }

  private getDefaultIcon(id: string): string {
    const iconMap: Record<string, string> = {
      'metamask': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+',
      'okx': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+',
      'coinbase': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+',
      'rabby': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+',
      'trust': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+'
    };

    return iconMap[id] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+';
  }

  // 公共方法
  public getWallets(): DetectedWallet[] {
    if (!this.initialized) {
      console.warn("⚠️ WalletManager 未初始化，返回空数组");
      return [];
    }
    return Array.from(this.wallets.values());
  }

  public getWalletById(id: string): DetectedWallet | null {
    if (!this.initialized) {
      console.warn("⚠️ WalletManager 未初始化");
      return null;
    }
    return this.wallets.get(id) || null;
  }

  public isWalletInstalled(id: string): boolean {
    if (!this.initialized) {
      console.warn("⚠️ WalletManager 未初始化");
      return false;
    }
    return this.wallets.has(id);
  }

  public getAvailableWallets(): ExtendedWalletInfo[] {
    return this.getWallets().map(wallet => ({
      id: wallet.id,
      name: wallet.name,
      installed: wallet.installed,
      provider: wallet.provider,
      iconUrl: wallet.icon || this.getDefaultIcon(wallet.id),
      icon: wallet.icon,
      rdns: wallet.rdns,
      type: wallet.type,
    }));
  }

  public getExtendedWalletById(id: string): ExtendedWalletInfo | null {
    const wallet = this.getWalletById(id);
    if (!wallet) return null;

    return {
      id: wallet.id,
      name: wallet.name,
      installed: wallet.installed,
      provider: wallet.provider,
      iconUrl: wallet.icon || this.getDefaultIcon(id),
      icon: wallet.icon,
      rdns: wallet.rdns,
      type: wallet.type,
    };
  }

  // 事件系统
  private eventHandlers = new Map<string, ((data?: any) => void)[]>();

  public on(event: string, handler: (data?: any) => void): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  public off(event: string, handler: (data?: any) => void): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`事件处理器错误 [${event}]:`, error);
        }
      });
    }
  }
}