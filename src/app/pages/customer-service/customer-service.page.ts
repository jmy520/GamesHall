import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { BaseView } from 'src/common/base/BaseView';
import { Runtime } from 'src/app/services/Runtime';
import { ApiService } from 'src/app/services/api.service';
import { PictureHelper } from 'src/common/helper/PictureHelper';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage extends BaseView implements OnInit {
  tabIndex: number = 1;

  constructor(
    public mRouter: Router,
    public mLoading: LoadingController,
    public mToast: ToastController,
    public mModal: ModalController,
    public runtime: Runtime,
    public api: ApiService,
    public mPopover: PopoverController) {
    super(mLoading, mToast, mModal);
  }

  ngOnInit() {
  }

}
