import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recharge-detail',
  templateUrl: './recharge-detail.component.html',
  styleUrls: ['./recharge-detail.component.scss'],
})
export class RechargeDetailComponent implements OnInit {

  constructor(public mModal: ModalController) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
