import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { ApiService } from 'src/app/services/api.service';
import { Runtime } from 'src/app/services/Runtime';


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

  tabIndex: number = 0;

  timerText: string = "60";
  timerTick: boolean = false;

  constructor(
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() { }

  sendValidCode() {
    this.runtime.payButtonVido();
    this.sendValidateCodeParams.phoneNo = this.registerParams.phoneNo;
    this.api.fetchValidateCode(this.sendValidateCodeParams).then(response => {
      const hasError = response.hashError;

      if (hasError) {
        const errorMessage = response.msg;
        this.showToast(errorMessage ? errorMessage : "发送验证码出错");
      } else {
        this.showToast("验证码已发送请注意查收");
        this.timerTick = true;
        let timeValue = 60;
        const timerHandler = setInterval(() => {
          timeValue -= 1;
          this.timerText = "" + timeValue;
          if (timeValue == 0) {
            clearInterval(timerHandler);
            this.timerTick = false;
          }
        }, 1000);
      }
    }).catch(error => {
    }).finally(() => {
      this.mLoading.getTop().then(loadingInstance => {
        loadingInstance.dismiss();
      });
    });
  }

  register() {
    this.runtime.payButtonVido();
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

  refreshImageValidCode() {
    //TODO 刷新图片验证码

  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
