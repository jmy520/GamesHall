import { Injectable } from '@angular/core';
import { RestRequestService } from 'src/app/services/rest-request.service';
import { Runtime } from 'src/app/services/Runtime';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  LOG_RESULT = true;

  port_str: String = 'mobile';

  constructor(
    public runtime: Runtime,
    public requestProvider: RestRequestService) {

  }

  private buildGetPromise(url: string, params?: any, coverBaseUrl?: string, coverPort?: string, headers?: any): Promise<any> {
    if(headers == null || headers === undefined) {
      headers = {};
    }
    if (this.runtime.user) {
      headers['authorization'] = this.runtime.user.sessionId;
    }
    headers['port'] = this.port_str;
    return new Promise((resolve, reject) => {
      this.requestProvider.get({
        url: url,
        params: params
      }, headers, coverBaseUrl, coverPort)
        .subscribe(data => {
          if (this.LOG_RESULT) {
            console.log(data);
          }
          resolve(data);
        }, error => {
          console.error(error);
          reject(error);
        });
    });
  }

  private buildPostPromise(url: string, params: any, body?: any, coverBaseUrl?: string, coverPort?: string, headers?: any): Promise<any> {
    if(headers == null || headers === undefined) {
      headers = {};
    }
    if (this.runtime.user) {
      headers['authorization'] = this.runtime.user.sessionId;
    }
    headers['port'] = this.port_str;
    return new Promise((resolve, reject) => {
      this.requestProvider.post({
        url: url,
        params: params,
        body: body
      }, headers, coverBaseUrl, coverPort)
        .subscribe(data => {
          if (this.LOG_RESULT) {
            console.log(data);
          }
          resolve(data);
        }, error => {
          console.error(error);
          reject(error);
        });
    });
  }

  //------------------- 首页模块 -------------------

  /** 获取验证码 */
  fetchValidateCode(params: any): Promise<any> {
    return this.buildPostPromise('/smsCode', params);
  }

  /** 注册 */
  register(params: any): Promise<any> {
    return this.buildPostPromise('/regist', params);
  }

  /** 登录 */
  login(params: any): Promise<any> {
    return this.buildPostPromise('/login', params);
  }

  /** 拉取公告 */
  fetchBroadcastList(params: any): Promise<any> {
    return this.buildPostPromise('/notice', params);
  }

  /** 拉取游戏分类 */
  fetchGameTypeList(params: any): Promise<any> {
    return this.buildGetPromise('/columns', params);
  }

  /** 拉取游戏列表 */
  fetchGameList(params: any): Promise<any> {
    return this.buildGetPromise('/games', params);
  }

  // ------------------- 用户模块 -------------------

  /** 获取游戏地址 */
  fetchGameLink(params: any): Promise<any> {
    return this.buildPostPromise('/front/toGame', params, null, null, null, {});
  }

  /** 用户钱包 */
  wallet(): Promise<any> {
    return this.buildPostPromise('/front/wallet', null, null, null, null, {});
  }
}
