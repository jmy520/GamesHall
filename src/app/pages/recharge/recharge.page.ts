import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { BaseView } from 'src/common/base/BaseView';
import { PictureHelper } from 'src/common/helper/PictureHelper';
import { RechargeRecordComponent } from 'src/app/components/recharge-record/recharge-record.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage extends BaseView implements OnInit {
  tabIndex: number = 0;
  isInRecharge: boolean = false;

  apiPays = [];

  allPayItems = [];

  currentPay = {
    gid: null,
    payType: '',
    jumpUrl: ''
  };

  currentPayItem = {
    gid: '',
    bankName: '',
    userName: '',
    cardNo: '',
    bankSubName: ''
  };

  wallet = {
    factMoney: 0.0
  };

  payParam = {
    ckmoney: 0,
    ckinfo: '',
    skbankname: '',
    skusername: '',
    skcarno: ''
  };

  autoPayParam = {
    amount: 0,
    pItemGid: ''
  };

  tabIcons: Map<string, string> = new Map();

  constructor(
    public mRouter: Router,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public alertController: AlertController,
    public mInAppBrowser: InAppBrowser,
    public api: ApiService,
    public mModalController: ModalController) {
      super(mLoading, mToast, mModalController);
     }
  ngOnInit() {
    this.tabIcons.set('yhzz', 'assets/image/recharge/img_recharge_union_pay_icon.png');
    this.tabIcons.set('ylcz', 'assets/image/recharge/img_recharge_union_pay_icon.png');
    this.tabIcons.set('wxcz', 'assets/image/recharge/img_recharge_wechat_pay_icon.png');
    this.tabIcons.set('alicz', 'assets/image/recharge/img_recharge_ali_pay_icon.png');
    this.tabIcons.set('alizz', 'assets/image/recharge/img_recharge_ali_pay_icon.png');
    this.tabIcons.set('dlcz', 'assets/image/recharge/img_recharge_proxy_icon.png');
  }

  ionViewDidEnter() {
    if (!this.runtime.user) {
      this.showToast('请先登录.');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.isInRecharge = false;
    this.rechargeIndex();
  }

  tabPay(pay) {
    this.runtime.payButtonVido();
    this.currentPay = pay;
    const items = this.allPayItems['g_' + this.currentPay.gid];
    if (items.length > 0) {
      this.currentPayItem = items[0];
    }
    this.isInRecharge = false;
    this.autoPayParam.amount = 0;
  }

  tabPayItem(payitem, isyhzz) {
    this.runtime.payButtonVido();
    this.currentPayItem = payitem;
    this.isInRecharge = isyhzz;
    this.autoPayParam.amount = 0;
  }

  goKufe() {
    this.runtime.payButtonVido();
    this.mRouter.navigate(['/customer-service']);
  }

  rechargeIndex() {
    const loading = super.showLoading('加载中...');
    this.api.recharge().then(response => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        const reData = response.data;
        this.wallet = reData.wallet;
        this.apiPays = reData.apiPays;
        if (this.apiPays.length > 0) {
          this.currentPay = this.apiPays[0];
        }
        this.allPayItems = reData.allPayItem;
      }
    }).catch(error => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
     });
  }

  fetchImage(fileName: string) {
    return PictureHelper.fetchImage(fileName + '.png');
  }

  subPayInfo() {
    if (this.payParam.ckmoney <= 0) {
      this.showToast('请输入充值金额.');
      return;
    }
    if (this.payParam.ckinfo === '') {
      this.showToast('请输入存款信息项,否则无法到账');
      return;
    }
    this.payParam.skbankname = this.currentPayItem.bankName;
    this.payParam.skcarno = this.currentPayItem.cardNo;
    this.payParam.skusername = this.currentPayItem.userName;
    const loading = super.showLoading('加载中...');
    this.api.subPayInfo(this.payParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(e => { });
        const errorMessage = response.hashError;
        if (errorMessage) {
          this.showToast(response.msg);
        } else {
          this.showToast('充值完成,等待银行处理,如较长时间未到账,请联系客服.');
        }
      }).catch(error => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(e => { });
       });
  }

  subForRechage() {
    if (this.autoPayParam.amount <= 0) {
      this.showToast('请输入充值金额.');
      return;
    }
    this.autoPayParam.pItemGid = this.currentPayItem.gid;
    const loading = super.showLoading('请求中...');
    this.api.forRechage(this.currentPay.jumpUrl, this.autoPayParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(e => { });
        const errorMessage = response.hashError;
        if (errorMessage) {
          this.showToast(response.msg);
        } else {
          this.mInAppBrowser.create(response.data, '_system');
        }
      }).catch(error => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(e => { });
       });
  }

  clearMoney() {
    this.runtime.payButtonVido();
    this.autoPayParam.amount = 0;
  }

  goRechargeRecord() {
    this.runtime.payButtonVido();
    this.mModal.create({
      cssClass: 'common_modal_dialog',
      component: RechargeRecordComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }
}
