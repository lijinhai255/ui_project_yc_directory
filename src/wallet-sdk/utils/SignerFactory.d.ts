import { EthereumProvider, WalletSigner } from '../types';
export declare class SignerFactory {
    /**
     * 从 Provider 创建 Signer
     * @param provider 以太坊提供者
     * @param address 钱包地址
     * @returns WalletSigner 实例
     */
    static createFromProvider(provider: EthereumProvider, address: string): WalletSigner;
    /**
     * 安全转换 Signer
     * @param signer 未知类型的 signer
     * @returns 安全的 WalletSigner 或 undefined
     */
    static ensureSafe(signer: unknown): WalletSigner | undefined;
}
//# sourceMappingURL=SignerFactory.d.ts.map