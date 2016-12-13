import { Component, OnInit, ElementRef } from '@angular/core';

import { Router } from '@angular/router'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-<%= routename %>',
  template: require('./<%= routename %>.component.html'),
  styles: [
    require('./<%= routename %>.component.scss'),
  ]
})
export class <%= RouteName %>Component implements OnInit {
  constructor(
      private _elt: ElementRef,
      private _router: Router) {
  }

  ngOnInit() {
    // on init
  }
}
