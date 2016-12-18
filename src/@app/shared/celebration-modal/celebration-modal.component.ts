import { Component, OnInit } from '@angular/core';

import { LoginActions } from '@app/core'

@Component({
  selector: 'pw-celebration-modal',
  template: require('./celebration-modal.component.html'),
  styles: [
    require('./celebration-modal.component.scss'),
  ]
})
export class CelebrationModalComponent implements OnInit {
  constructor(private _login: LoginActions) {}

  ngOnInit() {
    // on init
  }

  onClick() {
    this._login.promptLogin()
  }
}
