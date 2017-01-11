import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import * as M from '@app/core/model'

@Component({
  selector: 'pw-<%= componentname %>',
  template: require('./<%= componentname %>.component.html'),
  styles: [
    require('./<%= componentname %>.component.css'),
  ]
})
export class <%= ComponentName %>Component implements OnInit {
  // <<%= componentname %> [pea]="">
  @Input() pea: M.Pea
  // <<%= componentname %> [pea-size]="">
  @Input('pea-size') peaSize: number
  // <<%= componentname %> (open)="">
  // @Output() open = new EventEmitter()

  constructor() {}

  ngOnInit() {
    // on init
  }
}
