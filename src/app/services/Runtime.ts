import { Injectable } from '@angular/core';
import { UserStore } from './storage/user-store';
import { RestConfig } from 'src/common/config/RestConfig';

@Injectable()
export class Runtime {
    user: User = null;
    audioElement: HTMLAudioElement = null;
    audioElementBg: HTMLAudioElement = null;


    constructor(private storage: UserStore) {
      // if (this.audioElement == null) {
      //   this.audioElement = document.createElement('audio');
      //   // this.audioElement.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3');
      // }
      // const bgAudio = document.createElement('source');
      // bgAudio.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bg-audio.wav');
      // bgAudio.setAttribute('type', 'audio/wav');
      // this.audioElement.append(bgAudio);
      // const butAudio = document.createElement('source');
      // butAudio.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3');
      // bgAudio.setAttribute('type', 'audio/mpeg');
      // this.audioElement.append(butAudio);
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
    if (this.audioElement == null) {
      this.audioElement = document.createElement('audio');
      this.audioElement.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bubble-2.mp3');
    }
    this.audioElement.play();
  }

  payBgVido() {
    if (this.audioElementBg == null) {
      this.audioElementBg = document.createElement('audio');
      this.audioElementBg.setAttribute('src', RestConfig.BASE_VIDIO_URL + '/bg-audio.wav');
      this.audioElementBg.setAttribute('loop', 'loop');
    }
    this.audioElementBg.play();
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