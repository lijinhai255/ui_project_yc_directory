import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  okxWallet,
  safeWallet,
  imTokenWallet
} from '@rainbow-me/rainbowkit/wallets';

import { http, createConfig, createStorage } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';

// 默认支持的链 - 可以根据需要扩展
export const chains = [
  { id: 1, name: 'Ethereum', rpcUrl: 'https://eth.public-rpc.com' },
  { id: 11155111, name: 'Sepolia', rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' },
  { id: 137, name: 'Polygon', rpcUrl: 'https://polygon-rpc.com' },
  { id: 10, name: 'Optimism', rpcUrl: 'https://mainnet.optimism.io' },
  { id: 42161, name: 'Arbitrum', rpcUrl: 'https://arb1.arbitrum.io/rpc' },
  { id: 8453, name: 'Base', rpcUrl: 'https://mainnet.base.org' }
] as const;

export const projectId = '2e789d28c2f0380f39fc2a7bd198dee7';

// 钱包列表配置
export const walletList = [
  {
    groupName: '推荐',
    wallets: [
      metaMaskWallet,
      okxWallet,
      imTokenWallet,
      coinbaseWallet,
      trustWallet,
    ],
  },
  {
    groupName: '其他',
    wallets: [
      walletConnectWallet,
      injectedWallet,
      safeWallet,
    ],
  },
];

// 钱包配置
export const walletConfig = {
  appName: 'YC Directory UI',
  projectId: projectId,
};

// 创建 RainbowKit 连接器
export const connectors = connectorsForWallets(
  walletList,
  walletConfig
);

// 创建 Wagmi 配置
export const config = createConfig({
  chains,
  transports: Object.fromEntries(
    chains.map(chain => [chain.id, http()])
  ),
  connectors,
  ssr: true,
  // 持久化存储配置
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    key: 'ycdirectory-wagmi-store',
  }),
});

export const queryClient = new QueryClient();

export default config;