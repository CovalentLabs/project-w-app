import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

import { Profile } from '@app/core/model/shared'

@Component({
  selector: 'pw-celebration-modal',
  template: require('./celebration-modal.component.html'),
  styles: [
    require('./celebration-modal.component.scss'),
  ]
})
export class CelebrationModalComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // on init
  }
}
