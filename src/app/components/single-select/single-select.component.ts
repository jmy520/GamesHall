import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit {
  @Input()
  itemsData: Array<string>;

  constructor(public mModal: ModalController) { }

  ngOnInit() {}

  ionViewDidLoad() {
    
  }

  onSelectItem(item: any) {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss(item);
    }).catch(error => { });
  }

  dismissDialog() {
    this.mModal.getTop().then(modalInstance => {
      modalInstance.dismiss();
    }).catch(error => { });
  }

}
