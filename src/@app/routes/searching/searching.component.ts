import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, AppState, SearchActions } from '@app/core'

import { Subscription } from 'rxjs'

import { TimeRange } from './input-availability/input-availability.component'

@Component({
  selector: 'pw-searching',
  template: require('./searching.component.html'),
  styles: [
    require('./searching.component.scss'),
  ]
})
export class SearchingComponent implements OnInit, OnDestroy {
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

  confirmAvailability(range: TimeRange) {
    // TODO
    // this._search.setAvailability([range])
    console.log("Setting availability", [range])
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
