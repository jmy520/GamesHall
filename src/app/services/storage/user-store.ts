import { SafeBox } from './safe-box';
import { Injectable } from '@angular/core';

/**
 * 用户信息持久化存储
 *
 * @export
 * @class UserStore
 */
@Injectable()
export class UserStore {
  private static readonly StorageKey = 'maker:user';

  constructor(public storage: SafeBox) {}

  /**
   * 缓存用户信息
   * @param user 用户信息实体
   */
  async save(user: any) {
    try {
      const val = await this.storage.set(UserStore.StorageKey, JSON.stringify(user));
      console.log('[UserStore] save() complete', val);
    } catch (err) {
      console.error('[UserStore] save() error:', err);
    }
  }

  async saveKey(key: string, obj: string) {
    try {
      const val = await this.storage.set(key, obj);
      console.log('[saveKey] save() complete', val);
    } catch (err) {
      console.error('[saveKey] save() error:', err);
    }
  }

  /**
   * 读取缓存的用户信息
   */
  load(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const val = await this.storage.get(UserStore.StorageKey);
        console.log('[UserStore] load() complete:', val);
        if (!val) {
          resolve(null);
        } else {
          const user = JSON.parse(val);
          resolve(user);
        }
      } catch (err) {
        console.error('[UserStore] load() error:', err);
        reject(err);
      }
    });
  }

  getKey(key: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const val = await this.storage.get(key);
        console.log('[getKey] load() complete:', val);
        if (!val) {
          resolve(null);
        } else {
          resolve(val);
        }
      } catch (err) {
        console.error('[getKey] load() error:', err);
        reject(err);
      }
    });
  }

  clearKey(key: string) {
    this.storage
      .remove(key)
      .then(val => {
        console.log('[' + key + '] clear() complete');
      })
      .catch(err => {
        console.log('[' + key + '] clear() error:', err);
      });
  }

  /** 清除用户信息*/
  clear() {
    this.storage
      .remove(UserStore.StorageKey)
      .then(val => {
        console.log('[UserStore] clear() complete');
      })
      .catch(err => {
        console.log('[UserStore] clear() error:', err);
      });
  }
}
