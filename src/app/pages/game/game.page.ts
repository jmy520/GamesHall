import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { BaseView } from 'src/common/base/BaseView';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage extends BaseView implements OnInit {

  targetUrl: SafeResourceUrl = '';

  loginedUser: any = {};

  isLogined = false;

  gameGid = -1;


  constructor(public activeRoute: ActivatedRoute,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public mStorage: Storage,
    public api: ApiService,
    private sanitizer: DomSanitizer,
    public mPopover: PopoverController) {
    super(mLoading, mToast, mModal);
    this.activeRoute.queryParams.subscribe((params: Params) => {
        this.gameGid = params['gameGid'];
    });
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.mStorage.get('user').then(data => {
      if (data) {
        this.loginedUser = JSON.parse(data);
        this.isLogined = true;
      }
      this.jumpToGamePage(this.gameGid);
    }).catch(error => {
    });
  }


  jumpToGamePage(gameGid: any) {
    if (!this.isLogined) {
      this.showToast('请先登录');
      this.presentLogin();
      return;
    }
    this.showLoading("正在登录请稍后...");
    this.api.fetchGameLink({ gameGid: gameGid },
      {
        port: 'mobile',
        authorization: this.loginedUser.sessionId
      }).then(response => {
        const errorMessage = response.msg;
        if (errorMessage) {
          this.showToast(errorMessage);
        } else {
          this.targetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.data.url);
        }
      }).catch(error => { }).finally(() => {
        this.mLoading.getTop().then(instance => {
          instance.dismiss();
        }).catch(error => { });
      });
  }

  presentLogin() {
    this.mModal.create({
      component: LoginComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
        this.mStorage.get("user").then(data => {
          if (data) {
            this.loginedUser = JSON.parse(data);
            this.isLogined = true;
          }
        }).catch(error => {
        });
      }).catch(error => { });
    });
  }

  presentRegister() {
    this.mModal.create({
      component: RegisterComponent,
      cssClass: 'common_modal_dialog'
    }).then(
      modalInstance => {
        modalInstance.present();
      }
    );
  }
}
