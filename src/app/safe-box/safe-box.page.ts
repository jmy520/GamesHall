import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-safe-box',
  templateUrl: './safe-box.page.html',
  styleUrls: ['./safe-box.page.scss'],
})
export class SafeBoxPage implements OnInit {
  tabIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
