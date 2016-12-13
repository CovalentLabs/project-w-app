import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

@Component({
  selector: 'pw-<%= componentname %>',
  template: require('./<%= componentname %>.component.html'),
  styles: [
    require('./<%= componentname %>.component.scss'),
  ]
})
export class <%= ComponentName %>Component implements OnInit {
  constructor() {}

  ngOnInit() {
    // on init
  }
}
