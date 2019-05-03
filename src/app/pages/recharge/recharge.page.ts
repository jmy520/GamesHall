import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  tabIndex: number = 0;
  isInRecharge: boolean = false;
  
  constructor(public mRouter: Router) { }

  ngOnInit() {
  }

}
