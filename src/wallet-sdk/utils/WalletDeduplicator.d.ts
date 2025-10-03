import { DetectedWallet, ExtendedWalletInfo } from '../types';
export interface DeduplicationResult {
    filtered: DetectedWallet[];
    staticFiltered: {
        [groupName: string]: ExtendedWalletInfo[];
    };
}
export declare class WalletDeduplicator {
    /**
     * 钱包去重函数
     * @param detected 检测到的钱包列表
     * @param configuredWallets 配置的钱包组
     * @returns 去重后的结果
     */
    static deduplicate(detected: DetectedWallet[] | undefined, configuredWallets: {
        [groupName: string]: ExtendedWalletInfo[];
    } | undefined): DeduplicationResult;
    private static deduplicateDetectedWallets;
    private static filterConfiguredWallets;
}
//# sourceMappingURL=WalletDeduplicator.d.ts.map