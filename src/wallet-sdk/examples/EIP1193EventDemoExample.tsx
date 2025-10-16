import React from 'react';
import { WalletProvider, EIP1193EventDemo } from '../index';

/**
 * EIP-1193 事件演示示例
 *
 * 这个示例展示了如何使用 EIP1193EventDemo 组件来监听和显示 EIP-1193 标准事件
 */
export const EIP1193EventDemoExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            EIP-1193 事件监听演示
          </h1>
          <p className="text-gray-600">
            体验标准 EIP-1193 钱包事件的实时监听和日志记录
          </p>
        </div>

        <WalletProvider
          config={{
            appName: 'EIP-1193 Event Demo',
            projectId: 'demo-project-id',
          }}
        >
          <div className="space-y-6">
            {/* 完整功能演示 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                完整功能演示
              </h2>
              <EIP1193EventDemo
                showBalance={true}
                showChain={true}
              />
            </div>

            {/* 使用说明 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                📖 使用说明
              </h2>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">🔗 连接钱包</h3>
                  <p>点击"连接钱包"按钮，在弹出的钱包选择器中选择一个已安装的钱包（如 MetaMask）。</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">👤 账户变更测试</h3>
                  <p>在钱包中切换不同的账户，观察 <code className="bg-gray-100 px-1 rounded">accountsChanged</code> 事件的触发。</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">⛓️ 链切换测试</h3>
                  <p>在钱包中切换不同的区块链网络（如 Ethereum → Polygon），观察 <code className="bg-gray-100 px-1 rounded">chainChanged</code> 事件。</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">📋 事件日志</h3>
                  <p>所有 EIP-1193 事件都会实时显示在事件日志中，包含时间戳、事件详情和原始数据。</p>
                </div>
              </div>
            </div>

            {/* EIP-1193 标准说明 */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                📚 EIP-1193 标准
              </h2>
              <div className="space-y-3 text-sm text-blue-800">
                <p>
                  <strong>EIP-1193</strong> 是以太坊钱包提供商的标准 JavaScript API，
                  定义了 DApp 与钱包之间的标准接口。
                </p>
                <div>
                  <h4 className="font-medium mb-2">标准事件类型：</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><code>accountsChanged</code>: 账户变更时触发</li>
                    <li><code>chainChanged</code>: 链ID变更时触发</li>
                    <li><code>connect</code>: 钱包连接时触发</li>
                    <li><code>disconnect</code>: 钱包断开时触发</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </WalletProvider>
      </div>
    </div>
  );
};

export default EIP1193EventDemoExample;