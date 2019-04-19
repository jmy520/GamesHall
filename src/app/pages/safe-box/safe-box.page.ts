import { Component, OnInit } from '@angular/core';
import { ModalController,LoadingController, ToastController } from '@ionic/angular';
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

  };

  safeBoxActionParam = {
    safeType: 'safeBox', //固定值safeBox
    money: 0.0,
  };

  safeBoxSeachParam = {
    itemType: 'safeBox', //固定值safeBox
    page: 1,
    size: 7
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
    this.wallet();
  }


  outSafeBox() {
    this.safeBoxActionParam.money = -this.safeBoxActionParam.money;
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
    });
  }

  wallet() {
    this.api.wallet().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.userWallet = response.data;
      }
    }).catch(error => { }).finally(() => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
    });
}
}
