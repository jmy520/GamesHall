import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-withdrawal-record',
  templateUrl: './withdrawal-record.component.html',
  styleUrls: ['./withdrawal-record.component.scss'],
})
export class WithdrawalRecordComponent implements OnInit {

  constructor(public mModal: ModalController) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

}
