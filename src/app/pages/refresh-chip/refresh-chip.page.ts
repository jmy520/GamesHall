import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refresh-chip',
  templateUrl: './refresh-chip.page.html',
  styleUrls: ['./refresh-chip.page.scss'],
})
export class RefreshChipPage implements OnInit {

  constructor(public mRouter: Router) { }

  ngOnInit() {
  }

}
