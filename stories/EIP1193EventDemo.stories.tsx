import type { Meta, StoryObj } from '@storybook/react';
import { WalletProvider } from '../src/wallet-sdk';
import EIP1193EventDemo from '../src/wallet-sdk/components/EIP1193EventDemo';

const meta: Meta<typeof EIP1193EventDemo> = {
  title: 'Wallet SDK/EIP1193EventDemo',
  component: EIP1193EventDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
EIP-1193 事件监听演示组件，用于展示和对比标准 EIP-1193 事件与钱包 SDK 的状态管理。

## 功能特性

- **实时事件监听**: 监听 EIP-1193 标准事件（accountsChanged, chainChanged, connect, disconnect）
- **事件日志显示**: 实时显示所有触发的事件，包含详细信息和时间戳
- **状态对比**: 对比 EIP-1193 事件与 SDK 内部状态管理
- **交互式界面**: 提供连接/断开操作和事件日志清空功能

## EIP-1193 事件类型

1. **accountsChanged**: 当钱包账户变更时触发
2. **chainChanged**: 当钱包切换链时触发
3. **connect**: 当钱包连接时触发（EIP-1193 标准）
4. **disconnect**: 当钱包断开连接时触发（EIP-1193 标准）

## 使用场景

- 学习和理解 EIP-1193 标准
- 调试钱包事件处理
- 对比不同钱包的事件行为
- 验证钱包 SDK 的事件监听实现
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <WalletProvider
        config={{
          appName: 'EIP-1193 Event Demo',
          projectId: 'demo-project-id',
        }}
      >
        <div style={{ minWidth: '800px', maxWidth: '1200px' }}>
          <Story />
        </div>
      </WalletProvider>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      description: '额外的 CSS 类名',
    },
    showBalance: {
      control: 'boolean',
      description: '是否显示余额信息',
    },
    showChain: {
      control: 'boolean',
      description: '是否显示链信息',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 默认故事
export const Default: Story = {
  args: {
    showBalance: true,
    showChain: true,
  },
  parameters: {
    docs: {
      description: {
        story: '基础的 EIP-1193 事件演示，包含余额和链信息显示。连接钱包后可以实时查看所有 EIP-1193 事件。',
      },
    },
  },
};

// 简化版本
export const Simple: Story = {
  args: {
    showBalance: false,
    showChain: false,
  },
  parameters: {
    docs: {
      description: {
        story: '简化版本，只显示连接状态和事件日志，专注于 EIP-1193 事件的监听和展示。',
      },
    },
  },
};

// 自定义样式
export const CustomStyled: Story = {
  args: {
    className: 'shadow-xl border-blue-300',
    showBalance: true,
    showChain: true,
  },
  parameters: {
    docs: {
      description: {
        story: '带有自定义样式的版本，展示了如何通过 className 属性自定义组件外观。',
      },
    },
  },
};

// 交互指南故事
export const InteractiveGuide: Story = {
  args: {
    showBalance: true,
    showChain: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
## 交互测试指南

使用这个组件测试 EIP-1193 事件的完整流程：

### 1. 连接钱包
- 点击"连接钱包"按钮
- 在弹出的钱包选择器中选择一个钱包
- 观察连接成功后的事件日志

### 2. 账户变更测试
- 在钱包中切换账户
- 观察 \`accountsChanged\` 事件的触发
- 查看账户地址的实时更新

### 3. 链切换测试
- 在钱包中切换不同的链（如 Ethereum → Polygon）
- 观察 \`chainChanged\` 事件的触发
- 查看链ID和链名称的更新

### 4. 断开连接测试
- 点击"断开连接"按钮
- 观察 \`disconnect\` 事件的触发
- 查看组件状态的清理

### 5. 事件日志分析
- 点击"查看详细数据"展开事件的完整信息
- 观察事件的时间戳和数据结构
- 使用"清空日志"按钮重置事件历史

通过这个演示，你可以深入理解 EIP-1193 标准的工作原理和钱包事件的处理机制。
        `,
      },
    },
  },
};