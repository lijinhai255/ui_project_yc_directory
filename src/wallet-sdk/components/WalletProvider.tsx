"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { WalletManager } from '../core/WalletManager';
import { WalletDeduplicator } from '../utils/WalletDeduplicator';
import WalletModal from './WalletModal';
import {
  WalletContextValue,
  WalletState,
  ConnectionResult,
  TokenBalance,
  WalletSDKConfig,
  ExtendedWalletInfo,
  DetectedWallet,
  WalletProviderProps,
  ChainInfo,
  WalletGroup,
  EthereumProvider,
  WalletCreateConfig,
  WalletConnectionResult,
} from '../types';
import { Address, formatEther, formatUnits } from 'viem';

const WalletContext = createContext<WalletContextValue>({
  address: "0x" as Address,
  chainId: null,
  chainID: null,
  isConnecting: false,
  isConnected: false,
  isDisconnected: true,
  isReconnecting: false,
  ensName: null,
  error: null,
  chains: [],
  provider: undefined,
  balance: "0.0000",
  wallet: undefined,
  signer: undefined,
  connect: async () => ({ success: false, error: '未初始化' }),
  disconnect: async () => {},
  switchChain: async () => {},
  openModal: () => {},
  closeModal: () => {},
  walletInstances: {},
  detectedWallets: [],
  walletsLoading: true,
  fetchBalance: async () => {},
  balanceLoading: false,
  getTokenBalance: async () => ({
    balance: '0',
    decimals: 18,
    symbol: '',
    loading: false,
    error: '钱包未连接',
  }),
});

export const WalletProvider: React.FC<WalletProviderProps> = ({
  children,
  config,
  chains,
  provider,
  autoConnect,
  wallets
}) => {
  const [walletManager, setWalletManager] = useState<WalletManager | null>(null);
  const [state, setState] = useState<WalletState>({
    address: "0x" as Address,
    chainId: null,
    chainID: null,
    isConnecting: false,
    isConnected: false,
    isDisconnected: true,
    isReconnecting: false,
    ensName: null,
    error: null,
    chains: chains || config.chains || [],
    provider: provider || config.provider,
    balance: "0.0000",
    wallet: undefined,
    signer: undefined,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detectedWallets, setDetectedWallets] = useState<DetectedWallet[]>([]);
  const [walletsLoading, setWalletsLoading] = useState(true);
  const [walletInstances, setWalletInstances] = useState<{
    [groupName: string]: ExtendedWalletInfo[];
  }>({});
  const [currentWalletId, setCurrentWalletId] = useState("");
  const [autoConnectAttempted, setAutoConnectAttempted] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // 创建 tokenBalanceCache 来缓存代币余额信息
  const [tokenBalanceCache, setTokenBalanceCache] = useState<{
    [tokenAddress: string]: {
      balance: string;
      decimals: number;
      symbol: string;
      lastUpdated: number;
    };
  }>({});

  // 初始化钱包管理器
  useEffect(() => {
    const initializeWalletManager = async () => {
      try {
                const manager = new WalletManager();

        // 使用传入的配置或默认配置
        const walletConfig = {
          projectId: config.projectId,
          chains: chains || config.chains || [],
          storage: config.storage || (typeof window !== 'undefined' ? window.localStorage : undefined),
          ...config
        };

        manager.initialize();
        const detectedWallets = manager.getWallets();
        setWalletManager(manager);

        // 设置事件监听
        manager.on('connect', (data) => {
          setState(prev => ({
            ...prev,
            isConnected: true,
            isConnecting: false,
            isDisconnected: false,
            address: data.address as Address,
            chainId: data.chainId,
            chainID: data.chainId?.toString() || null,
            provider: data.provider,
            wallet: data.wallet ? {
              id: data.wallet.id || data.walletId,
              name: data.wallet.name || 'Unknown',
              installed: true
            } : undefined,
            error: null,
          }));
          setCurrentWalletId(data.walletId);
        });

        manager.on('disconnect', () => {
          setState(prev => ({
            ...prev,
            isConnected: false,
            isDisconnected: true,
            isConnecting: false,
            address: "0x" as Address,
            chainId: null,
            chainID: null,
            provider: undefined,
            wallet: undefined,
            balance: "0.0000",
            signer: undefined,
            error: null,
          }));
          setCurrentWalletId("");
        });

        manager.on('chainChanged', (data) => {
          setState(prev => ({
            ...prev,
            chainId: data.chainId,
            chainID: data.chainId?.toString() || null,
          }));
        });

        manager.on('accountChanged', (data) => {
          setState(prev => ({
            ...prev,
            address: (data.accounts[0] || "0x") as Address,
          }));
        });

        manager.on('error', (data) => {
          console.error("❌ 钱包错误事件:", data);
          setState(prev => ({
            ...prev,
            error: new Error(data.error),
            isConnecting: false,
          }));
        });

              } catch (error) {
        console.error('初始化 WalletManager 失败:', error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('初始化失败'),
        }));
      }
    };

    initializeWalletManager();

    return () => {
      // 清理事件监听
      if (walletManager) {
        walletManager.off('connect', () => {});
        walletManager.off('disconnect', () => {});
        walletManager.off('chainChanged', () => {});
        walletManager.off('accountChanged', () => {});
        walletManager.off('error', () => {});
      }
    };
  }, [config, chains, provider]);

  // 初始化钱包检测
  useEffect(() => {
    const initWallets = async () => {
      if (!walletManager) return;

      try {
        setWalletsLoading(true);

        // 检测可用钱包
        const detectedWallets = walletManager.getWallets();

        // 构建配置的钱包实例
        const configuredInstances: { [groupName: string]: ExtendedWalletInfo[] } = {};
        if (wallets && config.projectId) {
          wallets.forEach((group) => {
            if (group.groupName && group.wallets) {
              const groupWallets = group.wallets.map((createWalletFn) => {
                return createWalletFn({
                  projectId: config.projectId!,
                  appName: config.appName,
                });
              });
              if (groupWallets.length > 0) {
                configuredInstances[group.groupName] = groupWallets;
              }
            }
          });
        }

        // 使用去重器处理钱包
        const { filtered: filteredDetected, staticFiltered } = WalletDeduplicator.deduplicate(
          detectedWallets,
          configuredInstances
        );

        
        setDetectedWallets(filteredDetected);

        // 构建最终的钱包实例
        const finalInstances: { [groupName: string]: ExtendedWalletInfo[] } = {};

        // 添加检测到的钱包
        if (filteredDetected.length > 0) {
          const detectedAsExtended: ExtendedWalletInfo[] = filteredDetected.map(wallet => ({
            id: wallet.id,
            name: wallet.name,
            installed: wallet.installed,
            provider: wallet.provider,
            iconUrl: wallet.icon,
            icon: wallet.icon,
            rdns: wallet.rdns,
            type: wallet.type,
          }));
          finalInstances["已安装的钱包"] = detectedAsExtended;
        }

        // 添加过滤后的配置钱包组
        Object.entries(staticFiltered).forEach(([groupName, walletsInGroup]) => {
          if (walletsInGroup.length > 0) {
            finalInstances[groupName] = walletsInGroup;
          }
        });

        setWalletInstances(finalInstances);
      } catch (error) {
        console.error("❌ 钱包检测失败:", error);
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error("钱包检测失败"),
        }));
      } finally {
        setWalletsLoading(false);
      }
    };

    initWallets();
  }, [walletManager, wallets, config.projectId, config.appName]);

  // 连接钱包
  const connect = useCallback(async (walletId: string): Promise<ConnectionResult> => {
    if (!walletManager) {
      console.error('❌ WalletProvider - WalletManager 未初始化');
      return {
        success: false,
        error: 'WalletManager 未初始化',
      };
    }

    
    setState(prev => ({
      ...prev,
      isConnecting: true,
      isDisconnected: false,
      error: null
    }));

    try {
      const result = await walletManager.connectWallet(walletId);


      // 状态会通过事件监听器自动更新
      setIsModalOpen(false);

      // 保存连接状态
      if (typeof window !== 'undefined' && config.storage) {
        config.storage.setItem('lastConnectedWallet', walletId);
        config.storage.setItem('walletAddress', result.address || '');
        config.storage.setItem('lastConnectionTime', Date.now().toString());
      }

      return {
        success: true,
        address: result.address,
        chainId: result.chainId,
        chainID: result.chainId?.toString() || null,
        wallet: result.wallet,
        provider: result.provider,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '连接失败';
      console.error("❌ WalletProvider - 钱包连接失败:", error);

      setState(prev => ({
        ...prev,
        isConnecting: false,
        isDisconnected: true,
        error: new Error(errorMessage),
      }));

      return {
        success: false,
        error: errorMessage,
      };
    }
  }, [walletManager, config.storage]);

  // 断开连接
  const disconnect = useCallback(async (): Promise<void> => {

    try {
      // 调用 walletManager 的断开连接方法
      if (walletManager) {
        await walletManager.disconnectWallet(currentWalletId);
      }
    } catch (error) {
      console.warn("⚠️ 断开钱包连接器时出错:", error);
      // 不抛出错误，因为断开连接失败不应该阻止清理流程
    }

    // 清理本地存储
    if (typeof window !== 'undefined' && config.storage) {
      config.storage.removeItem('lastConnectedWallet');
      config.storage.removeItem('walletAddress');
      config.storage.removeItem('lastConnectionTime');
    }

    // 重置状态
    setState(prev => ({
      ...prev,
      isConnected: false,
      isDisconnected: true,
      address: "0x" as Address,
      chainId: null,
      chainID: null,
      provider: undefined,
      wallet: undefined,
      signer: undefined,
      balance: "0.0000",
      isConnecting: false,
      error: null,
    }));

    // 重置当前钱包ID
    setCurrentWalletId("");

    // 清理代币余额缓存
    setTokenBalanceCache({});

  }, [walletManager, currentWalletId, config.storage]);

  // 切换链
  const switchChain = useCallback(async (chainId: number): Promise<void> => {
    if (!walletManager) throw new Error('WalletManager 未初始化');

    try {

      // 获取当前连接的钱包
      const currentWallet = walletManager.getWalletById(currentWalletId);
      if (!currentWallet) {
        throw new Error('未找到当前连接的钱包');
      }

      const provider = currentWallet.provider;

      // 将 chainId 转换为十六进制
      const chainIdHex = `0x${chainId.toString(16)}`;

      try {
        // 尝试切换到指定链
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });


        // 更新状态
        setState(prev => ({
          ...prev,
          chainId,
          chainID: chainId.toString()
        }));

        // 触发链变化事件
        if (walletManager) {
          (walletManager as any).emit?.('chainChanged', { chainId });
        }

      } catch (switchError: any) {
        // 如果链不存在，可能需要添加链
        if (switchError.code === 4902) {

          // 获取链配置
          const chainConfig = getChainConfig(chainId);
          if (chainConfig) {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [chainConfig],
            });

            setState(prev => ({
              ...prev,
              chainId,
              chainID: chainId.toString()
            }));
          } else {
            throw new Error(`不支持的链 ID: ${chainId}`);
          }
        } else {
          throw switchError;
        }
      }

    } catch (error) {
      console.error('切换链失败:', error);
      throw error;
    }
  }, [walletManager, currentWalletId]);

  // 获取链配置
  const getChainConfig = (chainId: number) => {
    const chainConfigs: Record<number, any> = {
      1: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_KEY'],
        blockExplorerUrls: ['https://etherscan.io'],
      },
      11155111: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia test network',
        nativeCurrency: {
          name: 'Sepolia Ether',
          symbol: 'SepoliaETH',
          decimals: 18,
        },
        rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_KEY'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
      },
      137: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com'],
        blockExplorerUrls: ['https://polygonscan.com'],
      },
      56: {
        chainId: '0x38',
        chainName: 'BNB Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com'],
      },
    };

    return chainConfigs[chainId];
  };

  // 获取余额
  const fetchBalance = useCallback(async (): Promise<void> => {
    if (!state.isConnected || !state.address) {
      return;
    }

    try {
      setBalanceLoading(true);

      // 获取当前连接的钱包
      const currentWallet = walletManager?.getWalletById(currentWalletId);
      if (!currentWallet) {
        console.warn("⚠️ 未找到当前连接的钱包", {
          currentWalletId,
          availableWallets: walletManager?.getWallets().map(w => w.id)
        });
        return;
      }

      const provider = currentWallet.provider;

      // 使用 eth_getBalance 获取余额
      const balanceHex = await provider.request({
        method: 'eth_getBalance',
        params: [state.address, 'latest'],
      });


      if (typeof balanceHex === 'string') {
        // 将十六进制余额转换为 ETH
        const balanceWei = BigInt(balanceHex);
        const balanceEth = formatEther(balanceWei);
        const formattedBalance = parseFloat(balanceEth).toFixed(4);

          
        setState(prev => ({
          ...prev,
          balance: formattedBalance,
        }));

      } else {
        console.error("❌ 余额响应类型错误:", typeof balanceHex, balanceHex);
      }
    } catch (error) {
      console.error('❌ 获取余额失败:', error);
      console.error('🔍 错误详情:', {
        message: error instanceof Error ? error.message : '未知错误',
        stack: error instanceof Error ? error.stack : undefined,
        walletId: currentWalletId,
        address: state.address,
        chainId: state.chainId
      });
      setState(prev => ({
        ...prev,
        balance: "0.0000",
      }));
    } finally {
      setBalanceLoading(false);
    }
  }, [state.isConnected, state.address, state.chainId, walletManager, currentWalletId]);

  // 自动获取余额
  useEffect(() => {
    if (state.isConnected && state.address) {
      fetchBalance();

      // 设置定时刷新余额 (30秒)
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    }
  }, [state.isConnected, state.address, fetchBalance]);

  // 获取代币余额的方法
  const getTokenBalance = useCallback(
    async (tokenAddress: Address): Promise<TokenBalance> => {
      // 默认返回值
      const defaultResult = {
        balance: "0",
        decimals: 18,
        symbol: "",
        loading: false,
        error: null as string | null,
      };

      // 如果钱包未连接或地址为空，返回默认值
      if (!state.isConnected || !state.address) {
        return { ...defaultResult, error: "钱包未连接" };
      }

      const currentWallet = walletManager?.getWalletById(currentWalletId);
      if (!currentWallet) {
        return { ...defaultResult, error: "未找到当前连接的钱包" };
      }

      try {
        // 设置加载状态
        const loadingResult = { ...defaultResult, loading: true };

        // 检查缓存
        const cacheKey = `${tokenAddress.toLowerCase()}-${state.address.toLowerCase()}`;
        const cachedData = tokenBalanceCache[cacheKey];
        const now = Date.now();

        // 如果缓存存在且未过期（30秒内），直接使用缓存
        if (cachedData && now - cachedData.lastUpdated < 30000) {
          return {
            balance: cachedData.balance,
            decimals: cachedData.decimals,
            symbol: cachedData.symbol,
            loading: false,
            error: null,
          };
        }

        const provider = currentWallet.provider;

        // ERC-20 合约的函数选择器
        const balanceOfSelector = '0x70a08231'; // balanceOf(address)
        const decimalsSelector = '0x313ce567'; // decimals()
        const symbolSelector = '0x95d89b41'; // symbol()

        // 编码地址参数 (去掉0x前缀，补齐到64位)
        const encodedAddress = state.address.slice(2).padStart(64, '0');

        // 并行调用合约方法
        const [balanceResult, decimalsResult, symbolResult] = await Promise.all([
          // 获取余额
          provider.request({
            method: 'eth_call',
            params: [
              {
                to: tokenAddress,
                data: balanceOfSelector + encodedAddress,
              },
              'latest',
            ],
          }),
          // 获取小数位数
          provider.request({
            method: 'eth_call',
            params: [
              {
                to: tokenAddress,
                data: decimalsSelector,
              },
              'latest',
            ],
          }),
          // 获取代币符号
          provider.request({
            method: 'eth_call',
            params: [
              {
                to: tokenAddress,
                data: symbolSelector,
              },
              'latest',
            ],
          }),
        ]);

        // 解析结果
        const decimals = parseInt(decimalsResult as string, 16);
        const balanceWei = BigInt(balanceResult as string);
        const balance = formatUnits(balanceWei, decimals);

        // 解析符号 (去掉前面的0x和填充，然后转换为字符串)
        let symbol = '';
        if (symbolResult && typeof symbolResult === 'string') {
          const symbolHex = (symbolResult as string).slice(2);
          // 转换十六进制到字符串
          let symbolStr = '';
          for (let i = 0; i < symbolHex.length; i += 2) {
            const charCode = parseInt(symbolHex.substr(i, 2), 16);
            if (charCode !== 0) {
              symbolStr += String.fromCharCode(charCode);
            }
          }
          symbol = symbolStr.trim();
        }

        // 更新缓存
        setTokenBalanceCache((prev) => ({
          ...prev,
          [cacheKey]: {
            balance,
            decimals,
            symbol: symbol || 'TOKEN',
            lastUpdated: now,
          },
        }));

        // 返回结果
        return {
          balance,
          decimals,
          symbol: symbol || 'TOKEN',
          loading: false,
          error: null,
        };
      } catch (error) {
        console.error(`获取代币 ${tokenAddress} 余额失败:`, error);
        return {
          ...defaultResult,
          error: error instanceof Error ? error.message : "获取代币余额失败",
        };
      }
    },
    [state.isConnected, state.address, walletManager, currentWalletId, tokenBalanceCache]
  );

  // 自动连接逻辑
  useEffect(() => {
    const attemptAutoConnect = async () => {
      if (autoConnectAttempted || !autoConnect || !walletManager || walletsLoading) {
        return;
      }

      if (state.isConnected) {
        setAutoConnectAttempted(true);
        return;
      }

      const lastConnectedWallet = typeof window !== 'undefined' && config.storage
        ? config.storage.getItem('lastConnectedWallet')
        : null;

      if (!lastConnectedWallet) {
        setAutoConnectAttempted(true);
        return;
      }


      try {
        // 检查该钱包是否还存在
        const availableWallets = walletManager.getAvailableWallets();
        const walletExists = availableWallets.some(wallet => wallet.id === lastConnectedWallet);

        if (walletExists) {
          await connect(lastConnectedWallet);
        } else {
          if (typeof window !== 'undefined' && config.storage) {
            config.storage.removeItem('lastConnectedWallet');
            config.storage.removeItem('walletAddress');
            config.storage.removeItem('lastConnectionTime');
          }
        }
      } catch (error) {
        console.warn("自动连接失败:", error);
        if (typeof window !== 'undefined' && config.storage) {
          config.storage.removeItem('lastConnectedWallet');
          config.storage.removeItem('walletAddress');
          config.storage.removeItem('lastConnectionTime');
        }
      } finally {
        setAutoConnectAttempted(true);
      }
    };

    attemptAutoConnect();
  }, [
    autoConnect,
    autoConnectAttempted,
    walletManager,
    walletsLoading,
    state.isConnected,
    config.storage,
    connect
  ]);

  // 模态框控制
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const value: WalletContextValue = {
    ...state,
    connect,
    disconnect,
    switchChain,
    openModal,
    closeModal,
    walletInstances,
    detectedWallets,
    walletsLoading,
    fetchBalance,
    balanceLoading,
    getTokenBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
      <WalletModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConnect={connect}
        title="连接钱包"
        description="请选择要连接的钱包"
        walletInstances={walletInstances}
        detectedWallets={detectedWallets}
        walletsLoading={walletsLoading}
      />
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};