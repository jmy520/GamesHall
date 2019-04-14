import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseView implements OnInit {
  isSaveAccount: boolean = false;

  loginParams: any = {
    inputStr: "",
    pwd: ""
  };

  constructor(
    public mModal: ModalController,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public storage: Storage,
    public api: ApiService) {
    super(mLoading, mToast);
  }

  ngOnInit() { }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    });
  }

  login() {
    this.showLoading("正在登录...");
    this.api.login(this.loginParams).then(response => {
      console.log(response);
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
        this.showToast(errorMessage ? errorMessage : "登录失败");
      } else {
        this.storage.set("user", JSON.stringify(response))
          .then(() => {
            this.showToast("登录成功");
            this.dismissDialog();
          })
          .catch(error => {
            console.error(error);
          });
      }
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.mLoading.getTop().then(loadingInstance => {
        loadingInstance.dismiss();
      });
    });
  }
}
