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

  currentBank: any; // 绑定银行卡当前选择的银行

  currentBankCard: any; // 提现当前选中要提现到的银行卡

  withDrawalParam = {
    money: 0,
    bankGid: null
  };

  bindCardParam = {
    bankGid: '',
    cardNo: '',
    realName: '',
    bankName: '',
    bankSubName: ''
  };

  seachBankItemParam = {
    itemType: 'recharge',
    insterTimeStart: '',
    InsterTimeEnd: '',
    page: 1,
    size: 100
  };

  seachCashDetailParam = {
    page: 1,
    size: 100
  };

  cashDetails = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  bankList = [];

  bankItems = {
    totals: 0,
    totalsPage: 0,
    list: []
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
    this.betUpperLImit();
    this.banks();
    this.cashIndex();
  }

  tabLeft(vl) {
    this.tabIndex = vl;
    if (vl === 1) {
      this.liushuiTab(0); // 调用流水切换
    }
  }

  clearMoney() {
    this.runtime.payButtonVido();
    this.withDrawalParam.money = 0;
  }

  betUpperLImit() {
    this.api.betUpperLImit().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      }
    }).catch(error => { });
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
        if (this.bankCards.length > 0) {
          this.currentBankCard = this.bankCards[0];
          this.withDrawalParam.bankGid = this.currentBankCard.gid;
        }
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  cash() {
    if (this.withDrawalParam.money <= 0) {
      this.showToast('请输入提现金额.');
      return;
    }
    const loading = super.showLoading('提现请求中...');
    this.api.cash(this.withDrawalParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.showToast('提现成功,等待银行处理.');
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

  bankItem() {
    const loading = super.showLoading('加载中...');
    this.api.bankItem(this.seachBankItemParam).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.bankItems = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  nextPage(page) {
    this.runtime.payButtonVido();
    if ((this.seachBankItemParam.page + page) > 0 && (this.seachBankItemParam.page + page) <= this.bankItems.totalsPage) {
      this.seachBankItemParam.page = this.seachBankItemParam.page + page;
      this.bankItem();
    }
  }

  cashDetail() {
    const loading = super.showLoading('加载中...');
    this.api.cashDetail(this.seachCashDetailParam).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.cashDetails = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  nextPageLimit(page) {
    this.runtime.payButtonVido();
    if ((this.seachCashDetailParam.page + page) > 0 && (this.seachCashDetailParam.page + page) <= this.cashDetails.totalsPage) {
      this.seachCashDetailParam.page = this.seachCashDetailParam.page + page;
      this.cashDetail();
    }
  }

  liushuiTab(vl) {
    this.innerTabIndex = vl;
    if (this.innerTabIndex === 0) {
      this.bankItem();
    } else {
      this.cashDetail();
    }
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

  compareWithBankCardFn = (o1, o2) => {
    return o1 && o2 ? o1.gid === o2.gid : o1 === o2;
  }

  bankSelected() {
    this.bindCardParam.bankGid = this.currentBank.gid;
    this.bindCardParam.bankName = this.currentBank.value1;
  }
  bankCardSelected () {
    console.log('--->' + JSON.stringify(this.currentBankCard));
    this.withDrawalParam.bankGid = this.currentBankCard.gid;
  }

  fetchImage(fileName: string) {
    return PictureHelper.fetchImage(fileName + '.png');
  }

  goBind() {
    this.tabIndex = 2;
    this.isAddingBankCard = true;
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
