import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.page.html',
  styleUrls: ['./promote.page.scss'],
})
export class PromotePage implements OnInit {

  constructor(public mRouter: Router) { }

  ngOnInit() {
  }

}
