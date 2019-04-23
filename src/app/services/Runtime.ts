import { Injectable } from '@angular/core';
import { UserStore } from './storage/user-store';

@Injectable()
export class Runtime {
    user: User = null;

    constructor(private storage: UserStore) {}

  /** 登录的处理 */
  async postLogin(user: User, persistentStorage = true) {
    // 设置用户
    this.user = user;

    if (persistentStorage) {
      // 持久化存储
      this.storage.save(user);
    }
  }

  /** 退出登录的处理 */
  postLogout() {
      // 用户置空
      this.user = null;
      // 本地存储清除
    this.storage.clear();
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