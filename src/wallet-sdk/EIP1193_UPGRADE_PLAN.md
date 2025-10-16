# EIP-1193 标准事件监听升级方案

## 📋 升级目标

在现有的 `AccountDropdown` 组件基础上，集成 EIP-1193 标准事件监听，实现：
1. **实时监听钱包状态变化**：账户变更、链切换、连接/断开
2. **自动 UI 更新**：无需手动刷新即可反映钱包状态
3. **用户体验优化**：实时反馈、状态提示、错误处理
4. **向后兼容**：不影响现有功能的基础上增强能力

## 🏗️ 架构升级方案

### 1. 核心升级点

#### 🔧 **WalletManager 增强**
```typescript
// 新增 EIP-1193 事件监听功能
class WalletManager {
  private currentProvider: EthereumProvider | null = null;
  private currentWalletId: string | null = null;
  private eip1193EventHandlers: Map<string, Function> = new Map();

  // 🔥 新增方法
  setupEIP1193EventListeners(provider, walletId)  // 设置事件监听
  cleanupEIP1193EventListeners()                  // 清理事件监听
  getCurrentProvider()                           // 获取当前 provider
  checkEIP1193Events()                           // 手动检查事件
}
```

#### 🔧 **WalletProvider 增强**
```typescript
// 新增 EIP-1193 事件处理
const WalletProvider = () => {
  // 添加 EIP-1193 事件监听
  useEffect(() => {
    manager.on('accountsChanged', handleAccountsChanged);
    manager.on('chainChanged', handleChainChanged);
    manager.on('eip1193_connect', handleEIP1193Connect);
    manager.on('eip1193_disconnect', handleEIP1193Disconnect);

    return () => {
      // 清理事件监听
    };
  }, [manager]);
}
```

#### 🔧 **AccountDropdown 组件升级**
```typescript
// 新增实时状态监听和 UI 反馈
const AccountDropdown = () => {
  // 新增状态
  const [realtimeStatus, setRealtimeStatus] = useState({
    isListening: false,
    lastEvent: null,
    eventHistory: []
  });

  // 新增事件处理
  const handleEIP1193Events = (event) => {
    // 实时更新 UI
    // 显示通知
    // 记录事件历史
  };
}
```

## 🚀 分阶段实施计划

### **阶段一：核心基础设施升级** (1-2天)

#### 1.1 WalletManager 增强
- [ ] 添加 `currentProvider` 和 `currentWalletId` 状态管理
- [ ] 实现 `setupEIP1193EventListeners()` 方法
- [ ] 实现 `cleanupEIP1193EventListeners()` 方法
- [ ] 在 `connectWallet()` 时设置事件监听
- [ ] 在 `disconnectWallet()` 时清理事件监听

#### 1.2 EIP-1193 事件监听实现
```typescript
// 标准事件处理
private setupEIP1193EventListeners(provider: EthereumProvider, walletId: string): void {
  // accountsChanged - 账户变更
  provider.on('accountsChanged', (accounts: string[]) => {
    this.emit('accountsChanged', { accounts, walletId });
  });

  // chainChanged - 链切换
  provider.on('chainChanged', (chainId: string) => {
    this.emit('chainChanged', { chainId: parseInt(chainId, 16), walletId });
  });

  // connect - 连接事件
  provider.on('connect', (connectInfo: { chainId: string }) => {
    this.emit('eip1193_connect', { chainId: parseInt(connectInfo.chainId, 16), walletId });
  });

  // disconnect - 断开事件
  provider.on('disconnect', (error: { code: number; message: string }) => {
    this.emit('eip1193_disconnect', { error, walletId });
  });
}
```

### **阶段二：WalletProvider 事件集成** (1天)

#### 2.1 事件监听集成
```typescript
// 在 WalletProvider 中添加 EIP-1193 事件处理
useEffect(() => {
  if (!walletManager) return;

  // EIP-1193 标准事件监听
  const handleAccountsChanged = (data) => {
    console.log('🔄 账户变更:', data);
    if (data.accounts.length === 0) {
      // 用户断开所有账户
      setState(prev => ({
        ...prev,
        isConnected: false,
        address: "0x" as Address,
        balance: "0.0000",
      }));
    } else {
      // 账户变更
      setState(prev => ({
        ...prev,
        address: data.accounts[0] as Address,
      }));
      // 重新获取余额
      fetchBalance();
    }
  };

  const handleChainChanged = (data) => {
    console.log('⛓️ 链切换:', data);
    setState(prev => ({
      ...prev,
      chainId: data.chainId,
      chainID: data.chainId?.toString() || null,
    }));
    // 重新获取余额
    fetchBalance();
  };

  const handleEIP1193Disconnect = (data) => {
    console.log('❌ EIP-1193 断开:', data);
    // 重置状态
    setState(prev => ({
      ...prev,
      isConnected: false,
      address: "0x" as Address,
      balance: "0.0000",
    }));
  };

  // 注册事件监听
  walletManager.on('accountsChanged', handleAccountsChanged);
  walletManager.on('chainChanged', handleChainChanged);
  walletManager.on('eip1193_disconnect', handleEIP1193Disconnect);

  return () => {
    // 清理事件监听
    walletManager.off('accountsChanged', handleAccountsChanged);
    walletManager.off('chainChanged', handleChainChanged);
    walletManager.off('eip1193_disconnect', handleEIP1193Disconnect);
  };
}, [walletManager, fetchBalance]);
```

### **阶段三：AccountDropdown UI 增强** (1-2天)

#### 3.1 实时状态显示
```typescript
// 新增状态
const [realtimeStatus, setRealtimeStatus] = useState({
  isListening: false,
  lastEvent: null,
  eventHistory: [],
  notifications: []
});

// 新增 UI 元素
const EventNotification = ({ event }) => (
  <div className="absolute top-12 right-0 bg-blue-50 border border-blue-200 rounded-lg p-3 z-50">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
      <span className="text-sm text-blue-700">
        {event.type === 'accountsChanged' && '账户已变更'}
        {event.type === 'chainChanged' && '链已切换'}
        {event.type === 'disconnect' && '钱包已断开'}
      </span>
    </div>
  </div>
);
```

#### 3.2 事件历史记录
```typescript
// 事件历史面板
const EventHistoryPanel = () => (
  <div className="border-t border-gray-100 my-2">
    <div className="px-3 py-1 text-xs text-gray-500 font-medium">
      实时事件日志
    </div>
    <div className="max-h-32 overflow-y-auto px-3 py-2">
      {realtimeStatus.eventHistory.map((event, index) => (
        <div key={index} className="text-xs text-gray-600 mb-1">
          <span className="font-mono">
            [{new Date(event.timestamp).toLocaleTimeString()}]
          </span>
          {' '}
          {event.message}
        </div>
      ))}
    </div>
  </div>
);
```

#### 3.3 连接状态指示器增强
```typescript
// 实时连接状态指示器
const ConnectionIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className={`w-2 h-2 rounded-full ${realtimeStatus.isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
    <span className="text-xs text-gray-600">
      {realtimeStatus.isListening ? '实时监听中' : '未监听'}
    </span>
  </div>
);
```

### **阶段四：用户体验优化** (1天)

#### 4.1 通知系统
```typescript
// Toast 通知组件
const useNotification = () => {
  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
    // 显示临时通知
  };

  return { showNotification };
};
```

#### 4.2 错误处理
```typescript
// 错误边界处理
const handleEIP1193Error = (error: any) => {
  console.error('EIP-1193 事件错误:', error);
  showNotification(`钱包事件错误: ${error.message}`, 'error');
};
```

#### 4.3 性能优化
```typescript
// 事件防抖处理
const debouncedEventHandler = useCallback(
  debounce((event) => {
    // 处理事件
  }, 300),
  []
);
```

## 📱 DApp 集成示例

### 基础使用
```tsx
import { WalletProvider, AccountDropdown } from '@ycdirectory/wallet-sdk';

function App() {
  return (
    <WalletProvider config={{ appName: 'My DApp' }}>
      <div>
        <h1>我的 DApp</h1>
        <AccountDropdown
          showBalance={true}
          showChainSwitcher={true}
          enableEIP1193Events={true}  // 🔥 新增属性
          onEIP1193Event={(event) => {
            console.log('EIP-1193 事件:', event);
          }}
        />
      </div>
    </WalletProvider>
  );
}
```

### 高级配置
```tsx
<AccountDropdown
  showBalance={true}
  showChainSwitcher={true}
  enableEIP1193Events={true}
  eip1193Config={{
    showNotifications: true,
    showEventHistory: true,
    autoRefreshBalance: true,
    debounceDelay: 500,
  }}
  onEIP1193Event={(event) => {
    // 处理 EIP-1193 事件
    switch (event.type) {
      case 'accountsChanged':
        console.log('账户变更:', event.data.accounts);
        break;
      case 'chainChanged':
        console.log('链切换:', event.data.chainId);
        break;
      case 'disconnect':
        console.log('钱包断开:', event.data.reason);
        break;
    }
  }}
/>
```

## 🧪 测试方案

### 1. 单元测试
```typescript
// WalletManager EIP-1193 测试
describe('WalletManager EIP-1193 Events', () => {
  test('should setup EIP-1193 event listeners', () => {
    // 测试事件监听器设置
  });

  test('should handle accountsChanged event', () => {
    // 测试账户变更处理
  });

  test('should handle chainChanged event', () => {
    // 测试链切换处理
  });
});
```

### 2. 集成测试
```typescript
// 组件集成测试
describe('AccountDropdown EIP-1193 Integration', () => {
  test('should update UI when accounts change', () => {
    // 测试 UI 自动更新
  });

  test('should show notifications for events', () => {
    // 测试通知显示
  });
});
```

### 3. 端到端测试
```typescript
// E2E 测试
describe('EIP-1193 E2E Flow', () => {
  test('complete wallet interaction flow', () => {
    // 测试完整的钱包交互流程
  });
});
```

## 📊 升级收益

### 1. **用户体验提升**
- ✅ **实时状态同步**：无需手动刷新
- ✅ **即时反馈**：操作立即生效
- ✅ **错误提示**：友好的错误信息
- ✅ **状态指示**：清晰的连接状态

### 2. **开发者体验改善**
- ✅ **标准接口**：符合 EIP-1193 标准
- ✅ **事件驱动**：响应式编程模式
- ✅ **类型安全**：完整的 TypeScript 支持
- ✅ **易于调试**：详细的事件日志

### 3. **技术架构优化**
- ✅ **标准化**：遵循行业标准
- ✅ **可扩展**：模块化设计
- ✅ **向后兼容**：不影响现有功能
- ✅ **性能优化**：事件防抖、内存管理

## 🔄 向后兼容性

### 现有 API 保持不变
```typescript
// 现有的使用方式完全兼容
<AccountDropdown
  showBalance={true}
  showChainSwitcher={true}
  onDisconnect={() => console.log('断开连接')}
/>
```

### 可选的增强功能
```typescript
// 新功能都是可选的
<AccountDropdown
  // 现有属性
  showBalance={true}

  // 🔥 新增的可选属性
  enableEIP1193Events={true}
  eip1193Config={customConfig}
  onEIP1193Event={eventHandler}
/>
```

## 📋 实施检查清单

### 开发阶段
- [ ] WalletManager EIP-1193 事件监听实现
- [ ] WalletProvider 事件集成
- [ ] AccountDropdown UI 增强
- [ ] 通知系统实现
- [ ] 错误处理机制

### 测试阶段
- [ ] 单元测试编写
- [ ] 集成测试验证
- [ ] 端到端测试
- [ ] 性能测试
- [ ] 兼容性测试

### 文档阶段
- [ ] API 文档更新
- [ ] 使用示例编写
- [ ] 迁移指南
- [ ] 故障排除指南

### 发布阶段
- [ ] 版本号更新
- [ ] 变更日志
- [ ] 发布说明
- [ ] 社区通知

---

这个升级方案在保持现有功能的基础上，添加了完整的 EIP-1193 标准事件监听支持，为 DApp 提供更好的实时用户体验和开发者友好的接口。