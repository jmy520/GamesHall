import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Runtime {
    user: User = null;

    constructor(private storage: Storage) {}

  /** 登录的处理 */
  async postLogin(user: User, persistentStorage = true) {
    // 设置用户
    this.user = user;

    if (persistentStorage) {
      // 持久化存储
      try {
        const val = await this.storage.set('user', JSON.stringify(user));
        console.log('[UserStore] save() complete', val);
      } catch (err) {
        console.error('[UserStore] save() error:', err);
      }
    }
  }

  /** 退出登录的处理 */
  postLogout() {
      // 用户置空
      this.user = null;
      this.storage.remove('user')
      .then(val => {
        console.log('[UserStore] clear() complete');
      })
      .catch(err => {
        console.log('[UserStore] clear() error:', err);
      });
  }
}

/** 用户信息数据结构 */
interface User {
    /** token */
    token: string;
    /** sessionId */
    sessionId: string;

    /** 用户数据 */
    user: any;
}