import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { BaseView } from 'src/common/base/BaseView';
import { PictureHelper } from 'src/common/helper/PictureHelper';
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

  currentBank: any;

  withDrawalParam = {
    money: '0.0',
    bankGid: ''
  };

  bindCardParam = {
    bankGid: '',
    cardNo: '',
    realName: '',
    bankName: '',
    bankSubName: ''
  };

  bankList = [];

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
    this.banks();
    this.cashIndex();
  }

  clearMoney() {
    this.runtime.payButtonVido();
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

  banks() {
    this.api.banks().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.bankList = response.data;
      }
    }).catch(error => { });
  }

  bind() {
    if (this.bindCardParam.bankGid === undefined || this.bindCardParam.bankGid === '') {
      this.showToast('请选择开户银行');
      return;
    }
    if (this.bindCardParam.cardNo === undefined || this.bindCardParam.cardNo === '') {
      this.showToast('请输入卡号.');
      return;
    }
    if (this.bindCardParam.realName === undefined || this.bindCardParam.realName === '') {
      this.showToast('请输入开户人名称.');
      return;
    }
    if (this.bindCardParam.bankSubName === undefined || this.bindCardParam.bankSubName === '') {
      this.showToast('请输入开户行地址.');
      return;
    }
    const loading = super.showLoading('提交中...');
    this.api.bindCard(this.bindCardParam).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.showToast('成功。');
        this.isAddingBankCard = false;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.gid === o2.gid : o1 === o2;
  }

  bankSelected() {
    this.bindCardParam.bankGid = this.currentBank.gid;
    this.bindCardParam.bankName = this.currentBank.value1;
  }

  fetchImage(fileName: string) {
    return PictureHelper.fetchImage(fileName + '.png');
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
