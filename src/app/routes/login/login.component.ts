import { Component, OnInit, ElementRef } from '@angular/core';

import { Router } from '@angular/router'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-login',
  template: require('./login.component.html'),
  styles: [
    require('./login.component.scss'),
  ]
})
export class LoginComponent implements OnInit {
  constructor(
      private _elt: ElementRef,
      private _router: Router) {
  }

  ngOnInit() {
    // on init
  }
}
