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
    const safeDetected = Array.isArray(detected) ? detected : [];
    const safeConfigured = configuredWallets || {};

    console.log("🔍 WalletDeduplicator 输入:", {
      detected: safeDetected,
      detectedLength: safeDetected.length,
      configuredGroups: Object.keys(safeConfigured)
    });

    // 创建排序后的检测钱包列表和映射表
    const sortedDetected = [...safeDetected].sort((a, b) => a.name.localeCompare(b.name));
    const nameMap = new Map<string, DetectedWallet>();
    const rdnsMap = new Map<string, DetectedWallet>();

    console.log("🔍 排序后的钱包:", {
      sortedDetected,
      sortedLength: sortedDetected.length
    });

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

    console.log("🔍 去重结果:", {
      filteredDetected,
      filteredLength: filteredDetected.length,
      staticFiltered
    });

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

    console.log("🔍 开始去重检测到的钱包:", {
      input: sortedDetected,
      inputLength: sortedDetected?.length || 0
    });

    // 确保 sortedDetected 是数组且不为空
    if (!Array.isArray(sortedDetected)) {
      console.error("❌ sortedDetected 不是数组:", sortedDetected);
      return filteredDetected;
    }

    if (sortedDetected.length === 0) {
      console.log("📝 sortedDetected 为空数组，返回空结果");
      return filteredDetected;
    }

    for (const wallet of sortedDetected) {
      if (!wallet || typeof wallet !== 'object') {
        console.warn("⚠️ 钱包对象无效:", wallet);
        continue;
      }

      if (!wallet.name) {
        console.warn("⚠️ 钱包名称为空:", wallet);
        continue;
      }

      const normalizedName = wallet.name.toLowerCase().trim();
      const existingByName = nameMap.get(normalizedName);
      const existingByRdns = wallet.rdns ? rdnsMap.get(wallet.rdns) : undefined;

      if (!existingByName && !existingByRdns) {
        // 没有重复，添加到结果中
        filteredDetected.push(wallet);
        nameMap.set(normalizedName, wallet);
        if (wallet.rdns) {
          rdnsMap.set(wallet.rdns, wallet);
        }
        console.log("✅ 添加钱包:", wallet.name);
      } else {
        console.log("🔄 跳过重复钱包:", wallet.name, {
          existingByName: existingByName?.name,
          existingByRdns: existingByRdns?.name
        });
      }
    }

    console.log("🔍 去重完成:", {
      result: filteredDetected,
      resultLength: filteredDetected.length
    });

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