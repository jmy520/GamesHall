import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { BaseView } from 'src/common/base/BaseView';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BaseView {
  isLogined: boolean = false;

  loginedUser: any = null;

  getGameTypeListParams: any = {
    colType: "home_left_column"
  };
  gameTypeList: any = [];

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

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.mStorage.get("user").then(data => {
      this.loginedUser = JSON.parse(data);
      this.isLogined = true;
    }).catch(error => {
    });
  }

  getGameTypeList() {
    this.api.fetchGameTypeList(this.getGameTypeListParams).then(response => {
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
      } else {
        this.gameTypeList = response.data;
      }
    }).catch(error => {
    });
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
}
