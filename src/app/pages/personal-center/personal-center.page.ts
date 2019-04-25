import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';

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

  tabIndex: number = 0;

  style01LevelArray: Array<string> = new Array();
  style02LevelArray: Array<string> = new Array();
  style03LevelArray: Array<string> = new Array();
  style04LevelArray: Array<string> = new Array();

  levelPresentArray: Array<any> = new Array();

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
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
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
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
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

  constructor(public mModalCtrl: ModalController, public mLoadingCtrl: LoadingController, public mToastCtrl: ToastController) {
    super(mLoadingCtrl, mToastCtrl, mModalCtrl);
  }

  ngOnInit() {
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip01_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip02_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip03_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip04_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip05_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip06_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip07_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip08_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip09_style01.png");
    this.style01LevelArray.push("assets/image/personal_center/img_personal_center_vip10_style01.png");

    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip01_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip02_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip03_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip04_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip05_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip06_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip07_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip08_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip09_style02.png");
    this.style02LevelArray.push("assets/image/personal_center/img_personal_center_vip10_style02.png");

    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip01_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip02_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip03_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip04_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip05_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip06_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip07_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip08_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip09_style03.png");
    this.style03LevelArray.push("assets/image/personal_center/img_personal_center_vip10_style03.png");

    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip01_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip02_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip03_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip04_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip05_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip06_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip07_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip08_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip09_style04.png");
    this.style04LevelArray.push("assets/image/personal_center/img_personal_center_vip10_style04.png");

    this.levelPresentArray.push([{value: 0, state: false}, {value: 0, state: false}, {value: 0, state: false}, {value: 0.59, state: true}]);
    this.levelPresentArray.push([{value: 28, state: false}, {value: 0, state: false}, {value: 0, state: false}, {value: 0.59, state: true}]);
    this.levelPresentArray.push([{value: 58, state: false}, {value: 38, state: false}, {value: 5, state: false}, {value: 0.64, state: false}]);
    this.levelPresentArray.push([{value: 188, state: false}, {value: 58, state: false}, {value: 10, state: false}, {value: 0.64, state: false}]);
    this.levelPresentArray.push([{value: 388, state: false}, {value: 188, state: false}, {value: 38, state: false}, {value: 0.7, state: false}]);
    this.levelPresentArray.push([{value: 888, state: false}, {value: 528, state: false}, {value: 88, state: false}, {value: 0.75, state: false}]);
    this.levelPresentArray.push([{value: 1888, state: false}, {value: 888, state: false}, {value: 188, state: false}, {value: 0.8, state: false}]);
    this.levelPresentArray.push([{value: 3888, state: false}, {value: 2888, state: false}, {value: 588, state: false}, {value: 0.85, state: false}]);
    this.levelPresentArray.push([{value: 8888, state: false}, {value: 5888, state: false}, {value: 1288, state: false}, {value: 0.9, state: false}]);
    this.levelPresentArray.push([{value: 18888, state: false}, {value: 8888, state: false}, {value: 2019, state: false}, {value: 0.95, state: false}]);
  }

  getLevelIcon(levelStyle: number, level?: number) {
    let result = null;
    if (levelStyle == 1) {
      result = this.style01LevelArray[level ? level : this.currentLevel];
    } else if (levelStyle == 2) {
      result = this.style02LevelArray[level ? level : this.currentLevel];
    } else if (levelStyle == 3) {
      result = this.style03LevelArray[level ? level : this.currentLevel];
    } else if (levelStyle == 4) {
      result = this.style04LevelArray[level ? level : this.currentLevel];
    }
    return result;
  }

  switchBaseInfoEditMode() {
    if (this.isEditBaseInfo) {
      this.isEditBaseInfo = false;
      //TODO 提交修改
      
    } else {
      this.isEditBaseInfo = true;
    }
  }

  switchContactEditMode() {
    if (this.isEditContact) {
      this.isEditContact = false;
      //TODO 提交修改

    } else {
      this.isEditContact = true;
    }
  }
}
