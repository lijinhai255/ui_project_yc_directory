"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  AccountDropdown: () => AccountDropdown_default,
  Badge: () => Badge,
  Button: () => Button,
  Card: () => Card,
  ConnectButton: () => ConnectButton_default,
  EnhancedConnectButton: () => EnhancedConnectButton_default,
  Input: () => Input,
  WalletManager: () => WalletManager,
  WalletModal: () => WalletModal_default,
  WalletProvider: () => WalletProvider,
  useWallet: () => useWallet,
  version: () => version
});
module.exports = __toCommonJS(index_exports);

// src/components/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-300",
    outline: "bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500"
  };
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  };
  const baseClasses = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`,
      disabled: disabled || loading,
      ...props,
      children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
        ] }),
        children
      ] }) : children
    }
  );
};

// src/components/Card.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Card = ({
  title,
  children,
  footer,
  shadow = "md",
  className = ""
}) => {
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `bg-white rounded-lg border border-secondary-200 overflow-hidden ${shadowClasses[shadow]} ${className}`, children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-6 py-4 border-b border-secondary-200", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-lg font-medium text-secondary-900", children: title }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-6 py-4", children }),
    footer && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-6 py-4 bg-secondary-50 border-t border-secondary-200", children: footer })
  ] });
};

// src/components/Input.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = ({
  label,
  helpText,
  error,
  size = "md",
  prefix,
  suffix,
  fullWidth = false,
  className = "",
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-5 text-lg"
  };
  const baseClasses = "block border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors";
  const widthClass = fullWidth ? "w-full" : "";
  const stateClasses = error ? "border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" : "border-secondary-300 text-secondary-900 placeholder-secondary-400";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `${widthClass}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "label",
      {
        htmlFor: inputId,
        className: "block text-sm font-medium text-secondary-700 mb-1",
        children: label
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
      prefix && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: prefix }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          id: inputId,
          className: `
            ${baseClasses}
            ${sizeClasses[size]}
            ${stateClasses}
            ${prefix ? "pl-10" : ""}
            ${suffix ? "pr-10" : ""}
            ${widthClass}
            ${className}
          `,
          ...props
        }
      ),
      suffix && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none", children: suffix })
    ] }),
    helpText && !error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-1 text-sm text-secondary-500", children: helpText }),
    error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "mt-1 text-sm text-red-600", children: error })
  ] });
};

// src/components/Badge.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var Badge = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className = ""
}) => {
  const variantClasses = {
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800"
  };
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1"
  };
  const roundedClass = rounded ? "rounded-full" : "rounded";
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "span",
    {
      className: `inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${className}`,
      children
    }
  );
};

// src/wallet-sdk/utils/SignerFactory.ts
var SignerFactory = class _SignerFactory {
  /**
   * 从 Provider 创建 Signer
   * @param provider 以太坊提供者
   * @param address 钱包地址
   * @returns WalletSigner 实例
   */
  static createFromProvider(provider, address) {
    return {
      provider,
      getAddress: () => address,
      signMessage: async (message) => {
        try {
          return await provider.request({
            method: "personal_sign",
            params: [message, address]
          });
        } catch (error) {
          console.error("\u7B7E\u540D\u6D88\u606F\u5931\u8D25:", error);
          throw new Error("\u7B7E\u540D\u6D88\u606F\u5931\u8D25");
        }
      },
      signTransaction: async (transaction) => {
        try {
          return await provider.request({
            method: "eth_signTransaction",
            params: [transaction]
          });
        } catch (error) {
          console.error("\u7B7E\u540D\u4EA4\u6613\u5931\u8D25:", error);
          throw new Error("\u7B7E\u540D\u4EA4\u6613\u5931\u8D25");
        }
      },
      sendTransaction: async (transaction) => {
        try {
          return await provider.request({
            method: "eth_sendTransaction",
            params: [transaction]
          });
        } catch (error) {
          console.error("\u53D1\u9001\u4EA4\u6613\u5931\u8D25:", error);
          throw new Error("\u53D1\u9001\u4EA4\u6613\u5931\u8D25");
        }
      },
      getNonce: async (blockTag) => {
        try {
          const result = await provider.request({
            method: "eth_getTransactionCount",
            params: [address, blockTag || "latest"]
          });
          return parseInt(result, 16);
        } catch (error) {
          console.error("\u83B7\u53D6 nonce \u5931\u8D25:", error);
          throw new Error("\u83B7\u53D6 nonce \u5931\u8D25");
        }
      },
      connect: (newProvider) => {
        return _SignerFactory.createFromProvider(newProvider, address);
      }
    };
  }
  /**
   * 安全转换 Signer
   * @param signer 未知类型的 signer
   * @returns 安全的 WalletSigner 或 undefined
   */
  static ensureSafe(signer) {
    if (!signer || typeof signer !== "object") {
      return void 0;
    }
    const signerObj = signer;
    if (typeof signerObj.getAddress === "function" && typeof signerObj.signMessage === "function") {
      return {
        provider: signerObj.provider,
        getAddress: signerObj.getAddress(),
        signMessage: signerObj.signMessage,
        connect: typeof signerObj.connect === "function" ? signerObj.connect : void 0,
        getNonce: typeof signerObj.getNonce === "function" ? signerObj.getNonce : void 0,
        signTransaction: typeof signerObj.signTransaction === "function" ? signerObj.signTransaction : void 0,
        sendTransaction: typeof signerObj.sendTransaction === "function" ? signerObj.sendTransaction : void 0
      };
    }
    return void 0;
  }
};

// src/wallet-sdk/core/WalletManager.ts
var WalletManager = class {
  constructor() {
    this.wallets = /* @__PURE__ */ new Map();
    this.initialized = false;
    // 事件系统
    this.eventHandlers = /* @__PURE__ */ new Map();
  }
  initialize() {
    if (this.initialized) {
      console.log("\u{1F504} WalletManager \u5DF2\u7ECF\u521D\u59CB\u5316\uFF0C\u8FD4\u56DE\u73B0\u6709\u94B1\u5305");
      return this.getWallets();
    }
    console.log("\u{1F680} \u521D\u59CB\u5316 WalletManager...");
    this.detectWallets();
    this.initialized = true;
    console.log("\u2705 WalletManager \u521D\u59CB\u5316\u5B8C\u6210");
    return this.getWallets();
  }
  isInitialized() {
    return this.initialized;
  }
  async connectWallet(walletId) {
    debugger;
    console.log(`\u{1F50C} WalletManager \u8FDE\u63A5\u94B1\u5305: ${walletId}`);
    const wallet = this.getWalletById(walletId);
    if (!wallet) {
      throw new Error(`\u94B1\u5305 ${walletId} \u672A\u627E\u5230\u6216\u672A\u5B89\u88C5`);
    }
    if (!wallet.createConnector) {
      throw new Error(`\u94B1\u5305 ${wallet.name} \u7F3A\u5C11\u8FDE\u63A5\u5668`);
    }
    try {
      const connector = wallet.createConnector();
      const result = await connector.connect();
      console.log(`\u{1F389} ${wallet.name} \u8FDE\u63A5\u5668\u8FD4\u56DE\u7ED3\u679C:`, result);
      if (!result.accounts || result.accounts.length === 0) {
        throw new Error("\u8FDE\u63A5\u5668\u672A\u8FD4\u56DE\u8D26\u6237\u4FE1\u606F");
      }
      const address = result.accounts[0];
      const provider = connector.provider || wallet.provider;
      const chainId = result.chainId || await this.getChainIdSafe(provider);
      const connectionResult = {
        success: true,
        address,
        chainId,
        wallet: {
          id: wallet.id,
          name: wallet.name,
          installed: wallet.installed
        },
        provider,
        signer: SignerFactory.createFromProvider(provider, address)
      };
      console.log(`\u2705 ${wallet.name} \u6700\u7EC8\u8FDE\u63A5\u7ED3\u679C:`, connectionResult);
      this.emit("connect", {
        address,
        chainId,
        walletId: wallet.id,
        wallet: {
          id: wallet.id,
          name: wallet.name,
          installed: wallet.installed
        }
      });
      return connectionResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF";
      console.error(`\u274C \u8FDE\u63A5\u94B1\u5305 ${wallet.name} \u5931\u8D25:`, error);
      throw new Error(`\u8FDE\u63A5\u94B1\u5305\u5931\u8D25: ${errorMessage}`);
    }
  }
  async disconnectWallet(walletId) {
    console.log(`\u{1F50C} WalletManager \u65AD\u5F00\u94B1\u5305: ${walletId}`);
    if (!walletId) {
      console.warn("\u26A0\uFE0F \u94B1\u5305ID\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u65AD\u5F00\u8FDE\u63A5");
      return;
    }
    const wallet = this.getWalletById(walletId);
    if (!wallet) {
      console.warn(`\u26A0\uFE0F \u94B1\u5305 ${walletId} \u672A\u627E\u5230\uFF0C\u8DF3\u8FC7\u65AD\u5F00\u8FDE\u63A5`);
      return;
    }
    if (!wallet.createConnector) {
      console.warn(`\u26A0\uFE0F \u94B1\u5305 ${wallet.name} \u7F3A\u5C11\u8FDE\u63A5\u5668\uFF0C\u8DF3\u8FC7\u65AD\u5F00\u8FDE\u63A5`);
      return;
    }
    try {
      const connector = wallet.createConnector();
      if (connector.disconnect) {
        await connector.disconnect();
        console.log(`\u2705 \u94B1\u5305 ${wallet.name} \u65AD\u5F00\u8FDE\u63A5\u6210\u529F`);
      } else {
        console.log(`\u2139\uFE0F \u94B1\u5305 ${wallet.name} \u4E0D\u652F\u6301\u7A0B\u5E8F\u5316\u65AD\u5F00\u8FDE\u63A5`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF";
      console.error(`\u274C \u65AD\u5F00\u94B1\u5305 ${wallet.name} \u5931\u8D25:`, error);
    }
  }
  async disconnectAll() {
    console.log("\u{1F50C} WalletManager \u65AD\u5F00\u6240\u6709\u94B1\u5305\u8FDE\u63A5");
    const wallets = this.getWallets();
    const disconnectPromises = wallets.map(
      (wallet) => this.disconnectWallet(wallet.id).catch((error) => {
        console.warn(`\u65AD\u5F00\u94B1\u5305 ${wallet.name} \u65F6\u51FA\u9519:`, error);
      })
    );
    await Promise.allSettled(disconnectPromises);
    console.log("\u2705 \u6240\u6709\u94B1\u5305\u65AD\u5F00\u8FDE\u63A5\u5B8C\u6210");
  }
  async getChainIdSafe(provider) {
    try {
      const chainIdHex = await provider.request({ method: "eth_chainId" });
      if (typeof chainIdHex === "string" && /^0x[0-9a-fA-F]+$/.test(chainIdHex)) {
        return parseInt(chainIdHex, 16);
      }
    } catch (error) {
      console.warn("\u83B7\u53D6\u94FE ID \u5931\u8D25:", error);
    }
    return void 0;
  }
  detectWallets() {
    if (typeof window === "undefined") {
      console.log("\u26A0\uFE0F \u975E\u6D4F\u89C8\u5668\u73AF\u5883\uFF0C\u8DF3\u8FC7\u94B1\u5305\u68C0\u6D4B");
      return;
    }
    console.log("\u{1F50D} \u5F00\u59CB\u68C0\u6D4B\u94B1\u5305...");
    this.detectEIP6963Wallets();
    this.detectLegacyWallets();
    console.log(`\u{1F3AF} \u68C0\u6D4B\u5B8C\u6210\uFF0C\u627E\u5230 ${this.wallets.size} \u4E2A\u94B1\u5305`);
  }
  detectEIP6963Wallets() {
    const announceEvent = "eip6963:announceProvider";
    const requestEvent = "eip6963:requestProvider";
    const handleAnnounce = (event) => {
      const announceEvent2 = event;
      const detail = announceEvent2.detail;
      this.addWallet(detail);
    };
    window.addEventListener(announceEvent, handleAnnounce);
    window.dispatchEvent(new Event(requestEvent));
  }
  detectLegacyWallets() {
    const windowEth = window;
    const ethereum = this.getEthereumProvider(windowEth);
    if (!ethereum) {
      console.log("\u26A0\uFE0F \u672A\u627E\u5230 window.ethereum");
      return;
    }
    const provider = ethereum;
    if (provider.isMetaMask) {
      this.addLegacyWallet("metamask", "MetaMask", provider);
    }
    if (provider.isOkxWallet || windowEth.okxwallet) {
      const okxProvider = windowEth.okxwallet || provider;
      this.addLegacyWallet("okx", "OKX Wallet", okxProvider);
    }
    if (provider.isCoinbaseWallet) {
      this.addLegacyWallet("coinbase", "Coinbase Wallet", provider);
    } else {
      const coinbaseProvider = this.getCoinbaseWalletExtension(windowEth);
      if (coinbaseProvider) {
        this.addLegacyWallet("coinbase", "Coinbase Wallet", coinbaseProvider);
      }
    }
    if (provider.isRabby || windowEth.rabby) {
      const rabbyProvider = windowEth.rabby || provider;
      this.addLegacyWallet("rabby", "Rabby Wallet", rabbyProvider);
    }
    if (provider.isTrust || windowEth.trustWallet) {
      const trustProvider = windowEth.trustWallet || provider;
      this.addLegacyWallet("trust", "Trust Wallet", trustProvider);
    }
  }
  getEthereumProvider(windowEth) {
    try {
      const ethereum = windowEth.ethereum;
      if (ethereum && typeof ethereum === "object" && "request" in ethereum && typeof ethereum.request === "function") {
        return ethereum;
      }
    } catch (error) {
      console.warn("\u83B7\u53D6 ethereum provider \u5931\u8D25:", error);
    }
    return null;
  }
  getCoinbaseWalletExtension(windowEth) {
    try {
      const coinbaseExtension = windowEth.coinbaseWalletExtension;
      if (coinbaseExtension && typeof coinbaseExtension === "object" && "request" in coinbaseExtension && typeof coinbaseExtension.request === "function") {
        return coinbaseExtension;
      }
    } catch (error) {
      console.warn("\u83B7\u53D6 Coinbase Wallet Extension \u5931\u8D25:", error);
    }
    return null;
  }
  addWallet(detail) {
    const wallet = {
      id: this.normalizeWalletId(detail.info.rdns),
      name: detail.info.name,
      icon: detail.info.icon,
      rdns: detail.info.rdns,
      provider: detail.provider,
      installed: true,
      type: "eip6963",
      createConnector: () => this.createStandardConnector(detail.provider, detail.info.name)
    };
    console.log(`\u{1F50D} \u68C0\u6D4B\u5230\u94B1\u5305 (EIP-6963): ${wallet.name}`, wallet);
    this.wallets.set(wallet.id, wallet);
  }
  addLegacyWallet(id, name, provider) {
    if (this.wallets.has(id)) {
      console.log(`\u26A0\uFE0F \u94B1\u5305 ${name} \u5DF2\u5B58\u5728\uFF0C\u8DF3\u8FC7`);
      return;
    }
    const wallet = {
      id,
      name,
      icon: this.getDefaultIcon(id),
      rdns: `legacy.${id}`,
      provider,
      installed: true,
      type: "legacy",
      createConnector: () => this.createStandardConnector(provider, name)
    };
    console.log(`\u{1F50D} \u68C0\u6D4B\u5230\u94B1\u5305 (Legacy): ${wallet.name}`, wallet);
    this.wallets.set(wallet.id, wallet);
  }
  createStandardConnector(provider, walletName) {
    console.log(`\u{1F50C} \u4E3A ${walletName} \u521B\u5EFA\u6807\u51C6\u8FDE\u63A5\u5668`);
    const connector = {
      id: "",
      name: walletName,
      provider,
      connect: async () => {
        console.log(`\u{1F504} ${walletName} \u8FDE\u63A5\u4E2D...`);
        console.log(`\u{1F50D} \u68C0\u67E5 provider:`, provider);
        console.log(`\u{1F50D} Provider \u7C7B\u578B:`, typeof provider);
        console.log(`\u{1F50D} Provider \u662F\u5426\u6709 request \u65B9\u6CD5:`, typeof provider.request);
        try {
          debugger;
          const accounts = await provider.request({
            method: "eth_requestAccounts"
          });
          console.log(`\u2705 ${walletName} \u8FDE\u63A5\u6210\u529F:`, accounts);
          const accountsArray = Array.isArray(accounts) ? accounts.filter((acc) => typeof acc === "string") : typeof accounts === "string" ? [accounts] : [];
          if (accountsArray.length === 0) {
            throw new Error("\u672A\u83B7\u53D6\u5230\u6709\u6548\u7684\u8D26\u6237\u5730\u5740");
          }
          const chainId = await this.getChainIdAsNumber(provider);
          const result = {
            accounts: accountsArray,
            chainId,
            provider
          };
          return result;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "\u8FDE\u63A5\u5931\u8D25";
          console.error(`\u274C ${walletName} \u8FDE\u63A5\u5931\u8D25:`, error);
          throw new Error(`${walletName} \u8FDE\u63A5\u5931\u8D25: ${errorMessage}`);
        }
      },
      disconnect: async () => {
        console.log(`\u{1F50C} ${walletName} \u8FDE\u63A5\u5668\u65AD\u5F00\u8FDE\u63A5`);
        try {
          const disconnectableProvider = provider;
          if (disconnectableProvider.disconnect && typeof disconnectableProvider.disconnect === "function") {
            await disconnectableProvider.disconnect();
            console.log(`\u2705 ${walletName} provider \u65AD\u5F00\u6210\u529F`);
          } else {
            console.log(`\u2139\uFE0F ${walletName} \u4E0D\u652F\u6301\u7A0B\u5E8F\u5316\u65AD\u5F00\uFF0C\u9700\u8981\u7528\u6237\u624B\u52A8\u65AD\u5F00`);
          }
        } catch (error) {
          console.warn(`\u26A0\uFE0F ${walletName} \u65AD\u5F00\u8FDE\u63A5\u65F6\u51FA\u9519:`, error);
        }
      }
    };
    return connector;
  }
  async getChainIdAsNumber(provider) {
    try {
      const chainIdHex = await provider.request({ method: "eth_chainId" });
      if (typeof chainIdHex === "string" && /^0x[0-9a-fA-F]+$/.test(chainIdHex)) {
        return parseInt(chainIdHex, 16);
      }
      if (typeof chainIdHex === "number") {
        return chainIdHex;
      }
    } catch (error) {
      console.warn("\u83B7\u53D6\u94FE ID \u5931\u8D25:", error);
    }
    return void 0;
  }
  normalizeWalletId(rdns) {
    const idMap = {
      "io.metamask": "metamask",
      "com.okex.wallet": "okx",
      "com.coinbase.wallet": "coinbase",
      "io.rabby": "rabby",
      "com.trustwallet.app": "trust"
    };
    return idMap[rdns] || rdns.split(".").pop() || rdns;
  }
  getDefaultIcon(id) {
    const iconMap = {
      "metamask": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+",
      "okx": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+",
      "coinbase": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+",
      "rabby": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+",
      "trust": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+"
    };
    return iconMap[id] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PC9zdmc+";
  }
  // 公共方法
  getWallets() {
    if (!this.initialized) {
      console.warn("\u26A0\uFE0F WalletManager \u672A\u521D\u59CB\u5316\uFF0C\u8FD4\u56DE\u7A7A\u6570\u7EC4");
      return [];
    }
    return Array.from(this.wallets.values());
  }
  getWalletById(id) {
    if (!this.initialized) {
      console.warn("\u26A0\uFE0F WalletManager \u672A\u521D\u59CB\u5316");
      return null;
    }
    return this.wallets.get(id) || null;
  }
  isWalletInstalled(id) {
    if (!this.initialized) {
      console.warn("\u26A0\uFE0F WalletManager \u672A\u521D\u59CB\u5316");
      return false;
    }
    return this.wallets.has(id);
  }
  getAvailableWallets() {
    return this.getWallets().map((wallet) => ({
      id: wallet.id,
      name: wallet.name,
      installed: wallet.installed,
      provider: wallet.provider,
      iconUrl: wallet.icon || this.getDefaultIcon(wallet.id),
      icon: wallet.icon,
      rdns: wallet.rdns,
      type: wallet.type
    }));
  }
  getExtendedWalletById(id) {
    const wallet = this.getWalletById(id);
    if (!wallet) return null;
    return {
      id: wallet.id,
      name: wallet.name,
      installed: wallet.installed,
      provider: wallet.provider,
      iconUrl: wallet.icon || this.getDefaultIcon(id),
      icon: wallet.icon,
      rdns: wallet.rdns,
      type: wallet.type
    };
  }
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(handler);
  }
  off(event, handler) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }
  emit(event, data) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`\u4E8B\u4EF6\u5904\u7406\u5668\u9519\u8BEF [${event}]:`, error);
        }
      });
    }
  }
};

// src/wallet-sdk/components/WalletProvider.tsx
var import_react2 = require("react");

// src/wallet-sdk/utils/WalletDeduplicator.ts
var WalletDeduplicator = class {
  /**
   * 钱包去重函数
   * @param detected 检测到的钱包列表
   * @param configuredWallets 配置的钱包组
   * @returns 去重后的结果
   */
  static deduplicate(detected, configuredWallets) {
    console.log("\u{1F50D} \u5F00\u59CB\u94B1\u5305\u53BB\u91CD...", detected, configuredWallets);
    const safeDetected = detected || [];
    const safeConfigured = configuredWallets || {};
    console.log(
      "\u68C0\u6D4B\u5230\u7684\u94B1\u5305:",
      safeDetected.length > 0 ? safeDetected.map((w) => ({ name: w.name, id: w.id, rdns: w.rdns })) : "\u6CA1\u6709\u68C0\u6D4B\u5230\u94B1\u5305"
    );
    const nameMap = /* @__PURE__ */ new Map();
    const rdnsMap = /* @__PURE__ */ new Map();
    const sortedDetected = [...safeDetected].sort((a, b) => {
      if (a.type === "eip6963" && b.type !== "eip6963") return -1;
      if (b.type === "eip6963" && a.type !== "eip6963") return 1;
      return 0;
    });
    console.log("deduplicateDetectedWallets", sortedDetected, nameMap, rdnsMap);
    const filteredDetected = this.deduplicateDetectedWallets(
      sortedDetected,
      nameMap,
      rdnsMap
    );
    const staticFiltered = this.filterConfiguredWallets(
      safeConfigured,
      filteredDetected
    );
    console.log("\u2705 \u53BB\u91CD\u5B8C\u6210");
    console.log("\u6700\u7EC8\u68C0\u6D4B\u94B1\u5305\u6570\u91CF:", filteredDetected.length);
    console.log("\u6700\u7EC8\u914D\u7F6E\u94B1\u5305\u7EC4\u6570:", Object.keys(staticFiltered).length);
    return {
      filtered: filteredDetected,
      staticFiltered
    };
  }
  static deduplicateDetectedWallets(sortedDetected, nameMap, rdnsMap) {
    const filteredDetected = [];
    if (!Array.isArray(sortedDetected)) {
      console.warn("\u26A0\uFE0F sortedDetected \u4E0D\u662F\u6570\u7EC4\uFF0C\u8FD4\u56DE\u7A7A\u7ED3\u679C");
      return filteredDetected;
    }
    if (sortedDetected.length === 0) {
      console.log("\u26A0\uFE0F \u6CA1\u6709\u68C0\u6D4B\u5230\u94B1\u5305\uFF0C\u8FD4\u56DE\u7A7A\u7ED3\u679C");
      return filteredDetected;
    }
    for (const wallet of sortedDetected) {
      const normalizedName = wallet.name.toLowerCase().trim();
      const existingByName = nameMap.get(normalizedName);
      const existingByRdns = rdnsMap.get(wallet.rdns);
      if (!existingByName && !existingByRdns) {
        filteredDetected.push(wallet);
        nameMap.set(normalizedName, wallet);
        rdnsMap.set(wallet.rdns, wallet);
        console.log(
          `\u2705 \u4FDD\u7559\u94B1\u5305: ${wallet.name} (${wallet.rdns}) [${wallet.type}]`
        );
      } else {
        const existing = existingByName || existingByRdns;
        if (existing && wallet.type === "eip6963" && existing.type !== "eip6963") {
          const index = filteredDetected.findIndex(
            (w) => w.rdns === existing.rdns
          );
          if (index !== -1) {
            filteredDetected[index] = wallet;
            nameMap.set(normalizedName, wallet);
            rdnsMap.set(wallet.rdns, wallet);
            console.log(
              `\u{1F504} \u66FF\u6362\u94B1\u5305: ${existing.name} -> ${wallet.name} (\u66F4\u597D\u7684\u6807\u51C6)`
            );
          }
        } else {
          console.log(
            `\u274C \u8DF3\u8FC7\u91CD\u590D\u94B1\u5305: ${wallet.name} (${wallet.rdns}) [${wallet.type}]`
          );
        }
      }
    }
    return filteredDetected;
  }
  static filterConfiguredWallets(configuredWallets, detectedWallets) {
    const staticFiltered = {};
    if (detectedWallets.length === 0) {
      console.log("\u26A0\uFE0F \u6CA1\u6709\u68C0\u6D4B\u5230\u94B1\u5305\uFF0C\u8FD4\u56DE\u539F\u59CB\u914D\u7F6E\u94B1\u5305");
      return configuredWallets;
    }
    const detectedNames = new Set(
      detectedWallets.map((w) => w.name.toLowerCase().trim())
    );
    const detectedIds = new Set(
      detectedWallets.map((w) => w.id.toLowerCase())
    );
    Object.entries(configuredWallets).forEach(([groupName, walletsInGroup]) => {
      const filtered = walletsInGroup.filter((wallet) => {
        const normalizedName = wallet.name.toLowerCase().trim();
        const normalizedId = wallet.id.toLowerCase();
        const isDuplicate = detectedNames.has(normalizedName) || detectedIds.has(normalizedId);
        if (isDuplicate) {
          console.log(`\u{1F6AB} \u8FC7\u6EE4\u914D\u7F6E\u94B1\u5305: ${wallet.name} (\u4E0E\u68C0\u6D4B\u5230\u7684\u94B1\u5305\u91CD\u590D)`);
          return false;
        }
        return true;
      });
      if (filtered.length > 0) {
        staticFiltered[groupName] = filtered;
      }
    });
    return staticFiltered;
  }
};

// src/wallet-sdk/components/WalletModal.tsx
var import_react = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var WalletModal = ({
  isOpen,
  onClose,
  onConnect,
  title = "\u8FDE\u63A5\u94B1\u5305",
  description = "\u8BF7\u9009\u62E9\u8981\u8FDE\u63A5\u7684\u94B1\u5305",
  theme = "light",
  walletInstances = {},
  detectedWallets = [],
  walletsLoading = false
}) => {
  const [connectingWallet, setConnectingWallet] = (0, import_react.useState)(null);
  const [isGridLayout, setIsGridLayout] = (0, import_react.useState)(true);
  const allWallets = [];
  console.log("\u{1F50D} WalletModal - \u5F00\u59CB\u5904\u7406\u94B1\u5305\uFF0C\u8BE6\u7EC6\u8C03\u8BD5\u4FE1\u606F:");
  console.log("\u{1F4CB} walletInstances:", walletInstances);
  console.log("\u{1F4CB} detectedWallets:", detectedWallets);
  Object.entries(walletInstances).forEach(([groupName, walletGroup]) => {
    console.log(`  \u{1F3F7}\uFE0F \u7EC4\u540D: ${groupName}, \u94B1\u5305\u6570\u91CF: ${walletGroup.length}`);
    walletGroup.forEach((wallet) => {
      console.log(`    \u{1FAAA} \u94B1\u5305: ${wallet.name} (${wallet.id}) - \u5DF2\u5B89\u88C5: ${wallet.installed}`);
    });
    allWallets.push(...walletGroup);
  });
  console.log("\u{1F4E6} WalletModal \u5408\u5E76\u540E\u7684\u6240\u6709\u94B1\u5305\u6570\u91CF:", allWallets.length);
  console.log("\u{1F4E6} WalletModal \u5408\u5E76\u540E\u7684\u6240\u6709\u94B1\u5305:", allWallets.map((w) => ({ name: w.name, id: w.id, installed: w.installed })));
  const installedWallets = allWallets.filter((wallet) => wallet.installed);
  console.log("\u{1F4E6} WalletModal \u5DF2\u5B89\u88C5\u94B1\u5305\u6570\u91CF:", installedWallets.length);
  console.log("\u{1F4E6} WalletModal \u5DF2\u5B89\u88C5\u94B1\u5305:", installedWallets.map((w) => ({ name: w.name, id: w.id, installed: w.installed })));
  const handleWalletSelect = async (walletId) => {
    console.log("\u{1F680} \u7528\u6237\u9009\u62E9\u94B1\u5305:", walletId);
    console.log("\u{1F50D} WalletModal - \u5F00\u59CB\u8FDE\u63A5\u94B1\u5305\uFF0C\u8BE6\u7EC6\u4FE1\u606F:");
    console.log("  \u{1FAAA} \u94B1\u5305ID:", walletId);
    const selectedWallet = installedWallets.find((wallet) => wallet.id === walletId);
    console.log("  \u{1F50E} \u627E\u5230\u7684\u94B1\u5305\u4FE1\u606F:", selectedWallet);
    if (!selectedWallet) {
      console.error("\u274C \u672A\u627E\u5230\u9009\u4E2D\u7684\u94B1\u5305:", walletId);
      return;
    }
    setConnectingWallet(walletId);
    try {
      console.log("  \u{1F50C} \u8C03\u7528 onConnect\uFF0C\u53C2\u6570:", walletId);
      const result = await onConnect(walletId);
      console.log("  \u2705 onConnect \u8FD4\u56DE\u7ED3\u679C:", result);
      if (result.success) {
        console.log("\u2705 \u94B1\u5305\u8FDE\u63A5\u6210\u529F\uFF0C\u5173\u95ED\u5F39\u7A97");
      } else {
        console.log("\u274C \u94B1\u5305\u8FDE\u63A5\u5931\u8D25:", result.error);
      }
      onClose();
    } catch (error) {
      console.error("\u274C \u8FDE\u63A5\u94B1\u5305\u8FC7\u7A0B\u4E2D\u53D1\u751F\u9519\u8BEF:", error);
      console.error("  \u{1F4CB} \u9519\u8BEF\u8BE6\u60C5:", {
        message: error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF",
        stack: error instanceof Error ? error.stack : void 0,
        walletId,
        selectedWallet: selectedWallet.name
      });
      onClose();
    } finally {
      setConnectingWallet(null);
    }
  };
  if (!isOpen) return null;
  const themeClasses = {
    light: {
      background: "bg-white",
      border: "border-gray-200",
      text: "text-gray-900",
      secondaryText: "text-gray-600",
      hover: "hover:bg-gray-50",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      cancelButton: "bg-gray-200 hover:bg-gray-300 text-gray-900"
    },
    dark: {
      background: "bg-gray-800",
      border: "border-gray-700",
      text: "text-gray-100",
      secondaryText: "text-gray-400",
      hover: "hover:bg-gray-700",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      cancelButton: "bg-gray-700 hover:bg-gray-600 text-gray-100"
    }
  };
  const classes = themeClasses[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `w-full max-w-2xl mx-4 rounded-lg border ${classes.background} ${classes.border}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-6 border-b border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: `text-xl font-semibold ${classes.text}`, children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              onClick: () => setIsGridLayout(true),
              className: `p-2 rounded ${isGridLayout ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`,
              title: "\u7F51\u683C\u89C6\u56FE",
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              onClick: () => setIsGridLayout(false),
              className: `p-2 rounded ${!isGridLayout ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`,
              title: "\u5217\u8868\u89C6\u56FE",
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { fillRule: "evenodd", d: "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", clipRule: "evenodd" }) })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: `${classes.secondaryText}`, children: description })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-6 max-h-96 overflow-y-auto", children: walletsLoading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `text-center ${classes.secondaryText}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { className: "animate-spin h-8 w-8 mx-auto mb-2", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
      ] }),
      "\u68C0\u6D4B\u94B1\u5305\u4E2D..."
    ] }) : installedWallets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `text-center ${classes.secondaryText}`, children: "\u6CA1\u6709\u627E\u5230\u5DF2\u5B89\u88C5\u7684\u94B1\u5305\uFF0C\u8BF7\u5B89\u88C5\u94B1\u5305\u6269\u5C55\u7A0B\u5E8F" }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: isGridLayout ? "grid grid-cols-2 gap-4" : "space-y-3", children: installedWallets.map((wallet) => {
      const iconSrc = typeof wallet.iconUrl === "string" ? wallet.iconUrl : wallet.icon;
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "button",
        {
          onClick: () => handleWalletSelect(wallet.id),
          disabled: connectingWallet === wallet.id,
          className: `
                      w-full p-5 rounded-lg border transition-all duration-200
                      ${classes.border} ${classes.hover}
                      ${connectingWallet === wallet.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                      flex flex-col items-center justify-center text-center min-h-[130px]
                      hover:shadow-md
                    `,
          children: [
            iconSrc && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "w-16 h-16 mb-3 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "img",
              {
                src: iconSrc,
                alt: wallet.name,
                className: "w-full h-full object-contain",
                onError: (e) => {
                  e.currentTarget.style.display = "none";
                }
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `font-medium text-base ${classes.text} mb-1`, children: wallet.name }),
            wallet.installed && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `text-sm ${classes.secondaryText}`, children: "\u5DF2\u5B89\u88C5" }),
            connectingWallet === wallet.id && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { className: "animate-spin h-5 w-5 text-blue-600", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
            ] }) })
          ]
        },
        wallet.id
      );
    }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "button",
      {
        onClick: onClose,
        className: `px-4 py-2 rounded-lg ${classes.cancelButton}`,
        children: "\u53D6\u6D88"
      }
    ) })
  ] }) });
};
var WalletModal_default = WalletModal;

// src/wallet-sdk/components/WalletProvider.tsx
var import_viem = require("viem");
var import_jsx_runtime6 = require("react/jsx-runtime");
var WalletContext = (0, import_react2.createContext)({
  address: "0x",
  chainId: null,
  isConnecting: false,
  isConnected: false,
  isDisconnected: true,
  isReconnecting: false,
  ensName: null,
  error: null,
  chains: [],
  provider: void 0,
  balance: "0.0000",
  wallet: void 0,
  signer: void 0,
  connect: async () => ({ success: false, error: "\u672A\u521D\u59CB\u5316" }),
  disconnect: async () => {
  },
  switchChain: async () => {
  },
  openModal: () => {
  },
  closeModal: () => {
  },
  walletInstances: {},
  detectedWallets: [],
  walletsLoading: true,
  fetchBalance: async () => {
  },
  balanceLoading: false,
  getTokenBalance: async () => ({
    balance: "0",
    decimals: 18,
    symbol: "",
    loading: false,
    error: "\u94B1\u5305\u672A\u8FDE\u63A5"
  })
});
var WalletProvider = ({
  children,
  config,
  chains,
  provider,
  autoConnect,
  wallets
}) => {
  const [walletManager, setWalletManager] = (0, import_react2.useState)(null);
  const [state, setState] = (0, import_react2.useState)({
    address: "0x",
    chainId: null,
    isConnecting: false,
    isConnected: false,
    isDisconnected: true,
    isReconnecting: false,
    ensName: null,
    error: null,
    chains: chains || config.chains || [],
    provider: provider || config.provider,
    balance: "0.0000",
    wallet: void 0,
    signer: void 0
  });
  const [isModalOpen, setIsModalOpen] = (0, import_react2.useState)(false);
  const [detectedWallets, setDetectedWallets] = (0, import_react2.useState)([]);
  const [walletsLoading, setWalletsLoading] = (0, import_react2.useState)(true);
  const [walletInstances, setWalletInstances] = (0, import_react2.useState)({});
  const [currentWalletId, setCurrentWalletId] = (0, import_react2.useState)("");
  const [autoConnectAttempted, setAutoConnectAttempted] = (0, import_react2.useState)(false);
  const [balanceLoading, setBalanceLoading] = (0, import_react2.useState)(false);
  const [tokenBalanceCache, setTokenBalanceCache] = (0, import_react2.useState)({});
  (0, import_react2.useEffect)(() => {
    const initializeWalletManager = async () => {
      try {
        console.log("\u{1F680} \u521D\u59CB\u5316 WalletManager...");
        const manager = new WalletManager();
        const walletConfig = {
          projectId: config.projectId,
          chains: chains || config.chains || [],
          storage: config.storage || (typeof window !== "undefined" ? window.localStorage : void 0),
          ...config
        };
        manager.initialize();
        const detectedWallets2 = manager.getWallets();
        setWalletManager(manager);
        manager.on("connect", (data) => {
          console.log("\u{1F517} \u94B1\u5305\u8FDE\u63A5\u4E8B\u4EF6:", data);
          setState((prev) => ({
            ...prev,
            isConnected: true,
            isConnecting: false,
            isDisconnected: false,
            address: data.address,
            chainId: data.chainId,
            wallet: data.wallet ? {
              id: data.wallet.id || data.walletId,
              name: data.wallet.name || "Unknown",
              installed: true
            } : void 0,
            error: null
          }));
          setCurrentWalletId(data.walletId);
        });
        manager.on("disconnect", () => {
          console.log("\u{1F50C} \u94B1\u5305\u65AD\u5F00\u4E8B\u4EF6");
          setState((prev) => ({
            ...prev,
            isConnected: false,
            isDisconnected: true,
            isConnecting: false,
            address: "0x",
            chainId: null,
            wallet: void 0,
            balance: "0.0000",
            signer: void 0,
            error: null
          }));
          setCurrentWalletId("");
        });
        manager.on("chainChanged", (data) => {
          console.log("\u{1F504} \u94FE\u53D8\u5316\u4E8B\u4EF6:", data);
          setState((prev) => ({
            ...prev,
            chainId: data.chainId
          }));
        });
        manager.on("accountChanged", (data) => {
          console.log("\u{1F464} \u8D26\u6237\u53D8\u5316\u4E8B\u4EF6:", data);
          setState((prev) => ({
            ...prev,
            address: data.accounts[0] || "0x"
          }));
        });
        manager.on("error", (data) => {
          console.error("\u274C \u94B1\u5305\u9519\u8BEF\u4E8B\u4EF6:", data);
          setState((prev) => ({
            ...prev,
            error: new Error(data.error),
            isConnecting: false
          }));
        });
        console.log("\u2705 WalletManager \u521D\u59CB\u5316\u5B8C\u6210");
      } catch (error) {
        console.error("\u521D\u59CB\u5316 WalletManager \u5931\u8D25:", error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error("\u521D\u59CB\u5316\u5931\u8D25")
        }));
      }
    };
    initializeWalletManager();
    return () => {
      if (walletManager) {
        walletManager.off("connect", () => {
        });
        walletManager.off("disconnect", () => {
        });
        walletManager.off("chainChanged", () => {
        });
        walletManager.off("accountChanged", () => {
        });
        walletManager.off("error", () => {
        });
      }
    };
  }, [config, chains, provider]);
  (0, import_react2.useEffect)(() => {
    const initWallets = async () => {
      if (!walletManager) return;
      try {
        setWalletsLoading(true);
        console.log("\u{1F504} \u5F00\u59CB\u94B1\u5305\u68C0\u6D4B...");
        const detectedWallets2 = walletManager.getWallets();
        console.log("\u{1F4CB} \u68C0\u6D4B\u5230\u7684\u539F\u59CB\u94B1\u5305:", detectedWallets2);
        const configuredInstances = {};
        if (wallets && config.projectId) {
          wallets.forEach((group) => {
            if (group.groupName && group.wallets) {
              const groupWallets = group.wallets.map((createWalletFn) => {
                return createWalletFn({
                  projectId: config.projectId,
                  appName: config.appName
                });
              });
              if (groupWallets.length > 0) {
                configuredInstances[group.groupName] = groupWallets;
              }
            }
          });
        }
        const { filtered: filteredDetected, staticFiltered } = WalletDeduplicator.deduplicate(
          detectedWallets2,
          configuredInstances
        );
        console.log("\u{1F3AF} \u53BB\u91CD\u540E\u7684\u68C0\u6D4B\u94B1\u5305:", filteredDetected);
        console.log("\u{1F3AF} \u53BB\u91CD\u540E\u7684\u914D\u7F6E\u94B1\u5305:", staticFiltered);
        setDetectedWallets(filteredDetected);
        const finalInstances = {};
        if (filteredDetected.length > 0) {
          const detectedAsExtended = filteredDetected.map((wallet) => ({
            id: wallet.id,
            name: wallet.name,
            installed: wallet.installed,
            provider: wallet.provider,
            iconUrl: wallet.icon,
            icon: wallet.icon,
            rdns: wallet.rdns,
            type: wallet.type
          }));
          finalInstances["\u5DF2\u5B89\u88C5\u7684\u94B1\u5305"] = detectedAsExtended;
        }
        Object.entries(staticFiltered).forEach(([groupName, walletsInGroup]) => {
          if (walletsInGroup.length > 0) {
            finalInstances[groupName] = walletsInGroup;
          }
        });
        setWalletInstances(finalInstances);
        console.log("\u{1F4E6} \u6700\u7EC8\u94B1\u5305\u5B9E\u4F8B:", finalInstances);
      } catch (error) {
        console.error("\u274C \u94B1\u5305\u68C0\u6D4B\u5931\u8D25:", error);
        setState((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error("\u94B1\u5305\u68C0\u6D4B\u5931\u8D25")
        }));
      } finally {
        setWalletsLoading(false);
      }
    };
    initWallets();
  }, [walletManager, wallets, config.projectId, config.appName]);
  const connect = (0, import_react2.useCallback)(async (walletId) => {
    if (!walletManager) {
      console.error("\u274C WalletProvider - WalletManager \u672A\u521D\u59CB\u5316");
      return {
        success: false,
        error: "WalletManager \u672A\u521D\u59CB\u5316"
      };
    }
    console.log("\u{1F680} WalletProvider - \u5F00\u59CB\u8FDE\u63A5\u94B1\u5305:", walletId);
    setState((prev) => ({
      ...prev,
      isConnecting: true,
      isDisconnected: false,
      error: null
    }));
    try {
      console.log("  \u{1F50C} \u8C03\u7528 walletManager.connectWallet...");
      const result = await walletManager.connectWallet(walletId);
      console.log("\u2705 WalletProvider - \u94B1\u5305\u8FDE\u63A5\u6210\u529F:", result);
      setIsModalOpen(false);
      if (typeof window !== "undefined" && config.storage) {
        config.storage.setItem("lastConnectedWallet", walletId);
        config.storage.setItem("walletAddress", result.address || "");
        config.storage.setItem("lastConnectionTime", Date.now().toString());
      }
      return {
        success: true,
        address: result.address,
        chainId: result.chainId,
        wallet: result.wallet,
        provider: result.provider
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "\u8FDE\u63A5\u5931\u8D25";
      console.error("\u274C WalletProvider - \u94B1\u5305\u8FDE\u63A5\u5931\u8D25:", error);
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        isDisconnected: true,
        error: new Error(errorMessage)
      }));
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [walletManager, config.storage]);
  const disconnect = (0, import_react2.useCallback)(async () => {
    console.log("\u{1F50C} \u5F00\u59CB\u65AD\u5F00\u94B1\u5305\u8FDE\u63A5", { walletId: currentWalletId });
    try {
      if (walletManager) {
        await walletManager.disconnectWallet(currentWalletId);
      }
    } catch (error) {
      console.warn("\u26A0\uFE0F \u65AD\u5F00\u94B1\u5305\u8FDE\u63A5\u5668\u65F6\u51FA\u9519:", error);
    }
    if (typeof window !== "undefined" && config.storage) {
      config.storage.removeItem("lastConnectedWallet");
      config.storage.removeItem("walletAddress");
      config.storage.removeItem("lastConnectionTime");
      console.log("\u{1F9F9} \u5DF2\u6E05\u7406\u672C\u5730\u5B58\u50A8");
    }
    setState((prev) => ({
      ...prev,
      isConnected: false,
      isDisconnected: true,
      address: "0x",
      chainId: null,
      wallet: void 0,
      signer: void 0,
      balance: "0.0000",
      isConnecting: false,
      error: null
    }));
    setCurrentWalletId("");
    setTokenBalanceCache({});
    console.log("\u2705 \u94B1\u5305\u65AD\u5F00\u8FDE\u63A5\u5B8C\u6210");
  }, [walletManager, currentWalletId, config.storage]);
  const switchChain = (0, import_react2.useCallback)(async (chainId) => {
    var _a;
    if (!walletManager) throw new Error("WalletManager \u672A\u521D\u59CB\u5316");
    try {
      console.log("\u{1F504} \u5207\u6362\u94FE:", chainId);
      const currentWallet = walletManager.getWalletById(currentWalletId);
      if (!currentWallet) {
        throw new Error("\u672A\u627E\u5230\u5F53\u524D\u8FDE\u63A5\u7684\u94B1\u5305");
      }
      const provider2 = currentWallet.provider;
      const chainIdHex = `0x${chainId.toString(16)}`;
      try {
        await provider2.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }]
        });
        console.log(`\u2705 \u6210\u529F\u5207\u6362\u5230\u94FE ${chainId}`);
        setState((prev) => ({ ...prev, chainId }));
        if (walletManager) {
          (_a = walletManager.emit) == null ? void 0 : _a.call(walletManager, "chainChanged", { chainId });
        }
      } catch (switchError) {
        if (switchError.code === 4902) {
          console.log(`\u94FE ${chainId} \u4E0D\u5B58\u5728\uFF0C\u5C1D\u8BD5\u6DFB\u52A0...`);
          const chainConfig = getChainConfig(chainId);
          if (chainConfig) {
            await provider2.request({
              method: "wallet_addEthereumChain",
              params: [chainConfig]
            });
            console.log(`\u2705 \u6210\u529F\u6DFB\u52A0\u5E76\u5207\u6362\u5230\u94FE ${chainId}`);
            setState((prev) => ({ ...prev, chainId }));
          } else {
            throw new Error(`\u4E0D\u652F\u6301\u7684\u94FE ID: ${chainId}`);
          }
        } else {
          throw switchError;
        }
      }
    } catch (error) {
      console.error("\u5207\u6362\u94FE\u5931\u8D25:", error);
      throw error;
    }
  }, [walletManager, currentWalletId]);
  const getChainConfig = (chainId) => {
    const chainConfigs = {
      1: {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18
        },
        rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_KEY"],
        blockExplorerUrls: ["https://etherscan.io"]
      },
      11155111: {
        chainId: "0xaa36a7",
        chainName: "Sepolia test network",
        nativeCurrency: {
          name: "Sepolia Ether",
          symbol: "SepoliaETH",
          decimals: 18
        },
        rpcUrls: ["https://sepolia.infura.io/v3/YOUR_INFURA_KEY"],
        blockExplorerUrls: ["https://sepolia.etherscan.io"]
      },
      137: {
        chainId: "0x89",
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com"],
        blockExplorerUrls: ["https://polygonscan.com"]
      },
      56: {
        chainId: "0x38",
        chainName: "BNB Smart Chain",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18
        },
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"]
      }
    };
    return chainConfigs[chainId];
  };
  const fetchBalance = (0, import_react2.useCallback)(async () => {
    if (!state.isConnected || !state.address) {
      console.log("\u26A0\uFE0F \u4F59\u989D\u83B7\u53D6\u8DF3\u8FC7 - \u94B1\u5305\u672A\u8FDE\u63A5\u6216\u5730\u5740\u4E3A\u7A7A", {
        isConnected: state.isConnected,
        address: state.address
      });
      return;
    }
    try {
      setBalanceLoading(true);
      console.log("\u{1F4B0} \u5F00\u59CB\u83B7\u53D6\u4F59\u989D...", state.address);
      console.log("\u{1F50D} \u5F53\u524D chainId:", state.chainId);
      const currentWallet = walletManager == null ? void 0 : walletManager.getWalletById(currentWalletId);
      if (!currentWallet) {
        console.warn("\u26A0\uFE0F \u672A\u627E\u5230\u5F53\u524D\u8FDE\u63A5\u7684\u94B1\u5305", {
          currentWalletId,
          availableWallets: walletManager == null ? void 0 : walletManager.getWallets().map((w) => w.id)
        });
        return;
      }
      console.log("\u{1F3AF} \u627E\u5230\u5F53\u524D\u94B1\u5305:", currentWallet.name);
      const provider2 = currentWallet.provider;
      console.log("\u{1F4DE} \u8C03\u7528 eth_getBalance...");
      const balanceHex = await provider2.request({
        method: "eth_getBalance",
        params: [state.address, "latest"]
      });
      console.log("\u{1F4CB} \u4F59\u989D\u539F\u59CB\u54CD\u5E94:", { balanceHex, type: typeof balanceHex });
      if (typeof balanceHex === "string") {
        const balanceWei = BigInt(balanceHex);
        const balanceEth = (0, import_viem.formatEther)(balanceWei);
        const formattedBalance = parseFloat(balanceEth).toFixed(4);
        console.log(`\u{1F4B0} \u4F59\u989D\u8BA1\u7B97\u8BE6\u60C5:`, {
          hex: balanceHex,
          wei: balanceWei.toString(),
          eth: balanceEth,
          formatted: formattedBalance
        });
        setState((prev) => ({
          ...prev,
          balance: formattedBalance
        }));
        console.log(`\u2705 \u4F59\u989D\u66F4\u65B0\u6210\u529F: ${formattedBalance} ETH`);
      } else {
        console.error("\u274C \u4F59\u989D\u54CD\u5E94\u7C7B\u578B\u9519\u8BEF:", typeof balanceHex, balanceHex);
      }
    } catch (error) {
      console.error("\u274C \u83B7\u53D6\u4F59\u989D\u5931\u8D25:", error);
      console.error("\u{1F50D} \u9519\u8BEF\u8BE6\u60C5:", {
        message: error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF",
        stack: error instanceof Error ? error.stack : void 0,
        walletId: currentWalletId,
        address: state.address,
        chainId: state.chainId
      });
      setState((prev) => ({
        ...prev,
        balance: "0.0000"
      }));
    } finally {
      setBalanceLoading(false);
    }
  }, [state.isConnected, state.address, state.chainId, walletManager, currentWalletId]);
  (0, import_react2.useEffect)(() => {
    if (state.isConnected && state.address) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 3e4);
      return () => clearInterval(interval);
    }
  }, [state.isConnected, state.address, fetchBalance]);
  const getTokenBalance = (0, import_react2.useCallback)(
    async (tokenAddress) => {
      const defaultResult = {
        balance: "0",
        decimals: 18,
        symbol: "",
        loading: false,
        error: null
      };
      if (!state.isConnected || !state.address) {
        return { ...defaultResult, error: "\u94B1\u5305\u672A\u8FDE\u63A5" };
      }
      const currentWallet = walletManager == null ? void 0 : walletManager.getWalletById(currentWalletId);
      if (!currentWallet) {
        return { ...defaultResult, error: "\u672A\u627E\u5230\u5F53\u524D\u8FDE\u63A5\u7684\u94B1\u5305" };
      }
      try {
        const loadingResult = { ...defaultResult, loading: true };
        const cacheKey = `${tokenAddress.toLowerCase()}-${state.address.toLowerCase()}`;
        const cachedData = tokenBalanceCache[cacheKey];
        const now = Date.now();
        if (cachedData && now - cachedData.lastUpdated < 3e4) {
          return {
            balance: cachedData.balance,
            decimals: cachedData.decimals,
            symbol: cachedData.symbol,
            loading: false,
            error: null
          };
        }
        const provider2 = currentWallet.provider;
        const balanceOfSelector = "0x70a08231";
        const decimalsSelector = "0x313ce567";
        const symbolSelector = "0x95d89b41";
        const encodedAddress = state.address.slice(2).padStart(64, "0");
        const [balanceResult, decimalsResult, symbolResult] = await Promise.all([
          // 获取余额
          provider2.request({
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: balanceOfSelector + encodedAddress
              },
              "latest"
            ]
          }),
          // 获取小数位数
          provider2.request({
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: decimalsSelector
              },
              "latest"
            ]
          }),
          // 获取代币符号
          provider2.request({
            method: "eth_call",
            params: [
              {
                to: tokenAddress,
                data: symbolSelector
              },
              "latest"
            ]
          })
        ]);
        const decimals = parseInt(decimalsResult, 16);
        const balanceWei = BigInt(balanceResult);
        const balance = (0, import_viem.formatUnits)(balanceWei, decimals);
        let symbol = "";
        if (symbolResult && typeof symbolResult === "string") {
          const symbolHex = symbolResult.slice(2);
          let symbolStr = "";
          for (let i = 0; i < symbolHex.length; i += 2) {
            const charCode = parseInt(symbolHex.substr(i, 2), 16);
            if (charCode !== 0) {
              symbolStr += String.fromCharCode(charCode);
            }
          }
          symbol = symbolStr.trim();
        }
        setTokenBalanceCache((prev) => ({
          ...prev,
          [cacheKey]: {
            balance,
            decimals,
            symbol: symbol || "TOKEN",
            lastUpdated: now
          }
        }));
        return {
          balance,
          decimals,
          symbol: symbol || "TOKEN",
          loading: false,
          error: null
        };
      } catch (error) {
        console.error(`\u83B7\u53D6\u4EE3\u5E01 ${tokenAddress} \u4F59\u989D\u5931\u8D25:`, error);
        return {
          ...defaultResult,
          error: error instanceof Error ? error.message : "\u83B7\u53D6\u4EE3\u5E01\u4F59\u989D\u5931\u8D25"
        };
      }
    },
    [state.isConnected, state.address, walletManager, currentWalletId, tokenBalanceCache]
  );
  (0, import_react2.useEffect)(() => {
    const attemptAutoConnect = async () => {
      if (autoConnectAttempted || !autoConnect || !walletManager || walletsLoading) {
        return;
      }
      if (state.isConnected) {
        setAutoConnectAttempted(true);
        return;
      }
      const lastConnectedWallet = typeof window !== "undefined" && config.storage ? config.storage.getItem("lastConnectedWallet") : null;
      if (!lastConnectedWallet) {
        setAutoConnectAttempted(true);
        return;
      }
      console.log("\u{1F504} \u5C1D\u8BD5\u81EA\u52A8\u8FDE\u63A5:", lastConnectedWallet);
      try {
        const availableWallets = walletManager.getAvailableWallets();
        const walletExists = availableWallets.some((wallet) => wallet.id === lastConnectedWallet);
        if (walletExists) {
          await connect(lastConnectedWallet);
        } else {
          console.log("\u{1F504} \u4E0A\u6B21\u8FDE\u63A5\u7684\u94B1\u5305\u4E0D\u5B58\u5728\uFF0C\u6E05\u7406\u5B58\u50A8");
          if (typeof window !== "undefined" && config.storage) {
            config.storage.removeItem("lastConnectedWallet");
            config.storage.removeItem("walletAddress");
            config.storage.removeItem("lastConnectionTime");
          }
        }
      } catch (error) {
        console.warn("\u81EA\u52A8\u8FDE\u63A5\u5931\u8D25:", error);
        if (typeof window !== "undefined" && config.storage) {
          config.storage.removeItem("lastConnectedWallet");
          config.storage.removeItem("walletAddress");
          config.storage.removeItem("lastConnectionTime");
        }
      } finally {
        setAutoConnectAttempted(true);
      }
    };
    attemptAutoConnect();
  }, [
    autoConnect,
    autoConnectAttempted,
    walletManager,
    walletsLoading,
    state.isConnected,
    config.storage,
    connect
  ]);
  const openModal = (0, import_react2.useCallback)(() => setIsModalOpen(true), []);
  const closeModal = (0, import_react2.useCallback)(() => setIsModalOpen(false), []);
  const value = {
    ...state,
    connect,
    disconnect,
    switchChain,
    openModal,
    closeModal,
    walletInstances,
    detectedWallets,
    walletsLoading,
    fetchBalance,
    balanceLoading,
    getTokenBalance
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(WalletContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      WalletModal_default,
      {
        isOpen: isModalOpen,
        onClose: closeModal,
        onConnect: connect,
        title: "\u8FDE\u63A5\u94B1\u5305",
        description: "\u8BF7\u9009\u62E9\u8981\u8FDE\u63A5\u7684\u94B1\u5305",
        walletInstances,
        detectedWallets,
        walletsLoading
      }
    )
  ] });
};
var useWallet = () => {
  const context = (0, import_react2.useContext)(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// src/wallet-sdk/components/ConnectButton.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var ConnectButton = ({
  label,
  size = "md",
  variant = "primary",
  className = "",
  showBalance = false,
  showChain = false,
  onConnect,
  onDisconnect
}) => {
  const {
    isConnected,
    isConnecting,
    address,
    balance,
    chainId,
    wallet,
    connect,
    disconnect,
    openModal,
    closeModal,
    walletInstances,
    detectedWallets
  } = useWallet();
  const getButtonClasses = () => {
    const baseClasses = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300",
      outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
    };
    const sizeClasses = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg"
    };
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  };
  const handleConnect = async () => {
    try {
      console.log("\u{1F50D} ConnectButton - \u5F00\u59CB\u8FDE\u63A5\uFF0C\u8BE6\u7EC6\u8C03\u8BD5\u4FE1\u606F:");
      console.log("\u{1F4CB} walletInstances:", walletInstances);
      console.log("\u{1F4CB} detectedWallets:", detectedWallets);
      const allWallets = [];
      if (walletInstances) {
        console.log("\u{1F504} \u5904\u7406\u94B1\u5305\u5B9E\u4F8B\u7EC4:");
        Object.entries(walletInstances).forEach(([groupName, walletGroup]) => {
          console.log(`  \u{1F3F7}\uFE0F \u7EC4\u540D: ${groupName}, \u94B1\u5305\u6570\u91CF: ${walletGroup.length}`);
          walletGroup.forEach((wallet2) => {
            console.log(`    \u{1FAAA} \u94B1\u5305: ${wallet2.name} (${wallet2.id}) - \u5DF2\u5B89\u88C5: ${wallet2.installed}`);
          });
          allWallets.push(...walletGroup);
        });
      }
      console.log("\u{1F4E6} \u5408\u5E76\u540E\u7684\u6240\u6709\u94B1\u5305\u6570\u91CF:", allWallets.length);
      console.log("\u{1F4E6} \u5408\u5E76\u540E\u7684\u6240\u6709\u94B1\u5305:", allWallets.map((w) => ({ name: w.name, id: w.id, installed: w.installed })));
      if (allWallets.length === 0) {
        console.warn("\u6CA1\u6709\u627E\u5230\u53EF\u7528\u7684\u94B1\u5305\uFF0C\u8BF7\u5B89\u88C5\u94B1\u5305\u6269\u5C55\u7A0B\u5E8F");
        return;
      }
      const installedWallets = allWallets.filter((wallet2) => wallet2.installed);
      if (installedWallets.length === 0) {
        console.warn("\u6CA1\u6709\u5DF2\u5B89\u88C5\u7684\u94B1\u5305\uFF0C\u8BF7\u5148\u5B89\u88C5\u94B1\u5305\u6269\u5C55\u7A0B\u5E8F");
        return;
      }
      if (installedWallets.length === 1) {
        console.log("\u{1F680} \u5F00\u59CB\u8FDE\u63A5\u94B1\u5305:", installedWallets[0].name);
        const result = await connect(installedWallets[0].id);
        if (onConnect) {
          onConnect(result);
        }
        if (result.success) {
          closeModal();
        }
      } else {
        console.log("\u{1F4F1} \u6253\u5F00\u94B1\u5305\u9009\u62E9\u5F39\u7A97\uFF0C\u53EF\u7528\u7684\u94B1\u5305:", installedWallets.map((w) => w.name));
        openModal();
      }
    } catch (error) {
      console.error("\u274C \u8FDE\u63A5\u94B1\u5305\u5931\u8D25:", error);
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes("user rejected") || errorMessage.includes("user denied") || errorMessage.includes("user cancelled") || errorMessage.includes("\u62D2\u7EDD") || errorMessage.includes("\u53D6\u6D88")) {
          console.log("\u2139\uFE0F \u7528\u6237\u62D2\u7EDD\u4E86\u94B1\u5305\u6388\u6743\u8BF7\u6C42");
        }
      }
    }
  };
  const handleDisconnect = async () => {
    try {
      console.log("\u{1F50C} \u5F00\u59CB\u65AD\u5F00\u94B1\u5305\u8FDE\u63A5");
      await disconnect();
      console.log("\u2705 \u94B1\u5305\u5DF2\u65AD\u5F00\u8FDE\u63A5");
      if (onDisconnect) {
        onDisconnect();
      }
    } catch (error) {
      console.error("\u274C \u65AD\u5F00\u8FDE\u63A5\u5931\u8D25:", error);
    }
  };
  const formatAddress = (address2) => {
    if (!address2) return "";
    return `${address2.slice(0, 6)}...${address2.slice(-4)}`;
  };
  const getChainName = (chainId2) => {
    if (!chainId2) return "Unknown Chain";
    const chainMap = {
      1: "Ethereum",
      56: "BSC",
      137: "Polygon",
      43114: "Avalanche",
      42161: "Arbitrum",
      8453: "Base",
      11155111: "Sepolia"
    };
    return chainMap[chainId2] || `Chain ${chainId2}`;
  };
  if (isConnecting) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { className: getButtonClasses(), disabled: true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
      ] }),
      "\u8FDE\u63A5\u4E2D..."
    ] }) });
  }
  if (!isConnected) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { onClick: handleConnect, className: getButtonClasses(), children: label || "\u8FDE\u63A5\u94B1\u5305" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-3", children: [
    showChain && chainId && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: getChainName(chainId) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { onClick: handleDisconnect, className: getButtonClasses(), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center", children: [
      (wallet == null ? void 0 : wallet.icon) && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        "img",
        {
          src: wallet.icon,
          alt: wallet.name,
          className: "w-4 h-4 mr-2 rounded"
        }
      ),
      formatAddress(address)
    ] }) }),
    showBalance && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
      parseFloat(balance).toFixed(4),
      " ETH"
    ] })
  ] });
};
var ConnectButton_default = ConnectButton;

// src/wallet-sdk/components/AccountDropdown.tsx
var import_react3 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var AccountDropdown = ({
  className = "",
  showBalance = false,
  showChainSwitcher = true,
  size = "md",
  onDisconnect
}) => {
  const {
    address,
    balance,
    chainId,
    isConnected,
    disconnect,
    switchChain,
    fetchBalance,
    balanceLoading
  } = useWallet();
  const [isOpen, setIsOpen] = (0, import_react3.useState)(false);
  const [copied, setCopied] = (0, import_react3.useState)(false);
  const [switchingChain, setSwitchingChain] = (0, import_react3.useState)(null);
  if (!isConnected || !address) {
    return null;
  }
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg"
  };
  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  const formatBalance = (bal) => {
    const num = parseFloat(bal);
    return num.toFixed(4);
  };
  const getChainName = (id) => {
    const chainNames = {
      1: "Ethereum",
      11155111: "Sepolia",
      137: "Polygon",
      56: "BSC",
      42161: "Arbitrum",
      10: "Optimism"
    };
    return id ? chainNames[id] || `Chain ${id}` : "Unknown";
  };
  const getChainIcon = (id) => {
    const chainColors = {
      1: "bg-blue-500",
      11155111: "bg-purple-500",
      137: "bg-purple-600",
      56: "bg-yellow-500",
      42161: "bg-blue-600",
      10: "bg-red-500"
    };
    return id ? chainColors[id] || "bg-gray-500" : "bg-gray-500";
  };
  const copyAddress = async () => {
    if (address && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      } catch (error) {
        console.error("\u590D\u5236\u5730\u5740\u5931\u8D25:", error);
      }
    }
  };
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsOpen(false);
      if (onDisconnect) {
        onDisconnect();
      }
    } catch (error) {
      console.error("\u65AD\u5F00\u8FDE\u63A5\u5931\u8D25:", error);
    }
  };
  const handleSwitchChain = async (newChainId) => {
    if (newChainId === chainId) return;
    try {
      setSwitchingChain(newChainId);
      await switchChain(newChainId);
      setIsOpen(false);
    } catch (error) {
      console.error("\u5207\u6362\u94FE\u5931\u8D25:", error);
    } finally {
      setSwitchingChain(null);
    }
  };
  const supportedChains = [
    { id: 1, name: "Ethereum", shortName: "ETH" },
    { id: 11155111, name: "Sepolia Testnet", shortName: "Sepolia" },
    { id: 137, name: "Polygon", shortName: "MATIC" },
    { id: 56, name: "BNB Smart Chain", shortName: "BSC" },
    { id: 42161, name: "Arbitrum One", shortName: "ARB" },
    { id: 10, name: "Optimism", shortName: "OP" }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: `
          inline-flex items-center justify-center rounded-lg border border-gray-300
          bg-white hover:bg-gray-50 text-gray-900 font-medium
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${sizeClasses[size]} ${className}
        `,
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `w-2 h-2 rounded-full ${getChainIcon(chainId)}` }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "font-mono", children: formatAddress(address) }),
          showBalance && balance && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-sm text-gray-900 font-medium", children: [
            formatBalance(balance),
            " ETH"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "svg",
            {
              className: `w-4 h-4 transition-transform text-gray-400 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ] })
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "p-4 border-b border-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center space-x-3 mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `w-3 h-3 rounded-full ${getChainIcon(chainId)}` }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "font-medium text-gray-900", children: "\u5DF2\u8FDE\u63A5" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-sm text-gray-600", children: getChainName(chainId) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-sm text-gray-600 font-mono break-all", children: address }),
          showBalance && balance && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-sm text-gray-600", children: [
            "\u4F59\u989D: ",
            formatBalance(balance),
            " ETH"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "p-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "button",
          {
            onClick: copyAddress,
            className: "w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md flex items-center space-x-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: copied ? "\u5DF2\u590D\u5236!" : "\u590D\u5236\u5730\u5740" }),
              copied && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "w-4 h-4 text-green-500 ml-auto", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "button",
          {
            onClick: () => {
              console.log("\u{1F504} \u624B\u52A8\u5237\u65B0\u4F59\u989D...");
              fetchBalance();
            },
            disabled: balanceLoading,
            className: "w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md flex items-center space-x-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: `w-4 h-4 text-gray-400 ${balanceLoading ? "animate-spin" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: balanceLoading ? "\u5237\u65B0\u4E2D..." : "\u5237\u65B0\u4F59\u989D" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "button",
          {
            onClick: () => {
              const explorerUrls = {
                1: "https://etherscan.io",
                11155111: "https://sepolia.etherscan.io",
                137: "https://polygonscan.com",
                56: "https://bscscan.com",
                42161: "https://arbiscan.io",
                10: "https://optimistic.etherscan.io"
              };
              const explorerUrl = chainId ? explorerUrls[chainId] : null;
              if (explorerUrl) {
                window.open(`${explorerUrl}/address/${address}`, "_blank");
              }
            },
            className: "w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md flex items-center space-x-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "\u5728\u6D4F\u89C8\u5668\u4E2D\u67E5\u770B" })
            ]
          }
        ),
        showChainSwitcher && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "border-t border-gray-100 my-2" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "px-3 py-1 text-xs text-gray-500 font-medium", children: "\u5207\u6362\u7F51\u7EDC" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "max-h-48 overflow-y-auto", children: supportedChains.map((chain) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
            "button",
            {
              onClick: () => handleSwitchChain(chain.id),
              disabled: switchingChain === chain.id,
              className: `
                        w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md
                        flex items-center justify-between transition-colors
                        ${chainId === chain.id ? "bg-blue-50 text-blue-600" : "text-gray-900"}
                        ${switchingChain === chain.id ? "opacity-50 cursor-not-allowed" : ""}
                      `,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: `w-3 h-3 rounded-full ${getChainIcon(chain.id)}` }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "font-medium", children: chain.shortName }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-xs text-gray-500", children: chain.name })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center", children: [
                  switchingChain === chain.id && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { className: "animate-spin w-4 h-4 text-blue-600 mr-2", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                  ] }),
                  chainId === chain.id && switchingChain !== chain.id && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "w-4 h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })
                ] })
              ]
            },
            chain.id
          )) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "border-t border-gray-100 my-2" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "button",
          {
            onClick: handleDisconnect,
            className: "w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: "\u65AD\u5F00\u8FDE\u63A5" })
            ]
          }
        )
      ] })
    ] }),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setIsOpen(false)
      }
    )
  ] });
};
var AccountDropdown_default = AccountDropdown;

// src/wallet-sdk/components/EnhancedConnectButton.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var EnhancedConnectButton = ({
  label = "\u8FDE\u63A5\u94B1\u5305",
  size = "md",
  variant = "primary",
  className = "",
  showBalance = false,
  showChainSwitcher = true,
  onConnect,
  onDisconnect
}) => {
  const {
    isConnected,
    isConnecting,
    address,
    error,
    openModal
  } = useWallet();
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white border-transparent",
    outline: "bg-transparent hover:bg-gray-50 text-gray-900 border-gray-300",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent"
  };
  const baseClasses = `
    inline-flex items-center justify-center rounded-lg border font-medium
    transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  const handleConnect = async () => {
    try {
      openModal();
      if (onConnect) {
        onConnect({ success: true });
      }
    } catch (error2) {
      console.error("\u8FDE\u63A5\u5931\u8D25:", error2);
      if (onConnect) {
        onConnect({
          success: false,
          error: error2 instanceof Error ? error2.message : "\u8FDE\u63A5\u5931\u8D25"
        });
      }
    }
  };
  if (isConnected && address) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      AccountDropdown_default,
      {
        className,
        showBalance,
        showChainSwitcher,
        size,
        onDisconnect
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "button",
      {
        onClick: handleConnect,
        disabled: isConnecting,
        className: buttonClasses,
        children: isConnecting ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }),
          "\u8FDE\u63A5\u4E2D..."
        ] }) : label
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "absolute top-full left-0 mt-2 p-2 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 whitespace-nowrap", children: error.message })
  ] });
};
var EnhancedConnectButton_default = EnhancedConnectButton;

// src/wallet-sdk/index.ts
var version = "0.1.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccountDropdown,
  Badge,
  Button,
  Card,
  ConnectButton,
  EnhancedConnectButton,
  Input,
  WalletManager,
  WalletModal,
  WalletProvider,
  useWallet,
  version
});
//# sourceMappingURL=index.cjs.map