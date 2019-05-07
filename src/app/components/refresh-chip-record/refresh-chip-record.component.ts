import { Component, OnInit, Input } from '@angular/core';
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

  @Input()
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
    const mLoading = this.showLoading('加载中...');
    this.api.historyXimaLogs(this.ximaSeachParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(errorMessage.msg);
      } else {
        this.ximalogs = response.data;
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
