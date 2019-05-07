import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshChipRatioComponent } from 'src/app/components/refresh-chip-ratio/refresh-chip-ratio.component';
import { RefreshChipRecordComponent } from 'src/app/components/refresh-chip-record/refresh-chip-record.component';
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

  curretnColumn = {
    colCode: ''
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

  tabIcons: Map<string, string> = new Map();

  constructor(public mRouter: Router,
     public api: ApiService,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {
    // TODO 填写KEY
    this.tabIcons.set('QP', 'assets/image/refresh_chip/img_refresh_chip_poker_icon.png');
    this.tabIcons.set('PY', 'assets/image/refresh_chip/img_refresh_chip_fishing_icon.png');
    this.tabIcons.set('DZ', 'assets/image/refresh_chip/img_refresh_chip_arcade_game_icon.png');
    this.tabIcons.set('ZR', 'assets/image/refresh_chip/img_refresh_chip_real_game_icon.png');
    this.tabIcons.set('TY', 'assets/image/refresh_chip/img_refresh_chip_ball_icon.png');
  }

  goRefreshChipRatio() {
    this.mModal.create({
      cssClass: 'common_modal_dialog',
      component: RefreshChipRatioComponent,
      componentProps: {
        ximaSeachParam: {
          api_code: '',
          game_type: this.ximaSeachParam.game_type,
        },
        curretnColumn: this.curretnColumn,
      }
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }

  goRefreshChipRecord() {
    this.mModal.create({
      cssClass: 'common_modal_dialog',
      component: RefreshChipRecordComponent,
      componentProps: {
        'ximaSeachParam.game_type': this.ximaSeachParam.game_type
      }
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
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
    this.curretnColumn = clcode;
    this.ximaSeachParam.game_type = this.curretnColumn.colCode;
    this.ximaLijiList();
  }

  initApiColumnsData() {
    this.api.fetchGameTypeList({ colType: 'game_type' }).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.apiColumns = response.data;
        if (this.apiColumns.totals > 0) {
          this.ximaSeachParam.game_type = this.apiColumns.list[0].colCode;
          this.curretnColumn = this.apiColumns.list[0];
        }
        this.ximaLijiList();
      }
    }).catch(error => { });
  }

  ximaLijiList() {
    this.showLoading('加载中...');
    this.api.ximaLijiList(this.ximaSeachParam).then(response => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.ximaObj = response.data;
      }
    }).catch(error => { }).finally(() => {
      this.mLoading.getTop().then(instance => {
        instance.dismiss();
      }).catch(error => { });
    });
  }

  handXima() {
    this.api.handXima(this.ximaSeachParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
      }
    }).catch(error => { });
  }
}
