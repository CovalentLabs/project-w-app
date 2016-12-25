import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router'

import { AppStateService, AppState, LobbyActions } from '@app/core'

import * as M from '@app/core/model'

import { Subscription } from 'rxjs'

@Component({
  selector: 'pw-<%= componentname %>',
  template: require('./<%= componentname %>.component.html'),
  styles: [
    // This sheet makes the component host absolute full width and height.
    require('@app/style/component/full.scss'),
    require('./<%= componentname %>.component.scss'),
  ]
})
export class <%= ComponentName %>Component implements OnInit, OnDestroy {
  // <<%= componentname %> [pea]="">
  @Input() pea: M.Pea
  // <<%= componentname %> [pea-size]="">
  @Input('pea-size') peaSize: number
  // <<%= componentname %> (open)="">
  // @Output() open = new EventEmitter()

  // Overall AppState
  AppState: AppState

  private _stateSub: Subscription

  constructor(
      private _app: AppStateService,
      private _login: LobbyActions) {
    this._stateSub = this._app.state.subscribe(
        appState => {
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
