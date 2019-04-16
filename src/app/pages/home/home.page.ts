import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { BaseView } from 'src/common/base/BaseView';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import { PictureHelper } from 'src/common/helper/PictureHelper';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseView {
  isLogined = false;

  loginedUser: any = null;
  currentGameType = 0;

  getGameTypeListParams: any = {
    colType: 'home_left_column'
  };
  gameTypeList: any = [];

  getGameListParams: any = {
    typeGid: 0,
    page: 1,
    size: 20
  };
  gameList: any = [];
  gameListRow01: any = [];
  gameListRow02: any = [];

  getNoticeListParams: any = {

  };
  noticeList: any = [];
  gongaoList: any;

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public mStorage: Storage,
    public api: ApiService,
    public mInAppBrowser: InAppBrowser,
    public mPopover: PopoverController) {
    super(mLoading, mToast);
  }

  gongGaoSeachParam = {
    page: 1,
    size: 100,
    colGid: '339',
    keyword: ''
  };

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.getNotices();
  }

  ionViewDidEnter() {
    this.mStorage.get('user').then(data => {
      if (data) {
        this.loginedUser = JSON.parse(data);
        this.isLogined = true;
      }
    }).catch(error => {
    });

    this.getGameTypeList();
  }

  getGameTypeList() {
    this.api.fetchGameTypeList(this.getGameTypeListParams).then(response => {
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        }
      } else {
        this.gameTypeList = response.data.list;
        if (this.gameTypeList && this.gameTypeList.length > 0) {
          this.currentGameType = this.gameTypeList[0].gid;
          this.getGameList();
        }
      }
    }).catch(error => {
    });
  }

  jumpToGamePage(gameGid: any) {
    if (!this.isLogined) {
      this.showToast("请先登录");
      this.presentLogin();
      return;
    }
    this.showLoading("正在登录请稍后...");
    this.api.fetchGameLink({ gid: gameGid },
      {
        port: 168,
        authorization: this.loginedUser.sessionId
      }).then(response => {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          let gameLinkAddress = response.data.url;
          this.mInAppBrowser.create(gameLinkAddress, "_self", {
            location: "no",
            toolbar: "no"
          }).show();
        }
      }).catch(error => { }).finally(() => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(error => { });
      });
  }

  selectGameType(clickedGameType: any) {
    this.currentGameType = clickedGameType.gid;
    this.getGameList();
    this.gameList = [];
    this.gameListRow01 = [];
    this.gameListRow02 = [];
  }

  getGameList() {
    this.getGameListParams.typeGid = this.currentGameType;
    this.api.fetchGameList(this.getGameListParams).then(response => {
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        }
      } else {
        this.gameList = response.data.list;
        if (this.gameList && this.gameList.length > 0) {
          let spliteIndex = 0;
          if (this.gameList.length % 2 === 0) {
            spliteIndex = this.gameList.length / 2 + 1;
          } else {
            spliteIndex = (this.gameList.length + 1) / 2 + 1;
          }

          this.gameListRow01 = this.gameList.slice(0, spliteIndex);
          this.gameListRow02 = this.gameList.slice(spliteIndex, this.gameList.length);
        }
      }
    }).catch(error => {
    });
  }

  fetchImage(fileName: string) {
    return PictureHelper.fetchImage(fileName);
  }

  presentLogin() {
    this.mModal.create({
      component: LoginComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
        this.mStorage.get("user").then(data => {
          if (data) {
            this.loginedUser = JSON.parse(data);
            this.isLogined = true;
          }
        }).catch(error => {
        });
      }).catch(error => { });
    });
  }

  presentRegister() {
    this.mModal.create({
      component: RegisterComponent,
      cssClass: 'common_modal_dialog'
    }).then(
      modalInstance => {
        modalInstance.present();
      }
    );
  }

  getNotices() {
    this.api.fetchBroadcastList(this.gongGaoSeachParam).then(response => {
      const hasError = response.hashError;
      if (hasError) {
        this.showToast(response.msg);
      }
      this.gongaoList = response.data.list;
    }).catch(error => {
      console.error(error);
    });
  }


}
