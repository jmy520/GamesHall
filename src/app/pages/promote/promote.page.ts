import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/components/login/login.component';
import { Router } from '@angular/router';
import { ModalController, ToastController , LoadingController, AlertController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { BaseView } from 'src/common/base/BaseView';
import { DatePipe } from '@angular/common';
import { DateUtile } from 'src/common/helper/DateUtile';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { RestConfig } from 'src/common/config/RestConfig';



@Component({
  selector: 'app-promote',
  templateUrl: './promote.page.html',
  styleUrls: ['./promote.page.scss'],
})
export class PromotePage extends BaseView implements OnInit {
  tabIndex = 0;

  dataTotal = 0;

  qrData = ''; // 推广二维码 base64字符串

  homeData: any = {
    canCommission: 0,
    ljCommission: 0,
    pepolNum: 0,
    tgLink: ''
  };

  seachParam = {
    page: 1,
    size: 7,
    keyword: '',
    itemType: 'commission',
    insterTimeStart: '',
    InsterTimeEnd: ''
  };

  myDay: any = {
    id: 0,
    txt: '全部',
    startTimeStr: '',
    endTimeStr: ''
  };

  timeSelectNumberArray = [3, 5, 7, 10, 30, 90 ];
  timeSelectTextArray = ['三天', '五天', '七天', '十天', '一个月', '三个月' ];

  timeSelectObjectArray = [];

  myCommissionData: any = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  constructor(public mRouter: Router,
    public runtime: Runtime,
    private datePipe: DatePipe,
    private clipboard: Clipboard,
    public mLoading: LoadingController,
    private photoLibrary: PhotoLibrary,
    public mToast: ToastController,
    private sanitizer: DomSanitizer,
    public alertController: AlertController,
    public dateUtile: DateUtile,
    public api: ApiService,
    public mModalController: ModalController) {
      super(mLoading, mToast, mModalController);
     }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.runtime.user) {
      this.showToast('请先登录.');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.initData();
    this.myQrData();
    this.initTimeArray();
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  initTimeArray() {
    const now: Date  = new Date();
    this.timeSelectObjectArray.push({
      id: 0,
      txt: '全部',
      startTimeStr: '',
      endTimeStr: ''
    });
    for (let i = 0; i < this.timeSelectNumberArray.length; i++) {
      const num = this.timeSelectNumberArray[i];
      const endTimeStr = this.datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');
      const endTimeShowStr = this.datePipe.transform(now, 'yyyy/MM/dd');
      const endTime: Date = DateUtile.addDays(now, -num);
      const startTimeStr = this.datePipe.transform(endTime, 'yyyy-MM-dd HH:mm:ss');
      const startTimeShowStr = this.datePipe.transform(endTime, 'yyyy/MM/dd');

      const name = this.timeSelectTextArray[i] + '[' + startTimeShowStr + '-' + endTimeShowStr + ']';
      this.timeSelectObjectArray.push({
        id: num,
        txt: name,
        startTimeStr: startTimeStr,
        endTimeStr: endTimeStr
      });
    }
  }

  selectDate() {
    this.seachParam.insterTimeStart = this.myDay.startTimeStr;
    this.seachParam.InsterTimeEnd = this.myDay.endTimeStr;
    this.bankItem();
  }

  initData() {
    const loading = super.showLoading('加载中...');
    this.api.promote().then(response => {
      console.log('------>' + JSON.stringify(response));
      const errorMessage = response.hashError;
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
    this.runtime.payButtonVido();
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
      const errorMessage = response.hashError;
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
      const errorMessage = response.hashError;
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
      const errorMessage = response.hashError;
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

  myQrData() {
    this.api.myQr({weight: 200, heiht: 200}).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.qrData = response.data;
      }
    }).catch(error => { });
  }

  copyDomain() {
    this.runtime.payButtonVido();
    this.clipboard.copy(this.homeData.tgLink).then(() => {
      this.showToast('复制成功');
    });
  }
  myQr() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.qrData);
  }

  openApp(type) {
    if (type === 'qq') {

    } else if (type === 'wx') {

    } else if (type === 'wx') {

    }
  }

  saveShareImg() {
    const urlimg = this.api.ROOT_URL + '/shareImg?ugid=' + this.runtime.user.user.gid + '&weight183&heiht=183&imageName=kyshare.png';
    this.photoLibrary.saveImage(urlimg
    , 'gamehall').then(() => {
      alert('保存成功');
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
    this.runtime.payButtonVido();
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
    this.runtime.payButtonVido();
    if (this.homeData.canCommission > 0 ) {
      this.showToast('未有可领取的佣金.');
    } else {
      this.presentAlertConfirm();
    }
    // this.mModalController.create({
    //   component: ReceiveCommisionComponent,
    //   cssClass: 'common_modal_dialog'
    // }).then(modalInstance => {
    //   modalInstance.present();
    //   modalInstance.onDidDismiss().then(result => {
    //     // TODO something back
    //   }).catch(error => { });
    // });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '确认提取？',
      message: '提取 <strong>' + this.homeData.canCommission + '</strong>元？提取后立即到账,如未到账请及时联系客服.',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: '确定',
          handler: () => {
            this.receive();
          }
        }
      ]
    });
    await alert.present();
  }


  receive() {
    const loading = super.showLoading('领取中...');
    this.api.promote().then(response => {
      const errorMessage = response.msg;
      if (errorMessage) {
        this.showToast(errorMessage);
      } else {
        this.showToast(errorMessage);
        this.initData();
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }
}
