import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, AppState } from '@app/core'

import { Subscription } from 'rxjs'

@Component({
  template: require('./lobby.component.html'),
  styles: [
    require('@app/style/component/full.scss'),
    require('./lobby.component.scss'),
  ]
})
export class LobbyComponent implements OnInit, OnDestroy {
  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService,
      private _router: Router) {
    this._stateSub = this._app.state.subscribe(
        appState => this.AppState = appState
    )
  }

  ngOnInit() {
    // trigger update so AppState becomes set.
    this._app.next()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._stateSub.unsubscribe()
  }
}
