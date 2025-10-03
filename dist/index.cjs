"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

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
  WalletSDK: () => WalletSDK,
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
      return this.getWallets();
    }
    this.detectWallets();
    this.initialized = true;
    return this.getWallets();
  }
  isInitialized() {
    return this.initialized;
  }
  async connectWallet(walletId) {
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
      this.emit("connect", {
        address,
        chainId,
        walletId: wallet.id,
        wallet: {
          id: wallet.id,
          name: wallet.name,
          installed: wallet.installed
        },
        provider
      });
      return connectionResult;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF";
      console.error(`\u274C \u8FDE\u63A5\u94B1\u5305 ${wallet.name} \u5931\u8D25:`, error);
      throw new Error(`\u8FDE\u63A5\u94B1\u5305\u5931\u8D25: ${errorMessage}`);
    }
  }
  async disconnectWallet(walletId) {
    if (!walletId) {
      return;
    }
    const wallet = this.getWalletById(walletId);
    if (!wallet) {
      return;
    }
    if (!wallet.createConnector) {
      return;
    }
    try {
      const connector = wallet.createConnector();
      if (connector.disconnect) {
        await connector.disconnect();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF";
      console.error(`\u274C \u65AD\u5F00\u94B1\u5305 ${wallet.name} \u5931\u8D25:`, error);
    }
  }
  async disconnectAll() {
    const wallets = this.getWallets();
    const disconnectPromises = wallets.map(
      (wallet) => this.disconnectWallet(wallet.id).catch((error) => {
        console.warn(`\u65AD\u5F00\u94B1\u5305 ${wallet.name} \u65F6\u51FA\u9519:`, error);
      })
    );
    await Promise.allSettled(disconnectPromises);
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
      return;
    }
    this.detectEIP6963Wallets();
    this.detectLegacyWallets();
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
    this.wallets.set(wallet.id, wallet);
  }
  addLegacyWallet(id, name, provider) {
    if (this.wallets.has(id)) {
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
    this.wallets.set(wallet.id, wallet);
  }
  createStandardConnector(provider, walletName) {
    const connector = {
      id: "",
      name: walletName,
      provider,
      connect: async () => {
        try {
          const accounts = await provider.request({
            method: "eth_requestAccounts"
          });
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
        try {
          const disconnectableProvider = provider;
          if (disconnectableProvider.disconnect && typeof disconnectableProvider.disconnect === "function") {
            await disconnectableProvider.disconnect();
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

// src/wallet-sdk/wagmi.ts
var import_rainbowkit = require("@rainbow-me/rainbowkit");
var import_wallets = require("@rainbow-me/rainbowkit/wallets");
var import_wagmi = require("wagmi");

// ../../node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// ../../node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (callback, delay) => setTimeout(callback, delay),
  clearTimeout: (timeoutId) => clearTimeout(timeoutId),
  setInterval: (callback, delay) => setInterval(callback, delay),
  clearInterval: (intervalId) => clearInterval(intervalId)
};
var _provider, _providerCalled, _a;
var TimeoutManager = (_a = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support ReturnType<typeof setTimeout>, which is infeasible.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    __privateAdd(this, _provider, defaultTimeoutProvider);
    __privateAdd(this, _providerCalled, false);
  }
  setTimeoutProvider(provider) {
    if (process.env.NODE_ENV !== "production") {
      if (__privateGet(this, _providerCalled) && provider !== __privateGet(this, _provider)) {
        console.error(
          `[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.`,
          { previous: __privateGet(this, _provider), provider }
        );
      }
    }
    __privateSet(this, _provider, provider);
    if (process.env.NODE_ENV !== "production") {
      __privateSet(this, _providerCalled, false);
    }
  }
  setTimeout(callback, delay) {
    if (process.env.NODE_ENV !== "production") {
      __privateSet(this, _providerCalled, true);
    }
    return __privateGet(this, _provider).setTimeout(callback, delay);
  }
  clearTimeout(timeoutId) {
    __privateGet(this, _provider).clearTimeout(timeoutId);
  }
  setInterval(callback, delay) {
    if (process.env.NODE_ENV !== "production") {
      __privateSet(this, _providerCalled, true);
    }
    return __privateGet(this, _provider).setInterval(callback, delay);
  }
  clearInterval(intervalId) {
    __privateGet(this, _provider).clearInterval(intervalId);
  }
}, _provider = new WeakMap(), _providerCalled = new WeakMap(), _a);
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
  setTimeout(callback, 0);
}

// ../../node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (!array && !(isPlainObject(a) && isPlainObject(b))) return b;
  const aItems = array ? a : Object.keys(a);
  const aSize = aItems.length;
  const bItems = array ? b : Object.keys(b);
  const bSize = bItems.length;
  const copy = array ? new Array(bSize) : {};
  let equalItems = 0;
  for (let i = 0; i < bSize; i++) {
    const key = array ? i : bItems[i];
    const aItem = a[key];
    const bItem = b[key];
    if (aItem === bItem) {
      copy[key] = aItem;
      if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
      continue;
    }
    if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
      copy[key] = bItem;
      continue;
    }
    const v = replaceEqualDeep(aItem, bItem);
    copy[key] = v;
    if (v === aItem) equalItems++;
  }
  return aSize === bSize && equalItems === aSize ? a : copy;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    timeoutManager.setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (process.env.NODE_ENV !== "production") {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
        throw error;
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (process.env.NODE_ENV !== "production") {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && (fetchOptions == null ? void 0 : fetchOptions.initialPromise)) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}

// ../../node_modules/@tanstack/query-core/build/modern/focusManager.js
var _focused, _cleanup, _setup, _a2;
var FocusManager = (_a2 = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _focused);
    __privateAdd(this, _cleanup);
    __privateAdd(this, _setup);
    __privateSet(this, _setup, (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup)) {
      this.setEventListener(__privateGet(this, _setup));
    }
  }
  onUnsubscribe() {
    var _a10;
    if (!this.hasListeners()) {
      (_a10 = __privateGet(this, _cleanup)) == null ? void 0 : _a10.call(this);
      __privateSet(this, _cleanup, void 0);
    }
  }
  setEventListener(setup) {
    var _a10;
    __privateSet(this, _setup, setup);
    (_a10 = __privateGet(this, _cleanup)) == null ? void 0 : _a10.call(this);
    __privateSet(this, _cleanup, setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    }));
  }
  setFocused(focused) {
    const changed = __privateGet(this, _focused) !== focused;
    if (changed) {
      __privateSet(this, _focused, focused);
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    var _a10;
    if (typeof __privateGet(this, _focused) === "boolean") {
      return __privateGet(this, _focused);
    }
    return ((_a10 = globalThis.document) == null ? void 0 : _a10.visibilityState) !== "hidden";
  }
}, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a2);
var focusManager = new FocusManager();

// ../../node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

// ../../node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

// ../../node_modules/@tanstack/query-core/build/modern/onlineManager.js
var _online, _cleanup2, _setup2, _a3;
var OnlineManager = (_a3 = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _online, true);
    __privateAdd(this, _cleanup2);
    __privateAdd(this, _setup2);
    __privateSet(this, _setup2, (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup2)) {
      this.setEventListener(__privateGet(this, _setup2));
    }
  }
  onUnsubscribe() {
    var _a10;
    if (!this.hasListeners()) {
      (_a10 = __privateGet(this, _cleanup2)) == null ? void 0 : _a10.call(this);
      __privateSet(this, _cleanup2, void 0);
    }
  }
  setEventListener(setup) {
    var _a10;
    __privateSet(this, _setup2, setup);
    (_a10 = __privateGet(this, _cleanup2)) == null ? void 0 : _a10.call(this);
    __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
  }
  setOnline(online) {
    const changed = __privateGet(this, _online) !== online;
    if (changed) {
      __privateSet(this, _online, online);
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return __privateGet(this, _online);
  }
}, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _a3);
var onlineManager = new OnlineManager();

// ../../node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  }
};
function createRetryer(config2) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let continueFn;
  const thenable = pendingThenable();
  const isResolved = () => thenable.status !== "pending";
  const cancel = (cancelOptions) => {
    var _a10;
    if (!isResolved()) {
      const error = new CancelledError(cancelOptions);
      reject(error);
      (_a10 = config2.onCancel) == null ? void 0 : _a10.call(config2, error);
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config2.networkMode === "always" || onlineManager.isOnline()) && config2.canRun();
  const canStart = () => canFetch(config2.networkMode) && config2.canRun();
  const resolve = (value) => {
    if (!isResolved()) {
      continueFn == null ? void 0 : continueFn();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved()) {
      continueFn == null ? void 0 : continueFn();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      var _a10;
      continueFn = (value) => {
        if (isResolved() || canContinue()) {
          continueResolve(value);
        }
      };
      (_a10 = config2.onPause) == null ? void 0 : _a10.call(config2);
    }).then(() => {
      var _a10;
      continueFn = void 0;
      if (!isResolved()) {
        (_a10 = config2.onContinue) == null ? void 0 : _a10.call(config2);
      }
    });
  };
  const run = () => {
    if (isResolved()) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config2.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise != null ? initialPromise : config2.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      var _a10, _b, _c;
      if (isResolved()) {
        return;
      }
      const retry = (_a10 = config2.retry) != null ? _a10 : isServer ? 0 : 3;
      const retryDelay = (_b = config2.retryDelay) != null ? _b : defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      (_c = config2.onFail) == null ? void 0 : _c.call(config2, failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    status: () => thenable.status,
    cancel,
    continue: () => {
      continueFn == null ? void 0 : continueFn();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

// ../../node_modules/@tanstack/query-core/build/modern/removable.js
var _gcTimeout, _a4;
var Removable = (_a4 = class {
  constructor() {
    __privateAdd(this, _gcTimeout);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      __privateSet(this, _gcTimeout, timeoutManager.setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime));
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime != null ? newGcTime : isServer ? Infinity : 5 * 60 * 1e3
    );
  }
  clearGcTimeout() {
    if (__privateGet(this, _gcTimeout)) {
      timeoutManager.clearTimeout(__privateGet(this, _gcTimeout));
      __privateSet(this, _gcTimeout, void 0);
    }
  }
}, _gcTimeout = new WeakMap(), _a4);

// ../../node_modules/@tanstack/query-core/build/modern/query.js
var _initialState, _revertState, _cache, _client, _retryer, _defaultOptions, _abortSignalConsumed, _Query_instances, dispatch_fn, _a5;
var Query = (_a5 = class extends Removable {
  constructor(config2) {
    var _a10;
    super();
    __privateAdd(this, _Query_instances);
    __privateAdd(this, _initialState);
    __privateAdd(this, _revertState);
    __privateAdd(this, _cache);
    __privateAdd(this, _client);
    __privateAdd(this, _retryer);
    __privateAdd(this, _defaultOptions);
    __privateAdd(this, _abortSignalConsumed);
    __privateSet(this, _abortSignalConsumed, false);
    __privateSet(this, _defaultOptions, config2.defaultOptions);
    this.setOptions(config2.options);
    this.observers = [];
    __privateSet(this, _client, config2.client);
    __privateSet(this, _cache, __privateGet(this, _client).getQueryCache());
    this.queryKey = config2.queryKey;
    this.queryHash = config2.queryHash;
    __privateSet(this, _initialState, getDefaultState(this.options));
    this.state = (_a10 = config2.state) != null ? _a10 : __privateGet(this, _initialState);
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    var _a10;
    return (_a10 = __privateGet(this, _retryer)) == null ? void 0 : _a10.promise;
  }
  setOptions(options) {
    this.options = { ...__privateGet(this, _defaultOptions), ...options };
    this.updateGcTime(this.options.gcTime);
    if (this.state && this.state.data === void 0) {
      const defaultState = getDefaultState(this.options);
      if (defaultState.data !== void 0) {
        this.setData(defaultState.data, {
          updatedAt: defaultState.dataUpdatedAt,
          manual: true
        });
        __privateSet(this, _initialState, defaultState);
      }
    }
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      __privateGet(this, _cache).remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt,
      manual: options == null ? void 0 : options.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "setState", state, setStateOptions });
  }
  cancel(options) {
    var _a10, _b;
    const promise = (_a10 = __privateGet(this, _retryer)) == null ? void 0 : _a10.promise;
    (_b = __privateGet(this, _retryer)) == null ? void 0 : _b.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(__privateGet(this, _initialState));
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveEnabled(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
      );
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    var _a10;
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer == null ? void 0 : observer.refetch({ cancelRefetch: false });
    (_a10 = __privateGet(this, _retryer)) == null ? void 0 : _a10.continue();
  }
  onOnline() {
    var _a10;
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer == null ? void 0 : observer.refetch({ cancelRefetch: false });
    (_a10 = __privateGet(this, _retryer)) == null ? void 0 : _a10.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (__privateGet(this, _retryer)) {
          if (__privateGet(this, _abortSignalConsumed)) {
            __privateGet(this, _retryer).cancel({ revert: true });
          } else {
            __privateGet(this, _retryer).cancelRetry();
          }
        }
        this.scheduleGc();
      }
      __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "invalidate" });
    }
  }
  async fetch(options, fetchOptions) {
    var _a10, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    if (this.state.fetchStatus !== "idle" && // If the promise in the retyer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    ((_a10 = __privateGet(this, _retryer)) == null ? void 0 : _a10.status()) !== "rejected") {
      if (this.state.data !== void 0 && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
        this.cancel({ silent: true });
      } else if (__privateGet(this, _retryer)) {
        __privateGet(this, _retryer).continueRetry();
        return __privateGet(this, _retryer).promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (process.env.NODE_ENV !== "production") {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          __privateSet(this, _abortSignalConsumed, true);
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: __privateGet(this, _client),
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      __privateSet(this, _abortSignalConsumed, false);
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: __privateGet(this, _client),
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    (_b = this.options.behavior) == null ? void 0 : _b.onFetch(context, this);
    __privateSet(this, _revertState, this.state);
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_c = context.fetchOptions) == null ? void 0 : _c.meta)) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "fetch", meta: (_d = context.fetchOptions) == null ? void 0 : _d.meta });
    }
    __privateSet(this, _retryer, createRetryer({
      initialPromise: fetchOptions == null ? void 0 : fetchOptions.initialPromise,
      fn: context.fetchFn,
      onCancel: (error) => {
        if (error instanceof CancelledError && error.revert) {
          this.setState({
            ...__privateGet(this, _revertState),
            fetchStatus: "idle"
          });
        }
        abortController.abort();
      },
      onFail: (failureCount, error) => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "pause" });
      },
      onContinue: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    }));
    try {
      const data = await __privateGet(this, _retryer).start();
      if (data === void 0) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
          );
        }
        throw new Error(`${this.queryHash} data is undefined`);
      }
      this.setData(data);
      (_f = (_e = __privateGet(this, _cache).config).onSuccess) == null ? void 0 : _f.call(_e, data, this);
      (_h = (_g = __privateGet(this, _cache).config).onSettled) == null ? void 0 : _h.call(
        _g,
        data,
        this.state.error,
        this
      );
      return data;
    } catch (error) {
      if (error instanceof CancelledError) {
        if (error.silent) {
          return __privateGet(this, _retryer).promise;
        } else if (error.revert) {
          if (this.state.data === void 0) {
            throw error;
          }
          return this.state.data;
        }
      }
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
        type: "error",
        error
      });
      (_j = (_i = __privateGet(this, _cache).config).onError) == null ? void 0 : _j.call(
        _i,
        error,
        this
      );
      (_l = (_k = __privateGet(this, _cache).config).onSettled) == null ? void 0 : _l.call(
        _k,
        this.state.data,
        error,
        this
      );
      throw error;
    } finally {
      this.scheduleGc();
    }
  }
}, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _client = new WeakMap(), _retryer = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _Query_instances = new WeakSet(), dispatch_fn = function(action) {
  const reducer = (state) => {
    var _a10, _b;
    switch (action.type) {
      case "failed":
        return {
          ...state,
          fetchFailureCount: action.failureCount,
          fetchFailureReason: action.error
        };
      case "pause":
        return {
          ...state,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...state,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...state,
          ...fetchState(state.data, this.options),
          fetchMeta: (_a10 = action.meta) != null ? _a10 : null
        };
      case "success":
        const newState = {
          ...state,
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: (_b = action.dataUpdatedAt) != null ? _b : Date.now(),
          error: null,
          isInvalidated: false,
          status: "success",
          ...!action.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
        __privateSet(this, _revertState, action.manual ? newState : void 0);
        return newState;
      case "error":
        const error = action.error;
        return {
          ...state,
          error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          fetchFailureReason: error,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...state,
          isInvalidated: true
        };
      case "setState":
        return {
          ...state,
          ...action.state
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    this.observers.forEach((observer) => {
      observer.onQueryUpdate();
    });
    __privateGet(this, _cache).notify({ query: this, type: "updated", action });
  });
}, _a5);
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

// ../../node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      var _a10, _b, _c, _d, _e;
      const options = context.options;
      const direction = (_c = (_b = (_a10 = context.fetchOptions) == null ? void 0 : _a10.meta) == null ? void 0 : _b.fetchMore) == null ? void 0 : _c.direction;
      const oldPages = ((_d = context.state.data) == null ? void 0 : _d.pages) || [];
      const oldPageParams = ((_e = context.state.data) == null ? void 0 : _e.pageParams) || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        var _a11;
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages != null ? pages : oldPages.length;
          do {
            const param = currentPage === 0 ? (_a11 = oldPageParams[0]) != null ? _a11 : options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          var _a11, _b2;
          return (_b2 = (_a11 = context.options).persister) == null ? void 0 : _b2.call(
            _a11,
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  var _a10;
  return pages.length > 0 ? (_a10 = options.getPreviousPageParam) == null ? void 0 : _a10.call(options, pages[0], pages, pageParams[0], pageParams) : void 0;
}

// ../../node_modules/@tanstack/query-core/build/modern/mutation.js
var _client2, _observers, _mutationCache, _retryer2, _Mutation_instances, dispatch_fn2, _a6;
var Mutation = (_a6 = class extends Removable {
  constructor(config2) {
    super();
    __privateAdd(this, _Mutation_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _observers);
    __privateAdd(this, _mutationCache);
    __privateAdd(this, _retryer2);
    __privateSet(this, _client2, config2.client);
    this.mutationId = config2.mutationId;
    __privateSet(this, _mutationCache, config2.mutationCache);
    __privateSet(this, _observers, []);
    this.state = config2.state || getDefaultState2();
    this.setOptions(config2.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!__privateGet(this, _observers).includes(observer)) {
      __privateGet(this, _observers).push(observer);
      this.clearGcTimeout();
      __privateGet(this, _mutationCache).notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    __privateSet(this, _observers, __privateGet(this, _observers).filter((x) => x !== observer));
    this.scheduleGc();
    __privateGet(this, _mutationCache).notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!__privateGet(this, _observers).length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        __privateGet(this, _mutationCache).remove(this);
      }
    }
  }
  continue() {
    var _a10, _b;
    return (_b = (_a10 = __privateGet(this, _retryer2)) == null ? void 0 : _a10.continue()) != null ? _b : (
      // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
      this.execute(this.state.variables)
    );
  }
  async execute(variables) {
    var _a10, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    const onContinue = () => {
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "continue" });
    };
    const mutationFnContext = {
      client: __privateGet(this, _client2),
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    __privateSet(this, _retryer2, createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables, mutationFnContext);
      },
      onFail: (failureCount, error) => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pause" });
      },
      onContinue,
      retry: (_a10 = this.options.retry) != null ? _a10 : 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => __privateGet(this, _mutationCache).canRun(this)
    }));
    const restored = this.state.status === "pending";
    const isPaused = !__privateGet(this, _retryer2).canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pending", variables, isPaused });
        await ((_c = (_b = __privateGet(this, _mutationCache).config).onMutate) == null ? void 0 : _c.call(
          _b,
          variables,
          this,
          mutationFnContext
        ));
        const context = await ((_e = (_d = this.options).onMutate) == null ? void 0 : _e.call(
          _d,
          variables,
          mutationFnContext
        ));
        if (context !== this.state.context) {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, {
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await __privateGet(this, _retryer2).start();
      await ((_g = (_f = __privateGet(this, _mutationCache).config).onSuccess) == null ? void 0 : _g.call(
        _f,
        data,
        variables,
        this.state.context,
        this,
        mutationFnContext
      ));
      await ((_i = (_h = this.options).onSuccess) == null ? void 0 : _i.call(
        _h,
        data,
        variables,
        this.state.context,
        mutationFnContext
      ));
      await ((_k = (_j = __privateGet(this, _mutationCache).config).onSettled) == null ? void 0 : _k.call(
        _j,
        data,
        null,
        this.state.variables,
        this.state.context,
        this,
        mutationFnContext
      ));
      await ((_m = (_l = this.options).onSettled) == null ? void 0 : _m.call(
        _l,
        data,
        null,
        variables,
        this.state.context,
        mutationFnContext
      ));
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "success", data });
      return data;
    } catch (error) {
      try {
        await ((_o = (_n = __privateGet(this, _mutationCache).config).onError) == null ? void 0 : _o.call(
          _n,
          error,
          variables,
          this.state.context,
          this,
          mutationFnContext
        ));
        await ((_q = (_p = this.options).onError) == null ? void 0 : _q.call(
          _p,
          error,
          variables,
          this.state.context,
          mutationFnContext
        ));
        await ((_s = (_r = __privateGet(this, _mutationCache).config).onSettled) == null ? void 0 : _s.call(
          _r,
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this,
          mutationFnContext
        ));
        await ((_u = (_t = this.options).onSettled) == null ? void 0 : _u.call(
          _t,
          void 0,
          error,
          variables,
          this.state.context,
          mutationFnContext
        ));
        throw error;
      } finally {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "error", error });
      }
    } finally {
      __privateGet(this, _mutationCache).runNext(this);
    }
  }
}, _client2 = new WeakMap(), _observers = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _Mutation_instances = new WeakSet(), dispatch_fn2 = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          failureCount: action.failureCount,
          failureReason: action.error
        };
      case "pause":
        return {
          ...state,
          isPaused: true
        };
      case "continue":
        return {
          ...state,
          isPaused: false
        };
      case "pending":
        return {
          ...state,
          context: action.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: action.isPaused,
          status: "pending",
          variables: action.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...state,
          data: action.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: false
        };
      case "error":
        return {
          ...state,
          data: void 0,
          error: action.error,
          failureCount: state.failureCount + 1,
          failureReason: action.error,
          isPaused: false,
          status: "error"
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    __privateGet(this, _observers).forEach((observer) => {
      observer.onMutationUpdate(action);
    });
    __privateGet(this, _mutationCache).notify({
      mutation: this,
      type: "updated",
      action
    });
  });
}, _a6);
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

// ../../node_modules/@tanstack/query-core/build/modern/mutationCache.js
var _mutations, _scopes, _mutationId, _a7;
var MutationCache = (_a7 = class extends Subscribable {
  constructor(config2 = {}) {
    super();
    __privateAdd(this, _mutations);
    __privateAdd(this, _scopes);
    __privateAdd(this, _mutationId);
    this.config = config2;
    __privateSet(this, _mutations, /* @__PURE__ */ new Set());
    __privateSet(this, _scopes, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationId, 0);
  }
  build(client, options, state) {
    const mutation = new Mutation({
      client,
      mutationCache: this,
      mutationId: ++__privateWrapper(this, _mutationId)._,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    __privateGet(this, _mutations).add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = __privateGet(this, _scopes).get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        __privateGet(this, _scopes).set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (__privateGet(this, _mutations).delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = __privateGet(this, _scopes).get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            __privateGet(this, _scopes).delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = __privateGet(this, _scopes).get(scope);
      const firstPendingMutation = mutationsWithSameScope == null ? void 0 : mutationsWithSameScope.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    var _a10, _b;
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = (_a10 = __privateGet(this, _scopes).get(scope)) == null ? void 0 : _a10.find((m) => m !== mutation && m.state.isPaused);
      return (_b = foundMutation == null ? void 0 : foundMutation.continue()) != null ? _b : Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    notifyManager.batch(() => {
      __privateGet(this, _mutations).forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      __privateGet(this, _mutations).clear();
      __privateGet(this, _scopes).clear();
    });
  }
  getAll() {
    return Array.from(__privateGet(this, _mutations));
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop))
      )
    );
  }
}, _mutations = new WeakMap(), _scopes = new WeakMap(), _mutationId = new WeakMap(), _a7);
function scopeFor(mutation) {
  var _a10;
  return (_a10 = mutation.options.scope) == null ? void 0 : _a10.id;
}

// ../../node_modules/@tanstack/query-core/build/modern/queryCache.js
var _queries, _a8;
var QueryCache = (_a8 = class extends Subscribable {
  constructor(config2 = {}) {
    super();
    __privateAdd(this, _queries);
    this.config = config2;
    __privateSet(this, _queries, /* @__PURE__ */ new Map());
  }
  build(client, options, state) {
    var _a10;
    const queryKey = options.queryKey;
    const queryHash = (_a10 = options.queryHash) != null ? _a10 : hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!__privateGet(this, _queries).has(query.queryHash)) {
      __privateGet(this, _queries).set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = __privateGet(this, _queries).get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        __privateGet(this, _queries).delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return __privateGet(this, _queries).get(queryHash);
  }
  getAll() {
    return [...__privateGet(this, _queries).values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
}, _queries = new WeakMap(), _a8);

// ../../node_modules/@tanstack/query-core/build/modern/queryClient.js
var _queryCache, _mutationCache2, _defaultOptions2, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _a9;
var QueryClient = (_a9 = class {
  constructor(config2 = {}) {
    __privateAdd(this, _queryCache);
    __privateAdd(this, _mutationCache2);
    __privateAdd(this, _defaultOptions2);
    __privateAdd(this, _queryDefaults);
    __privateAdd(this, _mutationDefaults);
    __privateAdd(this, _mountCount);
    __privateAdd(this, _unsubscribeFocus);
    __privateAdd(this, _unsubscribeOnline);
    __privateSet(this, _queryCache, config2.queryCache || new QueryCache());
    __privateSet(this, _mutationCache2, config2.mutationCache || new MutationCache());
    __privateSet(this, _defaultOptions2, config2.defaultOptions || {});
    __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mountCount, 0);
  }
  mount() {
    __privateWrapper(this, _mountCount)._++;
    if (__privateGet(this, _mountCount) !== 1) return;
    __privateSet(this, _unsubscribeFocus, focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onFocus();
      }
    }));
    __privateSet(this, _unsubscribeOnline, onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onOnline();
      }
    }));
  }
  unmount() {
    var _a10, _b;
    __privateWrapper(this, _mountCount)._--;
    if (__privateGet(this, _mountCount) !== 0) return;
    (_a10 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a10.call(this);
    __privateSet(this, _unsubscribeFocus, void 0);
    (_b = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b.call(this);
    __privateSet(this, _unsubscribeOnline, void 0);
  }
  isFetching(filters) {
    return __privateGet(this, _queryCache).findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return __privateGet(this, _mutationCache2).findAll({ ...filters, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    var _a10;
    const options = this.defaultQueryOptions({ queryKey });
    return (_a10 = __privateGet(this, _queryCache).get(options.queryHash)) == null ? void 0 : _a10.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return __privateGet(this, _queryCache).findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = __privateGet(this, _queryCache).get(
      defaultedOptions.queryHash
    );
    const prevData = query == null ? void 0 : query.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    var _a10;
    const options = this.defaultQueryOptions({ queryKey });
    return (_a10 = __privateGet(this, _queryCache).get(
      options.queryHash
    )) == null ? void 0 : _a10.state;
  }
  removeQueries(filters) {
    const queryCache = __privateGet(this, _queryCache);
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = __privateGet(this, _queryCache);
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(
        {
          type: "active",
          ...filters
        },
        options
      );
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      var _a10, _b;
      __privateGet(this, _queryCache).findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if ((filters == null ? void 0 : filters.refetchType) === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries(
        {
          ...filters,
          type: (_b = (_a10 = filters == null ? void 0 : filters.refetchType) != null ? _a10 : filters == null ? void 0 : filters.type) != null ? _b : "active"
        },
        options
      );
    });
  }
  refetchQueries(filters, options = {}) {
    var _a10;
    const fetchOptions = {
      ...options,
      cancelRefetch: (_a10 = options.cancelRefetch) != null ? _a10 : true
    };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
    return query.isStaleByTime(
      resolveStaleTime(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return __privateGet(this, _mutationCache2).resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return __privateGet(this, _queryCache);
  }
  getMutationCache() {
    return __privateGet(this, _mutationCache2);
  }
  getDefaultOptions() {
    return __privateGet(this, _defaultOptions2);
  }
  setDefaultOptions(options) {
    __privateSet(this, _defaultOptions2, options);
  }
  setQueryDefaults(queryKey, options) {
    __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...__privateGet(this, _queryDefaults).values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...__privateGet(this, _mutationDefaults).values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...__privateGet(this, _defaultOptions2).queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options == null ? void 0 : options._defaulted) {
      return options;
    }
    return {
      ...__privateGet(this, _defaultOptions2).mutations,
      ...(options == null ? void 0 : options.mutationKey) && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    __privateGet(this, _queryCache).clear();
    __privateGet(this, _mutationCache2).clear();
  }
}, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _a9);

// src/wallet-sdk/wagmi.ts
var chains = [
  { id: 1, name: "Ethereum", rpcUrl: "https://eth.public-rpc.com" },
  { id: 11155111, name: "Sepolia", rpcUrl: "https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" },
  { id: 137, name: "Polygon", rpcUrl: "https://polygon-rpc.com" },
  { id: 10, name: "Optimism", rpcUrl: "https://mainnet.optimism.io" },
  { id: 42161, name: "Arbitrum", rpcUrl: "https://arb1.arbitrum.io/rpc" },
  { id: 8453, name: "Base", rpcUrl: "https://mainnet.base.org" }
];
var projectId = "2e789d28c2f0380f39fc2a7bd198dee7";
var walletList = [
  {
    groupName: "\u63A8\u8350",
    wallets: [
      import_wallets.metaMaskWallet,
      import_wallets.okxWallet,
      import_wallets.imTokenWallet,
      import_wallets.coinbaseWallet,
      import_wallets.trustWallet
    ]
  },
  {
    groupName: "\u5176\u4ED6",
    wallets: [
      import_wallets.walletConnectWallet,
      import_wallets.injectedWallet,
      import_wallets.safeWallet
    ]
  }
];
var walletConfig = {
  appName: "YC Directory UI",
  projectId
};
var connectors = (0, import_rainbowkit.connectorsForWallets)(
  walletList,
  walletConfig
);
var config = (0, import_wagmi.createConfig)({
  chains,
  transports: Object.fromEntries(
    chains.map((chain) => [chain.id, (0, import_wagmi.http)()])
  ),
  connectors,
  ssr: true,
  // 持久化存储配置
  storage: (0, import_wagmi.createStorage)({
    storage: typeof window !== "undefined" ? window.localStorage : void 0,
    key: "ycdirectory-wagmi-store"
  })
});
var queryClient = new QueryClient();

// src/wallet-sdk/core/WalletSDK.ts
var WalletSDK = class {
  constructor(config2 = {}, useRainbowKit = true) {
    this.initialized = false;
    this.config = {
      storage: typeof window !== "undefined" ? window.localStorage : void 0,
      autoConnect: true,
      ...config2
    };
    this.useRainbowKit = useRainbowKit;
    this.manager = new WalletManager();
  }
  async initialize() {
    if (this.initialized) {
      console.log("\u{1F504} Wallet SDK \u5DF2\u7ECF\u521D\u59CB\u5316");
      return;
    }
    console.log("\u{1F680} \u521D\u59CB\u5316 Wallet SDK...", { useRainbowKit: this.useRainbowKit });
    try {
      if (this.useRainbowKit) {
        console.log("\u{1F308} \u4F7F\u7528 RainbowKit \u8FDE\u63A5\u5668");
        this.initializeRainbowKit();
      } else {
        console.log("\u{1F6E0}\uFE0F \u4F7F\u7528\u81EA\u5B9A\u4E49\u94B1\u5305\u7BA1\u7406\u5668");
        await this.manager.initialize(this.config);
      }
      this.initialized = true;
      if (this.config.autoConnect) {
        await this.autoConnect();
      }
      console.log("\u2705 Wallet SDK \u521D\u59CB\u5316\u5B8C\u6210");
    } catch (error) {
      console.error("\u274C Wallet SDK \u521D\u59CB\u5316\u5931\u8D25:", error);
      throw error;
    }
  }
  initializeRainbowKit() {
    console.log("\u{1F308} RainbowKit \u8FDE\u63A5\u5668\u5DF2\u521D\u59CB\u5316");
    console.log("\u{1F4CB} \u53EF\u7528\u8FDE\u63A5\u5668:", connectors.length);
  }
  // 连接管理
  async connect(walletId) {
    var _a10;
    if (!this.initialized) {
      throw new Error("Wallet SDK \u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5148\u8C03\u7528 initialize()");
    }
    if (this.useRainbowKit) {
      console.log(`\u{1F308} RainbowKit \u8FDE\u63A5\u94B1\u5305: ${walletId || "\u9ED8\u8BA4"}`);
      return {
        success: true,
        address: "0x1234567890123456789012345678901234567890",
        chainId: 1,
        wallet: {
          id: walletId || "rainbowkit",
          name: walletId || "RainbowKit Wallet",
          installed: true
        }
      };
    }
    let targetWalletId = walletId;
    if (!targetWalletId) {
      const lastWallet = (_a10 = this.config.storage) == null ? void 0 : _a10.getItem("lastConnectedWallet");
      targetWalletId = lastWallet || void 0;
    }
    if (!targetWalletId) {
      const availableWallets = this.getAvailableWallets();
      if (availableWallets.length > 0) {
        targetWalletId = availableWallets[0].id;
      }
    }
    if (!targetWalletId) {
      throw new Error("\u6CA1\u6709\u53EF\u7528\u7684\u94B1\u5305");
    }
    return await this.manager.connectWallet(targetWalletId);
  }
  async disconnect() {
    if (!this.initialized) return;
    if (this.useRainbowKit) {
      console.log("\u{1F308} RainbowKit \u65AD\u5F00\u8FDE\u63A5");
      return;
    }
    await this.manager.disconnectWallet();
  }
  // 状态查询
  isConnected() {
    if (!this.initialized) return false;
    const state = this.manager.getConnectionState();
    return !!state.address;
  }
  getAddress() {
    if (!this.initialized) return null;
    const state = this.manager.getConnectionState();
    return state.address;
  }
  getChainId() {
    if (!this.initialized) return null;
    const state = this.manager.getConnectionState();
    return state.chainId;
  }
  async getBalance() {
    if (!this.initialized || !this.isConnected()) {
      return "0";
    }
    const address = this.getAddress();
    if (!address) return "0";
    try {
      return "0.0000";
    } catch (error) {
      console.error("\u83B7\u53D6\u4F59\u989D\u5931\u8D25:", error);
      return "0.0000";
    }
  }
  async getTokenBalance(tokenAddress) {
    if (!this.initialized || !this.isConnected()) {
      return {
        balance: "0",
        decimals: 18,
        symbol: "",
        loading: false,
        error: "\u94B1\u5305\u672A\u8FDE\u63A5"
      };
    }
    const address = this.getAddress();
    if (!address) {
      return {
        balance: "0",
        decimals: 18,
        symbol: "",
        loading: false,
        error: "\u94B1\u5305\u5730\u5740\u4E0D\u5B58\u5728"
      };
    }
    try {
      return {
        balance: "0",
        decimals: 18,
        symbol: "TOKEN",
        loading: false,
        error: null
      };
    } catch (error) {
      console.error("\u83B7\u53D6\u4EE3\u5E01\u4F59\u989D\u5931\u8D25:", error);
      return {
        balance: "0",
        decimals: 18,
        symbol: "",
        loading: false,
        error: error instanceof Error ? error.message : "\u83B7\u53D6\u4EE3\u5E01\u4F59\u989D\u5931\u8D25"
      };
    }
  }
  // 钱包管理
  getAvailableWallets() {
    if (!this.initialized) return [];
    if (this.useRainbowKit) {
      return [
        { id: "metamask", name: "MetaMask", installed: true, iconUrl: "" },
        { id: "okx", name: "OKX Wallet", installed: true, iconUrl: "" },
        { id: "coinbase", name: "Coinbase Wallet", installed: true, iconUrl: "" },
        { id: "trust", name: "Trust Wallet", installed: true, iconUrl: "" },
        { id: "walletconnect", name: "WalletConnect", installed: true, iconUrl: "" },
        { id: "imtoken", name: "imToken", installed: true, iconUrl: "" },
        { id: "safe", name: "Safe", installed: true, iconUrl: "" }
      ];
    }
    return this.manager.getAvailableWallets();
  }
  async switchChain(chainId) {
    if (!this.initialized || !this.isConnected()) {
      throw new Error("\u94B1\u5305\u672A\u8FDE\u63A5");
    }
    try {
      console.log(`\u5207\u6362\u5230\u94FE: ${chainId}`);
    } catch (error) {
      console.error("\u5207\u6362\u94FE\u5931\u8D25:", error);
      throw error;
    }
  }
  // 事件管理
  on(event, handler) {
    if (this.useRainbowKit) {
      console.log(`\u{1F308} RainbowKit \u4E8B\u4EF6\u76D1\u542C: ${event}`);
      return;
    }
    this.manager.on(event, handler);
  }
  off(event, handler) {
    if (this.useRainbowKit) {
      console.log(`\u{1F308} RainbowKit \u79FB\u9664\u4E8B\u4EF6\u76D1\u542C: ${event}`);
      return;
    }
    this.manager.off(event, handler);
  }
  // 私有方法
  async autoConnect() {
    var _a10, _b, _c, _d, _e;
    if (this.useRainbowKit) {
      console.log("\u{1F308} RainbowKit \u81EA\u52A8\u8FDE\u63A5\u903B\u8F91");
      return;
    }
    try {
      const lastWallet = (_a10 = this.config.storage) == null ? void 0 : _a10.getItem("lastConnectedWallet");
      const address = (_b = this.config.storage) == null ? void 0 : _b.getItem("walletAddress");
      if (lastWallet && address) {
        console.log("\u{1F504} \u5C1D\u8BD5\u81EA\u52A8\u8FDE\u63A5...");
        await this.connect(lastWallet);
      }
    } catch (error) {
      console.warn("\u81EA\u52A8\u8FDE\u63A5\u5931\u8D25:", error);
      (_c = this.config.storage) == null ? void 0 : _c.removeItem("lastConnectedWallet");
      (_d = this.config.storage) == null ? void 0 : _d.removeItem("walletAddress");
      (_e = this.config.storage) == null ? void 0 : _e.removeItem("walletChainId");
    }
  }
  // 获取配置信息
  getConfig() {
    return { ...this.config };
  }
  // 检查是否初始化
  isInitialized() {
    return this.initialized;
  }
  // 获取 Wagmi 配置（用于 RainbowKit 集成）
  getWagmiConfig() {
    if (!this.useRainbowKit) {
      throw new Error("RainbowKit \u672A\u542F\u7528");
    }
    return config;
  }
  // 获取连接器（用于 RainbowKit 集成）
  getConnectors() {
    if (!this.useRainbowKit) {
      throw new Error("RainbowKit \u672A\u542F\u7528");
    }
    return connectors;
  }
  // 调试方法
  redetectWallets() {
    if (!this.useRainbowKit) {
      this.manager.redetectWallets();
    }
  }
  getDetectionDetails() {
    if (!this.useRainbowKit) {
      return this.manager.getDetectionDetails();
    }
    return { useRainbowKit: true };
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
    const safeDetected = detected || [];
    const safeConfigured = configuredWallets || {};
    const filteredDetected = this.deduplicateDetectedWallets(
      sortedDetected,
      nameMap,
      rdnsMap
    );
    const staticFiltered = this.filterConfiguredWallets(
      safeConfigured,
      filteredDetected
    );
    return {
      filtered: filteredDetected,
      staticFiltered
    };
  }
  static deduplicateDetectedWallets(sortedDetected2, nameMap2, rdnsMap2) {
    const filteredDetected = [];
    if (!Array.isArray(sortedDetected2)) {
      console.warn("\u26A0\uFE0F sortedDetected \u4E0D\u662F\u6570\u7EC4\uFF0C\u8FD4\u56DE\u7A7A\u7ED3\u679C");
      return filteredDetected;
    }
    if (sortedDetected2.length === 0) {
      return filteredDetected;
    }
    for (const wallet of sortedDetected2) {
      const normalizedName = wallet.name.toLowerCase().trim();
      const existingByName = nameMap2.get(normalizedName);
      const existingByRdns = rdnsMap2.get(wallet.rdns);
      if (!existingByName && !existingByRdns) {
        filteredDetected.push(wallet);
        nameMap2.set(normalizedName, wallet);
        rdnsMap2.set(wallet.rdns, wallet);
      }
    }
    return filteredDetected;
  }
  static filterConfiguredWallets(configuredWallets, filteredDetected) {
    const staticFiltered = {};
    Object.entries(configuredWallets).forEach(([groupName, wallets]) => {
      const filtered = wallets.filter((wallet) => {
        const existsInDetected = filteredDetected.some(
          (detected) => detected.name.toLowerCase().trim() === wallet.name.toLowerCase().trim() || detected.rdns === wallet.rdns
        );
        return !existsInDetected;
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
  Object.entries(walletInstances).forEach(([groupName, walletGroup]) => {
    allWallets.push(...walletGroup);
  });
  const installedWallets = allWallets.filter((wallet) => wallet.installed);
  const handleWalletSelect = async (walletId) => {
    const selectedWallet = installedWallets.find((wallet) => wallet.id === walletId);
    if (!selectedWallet) {
      console.error("\u274C \u672A\u627E\u5230\u9009\u4E2D\u7684\u94B1\u5305:", walletId);
      return;
    }
    setConnectingWallet(walletId);
    try {
      const result = await onConnect(walletId);
      if (result.success) {
      }
      onClose();
    } catch (error) {
      console.error("\u274C \u8FDE\u63A5\u94B1\u5305\u8FC7\u7A0B\u4E2D\u53D1\u751F\u9519\u8BEF:", error);
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
  chainID: null,
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
  config: config2,
  chains: chains2,
  provider,
  autoConnect,
  wallets
}) => {
  const [walletManager, setWalletManager] = (0, import_react2.useState)(null);
  const [state, setState] = (0, import_react2.useState)({
    address: "0x",
    chainId: null,
    chainID: null,
    isConnecting: false,
    isConnected: false,
    isDisconnected: true,
    isReconnecting: false,
    ensName: null,
    error: null,
    chains: chains2 || config2.chains || [],
    provider: provider || config2.provider,
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
        const manager = new WalletManager();
        const walletConfig2 = {
          projectId: config2.projectId,
          chains: chains2 || config2.chains || [],
          storage: config2.storage || (typeof window !== "undefined" ? window.localStorage : void 0),
          ...config2
        };
        manager.initialize();
        const detectedWallets2 = manager.getWallets();
        setWalletManager(manager);
        manager.on("connect", (data) => {
          setState((prev) => {
            var _a10;
            return {
              ...prev,
              isConnected: true,
              isConnecting: false,
              isDisconnected: false,
              address: data.address,
              chainId: data.chainId,
              chainID: ((_a10 = data.chainId) == null ? void 0 : _a10.toString()) || null,
              provider: data.provider,
              wallet: data.wallet ? {
                id: data.wallet.id || data.walletId,
                name: data.wallet.name || "Unknown",
                installed: true
              } : void 0,
              error: null
            };
          });
          setCurrentWalletId(data.walletId);
        });
        manager.on("disconnect", () => {
          setState((prev) => ({
            ...prev,
            isConnected: false,
            isDisconnected: true,
            isConnecting: false,
            address: "0x",
            chainId: null,
            chainID: null,
            provider: void 0,
            wallet: void 0,
            balance: "0.0000",
            signer: void 0,
            error: null
          }));
          setCurrentWalletId("");
        });
        manager.on("chainChanged", (data) => {
          setState((prev) => {
            var _a10;
            return {
              ...prev,
              chainId: data.chainId,
              chainID: ((_a10 = data.chainId) == null ? void 0 : _a10.toString()) || null
            };
          });
        });
        manager.on("accountChanged", (data) => {
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
  }, [config2, chains2, provider]);
  (0, import_react2.useEffect)(() => {
    const initWallets = async () => {
      if (!walletManager) return;
      try {
        setWalletsLoading(true);
        const detectedWallets2 = walletManager.getWallets();
        const configuredInstances = {};
        if (wallets && config2.projectId) {
          wallets.forEach((group) => {
            if (group.groupName && group.wallets) {
              const groupWallets = group.wallets.map((createWalletFn) => {
                return createWalletFn({
                  projectId: config2.projectId,
                  appName: config2.appName
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
  }, [walletManager, wallets, config2.projectId, config2.appName]);
  const connect = (0, import_react2.useCallback)(async (walletId) => {
    var _a10;
    if (!walletManager) {
      console.error("\u274C WalletProvider - WalletManager \u672A\u521D\u59CB\u5316");
      return {
        success: false,
        error: "WalletManager \u672A\u521D\u59CB\u5316"
      };
    }
    setState((prev) => ({
      ...prev,
      isConnecting: true,
      isDisconnected: false,
      error: null
    }));
    try {
      const result = await walletManager.connectWallet(walletId);
      setIsModalOpen(false);
      if (typeof window !== "undefined" && config2.storage) {
        config2.storage.setItem("lastConnectedWallet", walletId);
        config2.storage.setItem("walletAddress", result.address || "");
        config2.storage.setItem("lastConnectionTime", Date.now().toString());
      }
      return {
        success: true,
        address: result.address,
        chainId: result.chainId,
        chainID: ((_a10 = result.chainId) == null ? void 0 : _a10.toString()) || null,
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
  }, [walletManager, config2.storage]);
  const disconnect = (0, import_react2.useCallback)(async () => {
    try {
      if (walletManager) {
        await walletManager.disconnectWallet(currentWalletId);
      }
    } catch (error) {
      console.warn("\u26A0\uFE0F \u65AD\u5F00\u94B1\u5305\u8FDE\u63A5\u5668\u65F6\u51FA\u9519:", error);
    }
    if (typeof window !== "undefined" && config2.storage) {
      config2.storage.removeItem("lastConnectedWallet");
      config2.storage.removeItem("walletAddress");
      config2.storage.removeItem("lastConnectionTime");
    }
    setState((prev) => ({
      ...prev,
      isConnected: false,
      isDisconnected: true,
      address: "0x",
      chainId: null,
      chainID: null,
      provider: void 0,
      wallet: void 0,
      signer: void 0,
      balance: "0.0000",
      isConnecting: false,
      error: null
    }));
    setCurrentWalletId("");
    setTokenBalanceCache({});
  }, [walletManager, currentWalletId, config2.storage]);
  const switchChain = (0, import_react2.useCallback)(async (chainId) => {
    var _a10;
    if (!walletManager) throw new Error("WalletManager \u672A\u521D\u59CB\u5316");
    try {
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
        setState((prev) => ({
          ...prev,
          chainId,
          chainID: chainId.toString()
        }));
        if (walletManager) {
          (_a10 = walletManager.emit) == null ? void 0 : _a10.call(walletManager, "chainChanged", { chainId });
        }
      } catch (switchError) {
        if (switchError.code === 4902) {
          const chainConfig = getChainConfig(chainId);
          if (chainConfig) {
            await provider2.request({
              method: "wallet_addEthereumChain",
              params: [chainConfig]
            });
            setState((prev) => ({
              ...prev,
              chainId,
              chainID: chainId.toString()
            }));
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
      return;
    }
    try {
      setBalanceLoading(true);
      const currentWallet = walletManager == null ? void 0 : walletManager.getWalletById(currentWalletId);
      if (!currentWallet) {
        console.warn("\u26A0\uFE0F \u672A\u627E\u5230\u5F53\u524D\u8FDE\u63A5\u7684\u94B1\u5305", {
          currentWalletId,
          availableWallets: walletManager == null ? void 0 : walletManager.getWallets().map((w) => w.id)
        });
        return;
      }
      const provider2 = currentWallet.provider;
      const balanceHex = await provider2.request({
        method: "eth_getBalance",
        params: [state.address, "latest"]
      });
      if (typeof balanceHex === "string") {
        const balanceWei = BigInt(balanceHex);
        const balanceEth = (0, import_viem.formatEther)(balanceWei);
        const formattedBalance = parseFloat(balanceEth).toFixed(4);
        setState((prev) => ({
          ...prev,
          balance: formattedBalance
        }));
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
      const lastConnectedWallet = typeof window !== "undefined" && config2.storage ? config2.storage.getItem("lastConnectedWallet") : null;
      if (!lastConnectedWallet) {
        setAutoConnectAttempted(true);
        return;
      }
      try {
        const availableWallets = walletManager.getAvailableWallets();
        const walletExists = availableWallets.some((wallet) => wallet.id === lastConnectedWallet);
        if (walletExists) {
          await connect(lastConnectedWallet);
        } else {
          if (typeof window !== "undefined" && config2.storage) {
            config2.storage.removeItem("lastConnectedWallet");
            config2.storage.removeItem("walletAddress");
            config2.storage.removeItem("lastConnectionTime");
          }
        }
      } catch (error) {
        console.warn("\u81EA\u52A8\u8FDE\u63A5\u5931\u8D25:", error);
        if (typeof window !== "undefined" && config2.storage) {
          config2.storage.removeItem("lastConnectedWallet");
          config2.storage.removeItem("walletAddress");
          config2.storage.removeItem("lastConnectionTime");
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
    config2.storage,
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
      const allWallets = [];
      if (walletInstances) {
        Object.entries(walletInstances).forEach(([groupName, walletGroup]) => {
          allWallets.push(...walletGroup);
        });
      }
      if (allWallets.length === 0) {
        return;
      }
      const installedWallets = allWallets.filter((wallet2) => wallet2.installed);
      if (installedWallets.length === 0) {
        return;
      }
      if (installedWallets.length === 1) {
        const result = await connect(installedWallets[0].id);
        if (onConnect) {
          onConnect(result);
        }
        if (result.success) {
          closeModal();
        }
      } else {
        openModal();
      }
    } catch (error) {
      console.error("\u274C \u8FDE\u63A5\u94B1\u5305\u5931\u8D25:", error);
    }
  };
  const handleDisconnect = async () => {
    try {
      await disconnect();
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
      31337: "Localhost",
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
      31337: "bg-orange-500",
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
    { id: 31337, name: "Localhost (Hardhat)", shortName: "Local" },
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
                31337: "http://127.0.0.1:8545",
                1: "https://etherscan.io",
                11155111: "https://sepolia.etherscan.io",
                137: "https://polygonscan.com",
                56: "https://bscscan.com",
                42161: "https://arbiscan.io",
                10: "https://optimistic.etherscan.io"
              };
              const explorerUrl = chainId ? explorerUrls[chainId] : null;
              if (explorerUrl) {
                if (chainId === 31337) {
                  alert("\u672C\u5730\u7F51\u7EDC\u4E0D\u652F\u6301\u6D4F\u89C8\u5668\u67E5\u770B\uFF0C\u8BF7\u4F7F\u7528\u5F00\u53D1\u5DE5\u5177\u8FDB\u884C\u8C03\u8BD5");
                } else {
                  window.open(`${explorerUrl}/address/${address}`, "_blank");
                }
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
  WalletSDK,
  useWallet,
  version
});
//# sourceMappingURL=index.cjs.map