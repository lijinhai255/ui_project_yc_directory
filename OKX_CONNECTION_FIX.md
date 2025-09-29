# OKX Wallet Connection Hanging Fix

## Issue Identified
The OKX Wallet was hanging during the connection process, specifically at the `provider.request({ method: 'eth_requestAccounts' })` call. This prevented users from completing the wallet connection.

## Root Cause
Some wallet providers may hang or not respond properly to RPC calls without proper timeout handling. The connection process was getting stuck indefinitely waiting for a response.

## Solution Implemented
Added comprehensive timeout protection to both EIP-6963 and Legacy wallet connection methods:

### 1. Timeout Protection for Account Requests
```typescript
// 添加超时保护
const timeoutPromise = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('连接请求超时')), 30000);
});

const accountsPromise = provider.request({
  method: 'eth_requestAccounts'
});

const accounts = await Promise.race([accountsPromise, timeoutPromise]) as any;
```

### 2. Timeout Protection for Chain ID Requests
```typescript
try {
  const chainIdPromise = this.getChainIdAsNumber(provider);
  const chainId = await Promise.race([chainIdPromise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('获取链ID超时')), 10000);
    })
  ]);

  return { accounts: accountsArray, chainId };
} catch (chainError) {
  console.warn(`⚠️ ${name} 获取链ID失败，使用默认值:`, chainError);
  return { accounts: accountsArray, chainId: 1 }; // 默认主网
}
```

### 3. Key Features
- **30-second timeout** for account requests (wallet connection prompts)
- **10-second timeout** for chain ID requests
- **Graceful fallback** - uses mainnet (chainId: 1) if chain ID fetch fails
- **Error handling** - prevents infinite hanging
- **Comprehensive logging** - tracks timeout events and fallbacks

## Files Modified
- `/src/wallet-sdk/core/WalletManager.ts` - Added timeout protection to both connection methods

## Build Status
✅ Build successful - no TypeScript errors

## Testing
The timeout protection ensures that:
1. Users won't experience infinite loading states
2. Connection attempts fail gracefully with clear error messages
3. The UI remains responsive even if wallet providers are unresponsive
4. Fallback values prevent complete connection failures

## Expected Behavior
Now when users click OKX Wallet:
1. Connection process starts with timeout protection
2. If wallet doesn't respond within 30 seconds, shows timeout error
3. If chain ID request fails, defaults to mainnet (chainId: 1)
4. Users can retry connection or try different wallets
5. No more infinite "connecting..." states

This fix applies to all wallet types (MetaMask, OKX, Coinbase, Trust, Rabby) for consistent behavior.