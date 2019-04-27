import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-safe-box-validate',
  templateUrl: './safe-box-validate.component.html',
  styleUrls: ['./safe-box-validate.component.scss'],
})
export class SafeBoxValidateComponent extends BaseView implements OnInit {

  setPwdParam = {
    pwd: '',
    repwd: ''
  };

  @ViewChild('pwdInput')
  pwdInput: ElementRef;

  @ViewChild('repwdInput')
  repwdInput: ElementRef;

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService) {
      super(mLoading, mToast, mModal);
     }

  ngOnInit() {}

  getFoucs(v) {
    if (v === 1) {
      this.pwdInput.nativeElement.focus();
    } else {
      this.repwdInput.nativeElement.focus();
    }
  }

  setPwd() {
    this.runtime.payButtonVido();
    this.api.setPayPwd(this.setPwdParam).then(response => {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          this.showToast('成功');
          this.dismissDialog();
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

  onEnter(event) {
console.log('--->' + JSON.stringify(event));
  }
}
