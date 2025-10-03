import { DetectedWallet, ExtendedWalletInfo } from '../types';

export interface DeduplicationResult {
  filtered: DetectedWallet[];
  staticFiltered: { [groupName: string]: ExtendedWalletInfo[] };
}

export class WalletDeduplicator {
  /**
   * 钱包去重函数
   * @param detected 检测到的钱包列表
   * @param configuredWallets 配置的钱包组
   * @returns 去重后的结果
   */
  static deduplicate(
    detected: DetectedWallet[] | undefined,
    configuredWallets: { [groupName: string]: ExtendedWalletInfo[] } | undefined
  ): DeduplicationResult {

    // 确保 detected 和 configuredWallets 是有效的
    const safeDetected = detected || [];
    const safeConfigured = configuredWallets || {};



    // 去重检测到的钱包
    const filteredDetected = this.deduplicateDetectedWallets(
      sortedDetected,
      nameMap,
      rdnsMap
    );

    // 过滤配置的钱包
    const staticFiltered = this.filterConfiguredWallets(
      safeConfigured,
      filteredDetected
    );


    return {
      filtered: filteredDetected,
      staticFiltered,
    };
  }

  private static deduplicateDetectedWallets(
    sortedDetected: DetectedWallet[],
    nameMap: Map<string, DetectedWallet>,
    rdnsMap: Map<string, DetectedWallet>
  ): DetectedWallet[] {
    const filteredDetected: DetectedWallet[] = [];

    // 确保 sortedDetected 是数组且不为空
    if (!Array.isArray(sortedDetected)) {
      console.warn("⚠️ sortedDetected 不是数组，返回空结果");
      return filteredDetected;
    }

    if (sortedDetected.length === 0) {
      return filteredDetected;
    }

    for (const wallet of sortedDetected) {
      const normalizedName = wallet.name.toLowerCase().trim();
      const existingByName = nameMap.get(normalizedName);
      const existingByRdns = rdnsMap.get(wallet.rdns);

      if (!existingByName && !existingByRdns) {
        // 没有重复，添加到结果中
        filteredDetected.push(wallet);
        nameMap.set(normalizedName, wallet);
        rdnsMap.set(wallet.rdns, wallet);
      }
    }

    return filteredDetected;
  }

  private static filterConfiguredWallets(
    configuredWallets: { [groupName: string]: ExtendedWalletInfo[] },
    filteredDetected: DetectedWallet[]
  ): { [groupName: string]: ExtendedWalletInfo[] } {
    const staticFiltered: { [groupName: string]: ExtendedWalletInfo[] } = {};

    Object.entries(configuredWallets).forEach(([groupName, wallets]) => {
      const filtered = wallets.filter(wallet => {
        const existsInDetected = filteredDetected.some(detected =>
          detected.name.toLowerCase().trim() === wallet.name.toLowerCase().trim() ||
          detected.rdns === wallet.rdns
        );
        return !existsInDetected;
      });

      if (filtered.length > 0) {
        staticFiltered[groupName] = filtered;
      }
    });

    return staticFiltered;
  }
}