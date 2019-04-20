import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReceiveCommisionComponent } from 'src/app/components/receive-commision/receive-commision.component';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.page.html',
  styleUrls: ['./promote.page.scss'],
})
export class PromotePage implements OnInit {
  tabIndex: number = 0;

  dataTotal: number = 0;

  constructor(public mRouter: Router, public mModalController: ModalController) { }

  ngOnInit() {
  }

  switchTab(tabIndex: number) {
    this.tabIndex = tabIndex;
    switch (tabIndex) {
      case 0:
        this.doTab00Request();
        break;

      case 1:
        this.doTab01Request();
        break;

      case 2:
        this.doTab02Request();
        break;

      case 3:
        this.doTab03Request();
        break;

      case 4:
        this.doTab04Request();
        break;
    }
  }

  doTab00Request() {

  }

  doTab01Request() {

  }

  doTab02Request() {

  }

  doTab03Request() {

  }

  doTab04Request() {

  }

  receiveCommision() {
    this.mModalController.create({
      component: ReceiveCommisionComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
        //TODO something back
      }).catch(error => { });
    });
  }
}
