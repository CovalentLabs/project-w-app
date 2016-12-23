import { Component, OnInit, OnDestroy } from '@angular/core'

import { AppStateService, AppState, SearchActions } from '@app/core'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-home',
  template: require('./home.component.html'),
  styles: [
    require('./home.component.scss'),
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService,
      private _search: SearchActions) {
    this._stateSub = this._app.state.subscribe(
        appState => {
      this.AppState = appState
    })
  }

  clickStartSearch() {
    this._search.startSearch()
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
