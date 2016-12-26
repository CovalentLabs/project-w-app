import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router'

import { AppStateService, AppState, LobbyActions } from '@app/core'

import * as M from '@app/core/model'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-app-top-status-bar',
  template: require('./app-top-status-bar.component.html'),
  styles: [
    require('./app-top-status-bar.component.scss'),
  ]
})
export class AppTopStatusBarComponent implements OnInit, OnDestroy {
  // <app-top-status-bar (menuOpen)="">
  // emitted directly
  @Output() menuOpen = new EventEmitter()

  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService) {
  }

  onMenuClick() {
    this.menuOpen.emit()
  }

  ngOnInit() {
    this._stateSub = this._app.state.subscribe(
        appState => {
      this.AppState = appState
    })
    // trigger update so AppState becomes set.
    this._app.next()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    if (this._stateSub) {
      this._stateSub.unsubscribe()
    }
  }
}
