import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController, ModalController, IonSlides } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Router } from '@angular/router';
import { Runtime } from 'src/app/services/Runtime';
import { DatePipe } from '@angular/common';
import { DateUtile } from 'src/common/helper/DateUtile';
import { ApiService } from 'src/app/services/api.service';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SingleSelectComponent } from 'src/app/components/single-select/single-select.component';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.page.html',
  styleUrls: ['./personal-center.page.scss'],
})
export class PersonalCenterPage extends BaseView implements OnInit {
  currentLevel: number = 0;
  currentLevelPager: number = 0;
  isEditBaseInfo: boolean = false;
  isEditContact: boolean = false;
  jjljLeiji = 0;

  tabIndex: number = 0;

  myDay: any = {
    id: 0,
    txt: '全部',
    startTimeStr: '',
    endTimeStr: ''
  };

  lqVipParam = {
    ljType: '',
  };

  timeSelectNumberArray = [3, 5, 7, 10, 30, 90];
  timeSelectTextArray = ['三天', '五天', '七天', '十天', '一个月', '三个月'];

  timeSelectObjectArray = [];

  selfInfpParam = {
    nickName: this.runTime.user.user.nickName,
    sex: this.runTime.user.user.userSex,
    birthday: this.runTime.user.user.userBirthday,
    email: this.runTime.user.user.userEmail,
    qq: this.runTime.user.user.userQq,
    wx: this.runTime.user.user.userWx
  };

  seachBetLogParam = {
    apiCode: '',
    gameType: '',
    startTime: '',
    endTime: '',
    page: 1,
    size: 100
  };

  seachBankItemParam = {
    itemType: '',
    insterTimeStart: '',
    InsterTimeEnd: '',
    page: 1,
    size: 100
  };

  seachReportParam = {
    game_type: '',
    insterTimeStart: '',
    InsterTimeEnd: ''
  };

  nextLevel = {

  };

  userWallet = {
    factMoney: 0.0,
    betMoeny: 0.0
  };

  betLogs = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  apiColumns = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  apiInfos = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  bankItemTypes = [];

  selfReport = {
    bet: 0,
    win: 0,
    xima: 0,
    yingli: 0
  };

  sumByTime = {
    chongzhi: 0.0,
    tixian: 0.0,
    youhui: 0.0,
    fanshui: 0.0
  };


  bankItems = {
    totals: 0,
    totalsPage: 0,
    list: []
  };

  style01LevelArray: Array<string> = new Array();
  style02LevelArray: Array<string> = new Array();
  style03LevelArray: Array<string> = new Array();
  style04LevelArray: Array<string> = new Array();

  levelPresentArray: Array<any> = new Array();

  vipLevelInfoArray: Array<any> = new Array();

  @ViewChild('levelSlides')
  levelSlides: IonSlides;

  slidesOpts: any = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  };

  constructor(
    public runTime: Runtime,
    public mRouter: Router,
    public dateUtile: DateUtile,
    private datePipe: DatePipe,
    public api: ApiService,
    public mModalCtrl: ModalController,
    public mLoadingCtrl: LoadingController,
    public mToastCtrl: ToastController) {
    super(mLoadingCtrl, mToastCtrl, mModalCtrl);
  }

  ionViewDidEnter() {
    if (!this.runTime.user) {
      this.showToast('请先登录.');
      this.mRouter.navigate(['/home']);
      return;
    }
    this.currentLevel = this.runTime.user.user.vipGrade - 1;
    this.initApiColumnsData();
    this.initApiInfosData();
    this.comdicts();
    this.initTimeArray();
    this.selAllUsersVip();
    this.nextUserVip();
    this.wallet();
    this.levelSlides.slideTo(this.currentLevel);
  }

  goLevel(val) {
    this.runTime.payButtonVido();
    if (val === -1) {
      this.levelSlides.slidePrev();
    } else if (val === 1) {
      this.levelSlides.slideNext();
    }
  }
  ionSlideDidChange() {
    this.levelSlides.getActiveIndex().then(index => {
      this.currentLevelPager = index;
    });
  }

  initApiColumnsData() {
    this.api.fetchGameTypeList({ colType: 'game_type' }).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.apiColumns = response.data;
        if (this.apiColumns.totals > 0) {
          this.seachBetLogParam.gameType = this.apiColumns.list[0].colCode;
          this.seachReportParam.game_type = this.seachBetLogParam.gameType;
        }
      }
    }).catch(error => { });
  }

  initApiInfosData() {
    this.api.fetchApiInfoList({ page: 1, size: 100 }).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.apiInfos = response.data;
      }
    }).catch(error => { });
  }

  comdicts() {
    this.api.comdicts({ type: 'bank_item_type' }).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.bankItemTypes = response.data;
      }
    }).catch(error => { });
  }

  wallet() {
    this.api.wallet().then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.userWallet = response.data;
      }
    }).catch(error => { });
  }

  selAllUsersVip() {
    this.api.selAllUsersVip().then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.levelPresentArray = response.data;
        const _this = this;
        this.levelPresentArray.forEach((item, idx) => {
          if (item.vipGrade === 1) {
            item.ljlj = 0;
          } else if (item.vipGrade === 2) {
            item.ljlj = item.jjLj;
          } else {
            item.ljlj = item.jjLj + _this.levelPresentArray[idx - 1].ljlj;
          }
        });
      }
    }).catch(error => { });
  }

  nextUserVip() {
    this.api.nextUserVip().then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.nextLevel = response.data;
      }
    }).catch(error => { });
  }

  selectGameType(gameType) {
    this.runTime.payButtonVido();
    if (this.tabIndex === 3) {
      this.seachReportParam.game_type = gameType;
      this.getReports();
    } else {
      this.seachBetLogParam.gameType = gameType;
      this.getBetLogs();
    }
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  initTimeArray() {
    this.timeSelectObjectArray.push({
      id: 0,
      txt: '全部',
      startTimeStr: '',
      endTimeStr: ''
    });
    for (let i = 0; i < this.timeSelectNumberArray.length; i++) {
      const now: Date = new Date();
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
    if (this.tabIndex === 1) {
      this.seachBetLogParam.startTime = this.myDay.startTimeStr;
      this.seachBetLogParam.endTime = this.myDay.endTimeStr;
      this.getBetLogs();
    } else if (this.tabIndex === 2) {
      this.seachBankItemParam.insterTimeStart = this.myDay.startTimeStr;
      this.seachBankItemParam.InsterTimeEnd = this.myDay.endTimeStr;
      this.bankItem();
    } else if (this.tabIndex === 3) {
      this.seachReportParam.insterTimeStart = this.myDay.startTimeStr;
      this.seachReportParam.InsterTimeEnd = this.myDay.endTimeStr;
      this.getBetLogs();
    }
  }

  bankItem() {
    const loading = super.showLoading('加载中...');
    this.api.bankItem(this.seachBankItemParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.bankItems = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
    this.getSumByTimes();
  }

  getBetLogs() {
    const loading = super.showLoading('加载中...');
    this.api.betlogs(this.seachBetLogParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.betLogs = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  getReports() {
    const loading = super.showLoading('加载中...');
    this.api.selfTongji(this.seachReportParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.selfReport = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  getSumByTimes() {
    const loading = super.showLoading('加载中...');
    this.api.bankItemTongji(this.seachReportParam).then(response => {
      const errorMessage = response.hashError;
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.sumByTime = response.data;
      }
    }).catch(error => { }).finally(() => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
    });
  }

  updateInfo() {
    const loading = super.showLoading('处理中...');
    this.api.updataInfo(this.selfInfpParam).then(response => {
      const errorMessage = response.hashError;
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.showToast('成功!');
        this.runTime.user.user.nickName = this.selfInfpParam.nickName;
        this.runTime.user.user.userSex = this.selfInfpParam.sex;
        this.runTime.user.user.userBirthday = this.selfInfpParam.birthday;
        this.runTime.user.user.userEmail = this.selfInfpParam.email;
        this.runTime.user.user.userQq = this.selfInfpParam.qq;
        this.runTime.user.user.userWx = this.selfInfpParam.wx;
        this.runTime.postLogin(this.runTime.user);
      }
    }).catch(error => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
     });
  }

  tabSelect(tabIndex) {
    this.runTime.payButtonVido();
    this.tabIndex = tabIndex;
    if (this.tabIndex === 0) {
    } else if (this.tabIndex === 1) {
      this.getBetLogs();
    } else if (this.tabIndex === 2) {
      this.bankItem();
    } else if (this.tabIndex === 3) {
      this.getReports();
    }
  }

  ngOnInit() {
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip01_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip02_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip03_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip04_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip05_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip06_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip07_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip08_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip09_style01.png');
    this.style01LevelArray.push('assets/image/personal_center/img_personal_center_vip10_style01.png');

    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip01_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip02_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip03_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip04_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip05_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip06_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip07_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip08_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip09_style02.png');
    this.style02LevelArray.push('assets/image/personal_center/img_personal_center_vip10_style02.png');

    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip01_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip02_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip03_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip04_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip05_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip06_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip07_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip08_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip09_style03.png');
    this.style03LevelArray.push('assets/image/personal_center/img_personal_center_vip10_style03.png');

    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip01_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip02_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip03_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip04_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip05_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip06_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip07_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip08_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip09_style04.png');
    this.style04LevelArray.push('assets/image/personal_center/img_personal_center_vip10_style04.png');

  }

  getLevelIcon(levelStyle: number, level?: number) {
    let result = null;
    if (levelStyle === 1) {
      result = this.style01LevelArray[level ? level : this.currentLevel];
    } else if (levelStyle === 2) {
      result = this.style02LevelArray[level ? level : this.currentLevel];
    } else if (levelStyle === 3) {
      result = this.style03LevelArray[level ? level : this.currentLevel];
    } else if (levelStyle === 4) {
      result = this.style04LevelArray[level >= 0 ? level : this.currentLevel];
    }
    return result;
  }

  switchBaseInfoEditMode() {
    this.runTime.payButtonVido();
    if (this.isEditBaseInfo) {
      this.isEditBaseInfo = false;
      this.updateInfo();
    } else {
      this.isEditBaseInfo = true;
    }
  }

  switchContactEditMode() {
    this.runTime.payButtonVido();
    if (this.isEditContact) {
      this.isEditContact = false;
      this.updateInfo();
    } else {
      this.isEditContact = true;
    }
  }

  leiji(vl: number) {
    this.jjljLeiji = this.jjljLeiji + vl;
    return this.jjljLeiji;
  }

  selectSex() {
    console.log(this.runTime.user);
    if (!this.isEditBaseInfo) {
      return;
    }
    this.mModal.create({
      component: SingleSelectComponent,
      componentProps: {
        itemsData: ['男', '女']
      },
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.onDidDismiss().then(result => {
        if (!result) {
          return;
        }
        if (result.data === '男') {
          this.selfInfpParam.sex = '男';
          this.runTime.user.user.userSex = '男';
        } else if(result.data === '女') {
          this.selfInfpParam.sex = '女';
          this.runTime.user.user.userSex = '女';
        }
      }).catch(error => { });
      modalInstance.present();
    });
  }

  goXima() {
    this.mRouter.navigate(['/refresh-chip']);
  }

  lq(item, vl) {
    if (vl === 'jjlj') {
      if (item.level.isjjlj) {
        this.lqVipParam.ljType = 'jj_lj';
        this.lqVipMoney();
      }
    } else if (vl === 'ylj') {
      if (item.level.isylj) {
        this.lqVipParam.ljType = 'y_lj';
        this.lqVipMoney();
      }
    } else if (vl === 'zlj') {
      if (item.level.iszlj) {
        this.lqVipParam.ljType = 'z_lj';
        this.lqVipMoney();
      }
    }
  }

  lqVipMoney() {
    const loading = super.showLoading('领取中...');
    this.api.lqVipMoney(this.lqVipParam).then(response => {
      const errorMessage = response.hashError;
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
      if (errorMessage) {
        this.showToast(response.msg);
      } else {
        this.showToast('领取成功!');
      }
    }).catch(error => {
      loading.then((loadinginstan) => {
        loadinginstan.dismiss();
      });
     });
  }

}
