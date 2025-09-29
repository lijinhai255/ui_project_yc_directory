import React, { useState, useEffect } from 'react';
import { WalletProvider } from '../src/wallet-sdk/components/WalletProvider';
import ConnectButton from '../src/wallet-sdk/components/WalletModal';

const WalletConnectDebug: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [detectedWallets, setDetectedWallets] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[WalletDebug] ${message}`);
  };

  const walletConfig = {
    appName: 'Wallet Debug',
    projectId: 'debug-project-id',
    autoConnect: false,
  };

  useEffect(() => {
    addLog('组件挂载，开始检测钱包...');

    // 检测 window.ethereum
    if (typeof window !== 'undefined') {
      addLog(`window.ethereum 存在: ${!!window.ethereum}`);

      if (window.ethereum) {
        addLog(`window.ethereum 类型: ${typeof window.ethereum}`);
        addLog(`window.ethereum 方法: ${Object.keys(window.ethereum).join(', ')}`);
      }

      // 检测各个钱包
      const wallets = [
        { name: 'MetaMask', key: 'ethereum' },
        { name: 'OKX', key: 'okxwallet' },
        { name: 'Coinbase', key: 'coinbaseWalletExtension' },
        { name: 'Rabby', key: 'rabby' },
        { name: 'Trust', key: 'trustWallet' },
      ];

      const detected: string[] = [];
      wallets.forEach(wallet => {
        const exists = !!(window as any)[wallet.key];
        if (exists) {
          detected.push(wallet.name);
          addLog(`✅ 检测到 ${wallet.name}`);
        } else {
          addLog(`❌ 未检测到 ${wallet.name}`);
        }
      });

      setDetectedWallets(detected);
    }

    // 设置全局错误监听
    const handleError = (event: ErrorEvent) => {
      addLog(`❌ 全局错误: ${event.message}`);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleConnect = async (result: any) => {
    addLog(`🔌 连接回调触发: ${JSON.stringify(result)}`);

    if (result.success) {
      addLog(`✅ 连接成功: ${result.address}`);
    } else {
      addLog(`❌ 连接失败: ${result.error}`);
    }
  };

  const handleDisconnect = () => {
    addLog('🔌 断开连接回调触发');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔧 钱包连接调试工具
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：钱包信息 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🎯 钱包检测状态
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">检测到的钱包:</span>
                  <span className={`font-medium ${detectedWallets.length > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {detectedWallets.length > 0 ? detectedWallets.join(', ') : '无'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">window.ethereum:</span>
                  <span className={`font-medium ${typeof window !== 'undefined' && window.ethereum ? 'text-green-600' : 'text-red-600'}`}>
                    {typeof window !== 'undefined' && window.ethereum ? '存在' : '不存在'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🚀 连接测试
              </h2>

              <WalletProvider config={walletConfig}>
                <div className="space-y-4">
                  <ConnectButton
                    label="🔗 测试钱包连接"
                    size="lg"
                    variant="primary"
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                    className="w-full"
                  />

                  <div className="text-sm text-gray-600">
                    <p>💡 点击按钮测试钱包连接功能</p>
                    <p>📋 查看右侧控制台日志了解详细过程</p>
                  </div>
                </div>
              </WalletProvider>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📖 测试步骤
              </h2>

              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>确保已安装钱包扩展程序（如MetaMask）</li>
                <li>刷新页面，查看钱包检测状态</li>
                <li>点击"测试钱包连接"按钮</li>
                <li>观察右侧日志输出</li>
                <li>在钱包弹窗中确认或拒绝连接</li>
                <li>查看连接结果和详细日志</li>
              </ol>
            </div>
          </div>

          {/* 右侧：日志输出 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                📋 调试日志
              </h2>
              <button
                onClick={() => setLogs([])}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                清空日志
              </button>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-96 overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <div className="text-gray-500">等待日志输出...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>💡 提示：打开浏览器控制台查看更详细的日志信息</p>
              <p>🔧 如果连接失败，请检查：</p>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>钱包扩展程序是否已启用</li>
                <li>钱包是否已解锁</li>
                <li>浏览器是否支持Web3</li>
                <li>控制台是否有错误信息</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectDebug;