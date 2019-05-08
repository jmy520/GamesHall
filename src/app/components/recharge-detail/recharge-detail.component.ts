import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Runtime } from 'src/app/services/Runtime';

@Component({
  selector: 'app-recharge-detail',
  templateUrl: './recharge-detail.component.html',
  styleUrls: ['./recharge-detail.component.scss'],
})
export class RechargeDetailComponent implements OnInit {

  @Input()
  item = {
    orderNo: '',
    skBankName: '',
    skStatus: '',
    createrTime: ''
  };

  constructor(public mRouter: Router,
    public mModal: ModalController,
    public runtime: Runtime) { }

  ngOnInit() {}

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

  goKefu() {
    this.runtime.payButtonVido();
    this.mRouter.navigate(['/customer-service']);
  }
}
