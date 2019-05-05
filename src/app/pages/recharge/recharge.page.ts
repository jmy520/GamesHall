import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { BaseView } from 'src/common/base/BaseView';
import { PictureHelper } from 'src/common/helper/PictureHelper';
import { RechargeRecordComponent } from 'src/app/components/recharge-record/recharge-record.component';

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

  currentPay = {};

  currentPayItem = {};

  wallet = {};

  tabIcons: Map<string, string> = new Map();

  constructor(
    public mRouter: Router,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public alertController: AlertController,
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
    this.currentPay = pay;
    const items = this.allPayItems['g_' + this.currentPay.gid];
    if (items.length > 0) {
      this.currentPayItem = items[0];
    }
    this.isInRecharge = false;
  }

  tabPayItem(payitem, isyhzz) {
    this.currentPayItem = payitem;
    this.isInRecharge = isyhzz;
  }

  goKufe() {
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
  
  goRechargeRecord() {
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
