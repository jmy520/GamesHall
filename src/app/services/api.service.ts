import { Injectable } from '@angular/core';
import { RestRequestService } from 'src/app/services/rest-request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  LOG_RESULT: boolean = true;

  constructor(public requestProvider: RestRequestService) {

  }

  private buildGetPromise(url: string, params?: any, coverBaseUrl?: string, coverPort?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.requestProvider.get({
        uri: url,
        params: params
      }, coverBaseUrl, coverPort)
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

  private buildPostPromise(url: string, params: any, coverBaseUrl?: string, coverPort?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.requestProvider.post({
        url: url,
        params: params
      }, coverBaseUrl, coverPort)
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
}
