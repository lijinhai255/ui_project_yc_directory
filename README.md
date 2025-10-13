# @yc-sdk/ui

A modern React UI component library with built-in wallet connectivity. Built with TypeScript, Tailwind CSS, and comprehensive Web3 integration.

## 🚀 Features

### 🎨 UI Components
- **Modern Design**: Clean, responsive components built with Tailwind CSS
- **TypeScript**: Full type safety and excellent developer experience
- **Customizable**: Easy to customize with Tailwind classes
- **Tree-shakable**: Only import what you need

### 🔗 Wallet Integration
- **Multiple Wallets**: MetaMask, OKX, Coinbase, Rabby, Trust Wallet
- **EIP-6963 Standard**: Modern wallet detection
- **Chain Switching**: Support for Ethereum, Polygon, BSC, Arbitrum, Optimism
- **Balance Tracking**: Real-time balance updates with caching
- **Token Support**: ERC-20 token balance queries
- **Auto-Reconnect**: Seamless reconnection on page refresh

## 📦 Installation

```bash
npm install @yc-sdk/ui
# or
yarn add @yc-sdk/ui
# or
pnpm add @yc-sdk/ui
```

## 🏁 Quick Start

### Basic Setup

```tsx
import { WalletProvider, EnhancedConnectButton } from '@yc-sdk/ui';
import '@yc-sdk/ui/dist/index.css'; // Import styles

function App() {
  return (
    <WalletProvider
      config={{
        appName: "My App",
        projectId: "your-project-id"
      }}
    >
      <EnhancedConnectButton
        showBalance={true}
        showChainSwitcher={true}
      />
    </WalletProvider>
  );
}
```

### Custom Integration

```tsx
import { Button, useWallet, WalletProvider } from '@yc-sdk/ui';

function CustomWalletButton() {
  const {
    isConnected,
    isConnecting,
    address,
    balance,
    connect,
    disconnect,
    switchChain
  } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        <span>{balance} ETH</span>
        <Button onClick={disconnect} variant="outline">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => connect('metamask')} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
```

## 📚 Components

### UI Components

#### Button
```tsx
import { Button } from '@yc-sdk/ui';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `className`: string

#### Card
```tsx
import { Card } from '@yc-sdk/ui';

<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### Input
```tsx
import { Input } from '@yc-sdk/ui';

<Input
  placeholder="Enter value"
  value={value}
  onChange={setValue}
/>
```

#### Badge
```tsx
import { Badge } from '@yc-sdk/ui';

<Badge variant="success">Active</Badge>
```

### Wallet Components

#### WalletProvider
The root provider that manages wallet state.

```tsx
import { WalletProvider } from '@yc-sdk/ui';

<WalletProvider
  config={{
    appName: "Your App Name",
    projectId: "your-walletconnect-project-id", // Optional
    chains: [mainnet, polygon], // Optional
    autoConnect: true, // Optional
  }}
>
  {children}
</WalletProvider>
```

#### EnhancedConnectButton
A complete wallet connection button with built-in UI.

```tsx
import { EnhancedConnectButton } from '@yc-sdk/ui';

<EnhancedConnectButton
  showBalance={true}
  showChainSwitcher={true}
  size="md"
  variant="primary"
  onConnect={(result) => console.log('Connected:', result)}
  onDisconnect={() => console.log('Disconnected')}
/>
```

#### AccountDropdown
A dropdown showing account info with actions.

```tsx
import { AccountDropdown } from '@yc-sdk/ui';

<AccountDropdown
  showBalance={true}
  showChainSwitcher={true}
  size="md"
/>
```

## 🪝 Hooks

### useWallet
The main hook for wallet functionality.

```tsx
import { useWallet } from '@yc-sdk/ui';

const {
  // Connection state
  isConnected,
  isConnecting,
  isDisconnected,

  // Wallet info
  address,
  chainId,
  balance,
  wallet,

  // Actions
  connect,
  disconnect,
  switchChain,

  // UI controls
  openModal,
  closeModal,

  // Balance management
  fetchBalance,
  balanceLoading,
  getTokenBalance,

  // Wallet detection
  walletInstances,
  detectedWallets,
  walletsLoading,
} = useWallet();
```

### Examples

#### Connect to specific wallet
```tsx
const { connect } = useWallet();

// Connect to MetaMask
await connect('metamask');

// Connect to OKX
await connect('okx');
```

#### Switch network
```tsx
const { switchChain } = useWallet();

// Switch to Polygon
await switchChain(137);

// Switch to BSC
await switchChain(56);
```

#### Get token balance
```tsx
const { getTokenBalance } = useWallet();

const tokenBalance = await getTokenBalance('0x...'); // ERC-20 contract address
console.log(tokenBalance.balance, tokenBalance.symbol);
```

## 🌐 Supported Networks

- **Ethereum Mainnet** (1)
- **Sepolia Testnet** (11155111)
- **Polygon** (137)
- **BNB Smart Chain** (56)
- **Arbitrum One** (42161)
- **Optimism** (10)

## 🔗 Supported Wallets

- **MetaMask** - Browser extension
- **OKX Wallet** - Browser extension
- **Coinbase Wallet** - Browser extension
- **Rabby Wallet** - Browser extension
- **Trust Wallet** - Browser extension
- **WalletConnect** - Mobile wallets (coming soon)

## 🎨 Styling

This library uses Tailwind CSS. Make sure to include Tailwind in your project:

```bash
npm install tailwindcss
```

Or import the pre-built styles:
```tsx
import '@yc-sdk/ui/dist/index.css';
```

## 📖 Advanced Usage

### Custom Wallet Modal
```tsx
import { useWallet, WalletModal } from '@yc-sdk/ui';

function CustomWalletFlow() {
  const {
    openModal,
    closeModal,
    isModalOpen,
    walletInstances,
    connect
  } = useWallet();

  return (
    <>
      <button onClick={openModal}>
        Connect Wallet
      </button>

      <WalletModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConnect={connect}
        title="Choose Your Wallet"
        walletInstances={walletInstances}
      />
    </>
  );
}
```

### Error Handling
```tsx
const { connect, error } = useWallet();

const handleConnect = async () => {
  try {
    await connect('metamask');
  } catch (err) {
    console.error('Connection failed:', err);
  }
};

if (error) {
  return <div>Error: {error.message}</div>;
}
```

### Event Listening
```tsx
useEffect(() => {
  const { address, chainId } = useWallet();

  console.log('Wallet connected:', { address, chainId });
}, [address, chainId]);
```

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build
pnpm build

# Start Storybook
pnpm storybook

# Run tests
pnpm test
```

## 📄 License

MIT © [YCDirectory](https://github.com/ycdirectory)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## 📞 Support

- 📧 Email: support@ycdirectory.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ycdirectory-ui/issues)
- 📖 Documentation: [Storybook](https://your-storybook-url.com)

---

Made with ❤️ by the YCDirectory team