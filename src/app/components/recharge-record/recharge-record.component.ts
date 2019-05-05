import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RechargeDetailComponent } from '../recharge-detail/recharge-detail.component';

@Component({
  selector: 'app-recharge-record',
  templateUrl: './recharge-record.component.html',
  styleUrls: ['./recharge-record.component.scss'],
})
export class RechargeRecordComponent implements OnInit {

  constructor(public mModal: ModalController) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

  goDetail() {
    this.mModal.create({
      cssClass: "common_modal_dialog",
      component: RechargeDetailComponent
    }).then(instance => {
      instance.present();
    }).catch(error => {
      console.error(error);
    });
  }
}
