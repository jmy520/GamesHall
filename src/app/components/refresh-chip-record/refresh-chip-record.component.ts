import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-refresh-chip-record',
  templateUrl: './refresh-chip-record.component.html',
  styleUrls: ['./refresh-chip-record.component.scss'],
})
export class RefreshChipRecordComponent implements OnInit {

  constructor(public mModal: ModalController) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
