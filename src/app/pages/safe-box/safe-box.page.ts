import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-safe-box',
  templateUrl: './safe-box.page.html',
  styleUrls: ['./safe-box.page.scss'],
})
export class SafeBoxPage extends BaseView implements OnInit {
  tabIndex: number = 0;

  userWallet = { // 用户钱包对象
    factMoney: 0.0,
    freezeMoney: 0.0,
    payPwd: '111111'
  };

  bl = 0;

  safeBoxActionParam = {
    safeType: 'safeBox', //固定值safeBox
    money: '0.0',
  };

  safeBoxSeachParam = {
    itemType: 'safeBox', //固定值safeBox
    page: 1,
    size: 6
  };

  bankItemObj = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mModal: ModalController,
    public mToast: ToastController,
    public runtime: Runtime,
    public api: ApiService) {
      super(mLoading, mToast, mModal);
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.runtime.user) {
      this.showToast('请先登录.');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.wallet();
  }


  /**
   * 从保险箱转出
   */
  outSafeBox() {
    this.runtime.payButtonVido();
    if (parseFloat(this.safeBoxActionParam.money) <= this.userWallet.freezeMoney) {
      const loading = super.showLoading('正在转出,请稍后...');
      this.api.safeBox(this.safeBoxActionParam).then(response => {
        const hasError = response.hashError;
        if (hasError) {
          const errorMessage = response.msg;
          if (errorMessage) {
            this.showToast(errorMessage);
          }
        } else {
          this.showToast('转出成功.');
          this.wallet();
        }
      }).catch(error => {
        this.showToast('网络异常.');
      }).finally(() => {
        loading.then((loadinginstan) => {
          loadinginstan.dismiss();
        });
      });
    } else {
      this.showToast('金额不足.');
    }
  }

  /**
   * 转入到保险箱中
   */
  inSafeBox() {
    this.runtime.payButtonVido();
    if (parseFloat(this.safeBoxActionParam.money) <= this.userWallet.factMoney) {
      const loading = super.showLoading('转入中,请稍后...');
      this.safeBoxActionParam.money = '-' + this.safeBoxActionParam.money;
      this.api.safeBox(this.safeBoxActionParam).then(response => {
        const hasError = response.hashError;
        if (hasError) {
          const errorMessage = response.msg;
          if (errorMessage) {
            this.showToast(errorMessage);
          }
        } else {
          this.showToast('转出成功.');
          this.wallet();
        }
      }).catch(error => {
        this.showToast('网络异常.');
      }).finally(() => {
        loading.then((loadinginstan) => {
          loadinginstan.dismiss();
        });
      });
    } else {
      this.showToast('金额不足.');
    }
  }

  wallet() {
    const loading = super.showLoading('加载中...');
    this.api.wallet().then(response => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.userWallet = response.data;
        if (this.userWallet.payPwd === '111111') {
          this.showToast('请先设置保险箱密码.');
          this.mRouter.navigate(['/home']);
        }
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  bankItemDatas() {
    const loading = super.showLoading('请求中...');
    this.api.bankItem(this.safeBoxSeachParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.bankItemObj = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  tabBankItem(vl) {
    this.runtime.payButtonVido();
    if (vl === 2) {
      this.safeBoxSeachParam.page = 1;
      this.safeBoxSeachParam.size = 6;
      this.bankItemDatas();
    }
    this.tabIndex = vl;
  }

  nextPage(page) {
    this.runtime.payButtonVido();
    if ((this.safeBoxSeachParam.page + page) > 0 && (this.safeBoxSeachParam.page + page) <= this.bankItemObj.totalsPage) {
      this.safeBoxSeachParam.page = this.safeBoxSeachParam.page + page;
      this.bankItemDatas();
    }
  }

  selectBl() {
    this.runtime.payButtonVido();
    if (this.tabIndex === 0) {
      this.safeBoxActionParam.money = (this.userWallet.factMoney * (this.bl / 100)).toFixed(2);
    } else if (this.tabIndex === 1) {
      this.safeBoxActionParam.money = (this.userWallet.freezeMoney * (this.bl / 100)).toFixed(2);
    }
  }

  clearRange() {
    this.runtime.payButtonVido();
    this.bl = 0;
    this.safeBoxActionParam.money = '0.0';
  }

  maxRage() {
    this.runtime.payButtonVido();
    this.bl = 100;
  }

  MathABS(val) {
    return Math.abs(val);
  }
}
