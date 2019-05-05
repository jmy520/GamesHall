import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-withdrawal-record',
  templateUrl: './withdrawal-record.component.html',
  styleUrls: ['./withdrawal-record.component.scss'],
})
export class WithdrawalRecordComponent extends BaseView implements OnInit {

  bankItemParam = {
    itemType: 'cashWithdrawal',
    page: 1,
    size: 1000,
  };

  bankItems = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService) {
      super(mLoading, mToast, mModal);
     }

  ngOnInit() {}

  ionViewDidEnter() {
    this.bankItem();
  }

  bankItem() {
    this.runtime.payButtonVido();
    const loading = super.showLoading('加载中...');
    this.api.bankItem(this.bankItemParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(e => { });
        const errorMessage = response.hashError;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          this.bankItems = response.data;
        }
      }).catch(error => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(e => { });
       });
  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

}
