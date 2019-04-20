import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { WithdrawalRecordComponent } from 'src/app/components/withdrawal-record/withdrawal-record.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {
  tabIndex: number = 0;
  innerTabIndex: number = 0;
  isAddingBankCard: boolean = false;
  
  constructor(public mRouter: Router, public mModalController: ModalController) { }

  ngOnInit() {
  }

  viewWithdrawalRecord() {
    this.mModalController.create({
      component: WithdrawalRecordComponent,
      cssClass: 'common_modal_dialog'
    }).then(modalInstance => {
      modalInstance.present();
      modalInstance.onDidDismiss().then(result => {
        //TODO something back
      }).catch(error => { });
    });
  }
}
