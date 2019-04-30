import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-refresh-chip-ratio',
  templateUrl: './refresh-chip-ratio.component.html',
  styleUrls: ['./refresh-chip-ratio.component.scss'],
})
export class RefreshChipRatioComponent implements OnInit {
  tabIndex: number = 0;
  
  constructor(public mModal: ModalController) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
