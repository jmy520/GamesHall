import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController  } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { ApiService } from 'src/app/services/api.service';
import { BaseView } from 'src/common/base/BaseView';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  extends BaseView  {
  isLogined = false;

  gongaoList = [];

  gongGaoSeachParam = {
    page: 1,
    size: 100,
    colGid: '339',
    keyword: ''
  };

  constructor(
    public mRouter: Router,
    public mModal: ModalController,
    public mPopover: PopoverController,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public api: ApiService) {
      super(mLoading, mToast);
     }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.getNotices();
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
      this.gongaoList = response.data;
    }).catch(error => {
      console.error(error);
    });
  }


}
