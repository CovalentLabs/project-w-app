import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, AppState, DiscoverActions } from '@app/core'

import { Subscription } from 'rxjs'

import { TimeRange } from './input-availability/input-availability.component'

@Component({
  template: require('./discovering.component.html'),
  styles: [
    require('./discovering.component.scss'),
  ]
})
export class DiscoverComponent implements OnInit, OnDestroy {
  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService,
      private _discover: DiscoverActions,
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
    // this._discover.setAvailability([range])
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
