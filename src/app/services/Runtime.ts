import { Injectable } from '@angular/core';
import { UserStore } from './storage/user-store';
import { RestConfig } from 'src/common/config/RestConfig';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class Runtime {
    user: User = null;


    constructor(private platform: Platform, private storage: UserStore, public nativeAudio: NativeAudio) {
      // tslint:disable-next-line:max-line-length
      // this.nativeAudio.preloadComplex('butAudio', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3', 1, 1, 0).then(this.onSuccess, this.onError);
      // tslint:disable-next-line:max-line-length
      // this.nativeAudio.preloadComplex('bgAudio', RestConfig.BASE_VIDIO_URL + '/bg-audio.wav', 1, 1, 0).then(this.onSuccess, this.onError);
      if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobileweb')) {
        // tslint:disable-next-line:max-line-length
        this.nativeAudio.preloadComplex('butAudio', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3', 1, 1, 0).then(this.onSuccess, this.onError).catch(() => {
          console.log('butAudio catch');
        });
        this.nativeAudio.preloadComplex('bgAudio', 'assets/vido/bg-audio.wav', 1, 1, 0).then(this.onSuccess, this.onError).catch(() => {
          console.log('bgAudio catch');
        });
      }
    }

    onSuccess (val) {
      console.log('onSuccess');
    }

    onError (val) {
      console.log('onError' + val);
    }

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

  payButtonVido() {
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobileweb')) {
      this.nativeAudio.play('butAudio').then(() => {
        console.log('butAudio--->play');
      }).catch(() => {
        console.log('butAudio play catch');
      });
    }
  }

  payBgVido() {
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('mobileweb')) {
      this.nativeAudio.loop('bgAudio').then(() => {
        console.log('bgAudio--->loop');
      }).catch(() => {
        console.log('bgAudio loop catch');
      });
      // this.nativeAudio.play('bgAudio').then(() => {
      //   console.log('bgAudio--->play');
      // }).catch(() => {
      //   console.log('bgAudio play catch');
      // });
    }
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