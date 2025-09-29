import type { Meta, StoryObj } from '@storybook/react';
import { AccountDropdown } from '../src';
import { WalletProvider } from '../src/wallet-sdk/components/WalletProvider';

const meta: Meta<typeof AccountDropdown> = {
  title: 'Wallet SDK/AccountDropdown',
  component: AccountDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showBalance: {
      control: { type: 'boolean' },
    },
    showChainSwitcher: {
      control: { type: 'boolean' },
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
    showBalance: true,
    showChainSwitcher: true,
    size: 'md',
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