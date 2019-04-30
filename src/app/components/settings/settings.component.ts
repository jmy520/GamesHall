import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseView implements OnInit {
  tabIndex: number = 0;
  bgv = 1;
  btv = 1;

  modifyPwdParam = {
    oldpwd: '',
    pwd: '',
    repwd: ''
  };

  constructor(public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runTime: Runtime,
    public api: ApiService) {
      super(mLoading, mToast, mModal);
    this.runTime.getKey('bgAudio').then((vl) => {
      if (vl !== null) {
        this.bgv = parseFloat(vl);
      }
    });
    this.runTime.getKey('butAudio').then((vl) => {
      if (vl !== null) {
        this.btv = parseFloat(vl);
      }
    });
  }

  ngOnInit() {}


  modifyPwd() {
    if (this.modifyPwdParam.oldpwd === '') {
      this.showToast('请输入原密码');
      return;
    }
    if (this.modifyPwdParam.pwd === '') {
      this.showToast('请输入新密码');
      return;
    }
    if (this.modifyPwdParam.repwd !== this.modifyPwdParam.pwd) {
      this.showToast('两次密码输入不一致.');
      return;
    }
    this.showLoading('修改中...');
    this.api.modifyLoginPwd(this.modifyPwdParam).then(response => {
        const errorMessage = response.hashError;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          this.showToast('修改成功.');
          this.runTime.postLogout();
          this.dismissDialog() ;
        }
      }).catch(error => { }).finally(() => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(error => { });
      });
  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

  logout() {
    this.runTime.postLogout();
    this.dismissDialog() ;
  }


  volw(v) {
    if (v === 0) {
      this.runTime.setVolume(0, this.btv);
    } else {
      this.runTime.setVolume(1, this.bgv);
    }
  }
}
