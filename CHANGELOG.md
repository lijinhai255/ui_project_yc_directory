# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-29

### Added

#### 🎨 Core UI Components
- **Button**: Modern button component with multiple variants (primary, secondary, outline, ghost) and sizes (sm, md, lg)
- **Card**: Flexible card component for content organization
- **Input**: Form input component with proper styling
- **Badge**: Status and label badge component

#### 🔗 Wallet Integration
- **WalletProvider**: Complete wallet management context provider
- **useWallet**: Comprehensive hook for wallet functionality
- **EnhancedConnectButton**: All-in-one wallet connection button with built-in UI
- **AccountDropdown**: Account information dropdown with wallet actions
- **WalletModal**: Modal for wallet selection with EIP-6963 support

#### 🌐 Multi-Wallet Support
- MetaMask browser extension
- OKX Wallet browser extension
- Coinbase Wallet browser extension
- Rabby Wallet browser extension
- Trust Wallet browser extension
- Automatic wallet detection via EIP-6963 standard

#### 🔄 Chain Management
- Support for Ethereum Mainnet, Sepolia Testnet, Polygon, BSC, Arbitrum, and Optimism
- Seamless chain switching with automatic network addition
- Real-time chain state synchronization

#### 💰 Balance & Token Features
- Real-time native balance tracking with automatic refresh
- ERC-20 token balance queries with caching
- Balance formatting and display utilities
- Manual balance refresh functionality

#### 🔧 Developer Experience
- Full TypeScript support with comprehensive type definitions
- Tree-shakable exports for optimal bundle size
- Tailwind CSS integration with utility classes
- Comprehensive error handling and logging
- Auto-reconnection on page refresh

#### 📚 Documentation
- Complete API documentation with usage examples
- Storybook integration for component development
- Quick start guides and advanced usage patterns
- Migration guides and best practices

### Technical Details

#### Dependencies
- **React**: ^18.2.0 (peer dependency)
- **viem**: ^2.37.9 for Ethereum interactions
- **wagmi**: ^2.17.5 for wallet management
- **@wagmi/core**: ^2.21.2 for core functionality
- **ethers**: ^6.15.0 for additional utilities
- **@rainbow-me/rainbowkit**: ^2.2.8 for enhanced wallet UX

#### Build System
- **tsup**: Modern TypeScript bundler with ESM and CJS outputs
- **Storybook**: Component documentation and development
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code quality and consistency
- **TypeScript**: Full type safety and IntelliSense

#### Supported Networks
- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111)
- Polygon (Chain ID: 137)
- BNB Smart Chain (Chain ID: 56)
- Arbitrum One (Chain ID: 42161)
- Optimism (Chain ID: 10)

### Notes

This is the initial release of ycdirectory-ui, providing a complete solution for React applications that need modern UI components with integrated Web3 wallet functionality. The library is designed to be lightweight, type-safe, and easy to integrate into existing projects.

For detailed usage instructions and examples, see the [README.md](./README.md) file.