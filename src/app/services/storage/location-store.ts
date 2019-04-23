import {Injectable} from '@angular/core';
import {SafeBox} from './safe-box';

@Injectable()
export class LocationStore {
  private static readonly StorageKey = 'maker:location';

  constructor(public storage: SafeBox) {}
  /**  缓存地址信息 **/
  async save(location: any) {
    try {
      const val = await this.storage.set(LocationStore.StorageKey, JSON.stringify(location));
      console.log('[LocationStore] save() complete', val);
    } catch (err) {
      console.error('[LocationStore] save() error:', err);
    }
  }

  /** 读取缓存的地址信息 **/
  load(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const val = await this.storage.get(LocationStore.StorageKey);
        console.log('[LocationStore] load() complete:', val);
        if (!val) {
          resolve(null);
        } else {
          const location = JSON.parse(val);
          resolve(location);
        }
      } catch (err) {
        console.error('[LocationStore] load() error:', err);
        reject(err);
      }
    });
  }

  /** 清除地址信息 **/
  clear() {
    this.storage
      .remove(LocationStore.StorageKey)
      .then(val => {
        console.log('[LocationStore] clear() complete');
      })
      .catch(err => {
        console.log('[LocationStore] clear() error:', err);
      });
  }
}
