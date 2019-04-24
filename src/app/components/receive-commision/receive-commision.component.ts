import { Component, OnInit } from '@angular/core';
import { ModalController , ToastController , LoadingController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-receive-commision',
  templateUrl: './receive-commision.component.html',
  styleUrls: ['./receive-commision.component.scss'],
})
export class ReceiveCommisionComponent extends BaseView implements OnInit {


  constructor(
    public mModalController: ModalController,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public api: ApiService
    ) {
      super(mLoading, mToast, mModalController);
    }

  ngOnInit() { }

  dismissDialog() {
    this.mModalController.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

  receiveCommission() {
    const loading = super.showLoading('领取中...');
    this.api.promote().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        // this.homeData = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }
}
