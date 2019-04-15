import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-safe-box',
  templateUrl: './safe-box.page.html',
  styleUrls: ['./safe-box.page.scss'],
})
export class SafeBoxPage implements OnInit {
  tabIndex: number = 0;

  constructor(public mRouter: Router) { }

  ngOnInit() {
  }

}
