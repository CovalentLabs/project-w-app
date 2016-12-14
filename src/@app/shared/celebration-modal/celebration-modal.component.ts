import { Component, OnInit } from '@angular/core';

import { LoginAction } from '@app/core'

@Component({
  selector: 'pw-celebration-modal',
  template: require('./celebration-modal.component.html'),
  styles: [
    require('./celebration-modal.component.scss'),
  ]
})
export class CelebrationModalComponent implements OnInit {
  constructor(private _login: LoginAction) {}

  ngOnInit() {
    // on init
  }

  onClick() {
    this._login.promptLogin()
  }
}
