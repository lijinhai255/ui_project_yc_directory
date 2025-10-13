"use client";

import React from 'react';
import { WalletProvider, EnhancedConnectButton } from '../index';

// 配置
const walletConfig = {
  projectId: '2e789d28c2f0380f39fc2a7bd198dee7',
  appName: 'YC Directory UI Example',
  chains: [
    { id: 1, name: 'Ethereum', rpcUrl: 'https://eth.public-rpc.com' },
    { id: 11155111, name: 'Sepolia', rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161' }
  ],
  autoConnect: false
};

export const ConnectButtonExample: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">钱包连接示例</h2>

      <WalletProvider config={walletConfig}>
        <div className="space-y-4">
          <EnhancedConnectButton
            showBalance={true}
            showChainSwitcher={true}
            size="md"
            variant="primary"
            onConnect={(result) => {
              if (result.success) {
                console.log("钱包连接成功:", result);
              } else {
                console.error("钱包连接失败:", result.error);
              }
            }}
            onDisconnect={() => {
              console.log("钱包已断开连接");
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium text-sm"
          />
        </div>
      </WalletProvider>
    </div>
  );
};

export default ConnectButtonExample;