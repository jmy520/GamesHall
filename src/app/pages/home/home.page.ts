import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { PictureHelper } from 'src/common/helper/PictureHelper';
import { SafeBoxValidateComponent } from 'src/app/components/safe-box-validate/safe-box-validate.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { RestConfig } from 'src/common/config/RestConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseView implements OnInit {

  currentGameType = 0;

  domain: string = RestConfig.COPY_DOMAIN;

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

  userWallet: any = {
    factMoney: 0.0,
    payPwd: null
  };

  gongGaoSeachParam: any = {
    page: 1,
    size: 100,
    colGid: '339',
    keyword: ''
  };


  gameTypeArray: Map<string, string> = new Map();

  constructor(
    public mRouter: Router,
    private clipboard: Clipboard,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService,
    public mPopover: PopoverController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {
    this.getNotices();
  }

  ionViewDidEnter() {
    this.wallet();
    this.getGameTypeList();

    this.gameTypeArray.set('buyu_game', 'assets/image/home/img_fishing_game_icon.png');
    this.gameTypeArray.set('qipai_game', 'assets/image/home/img_poker_game_icon.png');
    this.gameTypeArray.set('dianzi_game', 'assets/image/home/img_arcade_game_icon.png');
    this.gameTypeArray.set('xunshi_game', 'assets/image/home/img_real_game_icon.png');
    this.gameTypeArray.set('tiyusaishi_game', 'assets/image/home/img_ball_game_icon.png');
    this.gameTypeArray.set('hot_game', 'assets/image/home/img_hot_game_icon.png');
  }

  getGameTypeImage(typeCode: string) {
    return this.gameTypeArray.get(typeCode);
  }

  repWallet() {
    this.runtime.payButtonVido();
    this.wallet();
  }

  copyDomain() {
    this.runtime.payButtonVido();
    this.clipboard.copy(this.domain).then(() => {
      this.showToast('复制成功');
    });
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
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/game'], {
      queryParams: {
          gameGid: gameGid
      }
    });
    // this.showLoading("正在登录请稍后...");
    // this.api.fetchGameLink({ gameGid: gameGid },
    //   {
    //     port: 'mobile',
    //     authorization: this.loginedUser.sessionId
    //   }).then(response => {
    //     const errorMessage = response.msg;
    //     if (errorMessage) {
    //       this.showToast(errorMessage);
    //     } else {
    //       let gameLinkAddress = response.data.url;
    //       let currentUrl = location.href;
    //       gameLinkAddress = gameLinkAddress + "&backUrl=" + currentUrl+'/&jumpType=2';
    //       this.mInAppBrowser.create(gameLinkAddress, "_self", {
    //         location: "no",
    //         toolbar: "no",
    //         hardwareback: 'no',
    //         closebuttoncaption: 'yes'
    //       }).show();
    //     }
    //   }).catch(error => { }).finally(() => {
    //     this.mLoading.getTop().then(instance => {
    //       instance.dismiss();
    //     }).catch(error => { });
    //   });
  }

  wallet() {
    // this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }

    this.api.wallet().then(response => {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          this.userWallet = response.data;
        }
      }).catch(error => { }).finally(() => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(error => { });
      });
  }

  selectGameType(clickedGameType: any) {
    this.runtime.payButtonVido();
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

  goSafeBox() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    if (this.userWallet.payPwd === '111111') {
      this.mModal.create({
        component: SafeBoxValidateComponent,
        cssClass: 'common_modal_dialog'
      }).then(modalInstance => {
        modalInstance.present();
        modalInstance.onDidDismiss().then(result => {
          this.wallet();
        }).catch(error => { });
      });
      return;
    }
    this.mRouter.navigate(['/safe-box']);
  }

  goPromote() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/promote']);
  }

  goPersonalCenter() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/personal-center']);
  }

  goactivity() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/activity']);
  }

  goMessageXx() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mModal.create({
      component: MessageComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
        modalInstance.present();
      }
    );
  }

  goCustomerKf() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/customer-service']);
  }

  gorefreshChip() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/refresh-chip']);
  }

  gowithdrawal() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/withdrawal']);
  }

  gorecharge() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mRouter.navigate(['/recharge']);
  }

  goSettings() {
    this.runtime.payButtonVido();
    if (this.runtime.user == null) {
      this.presentLogin();
      return;
    }
    this.mModal.create({
      component: SettingsComponent,
      cssClass: 'common_modal_dialog'
    }).then(
      modalInstance => {
        modalInstance.present();
      }
    );
  }

}
