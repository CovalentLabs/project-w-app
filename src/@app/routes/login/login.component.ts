import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, LoginActions } from '@app/core'

import { Subscription } from 'rxjs'

import * as M from '@app/core/model'

@Component({
  selector: 'pw-login',
  template: require('./login.component.html'),
  styles: [
    require('./login.component.scss'),
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private _stateSub: Subscription

  private isLoggingIn: boolean = false
  private AppState: M.AppState

  constructor(
      private _elt: ElementRef,
      private _router: Router,
      private _login: LoginActions,
      private _app: AppStateService) {
    this._stateSub =
    this._app.state.subscribe(appState => {
      if (appState.Login.Credentials) {
        this._router.navigate(['/'])
        return
      }

      this.AppState = appState
    })
  }

  onClickLogin() {
    this.isLoggingIn = true

    // never pass in an update function
    // the update function is handled by
    // the action decorator
    this._login.promptLogin()
  }

  ngOnInit() {
    this.AppState = this._app.getState()
    this._app.next()
  }

  ngOnDestroy() {
    // Remove subscription to free up resources
    this._stateSub.unsubscribe()
  }
}
