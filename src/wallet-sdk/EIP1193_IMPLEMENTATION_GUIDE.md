# EIP-1193 标准事件监听实现指南

## 🎯 升级概述

基于现有的 `AccountDropdown` 组件，我们实现了一套完整的 EIP-1193 标准事件监听系统，为 DApp 提供实时的钱包状态同步能力。

## 📁 新增文件

```
packages/ui/src/wallet-sdk/
├── core/
│   └── WalletManager.ts                    # 🔥 增强了 EIP-1193 事件监听
├── components/
│   ├── AccountDropdown.tsx                 # 原有组件（保持不变）
│   └── EnhancedAccountDropdown.tsx          # 🔥 新增：支持 EIP-1193 的增强版
├── examples/
│   └── EIP1193_DApp_Example.tsx            # 🔥 新增：完整的 DApp 集成示例
├── EIP1193_UPGRADE_PLAN.md                 # 🔥 新增：详细升级方案
└── EIP1193_IMPLEMENTATION_GUIDE.md         # 🔥 新增：本实现指南
```

## 🔌 EIP-1193 事件监听功能

### 支持的标准事件

| 事件类型 | 触发时机 | 数据格式 | 说明 |
|---------|---------|---------|------|
| `accountsChanged` | 钱包账户变更 | `{ accounts: string[], address: string, walletId: string }` | 用户切换账户 |
| `chainChanged` | 网络链切换 | `{ chainId: number, chainIdHex: string, walletId: string }` | 网络切换 |
| `connect` | 钱包连接 | `{ chainId: number, chainIdHex: string, walletId: string }` | 钱包连接 |
| `disconnect` | 钱包断开 | `{ code: number, message: string, walletId: string }` | 钱包断开 |

### 实时状态同步

- ✅ **账户变更**：自动检测钱包账户切换，更新 DApp 状态
- ✅ **链切换**：实时响应网络切换，刷新相关数据
- ✅ **连接状态**：监听钱包连接/断开事件
- ✅ **错误处理**：友好的错误提示和恢复机制

## 🚀 快速开始

### 1. 基础使用（向后兼容）

现有的 `AccountDropdown` 组件完全兼容，无需修改现有代码：

```tsx
import { AccountDropdown } from '@ycdirectory/wallet-sdk';

function App() {
  return (
    <AccountDropdown
      showBalance={true}
      showChainSwitcher={true}
      onDisconnect={() => console.log('断开连接')}
    />
  );
}
```

### 2. 启用 EIP-1193 功能

使用新增的 `EnhancedAccountDropdown` 组件：

```tsx
import { EnhancedAccountDropdown } from '@ycdirectory/wallet-sdk';

function App() {
  return (
    <EnhancedAccountDropdown
      showBalance={true}
      showChainSwitcher={true}

      // 🔥 启用 EIP-1193 事件监听
      enableEIP1193Events={true}
      showEventHistory={true}
      showNotifications={true}

      // 🔥 事件处理器
      onEIP1193Event={(event) => {
        console.log('EIP-1193 事件:', event);

        switch (event.type) {
          case 'accountsChanged':
            console.log('账户变更:', event.data.address);
            break;
          case 'chainChanged':
            console.log('链切换:', event.data.chainId);
            break;
          case 'disconnect':
            console.log('钱包断开:', event.data.message);
            break;
        }
      }}

      onDisconnect={() => console.log('断开连接')}
    />
  );
}
```

### 3. 完整的 DApp 集成

```tsx
import React from 'react';
import {
  WalletProvider,
  EnhancedAccountDropdown,
  useWallet
} from '@ycdirectory/wallet-sdk';

function DAppExample() {
  return (
    <WalletProvider
      config={{
        appName: 'My DApp',
        autoConnect: true,
        chains: [
          {
            id: 1,
            name: 'Ethereum',
            network: 'homestead',
            nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
            rpcUrls: { default: { http: ['https://eth.public-rpc.com'] } },
          },
          {
            id: 137,
            name: 'Polygon',
            network: 'matic',
            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
            rpcUrls: { default: { http: ['https://polygon-rpc.com'] } },
          }
        ]
      }}
    >
      <MyApp />
    </WalletProvider>
  );
}

function MyApp() {
  const { isConnected, address, balance, chainId } = useWallet();

  return (
    <div>
      <h1>My DApp</h1>

      {/* 🔥 增强的钱包组件 */}
      <EnhancedAccountDropdown
        enableEIP1193Events={true}
        showEventHistory={true}
        showNotifications={true}
        onEIP1193Event={handleEIP1193Event}
      />

      {/* 应用内容 */}
      {isConnected && (
        <div>
          <p>地址: {address}</p>
          <p>余额: {balance} ETH</p>
          <p>链ID: {chainId}</p>
        </div>
      )}
    </div>
  );
}

function handleEIP1193Event(event: any) {
  // 处理 EIP-1193 事件
  switch (event.type) {
    case 'accountsChanged':
      // 用户切换了账户
      window.location.reload(); // 重新加载页面以重置状态
      break;

    case 'chainChanged':
      // 用户切换了网络
      console.log('网络已切换到:', event.data.chainId);
      break;

    case 'disconnect':
      // 钱包断开连接
      window.location.reload();
      break;
  }
}

export default DAppExample;
```

## 🔧 组件 API

### EnhancedAccountDropdown Props

```typescript
interface EnhancedAccountDropdownProps {
  // 原有属性（完全兼容）
  className?: string;
  showBalance?: boolean;
  showChainSwitcher?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onDisconnect?: () => void;

  // 🔥 新增 EIP-1193 属性
  enableEIP1193Events?: boolean;     // 启用 EIP-1193 事件监听
  showEventHistory?: boolean;       // 显示事件历史面板
  showNotifications?: boolean;      // 显示实时通知
  onEIP1193Event?: (event: EIP1193Event) => void; // 事件处理器
}
```

### EIP1193Event 接口

```typescript
interface EIP1193Event {
  type: 'accountsChanged' | 'chainChanged' | 'connect' | 'disconnect';
  data: {
    // accountsChanged
    accounts?: string[];
    address?: string;

    // chainChanged
    chainId?: number;
    chainIdHex?: string;

    // disconnect
    code?: number;
    message?: string;

    // 通用
    walletId?: string;
  };
  timestamp: number;
}
```

## 🎨 UI 增强功能

### 1. 实时状态指示器

在连接状态指示器旁边添加了小圆点，显示 EIP-1193 监听状态：
- 🟢 **绿色闪烁**：正在监听 EIP-1193 事件
- ⚫ **灰色**：未监听事件

### 2. 实时通知系统

自动显示临时通知，提示用户钱包状态变化：
- 🔵 **蓝色**：账户变更
- 🟢 **绿色**：网络切换成功
- 🟡 **黄色**：钱包断开连接
- 🔴 **红色**：错误信息

### 3. 事件历史面板

在下拉菜单中显示最近的事件历史：
- 事件类型和时间戳
- 相关数据（链ID、地址等）
- 一键清空历史功能

### 4. 增强的状态显示

- 显示"实时监听"标签
- 最后事件信息
- 事件计数器

## 🧪 测试指南

### 手动测试步骤

1. **连接测试**
   ```tsx
   // 连接钱包后，检查是否显示"实时监听"标签
   <EnhancedAccountDropdown enableEIP1193Events={true} />
   ```

2. **账户切换测试**
   - 在钱包中切换账户
   - 观察是否出现账户变更通知
   - 检查事件历史记录

3. **网络切换测试**
   - 在钱包中切换网络
   - 观察是否出现网络切换通知
   - 检查链ID是否正确更新

4. **断开连接测试**
   - 在钱包中断开连接
   - 观察是否出现断开连接通知
   - 检查DApp状态是否正确重置

### 自动化测试示例

```typescript
// EIP-1193 事件测试
describe('EnhancedAccountDropdown EIP-1193', () => {
  test('should handle accountsChanged event', () => {
    const onEIP1193Event = jest.fn();

    render(
      <EnhancedAccountDropdown
        enableEIP1193Events={true}
        onEIP1193Event={onEIP1193Event}
      />
    );

    // 模拟账户变更事件
    fireEvent(window, new CustomEvent('accountsChanged', {
      detail: ['0x1234567890123456789012345678901234567890']
    }));

    expect(onEIP1193Event).toHaveBeenCalledWith({
      type: 'accountsChanged',
      data: expect.objectContaining({
        address: '0x1234567890123456789012345678901234567890'
      }),
      timestamp: expect.any(Number)
    });
  });
});
```

## 🔧 开发者工具

### 事件调试

在浏览器控制台中查看详细的事件日志：

```javascript
// 启用详细日志
localStorage.setItem('wallet-sdk-debug', 'true');

// 查看当前监听状态
console.log('EIP-1193 监听状态:', window.walletSDK?.isEIP1193Listening());

// 手动触发事件检查
window.walletSDK?.checkEIP1193Events();
```

### 性能监控

```typescript
// 监控事件处理性能
const startTime = performance.now();
// ... 事件处理
const endTime = performance.now();
console.log(`事件处理耗时: ${endTime - startTime}ms`);
```

## 📋 迁移指南

### 从 AccountDropdown 迁移

1. **保持现有代码不变**
   ```tsx
   // 现有代码无需修改
   <AccountDropdown showBalance={true} />
   ```

2. **渐进式升级**
   ```tsx
   // 第一步：引入增强组件
   import { EnhancedAccountDropdown } from '@ycdirectory/wallet-sdk';

   // 第二步：替换组件名
   <EnhancedAccountDropdown showBalance={true} />

   // 第三步：启用 EIP-1193 功能
   <EnhancedAccountDropdown
     showBalance={true}
     enableEIP1193Events={true}
   />
   ```

3. **完整功能启用**
   ```tsx
   <EnhancedAccountDropdown
     showBalance={true}
     enableEIP1193Events={true}
     showEventHistory={true}
     showNotifications={true}
     onEIP1193Event={handleEIP1193Event}
   />
   ```

## 🐛 故障排除

### 常见问题

1. **事件监听不工作**
   ```typescript
   // 检查是否启用 EIP-1193 功能
   console.log('EIP-1193 启用状态:', enableEIP1193Events);

   // 检查钱包是否支持 EIP-1193
   console.log('Provider 支持:', !!provider.on);
   ```

2. **通知不显示**
   ```typescript
   // 检查通知设置
   console.log('通知设置:', showNotifications);

   // 检查事件历史
   console.log('事件历史:', eip1193Events);
   ```

3. **性能问题**
   ```typescript
   // 使用事件防抖
   const debouncedHandler = useCallback(
     debounce(handleEIP1193Event, 300),
     []
   );
   ```

### 调试技巧

1. **启用调试模式**
   ```typescript
   <EnhancedAccountDropdown
     enableEIP1193Events={true}
     debug={true}  // 显示详细日志
   />
   ```

2. **事件监控**
   ```typescript
   // 添加事件监控
   useEffect(() => {
     const monitorEvents = () => {
       console.log('事件历史更新:', eip1193Events.length);
     };

     monitorEvents();
   }, [eip1193Events]);
   ```

## 🎯 最佳实践

### 1. 事件处理

```typescript
// 推荐的事件处理方式
const handleEIP1193Event = useCallback((event: EIP1193Event) => {
  // 防抖处理，避免频繁操作
  const debouncedHandler = debounce(() => {
    switch (event.type) {
      case 'accountsChanged':
        // 重新加载用户数据
        refetchUserData();
        break;
      case 'chainChanged':
        // 重新加载链相关数据
        refetchChainData();
        break;
      case 'disconnect':
        // 清理用户状态
        clearUserState();
        break;
    }
  }, 500);

  debouncedHandler();
}, [refetchUserData, refetchChainData, clearUserState]);
```

### 2. 性能优化

```typescript
// 使用 React.memo 优化渲染
const OptimizedDropdown = React.memo(EnhancedAccountDropdown);

// 使用 useMemo 缓存计算
const memoizedEventData = useMemo(() => {
  return eip1193Events.map(event => ({
    ...event,
    formattedTime: new Date(event.timestamp).toLocaleTimeString()
  }));
}, [eip1193Events]);
```

### 3. 错误处理

```typescript
// 完善的错误处理
const handleEIP1193Event = useCallback((event: EIP1193Event) => {
  try {
    // 处理事件
    processEvent(event);
  } catch (error) {
    console.error('EIP-1193 事件处理失败:', error);

    // 显示用户友好的错误信息
    showNotification('钱包状态同步失败，请刷新页面', 'error');

    // 上报错误
    trackError(error, { event });
  }
}, [showNotification]);
```

## 📈 未来计划

### 短期目标
- [ ] 完善 EIP-1193 事件覆盖
- [ ] 优化性能和内存使用
- [ ] 增加更多钱包兼容性
- [ ] 完善测试覆盖率

### 长期目标
- [ ] 支持更多 EIP 标准（EIP-6963, EIP-2255 等）
- [ ] 实现钱包状态持久化
- [ ] 添加钱包状态分析功能
- [ ] 支持多钱包同时连接

---

这个 EIP-1193 实现在保持完全向后兼容的基础上，为 DApp 提供了强大的实时钱包状态监听能力，大大提升了用户体验和开发者体验。