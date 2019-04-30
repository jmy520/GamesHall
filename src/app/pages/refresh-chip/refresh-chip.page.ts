import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshChipRatioComponent } from 'src/app/components/refresh-chip-ratio/refresh-chip-ratio.component';
import { RefreshChipRecordComponent } from 'src/app/components/refresh-chip-record/refresh-chip-record.component';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';

@Component({
  selector: 'app-refresh-chip',
  templateUrl: './refresh-chip.page.html',
  styleUrls: ['./refresh-chip.page.scss'],
})
export class RefreshChipPage extends BaseView implements OnInit {

  constructor(public mRouter: Router, public mLoading: LoadingController, public mToast: ToastController, public mModal: ModalController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {
  }

  goRefreshChipRatio() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RefreshChipRatioComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }

  goRefreshChipRecord() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RefreshChipRecordComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }
}
