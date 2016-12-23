import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router } from '@angular/router'

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
      private _search: SearchActions,
      private _router: Router) {
    this._stateSub = this._app.state.subscribe(
        appState => {
      if (!appState.Login.IsLoggedIn) {
        // If not logged in, redirect to login page
        this._router.navigate(['/login'])
      }

      this.AppState = appState
    })
  }

  clickStartSearch() {
    this._search.startSearch()
    this._router.navigate(['/searching'])
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
