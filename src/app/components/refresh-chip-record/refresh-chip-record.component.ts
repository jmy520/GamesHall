import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-refresh-chip-record',
  templateUrl: './refresh-chip-record.component.html',
  styleUrls: ['./refresh-chip-record.component.scss'],
})
export class RefreshChipRecordComponent extends BaseView implements OnInit {

  ximaSeachParam = {
    game_type: ''
  };

  ximalogs = [];


  constructor(public api: ApiService,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController) {
      super(mLoading, mToast, mModal);
     }

     ionViewDidEnter() {
        this.historyXimaLogs();
     }

  ngOnInit() {}

  historyXimaLogs() {
    this.showLoading('加载中...');
    this.api.historyXimaLogs(this.ximaSeachParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.ximalogs = response.data;
      }
    }).catch(error => { }).finally(() => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
    });
  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
