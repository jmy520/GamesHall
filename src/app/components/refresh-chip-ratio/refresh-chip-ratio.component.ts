import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-refresh-chip-ratio',
  templateUrl: './refresh-chip-ratio.component.html',
  styleUrls: ['./refresh-chip-ratio.component.scss'],
})
export class RefreshChipRatioComponent extends BaseView  implements OnInit {
  tabIndex: number = 0;

  @Input()
  gameType = '';

  apiInfos = [];

  @Input()
  curretnColumn = {
    colName: '',
    colCode: ''
  };

  @Input()
  ximaSeachParam = {
    api_code: '',
    game_type: ''
  };

  ximabils = [];

  constructor(public api: ApiService,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController) {
      super(mLoading, mToast, mModal);
     }

  ngOnInit() {}

  ionViewDidEnter() {
    this.apiInfosm();
 }

 tabApiInfo(apiCode) {
    this.ximaSeachParam.api_code = apiCode;
 }

 apiInfosm() {
  this.api.apiInfos(this.ximaSeachParam).then(response => {
    const errorMessage = response.hashError;
    if (errorMessage) {
      this.showToast(errorMessage.msg);
    } else {
      this.apiInfos = response.data;
      if (this.apiInfos.length > 0) {
        this.ximaSeachParam.api_code = this.apiInfos[0].apiCode;
        this.ximaBili();
      }
    }
  }).catch(error => {
  });
}

 ximaBili() {
    const mLoading = this.showLoading('加载中...');
    this.api.ximaBili(this.ximaSeachParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(errorMessage.msg);
      } else {
        this.ximabils = response.data;
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
