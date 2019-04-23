import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as localforage from 'localforage';

/*
  SafeBox
*/
@Injectable()
export class SafeBox {
  static readonly Drivers = [
    localforage.INDEXEDDB,
    // localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ];

  get driver(): string {
    return this._ionicStorage.driver;
  }

  private _ready = false;
  private _storages: LocalForage[] = [];

  constructor(public _ionicStorage: Storage) {
    console.log('Hello SafeBox Provider');
    this._storages.length = 0;
    SafeBox.Drivers.forEach(async driver => {
      try {
        const storage = localforage.createInstance({
          driver: localforage.LOCALSTORAGE
        });
        // await storage.setDriver(driver);
        this._storages.push(storage);
      } catch (err) {
        console.error(err);
      }
    });
    console.log(this._storages);
  }

  /** 高级读取封装，不会报异常，出错时返回默认值 */
  async loadStoreItem(itemKey: string, defaultItem?: any) {
    let item = defaultItem ? defaultItem : {};
    try {
      await this.ready();
      const val = await this.get(itemKey);
      const obj = JSON.parse(val);
      item = obj ? obj : {};
      console.log(`[SAFEBOX] '${itemKey}' loaded: ` + JSON.stringify(item));
    } catch (err) {
      console.error(`[SAFEBOX] Loading '${itemKey}' failed: ` + err);
    }
    return item;
  }

  /** 高级写入封装，不会报异常，返回写入的数据，出错时返回空object */
  async setStoreItemData(itemKey: string, dataKey: string, dataValue: any) {
    let item = {};
    try {
      await this.ready();
      item = await this.loadStoreItem(itemKey);
      item[dataKey] = dataValue;
      await this.set(itemKey, JSON.stringify(item));
      console.log(`[SAFEBOX] '${itemKey}' saved: ` + JSON.stringify(item));
    } catch (err) {
      console.error(`[SAFEBOX] Saving '${itemKey}' failed: ` + err);
    }
    return item;
  }

  async ready() {
    if (this._ready) {
      return this;
    }

    await this._ionicStorage.ready();
    // this._storages.length = 0;
    // SafeBox.Drivers.forEach(async driver => {
    //   try {
    //     const storage = localforage.createInstance({ driver: null });
    //     await storage.setDriver(driver);
    //     this._storages.push(storage);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    // console.log(this._storages);
    for (let i = 0; i < this._storages.length; i++) {
      const storage = this._storages[i];
      try {
        if (storage.driver() !== SafeBox.Drivers[i]) {
          await storage.setDriver(SafeBox.Drivers[i]);
        }
      } catch (err) {
        console.error(`[SafeBox] set driver for ${SafeBox.Drivers[i]} failed: ` + err);
      }
      // console.log(storage.driver());
    }
    this._ready = true;
    return this;
  }

  async get(key: string): Promise<any> {
    let exception = null;
    let ret = null;
    try {
      ret = await this._ionicStorage.get(key);
      if (!this._isNullOrEmpty(ret)) {
        console.log('[SafeBox] retrived from Storage: ' + ret);
        return ret;
      }
    } catch (err) {
      console.error('[SafeBox] error retriving from Storage: ' + err);
      exception = err;
    }

    for (let i = 0; i < this._storages.length; i++) {
      const storage = this._storages[i];
      try {
        ret = await storage.getItem(key);
        if (!this._isNullOrEmpty(ret)) {
          console.log(`[SafeBox] retrived from ${storage.driver()}: ` + ret);
          return ret;
        }
      } catch (err) {
        console.error(`[SafeBox] error retriving from ${storage.driver()}: ` + err);
        exception = err;
      }
    }

    if (ret !== null) {
      return ret;
    }
    if (exception !== null) {
      throw exception;
    }
  }

  async set(key: string, value: any): Promise<any> {
    let exception = null;
    let ret = null;
    try {
      ret = await this._ionicStorage.set(key, value);
      console.log(`[SafeBox] {${key}:${value}} set to ${this._ionicStorage.driver}`);
    } catch (err) {
      console.error('[SafeBox] error setting Storage: ' + err);
      exception = err;
    }

    for (let i = 0; i < this._storages.length; i++) {
      const storage = this._storages[i];
      try {
        ret = await storage.setItem(key, value);
        console.log(`[SafeBox] {${key}:${value}} set to ${storage.driver()}`);
      } catch (err) {
        console.error(`[SafeBox] error setting ${storage.driver()}: ` + err);
        exception = err;
      }
    }

    if (ret != null) {
      return ret;
    }
    if (exception != null) {
      throw exception;
    }
  }

  async remove(key: string): Promise<any> {
    let exception = null;
    let ret = null;
    try {
      ret = await this._ionicStorage.remove(key);
    } catch (err) {
      console.error('[SafeBox] error removing from Storage: ' + err);
      exception = err;
    }

    for (let i = 0; i < this._storages.length; i++) {
      const storage = this._storages[i];
      try {
        ret = await storage.removeItem(key);
      } catch (err) {
        console.error(`[SafeBox] error removing from ${storage.driver()}: ` + err);
        exception = err;
      }
    }

    if (exception != null) {
      throw exception;
    }
    return ret;
  }

  private _isNullOrEmpty(obj): boolean {
    return obj === null || obj === undefined || (obj.hasOwnProperty('length') && obj.length < 1);
  }
}
