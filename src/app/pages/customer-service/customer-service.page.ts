import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage extends BaseView implements OnInit {
  targetUrl: SafeResourceUrl = '';
  seachParam = {
    bcode: 'qq',
  };

  kefuList = [];

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService,
    private sanitizer: DomSanitizer,
    public mPopover: PopoverController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getKefus();
  }

  tabSelect(vl) {
    this.runtime.payButtonVido();
    this.seachParam.bcode = vl;
    if ('wt' !== vl) {
      this.getKefus();
    }
  }

  getKefus() {
    const loading = super.showLoading('VIP请求中...');
    this.api.customerServer(this.seachParam).then(response => {
      const hasError = response.hashError;
      if (hasError) {
        this.showToast(response.msg);
      }
      this.kefuList = response.data;
      if ('online' === this.seachParam.bcode) {
        this.targetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.kefuList[0].relation1);
      }
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

}
