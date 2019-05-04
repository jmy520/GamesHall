import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RechargeRecordComponent } from 'src/app/components/recharge-record/recharge-record.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  tabIndex: number = 0;
  isInRecharge: boolean = false;
  
  constructor(public mRouter: Router, public mModal: ModalController) { }

  ngOnInit() {
  }

  goRechargeRecord() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RechargeRecordComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }
}
