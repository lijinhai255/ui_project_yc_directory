import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedConnectButton } from '../src';
import { WalletProvider } from '../src/wallet-sdk/components/WalletProvider';

const meta: Meta<typeof EnhancedConnectButton> = {
  title: 'Wallet SDK/EnhancedConnectButton',
  component: EnhancedConnectButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    showBalance: {
      control: { type: 'boolean' },
    },
    showChainSwitcher: {
      control: { type: 'boolean' },
    },
    label: {
      control: { type: 'text' },
    },
  },
  decorators: [
    (Story) => (
      <WalletProvider
        config={{
          appName: 'Storybook Demo',
          projectId: 'demo',
          chains: [],
        }}
      >
        <Story />
      </WalletProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '连接钱包',
    size: 'md',
    variant: 'primary',
    showBalance: true,
    showChainSwitcher: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const WithoutBalance: Story = {
  args: {
    ...Default.args,
    showBalance: false,
  },
};

export const WithoutChainSwitcher: Story = {
  args: {
    ...Default.args,
    showChainSwitcher: false,
  },
};

export const CustomLabel: Story = {
  args: {
    ...Default.args,
    label: '立即连接',
  },
};