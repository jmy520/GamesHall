import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-receive-commision',
  templateUrl: './receive-commision.component.html',
  styleUrls: ['./receive-commision.component.scss'],
})
export class ReceiveCommisionComponent implements OnInit {

  constructor(public mModalController: ModalController) { }

  ngOnInit() { }

  dismissDialog() {
    this.mModalController.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }
}
