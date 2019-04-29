import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Runtime } from 'src/app/services/Runtime';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  tabIndex: number = 0;
  bgv = 1;
  btv = 1;

  constructor(public mModal: ModalController, public runTime: Runtime) {
    this.runTime.getKey('bgAudio').then((vl) => {
      if (vl !== null) {
        this.bgv = parseFloat(vl);
      }
    });
    this.runTime.getKey('butAudio').then((vl) => {
      if (vl !== null) {
        this.btv = parseFloat(vl);
      }
    });
  }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
  volw(v) {
    if (v === 0) {
      this.runTime.setVolume(0, this.btv);
    } else {
      this.runTime.setVolume(1, this.bgv);
    }
  }
}
