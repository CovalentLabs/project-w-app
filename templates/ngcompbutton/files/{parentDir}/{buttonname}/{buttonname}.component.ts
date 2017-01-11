import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

@Component({
  selector: 'pw-<%=buttonname%>',
  template: require('./<%=buttonname%>.component.html'),
  styles: [
    require('./<%=buttonname%>.component.css'),
  ]
})
export class <%=ButtonName%>Component implements OnInit {
  constructor() {}

  ngOnInit() {
    // on init
  }

  onClick() {
    // do something on click!
  }
}
