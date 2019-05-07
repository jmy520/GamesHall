import { Injectable } from '@angular/core';
import { UserStore } from './storage/user-store';
import { RestConfig } from 'src/common/config/RestConfig';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class Runtime {
    user: User = null;
    butAudioElement: HTMLAudioElement;
    bgAudioElement: HTMLAudioElement  = null;

    isButNaticeAudio = false;
    isBgNaticeAudio = false;


    constructor(private platform: Platform, private storage: UserStore, public nativeAudio: NativeAudio) {
      // tslint:disable-next-line:max-line-length
      // this.nativeAudio.preloadComplex('butAudio', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3', 1, 1, 0).then(this.onSuccess, this.onError);
      // tslint:disable-next-line:max-line-length
      // this.nativeAudio.preloadComplex('bgAudio', RestConfig.BASE_VIDIO_URL + '/bg-audio.wav', 1, 1, 0).then(this.onSuccess, this.onError);
      console.log('---->' + this.platform.platforms());
      const _this = this;
      if (this.platform.is('cordova')) {
        // tslint:disable-next-line:max-line-length
        this.nativeAudio.preloadComplex('butAudio', 'assets/vido/bubble-2.mp3', 1, 1, 0).then(() => {
          console.log('butAudio success');
          _this.isButNaticeAudio = true;
          _this.storage.getKey('butAudio').then((vl) => {
            if (vl !== null) {
              _this.nativeAudio.setVolumeForComplexAsset('butAudio', parseFloat(vl));
            }
          });
        }).catch((e) => {
          console.log('butAudio catch' + e);
          this.initAudioElement();
        });
        this.nativeAudio.preloadComplex('bgAudio', 'assets/vido/bg-audio.wav', 1, 1, 0).then(() => {
          console.log('bgAudio success');
          _this.isBgNaticeAudio = true;
          _this.storage.getKey('bgAudio').then((vl) => {
            if (vl !== null) {
              _this.nativeAudio.setVolumeForComplexAsset('butAudio', parseFloat(vl));
            }
          });
          _this.nativeAudio.loop('bgAudio');
        }).catch((e) => {
          console.error('bgAudio catch ' + e);
          this.initAudioElement();
        });
      } else {
        this.initAudioElement();
      }
    }

    initAudioElement () {
      console.log('init AudioElement');
      if (this.butAudioElement == null) {
        this.butAudioElement = document.createElement('audio');
        this.butAudioElement.setAttribute('src', 'assets/vido/bubble-2.mp3');
        this.storage.getKey('butAudio').then((vl) => {
          if (vl !== null) {
            const c =  Number.parseFloat(vl);
            console.log('c-------------->' + c);
            this.bgAudioElement.volume = c;
          }
        });
      }
      if (this.bgAudioElement == null) {
        this.bgAudioElement = document.createElement('audio');
        this.bgAudioElement.setAttribute('src', 'assets/vido/bg-audio.wav');
        this.bgAudioElement.setAttribute('loop', 'loop');
        this.storage.getKey('bgAudio').then((vl) => {
          if (vl !== null) {
            const c =  Number.parseFloat(vl);
            console.log('c-------------->' + c);
            this.bgAudioElement.volume = c;
          }
          this.bgAudioElement.play();
        });
        this.bgAudioElement.play();
      }
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
    if (this.platform.is('cordova')) {
      if (this.isButNaticeAudio) {
        this.nativeAudio.play('butAudio').then(() => {
          console.log('butAudio--->play');
        }).catch((e) => {
          console.log('butAudio play catch' + e);
        });
      } else {
        if (this.butAudioElement) {
          this.butAudioElement.play();
        }
      }
    } else {
      if (this.butAudioElement) {
        this.butAudioElement.play();
      }
    }
  }

  payBgVido() {
    if (this.platform.is('cordova')) {
      if (this.isBgNaticeAudio) {
        this.nativeAudio.play('bgAudio').then(() => {
          console.log('bgAudio--->play');
        }).catch((e) => {
          console.log('bgAudio play catch' + e);
        });
      } else {
        if (this.bgAudioElement) {
          this.bgAudioElement.play();
        }
      }
    } else {
      if (this.bgAudioElement) {
        this.bgAudioElement.play();
      }
    }
  }

  stopBgVido() {
    if (this.platform.is('cordova')) {
      if (this.isBgNaticeAudio) {
        this.nativeAudio.stop('bgAudio').then(() => {
          console.log('bgAudio--->stop');
        }).catch((e) => {
          console.log('bgAudio stop catch' + e);
        });
      } else {
        if (this.bgAudioElement) {
          this.bgAudioElement.pause();
        }
      }
    } else {
      if (this.bgAudioElement) {
        this.bgAudioElement.pause();
      }
    }
  }

  stopButVido() {
    if (this.platform.is('cordova')) {
      if (this.isButNaticeAudio) {
        this.nativeAudio.stop('butAudio').then(() => {
          console.log('butAudio--->stop');
        }).catch((e) => {
          console.log('butAudio stop catch' + e);
        });
      } else {
        if (this.butAudioElement) {
          this.butAudioElement.pause();
        }
      }
    } else {
      if (this.butAudioElement) {
        this.butAudioElement.pause();
      }
    }
  }

   saveKey(key: string, obj: string) {
     return this.storage.saveKey(key, obj);
   }

   getKey(key: string) {
    return this.storage.getKey(key);
   }

   clearKey(key: string) {
    this.storage.clearKey(key);
  }
  /**
   *  设置音量
   * @param type 1 背景音量设置 0 按钮音效音量
   * @param value 设置音量的值 0.1 - 1 之间
   */
  setVolume(type: Number = 1, value: number = 1) {
    console.log(value + '---isNaticeAudio----->' +  this.isBgNaticeAudio + ':' +  this.isButNaticeAudio);
    console.log('---butAudioElement----->' +  this.butAudioElement);
    console.log('----bgAudioElement---->' +  this.bgAudioElement);
     if (type === 1) {// 背景音乐
      if (this.platform.is('android') || this.platform.is('ios')  || this.platform.is('mobileweb')) {
        if (this.isBgNaticeAudio) {
          this.nativeAudio.setVolumeForComplexAsset('bgAudio', value);
        } else {
          if (this.bgAudioElement) {
            this.bgAudioElement.volume = value;
          }
        }
      } else {
        if (this.bgAudioElement) {
          this.bgAudioElement.volume = value;
        }
      }
      this.bgAudioElement.play();
      this.storage.saveKey('bgAudio', value.toFixed(1));
     } else if (type === 0) {// 按钮音效
      if (this.platform.is('android') || this.platform.is('ios')  || this.platform.is('mobileweb')) {
        if (this.isButNaticeAudio) {
          this.nativeAudio.setVolumeForComplexAsset('butAudio', value);
        } else {
          if (this.butAudioElement) {
            this.butAudioElement.volume = value;
          }
        }
      } else {
        if (this.butAudioElement) {
          this.butAudioElement.volume = value;
        }
      }
      this.storage.saveKey('butAudio', value.toFixed(1));
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