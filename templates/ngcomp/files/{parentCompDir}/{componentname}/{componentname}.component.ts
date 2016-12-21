import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router'

@Component({
  selector: 'pw-<%= componentname %>',
  template: require('./<%= componentname %>.component.html'),
  styles: [
    require('./<%= componentname %>.component.scss'),
  ]
})
export class <%= ComponentName %>Component implements OnInit {
  @Input() data: string
  @Output() open = new EventEmitter()

  constructor() {}

  ngOnInit() {
    // on init
  }

  onClick() {
    this.open.emit()
  }
}
