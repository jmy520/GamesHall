import { Injectable } from '@angular/core';
import { SafeBox } from './safe-box';

/**
 * 首次运行标志持久化存储
 *
 * @export
 * @class FirstTimeRunStore
 */
@Injectable()
export class FirstTimeRunStore {
  private static readonly StorageKey = 'maker:ftr';

  constructor(public storage: SafeBox) {}

  async isFirstTimeRun(): Promise<boolean> {
    try {
      const value = await this.storage.get(FirstTimeRunStore.StorageKey);
      console.log('[FirstTimeRunStore] load', value);
      this.storage.set(FirstTimeRunStore.StorageKey, false);
      return value === null || value === undefined || value === true;
    } catch (err) {
      console.warn('[FirstTimeRunStore] load error:', err);
    }
    return true;
  }
}
