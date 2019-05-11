import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { PictureHelper } from 'src/common/helper/PictureHelper';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage extends BaseView implements OnInit {
  tabIndex: number = 0;

  actType = '';

  actityList = [];

  currentActivity = {
    actid: null
  };

  apiColumns = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  tabIcons: Map<string, string> = new Map();

  curretnColumn = {
    colCode: ''
  };

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService,
    public mPopover: PopoverController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {

    this.tabIcons.set('ZH', 'assets/image/activity/img_activity_unity_icon.png');
    this.tabIcons.set('QP', 'assets/image/activity/img_activity_poker_icon.png');
    this.tabIcons.set('PY', 'assets/image/activity/img_activity_fishing_icon.png');
    this.tabIcons.set('DZ', 'assets/image/activity/img_activity_arcade_game_icon.png');
    this.tabIcons.set('ZR', 'assets/image/activity/img_activity_real_game_icon.png');
    this.tabIcons.set('TY', 'assets/image/activity/img_activity_ball_game_icon.png');
  }

  ionViewDidEnter() {
    this.initApiColumnsData();
  }

  initApiColumnsData() {
    this.api.fetchGameTypeList({ colType: 'activity_type' }).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.apiColumns = response.data;
        if (this.apiColumns.totals > 0) {
          this.curretnColumn = this.apiColumns.list[0];
        }
        this.loadActivityData();
      }
    }).catch(error => { });
  }

  tabActivity(item) {
    this.runtime.payButtonVido();
    this.curretnColumn = item;
    this.loadActivityData();
  }

  loadActivityData() {
    //TODO 此处仅为调试，请删除并打开下面注释。
    this.actityList = [
      {
        actitle: '活动标题',
        displaytime: '2019/05/09',
        actimg: '1555842732611.png',
        activity_detail: '<h4>活动详情</h4><p>活动时间：即日起</p><p>活动详情：即日起注册用户，只要在乐游棋牌新会员任务完成相应的任务即可领取改礼包。</p>',
      }
    ];

    // this.api.findActByType({ actType: this.curretnColumn.colCode }).then(response => {
    //   const errorMessage = response.hashError;
    //   if (errorMessage) {
    //     this.showToast(response.msg);
    //   } else {
    //     console.log(response.data);
    //     this.actityList = response.data;
    //   }
    // }).catch(error => { }).finally(() => {
    // });

    for (let index = 0; index < this.actityList.length; index++) {
      const element = this.actityList[index];
      element['open_status'] = false;
    }
  }

  fetchImage(fileName: string) {
    return PictureHelper.fetchImage(fileName);
  }

  goKefu() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.showToast('请先登录');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.mRouter.navigate(['/customer-service']);
  }
}
