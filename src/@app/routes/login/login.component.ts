import { Component, OnInit, OnDestroy } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, AppState, LoginActions } from '@app/core'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-login',
  template: require('./login.component.html'),
  styles: [
    require('./login.component.scss'),
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService,
      private _router: Router,
      private _login: LoginActions) {
    this._stateSub = this._app.state.subscribe(
        appState => {
      if (appState.Login.IsLoggedIn) {
        // If not logged in, redirect to login page
        this._router.navigate(['/home'])
      }

      this.AppState = appState
    })
  }

  onClickLogin() {
    this._login.promptLogin()
  }

  ngOnInit() {
    // on init
    console.log('Hello Login')
    // trigger update so AppState becomes set.
    this._app.next()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._stateSub.unsubscribe()
  }
}
