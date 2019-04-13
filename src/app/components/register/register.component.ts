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
    this.api.fetchValidateCode(this.sendValidateCodeParams).then(response=>{

    }).catch(error=>{
      
    });
  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    });
  }
}
