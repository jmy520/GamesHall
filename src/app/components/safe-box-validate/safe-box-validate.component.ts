import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-safe-box-validate',
  templateUrl: './safe-box-validate.component.html',
  styleUrls: ['./safe-box-validate.component.scss'],
})
export class SafeBoxValidateComponent implements OnInit {

  constructor(public mModalController: ModalController) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModalController.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
