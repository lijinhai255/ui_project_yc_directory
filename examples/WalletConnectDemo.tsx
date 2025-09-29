import React from 'react';
import { WalletProvider } from '../src/wallet-sdk/components/WalletProvider';
import ConnectButton from '../src/wallet-sdk/components/ConnectButton';

// 演示组件
const WalletConnectDemo: React.FC = () => {
  const walletConfig = {
    appName: 'Wallet SDK Demo',
    projectId: 'demo-project-id',
    autoConnect: false,
  };

  const handleConnect = (result: any) => {
    console.log('💰 钱包连接结果:', result);
    if (result.success) {
      alert(`✅ 连接成功!\n地址: ${result.address}\n钱包: ${result.wallet?.name}`);
    } else {
      alert(`❌ 连接失败: ${result.error}`);
    }
  };

  const handleDisconnect = () => {
    console.log('🔌 钱包已断开连接');
    alert('🔌 钱包已断开连接');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Wallet SDK 连接演示
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            体验完整的Web3钱包连接流程
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              💼 钱包连接按钮
            </h2>
            <p className="text-gray-600">
              点击下方按钮开始连接钱包，支持多钱包选择
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <WalletProvider config={walletConfig}>
              <ConnectButton
                label="🔗 连接 Web3 钱包"
                size="lg"
                variant="primary"
                showBalance={true}
                showChain={true}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                className="px-8 py-4 text-lg font-semibold"
              />
            </WalletProvider>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📋 功能特性
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">智能钱包检测</h4>
                  <p className="text-sm text-gray-600">自动检测已安装的钱包扩展程序</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">多钱包支持</h4>
                  <p className="text-sm text-gray-600">支持MetaMask、OKX、Coinbase等多种钱包</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">选择弹窗</h4>
                  <p className="text-sm text-gray-600">多个钱包时显示美观的选择弹窗</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">实时状态</h4>
                  <p className="text-sm text-gray-600">显示地址、余额、链信息等实时数据</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🔧 开发者信息
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800">使用方法</h3>
              <p className="text-gray-600">
                1. 用WalletProvider包裹应用<br/>
                2. 使用ConnectButton组件<br/>
                3. 通过回调函数处理连接事件
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">支持的特性</h3>
              <p className="text-gray-600">
                • EIP-6963钱包检测标准<br/>
                • TypeScript类型安全<br/>
                • 主题支持(明暗模式)</>
                • 响应式设计<br/>
                • 完整的错误处理
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-800">控制台日志</h3>
              <p className="text-gray-600">
                打开浏览器控制台查看详细的连接过程日志
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectDemo;