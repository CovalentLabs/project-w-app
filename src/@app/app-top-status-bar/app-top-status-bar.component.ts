import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { AppStateService, AppState, SearchActions } from '@app/core'

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
      private _app: AppStateService,
      private _search: SearchActions
  ) {}

  onMenuClick() {
    this.menuOpen.emit()
  }

  onStopSearchClick() {
    this._search.stopSearch()
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
