import { WalletManager } from './WalletManager';
import {
  WalletSDKConfig,
  ConnectionResult,
  TokenBalance,
  ChainConfig,
  WalletInfo,
  ExtendedWalletInfo,
  EventHandler
} from '../types';
import { config as wagmiConfig, connectors } from '../wagmi';

export class WalletSDK {
  private manager: WalletManager;
  private config: WalletSDKConfig;
  private initialized = false;
  private useRainbowKit: boolean;

  constructor(config: WalletSDKConfig = {}, useRainbowKit: boolean = true) {
    this.config = {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      autoConnect: true,
      ...config
    };
    this.useRainbowKit = useRainbowKit;
    this.manager = new WalletManager();
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('🔄 Wallet SDK 已经初始化');
      return;
    }

    console.log('🚀 初始化 Wallet SDK...', { useRainbowKit: this.useRainbowKit });

    try {
      if (this.useRainbowKit) {
        console.log('🌈 使用 RainbowKit 连接器');
        this.initializeRainbowKit();
      } else {
        console.log('🛠️ 使用自定义钱包管理器');
        await this.manager.initialize(this.config);
      }

      this.initialized = true;

      // 设置自动连接
      if (this.config.autoConnect) {
        await this.autoConnect();
      }

      console.log('✅ Wallet SDK 初始化完成');
    } catch (error) {
      console.error('❌ Wallet SDK 初始化失败:', error);
      throw error;
    }
  }

  private initializeRainbowKit(): void {
    console.log('🌈 RainbowKit 连接器已初始化');
    console.log('📋 可用连接器:', connectors.length);
  }

  // 连接管理
  async connect(walletId?: string): Promise<ConnectionResult> {
    if (!this.initialized) {
      throw new Error('Wallet SDK 未初始化，请先调用 initialize()');
    }

    if (this.useRainbowKit) {
      console.log(`🌈 RainbowKit 连接钱包: ${walletId || '默认'}`);
      // 这里应该实现 RainbowKit 的连接逻辑
      // 目前返回模拟结果，实际使用时需要集成 RainbowKit 的连接器
      return {
        success: true,
        address: '0x1234567890123456789012345678901234567890',
        chainId: 1,
        wallet: {
          id: walletId || 'rainbowkit',
          name: walletId || 'RainbowKit Wallet',
          installed: true,
        }
      };
    }

    let targetWalletId = walletId;

    // 如果没有指定钱包，尝试使用上次连接的钱包
    if (!targetWalletId) {
      const lastWallet = this.config.storage?.getItem('lastConnectedWallet');
      targetWalletId = lastWallet || undefined;
    }

    // 如果还是没有，获取第一个可用钱包
    if (!targetWalletId) {
      const availableWallets = this.getAvailableWallets();
      if (availableWallets.length > 0) {
        targetWalletId = availableWallets[0].id;
      }
    }

    if (!targetWalletId) {
      throw new Error('没有可用的钱包');
    }

    return await this.manager.connectWallet(targetWalletId);
  }

  async disconnect(): Promise<void> {
    if (!this.initialized) return;

    if (this.useRainbowKit) {
      console.log('🌈 RainbowKit 断开连接');
      // RainbowKit 断开逻辑
      return;
    }

    await this.manager.disconnectWallet();
  }

  // 状态查询
  isConnected(): boolean {
    if (!this.initialized) return false;
    const state = this.manager.getConnectionState();
    return !!state.address;
  }

  getAddress(): string | null {
    if (!this.initialized) return null;
    const state = this.manager.getConnectionState();
    return state.address;
  }

  getChainId(): number | null {
    if (!this.initialized) return null;
    const state = this.manager.getConnectionState();
    return state.chainId;
  }

  async getBalance(): Promise<string> {
    if (!this.initialized || !this.isConnected()) {
      return '0';
    }

    const address = this.getAddress();
    if (!address) return '0';

    try {
      // 这里应该使用 wagmi 或 viem 来获取余额
      // 暂时返回占位符
      return '0.0000';
    } catch (error) {
      console.error('获取余额失败:', error);
      return '0.0000';
    }
  }

  async getTokenBalance(tokenAddress: string): Promise<TokenBalance> {
    if (!this.initialized || !this.isConnected()) {
      return {
        balance: '0',
        decimals: 18,
        symbol: '',
        loading: false,
        error: '钱包未连接'
      };
    }

    const address = this.getAddress();
    if (!address) {
      return {
        balance: '0',
        decimals: 18,
        symbol: '',
        loading: false,
        error: '钱包地址不存在'
      };
    }

    try {
      // 这里应该使用 wagmi 或 viem 来获取代币余额
      // 暂时返回占位符
      return {
        balance: '0',
        decimals: 18,
        symbol: 'TOKEN',
        loading: false,
        error: null
      };
    } catch (error) {
      console.error('获取代币余额失败:', error);
      return {
        balance: '0',
        decimals: 18,
        symbol: '',
        loading: false,
        error: error instanceof Error ? error.message : '获取代币余额失败'
      };
    }
  }

  // 钱包管理
  getAvailableWallets(): ExtendedWalletInfo[] {
    if (!this.initialized) return [];

    if (this.useRainbowKit) {
      // 返回 RainbowKit 支持的钱包
      return [
        { id: 'metamask', name: 'MetaMask', installed: true, iconUrl: '' },
        { id: 'okx', name: 'OKX Wallet', installed: true, iconUrl: '' },
        { id: 'coinbase', name: 'Coinbase Wallet', installed: true, iconUrl: '' },
        { id: 'trust', name: 'Trust Wallet', installed: true, iconUrl: '' },
        { id: 'walletconnect', name: 'WalletConnect', installed: true, iconUrl: '' },
        { id: 'imtoken', name: 'imToken', installed: true, iconUrl: '' },
        { id: 'safe', name: 'Safe', installed: true, iconUrl: '' },
      ];
    }

    return this.manager.getAvailableWallets();
  }

  async switchChain(chainId: number): Promise<void> {
    if (!this.initialized || !this.isConnected()) {
      throw new Error('钱包未连接');
    }

    try {
      // 这里应该实现链切换逻辑
      console.log(`切换到链: ${chainId}`);
    } catch (error) {
      console.error('切换链失败:', error);
      throw error;
    }
  }

  // 事件管理
  on(event: string, handler: EventHandler): void {
    if (this.useRainbowKit) {
      // RainbowKit 事件管理
      console.log(`🌈 RainbowKit 事件监听: ${event}`);
      return;
    }
    this.manager.on(event, handler);
  }

  off(event: string, handler: EventHandler): void {
    if (this.useRainbowKit) {
      // RainbowKit 事件管理
      console.log(`🌈 RainbowKit 移除事件监听: ${event}`);
      return;
    }
    this.manager.off(event, handler);
  }

  // 私有方法
  private async autoConnect(): Promise<void> {
    if (this.useRainbowKit) {
      console.log('🌈 RainbowKit 自动连接逻辑');
      return;
    }

    try {
      const lastWallet = this.config.storage?.getItem('lastConnectedWallet');
      const address = this.config.storage?.getItem('walletAddress');

      if (lastWallet && address) {
        console.log('🔄 尝试自动连接...');
        await this.connect(lastWallet);
      }
    } catch (error) {
      console.warn('自动连接失败:', error);
      // 清理可能损坏的存储
      this.config.storage?.removeItem('lastConnectedWallet');
      this.config.storage?.removeItem('walletAddress');
      this.config.storage?.removeItem('walletChainId');
    }
  }

  // 获取配置信息
  getConfig(): WalletSDKConfig {
    return { ...this.config };
  }

  // 检查是否初始化
  isInitialized(): boolean {
    return this.initialized;
  }

  // 获取 Wagmi 配置（用于 RainbowKit 集成）
  getWagmiConfig() {
    if (!this.useRainbowKit) {
      throw new Error('RainbowKit 未启用');
    }
    return wagmiConfig;
  }

  // 获取连接器（用于 RainbowKit 集成）
  getConnectors() {
    if (!this.useRainbowKit) {
      throw new Error('RainbowKit 未启用');
    }
    return connectors;
  }

  // 调试方法
  redetectWallets(): void {
    if (!this.useRainbowKit) {
      this.manager.redetectWallets();
    }
  }

  getDetectionDetails(): any {
    if (!this.useRainbowKit) {
      return this.manager.getDetectionDetails();
    }
    return { useRainbowKit: true };
  }
}