import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { ApiService } from 'src/app/services/api.service';
import { Runtime } from 'src/app/services/Runtime';
import { RegisterComponent } from 'src/app/components/register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseView implements OnInit {
  isSaveAccount = false;

  loginParams: any = {
    inputStr: '',
    pwd: ''
  };

  constructor(
    public mModal: ModalController,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public runtime: Runtime,
    public api: ApiService) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() { }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

  goRegister() {
    this.mModal.create({
      component: RegisterComponent,
      cssClass: 'common_modal_dialog'
    }).then(
      modalInstance => {
        modalInstance.present();
      }
    );
  }

  login() {
    const loading = super.showLoading('正在登录...');
    this.api.login(this.loginParams).then(response => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
      const hasError = response.hashError;
      if (hasError) {
        const errorMessage = response.msg;
        this.showToast(errorMessage ? errorMessage : '登录失败');
      } else {
        this.runtime.postLogin(response.data, true);
        this.showToast('登录成功');
        this.dismissDialog();
      }
    }).catch(error => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
      console.error(error);
    });
  }
}
