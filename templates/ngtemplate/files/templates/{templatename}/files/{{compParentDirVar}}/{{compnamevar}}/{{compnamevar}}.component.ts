import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

@Component({
  selector: 'pw-<%%=<%= compnamevar%>%%>',
  template: require('./<%%=<%= compnamevar%>%%>.component.html'),
  styles: [
    require('./<%%=<%= compnamevar%>%%>.component.css'),
  ]
})
export class <%%=<%= CompNameVar%>%%>Component implements OnInit {
  constructor() {}

  ngOnInit() {
    // on init
  }
}
