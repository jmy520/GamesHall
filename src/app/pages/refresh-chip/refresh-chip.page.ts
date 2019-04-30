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

  constructor(public mRouter: Router, public api: ApiService, public runtime: Runtime, public mLoading: LoadingController, public mToast: ToastController, public mModal: ModalController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {
    //TODO 填写KEY
    // this.tabIcons.set('key', 'assets/image/refresh_chip/img_refresh_chip_poker_icon.png');
    // this.tabIcons.set('key', 'assets/image/refresh_chip/img_refresh_chip_fishing_icon.png');
    // this.tabIcons.set('key', 'assets/image/refresh_chip/img_refresh_chip_arcade_game_icon.png');
    // this.tabIcons.set('key', 'assets/image/refresh_chip/img_refresh_chip_real_game_icon.png');
    // this.tabIcons.set('key', 'assets/image/refresh_chip/img_refresh_chip_ball_icon.png');
  }

  goRefreshChipRatio() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RefreshChipRatioComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }

  goRefreshChipRecord() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RefreshChipRecordComponent
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
