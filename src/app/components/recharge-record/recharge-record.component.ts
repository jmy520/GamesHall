import { Component, OnInit } from '@angular/core';
import { RechargeDetailComponent } from '../recharge-detail/recharge-detail.component';
import { ModalController, ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { BaseView } from 'src/common/base/BaseView';

@Component({
  selector: 'app-recharge-record',
  templateUrl: './recharge-record.component.html',
  styleUrls: ['./recharge-record.component.scss'],
})
export class RechargeRecordComponent extends BaseView implements OnInit {

  bankItemParam = {
    itemType: 'recharge',
    page: 1,
    size: 1000,
  };

  bankItems = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  constructor(
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public alertController: AlertController,
    public api: ApiService,
    public mModalController: ModalController) {
      super(mLoading, mToast, mModalController);
     }

  ngOnInit() {}

  ionViewDidEnter() {
    this.bankItem();
  }


  bankItem() {
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

  goDetail() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RechargeDetailComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }
}
