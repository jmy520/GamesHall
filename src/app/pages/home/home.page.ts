import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { BaseView } from 'src/common/base/BaseView';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import { PictureHelper } from 'src/common/helper/PictureHelper';

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

  selectGameType(clickedGameType: any) {
    this.currentGameType = clickedGameType.gid;
    this.getGameList();
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
    }).then(modalInstance => modalInstance.present());
  }

  presentRegister() {
    this.mModal.create({
      component: RegisterComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => modalInstance.present());
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
