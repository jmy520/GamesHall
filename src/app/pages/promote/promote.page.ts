import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';
import { Router } from '@angular/router';
import { ModalController, ToastController , LoadingController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { ReceiveCommisionComponent } from 'src/app/components/receive-commision/receive-commision.component';
import { BaseView } from 'src/common/base/BaseView';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.page.html',
  styleUrls: ['./promote.page.scss'],
})
export class PromotePage extends BaseView implements OnInit {
  tabIndex = 0;

  dataTotal = 0;

  homeData: any = {
    canCommission: 0.0,
    ljCommission: 0.0,
    pepolNum: 0
  };

  seachParam = {
    page: 1,
    size: 7,
    keyword: '',
    itemType: 'commission',
    insterTimeStart: '',
    InsterTimeEnd: ''
  };

  myCommissionData: any = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  constructor(public mRouter: Router,
    public runtime: Runtime,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public api: ApiService,
    public mModalController: ModalController) {
      super(mLoading, mToast, mModalController);
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.runtime.user) {
      this.presentLogin();
      return;
    }
    this.initData();
  }

  initData() {
    const loading = super.showLoading('加载中...');
    this.api.promote().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.homeData = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  nextPage(page) {
    if ((this.seachParam.page + page) > 0 && (this.seachParam.page + page) <= this.homeData.totalsPage) {
      this.seachParam.page = this.seachParam.page + page;
      if (this.tabIndex === 1) {
        this.myCommissions();
      } else if (this.tabIndex === 2) {
        this.bankItem();
      } else if (this.tabIndex === 3) {
        this.groupMembers();
      }
    }
  }

  myCommissions() {
    const loading = super.showLoading('加载中...');
    this.api.myCommissions(this.seachParam).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.myCommissionData = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  groupMembers() {
    const loading = super.showLoading('加载中...');
    this.api.groupMembers(this.seachParam).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.myCommissionData = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  bankItem() {
    const loading = super.showLoading('加载中...');
    this.api.bankItem(this.seachParam).then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.myCommissionData = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  presentLogin() {
    this.mModalController.create({
      component: LoginComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
      }).catch(error => { });
    });
  }

  switchTab(tabIndex: number) {
    this.seachParam = {
      page: 1,
      size: 7,
      keyword: '',
      itemType: 'commission',
      insterTimeStart: '',
      InsterTimeEnd: ''
    };
    this.myCommissionData = {
      totals: 0,
      totalsPage: 0,
      list: []
    };
    this.tabIndex = tabIndex;
    switch (tabIndex) {
      case 0:
        this.doTab00Request();
        break;
      case 1:
        this.doTab01Request();
        break;
      case 2:
        this.doTab02Request();
        break;
      case 3:
        this.doTab03Request();
        break;
      case 4:
        this.doTab04Request();
        break;
    }
  }

  doTab00Request() {

  }

  doTab01Request() {
    this.myCommissions();
  }

  doTab02Request() {
    this.bankItem();
  }

  doTab03Request() {
    this.groupMembers();
  }

  doTab04Request() {

  }

  receiveCommision() {
    this.mModalController.create({
      component: ReceiveCommisionComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
        //TODO something back
      }).catch(error => { });
    });
  }
}
