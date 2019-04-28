import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { BaseView } from 'src/common/base/BaseView';
import { WithdrawalRecordComponent } from 'src/app/components/withdrawal-record/withdrawal-record.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage extends BaseView implements OnInit {
  tabIndex: number = 0;
  innerTabIndex: number = 0;
  isAddingBankCard: boolean = false;
  isCardBinded: boolean = true;

  userWallet = {
    factMoney: 0.0,
    freezeMoney: 0.0
  };

  bankCards = [];

  withDrawalParam = {
    money: '0.0',
    bankGid: ''
  };

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
  }

  ionViewDidEnter() {
    if (!this.runtime.user) {
      this.showToast('请先登录.');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.cashIndex();
  }

  clearMoney() {
    this.withDrawalParam.money = '';
  }
  cashIndex() {
    const loading = super.showLoading('加载中...');
    this.api.cashIndex().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.userWallet = response.data['wallect'];
        this.bankCards = response.data['bankCards'];
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  viewWithdrawalRecord() {
    this.mModalController.create({
      component: WithdrawalRecordComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
        // TODO something back
      }).catch(error => { });
    });
  }
}
