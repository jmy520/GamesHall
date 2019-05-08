import { Injectable } from '@angular/core';
import { RestRequestService } from 'src/app/services/rest-request.service';
import { Runtime } from 'src/app/services/Runtime';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  LOG_RESULT = true;

  END_POINT: String = 'mobile';

  ROOT_URL = '';

  constructor(
    public mRouter: Router,
    public runtime: Runtime,
    public requestProvider: RestRequestService) {
      this.ROOT_URL = requestProvider.BASE_URL + ':' + requestProvider.PORT;
  }

  private buildGetPromise(url: string, params?: any, coverBaseUrl?: string, coverPort?: string, headers?: any): Promise<any> {
    if(headers === null || headers === undefined) {
      headers = {};
    }
    if (this.runtime.user) {
      headers['authorization'] = this.runtime.user.sessionId;
      headers['token'] = this.runtime.user.token;
    }
    headers['port'] = this.END_POINT;
    return new Promise((resolve, reject) => {
      this.requestProvider.get({
        url: url,
        params: params
      }, headers, coverBaseUrl, coverPort)
        .subscribe(data => {
          if (this.LOG_RESULT) {
            console.log(data);
          }
          if (data.hashError && data.status === 900) {
            this.runtime.postLogout();
            this.mRouter.navigate(['/home']);
            // reject(data);
          } else {
            resolve(data);
          }
        }, error => {
          console.error(error);
          reject(error);
        });
    });
  }

  private buildPostPromise(url: string, params: any, body?: any, coverBaseUrl?: string, coverPort?: string, headers?: any): Promise<any> {
    if (headers === null || headers === undefined) {
      headers = {};
    }
    if (this.runtime.user) {
      headers['authorization'] = this.runtime.user.sessionId;
      headers['token'] = this.runtime.user.token;
    }
    headers['port'] = this.END_POINT;
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
          if (data.hashError && data.status === 900) {
            this.runtime.postLogout();
            this.mRouter.navigate(['/home']);
            // reject(data);
          } else {
            resolve(data);
          }
        }, error => {
          console.error(error);
          reject(error);
        });
    });
  }

  // ------------------- 首页模块 -------------------

  /** 获取验证码 */
  fetchValidateCode(params: any): Promise<any> {
    return this.buildPostPromise('/smsCode', params);
  }

  /** 手机号注册 */
  phoneRegister(params: any): Promise<any> {
    return this.buildPostPromise('/regist', params);
  }

  /** 账号注册 */
  aregister(params: any): Promise<any> {
    return this.buildPostPromise('/aregist', params);
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
  fetchApiInfoList(params: any): Promise<any> {
    return this.buildGetPromise('/apiInfos', params);
  }

  /** 拉取游戏列表 */
  fetchGameList(params: any): Promise<any> {
    return this.buildGetPromise('/games', params);
  }

  /** 客服列表 */
  customerServer(params: any): Promise<any> {
    return this.buildGetPromise('/customerServer', params);
  }

  /** 获取推荐人 */
  getShareParam(): Promise<any> {
    return this.buildGetPromise('/getShareParam', null);
  }

  // ------------------- 用户模块 -------------------

  /** 数据字典列表 */
  comdicts(params): Promise<any> {
    return this.buildPostPromise('/front/comdicts', params, null, null, null, {});
  }

  /** 获取游戏地址 */
  fetchGameLink(params: any): Promise<any> {
    return this.buildPostPromise('/front/toGame', params, null, null, null, {});
  }

  /** 用户钱包 */
  wallet(): Promise<any> {
    return this.buildPostPromise('/front/wallet', null, null, null, null, {});
  }

  /** 用户把钱转入/转出保险箱 */
  safeBox(params: any): Promise<any> {
    return this.buildPostPromise('/front/safeBox', params, null, null, null, {});
  }

  /** 流水明细  可传入 itemType参数得到不同类型的流水明细 */
  bankItem(params: any): Promise<any> {
    return this.buildPostPromise('/front/bankItem', params, null, null, null, {});
  }

  /** 推广页 */
  promote(): Promise<any> {
    return this.buildPostPromise('/front/popularize', null, null, null, null, {});
  }

  /** 我的佣金 */
  myCommissions(params): Promise<any> {
    return this.buildPostPromise('/front/myCommissions', params, null, null, null, {});
  }

  /** 我的下级 */
  groupMembers(params): Promise<any> {
    return this.buildPostPromise('/front/groupMembers', params, null, null, null, {});
  }

   /** 领取佣金 */
   receiveCommission(params): Promise<any> {
    return this.buildPostPromise('/front/receiveCommission', params, null, null, null, {});
  }


   /** 提现 */
   cash(params): Promise<any> {
    return this.buildPostPromise('/front/cash', params, null, null, null, {});
  }

   /** 更新个人信息 */
   updataInfo(params): Promise<any> {
    return this.buildPostPromise('/front/updataInfo', params, null, null, null, {});
  }

  /** 绑卡 */
  bindCard(params): Promise<any> {
    return this.buildPostPromise('/front/bindCard', params, null, null, null, {});
  }

  /** 提现页 */
  cashIndex(): Promise<any> {
    return this.buildPostPromise('/front/cashIndex', null, null, null, null, {});
  }

  /** 银行列表 */
  banks(): Promise<any> {
    return this.buildPostPromise('/front/banks', null, null, null, null, {});
  }

  /** 我的投注记录 */
  betlogs(params): Promise<any> {
    return this.buildPostPromise('/front/betlogs', params, null, null, null, {});
  }

  /** 获取所有vip等级数据 */
  selAllUsersVip(): Promise<any> {
    return this.buildPostPromise('/front/selAllUsersVip', null, null, null, null, {});
  }

  /** 获取用户下一个vip等级 */
  nextUserVip(): Promise<any> {
    return this.buildPostPromise('/front/nextUserVip', null, null, null, null, {});
  }

  /** 个人报表 */
  selfTongji(params): Promise<any> {
    return this.buildPostPromise('/front/selfTongji', params, null, null, null, {});
  }

  /** 流水统计 */
  bankItemTongji(params): Promise<any> {
    return this.buildPostPromise('/front/bankItemTongji', params, null, null, null, {});
  }

  /** 设置支付密码 */
  setPayPwd(params): Promise<any> {
    return this.buildPostPromise('/front/setPayPwd', params, null, null, null, {});
  }

  /** 修改登录密码 */
  modifyLoginPwd(params): Promise<any> {
    return this.buildPostPromise('/front/modifyLoginPwd', params, null, null, null, {});
  }

  /** 统计活动打码是否满足提现 进入提现页面请求，不需要做返回处理 */
  betUpperLImit(): Promise<any> {
    return this.buildPostPromise('/front/betUpperLImit', null, null, null, null, {});
  }

  /** 提现页面流水详情 */
  cashDetail(params): Promise<any> {
    return this.buildPostPromise('/front/cashDetail', params, null, null, null, {});
  }

  /** 洗码首页 */
  ximaLijiList(params): Promise<any> {
    return this.buildPostPromise('/front/ximaLijiList', params, null, null, null, {});
  }

  /** 洗码记录 */
  historyXimaLogs(params): Promise<any> {
    return this.buildPostPromise('/front/historyXimaLogs', params, null, null, null, {});
  }

   /** 手动洗码 */
   handXima(params): Promise<any> {
    return this.buildPostPromise('/front/handXima', params, null, null, null, {});
  }

  /** 洗码初始化 */
  ximaInit(): Promise<any> {
    return this.buildPostPromise('/front/ximaInit', null, null, null, null, {});
  }

  /** 根据游戏类型活动平台 */
  apiInfos(params): Promise<any> {
    return this.buildPostPromise('/front/apiInfos', params, null, null, null, {});
  }

  /** 洗码比率 */
  ximaBili(params): Promise<any> {
    return this.buildPostPromise('/front/ximaBili', params, null, null, null, {});
  }

   /** 我的推广二维码 */
   myQr(params): Promise<any> {
    return this.buildPostPromise('/front/myQr', params, null, null, null, {});
  }

  /** 充值页面 */
  recharge(): Promise<any> {
    return this.buildPostPromise('/front/recharge', null, null, null, null, {});
  }

  /** 活动列表 */
  findActByType(params): Promise<any> {
    return this.buildPostPromise('/front/findActByType', params, null, null, null, {});
  }

  /** 领取VIP对应类型礼金 */
  lqVipMoney(params): Promise<any> {
    return this.buildPostPromise('/front/lqVipMoney', params, null, null, null, {});
  }


  /** 提交存款信息 */
  subPayInfo(params): Promise<any> {
    return this.buildPostPromise('/front/subPayInfo', params, null, null, null, {});
  }


  /** 用户充值记录 */
  userRechagelogs(): Promise<any> {
    return this.buildPostPromise('/front/userRechagelogs', null, null, null, null, {});
  }

}
