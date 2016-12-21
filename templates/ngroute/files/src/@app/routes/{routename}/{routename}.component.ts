import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, AppState } from '@app/core'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-<%= routename %>',
  template: require('./<%= routename %>.component.html'),
  styles: [
    require('./<%= routename %>.component.scss'),
  ]
})
export class <%= RouteName %>Component implements OnInit, OnDestroy {
  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService,
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

  ngOnInit() {
    // trigger update so AppState becomes set.
    this._app.next()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._stateSub.unsubscribe()
  }
}
