import { Injectable } from '@angular/core';
import { UserStore } from './storage/user-store';
import { RestConfig } from 'src/common/config/RestConfig';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class Runtime {
    user: User = null;
    butAudioElement: HTMLAudioElement;
    bgAudioElement: HTMLAudioElement;


    constructor(private platform: Platform, private storage: UserStore, public nativeAudio: NativeAudio) {
      // tslint:disable-next-line:max-line-length
      // this.nativeAudio.preloadComplex('butAudio', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3', 1, 1, 0).then(this.onSuccess, this.onError);
      // tslint:disable-next-line:max-line-length
      // this.nativeAudio.preloadComplex('bgAudio', RestConfig.BASE_VIDIO_URL + '/bg-audio.wav', 1, 1, 0).then(this.onSuccess, this.onError);
      if (this.platform.is('android') || this.platform.is('ios')) {
        // tslint:disable-next-line:max-line-length
        this.nativeAudio.preloadComplex('butAudio', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3', 1, 1, 0).then(this.onSuccess, this.onError).catch(() => {
          console.log('butAudio catch');
        });
        this.nativeAudio.preloadComplex('bgAudio', 'assets/vido/bg-audio.wav', 1, 1, 0).then(this.onSuccess, this.onError).catch(() => {
          console.log('bgAudio catch');
        });
      } else if (this.platform.is('mobileweb')) {
        if (this.butAudioElement == null) {
          this.butAudioElement = document.createElement('audio');
          this.butAudioElement.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3');
        }
        if (this.bgAudioElement == null) {
          this.bgAudioElement = document.createElement('audio');
          this.bgAudioElement.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bg-audio.wav');
        }
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
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.nativeAudio.play('butAudio').then(() => {
        console.log('butAudio--->play');
      }).catch(() => {
        console.log('butAudio play catch');
      });
    } else if (this.platform.is('mobileweb')) {
      this.butAudioElement.play();
    }
   }

  payBgVido() {
    if (this.platform.is('android') || this.platform.is('ios')) {
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
    } else if (this.platform.is('mobileweb')) {
      this.bgAudioElement.play();
    }
  }

  /**
   *  设置音量
   * @param type 1 背景音量设置 0 按钮音效音量
   * @param value 设置音量的值 0.1 - 1 之间
   */
  setVolume(type: Number = 1, value: number = 1) {
     if (type === 1) {// 背景音乐
      if (this.platform.is('android') || this.platform.is('ios')) {
        this.nativeAudio.setVolumeForComplexAsset('bgAudio', value);
      } else if (this.platform.is('mobileweb')) {
        this.bgAudioElement.volume = value;
      }
     } else if (type === 0) {// 按钮音效
      if (this.platform.is('android') || this.platform.is('ios')) {
        this.nativeAudio.setVolumeForComplexAsset('butAudio', value);
      } else if (this.platform.is('mobileweb')) {
        this.butAudioElement.volume = value;
      }
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