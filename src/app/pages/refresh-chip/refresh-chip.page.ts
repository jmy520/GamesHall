import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-refresh-chip',
  templateUrl: './refresh-chip.page.html',
  styleUrls: ['./refresh-chip.page.scss'],
})
export class RefreshChipPage extends BaseView implements OnInit {

  ximaSeachParam = {
    game_type: ''
  };

  apiColumns = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  ximaObj = {
    apiXimaLjs: [],
    lastJsTime: '',
    bettotal: 0,
    ximatotal: 0
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

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.runtime.user) {
      this.showToast('请先登录.');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.initApiColumnsData();
  }

  tabGame(clcode) {
    this.ximaSeachParam.game_type = clcode;
    this.ximaLijiList();
  }

  initApiColumnsData() {
    this.api.fetchGameTypeList({ colType: 'game_type' }).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.apiColumns = response.data;
        if (this.apiColumns.totals > 0) {
          this.ximaSeachParam.game_type = this.apiColumns.list[0].colCode;
        }
        this.ximaLijiList();
      }
    }).catch(error => { });
  }

  ximaLijiList() {
    this.showLoading('加载中...');
    this.api.ximaLijiList(this.ximaSeachParam).then(response => {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          this.ximaObj = response.data;
        }
      }).catch(error => { }).finally(() => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(error => { });
      });
  }

}
