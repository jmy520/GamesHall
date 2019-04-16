import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseView implements OnInit {
  registerParams: any = {
    account: "",
    pwd: "",
    repwd: "",
    phoneNo: "",
    vsCode: ""
  };

  sendValidateCodeParams: any = {
    phoneNo: ""
  };

  constructor(
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public api: ApiService) {
    super(mLoading, mToast);
  }

  ngOnInit() { }

  sendValidCode() {
    this.sendValidateCodeParams.phoneNo = this.registerParams.phoneNo;
    this.api.fetchValidateCode(this.sendValidateCodeParams).then(response => {
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
        this.showToast(errorMessage ? errorMessage : "发送验证码出错");
      } else {
        this.showToast("验证码已发送请注意查收");
      }
    }).catch(error => {
    }).finally(() => {
      this.mLoading.getTop().then(loadingInstance => {
        loadingInstance.dismiss();
      });
    });
  }

  register() {
    this.showLoading("请稍后...");
    this.api.register(this.registerParams).then(response => {
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
        this.showToast(errorMessage ? errorMessage : "注册失败");
      } else {
        this.showToast("注册成功");
        this.dismissDialog();
      }
    }).catch(error => {
    }).finally(() => {
      this.mLoading.getTop().then(loadingInstance => {
        loadingInstance.dismiss();
      });
    });
  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    });
  }
}
