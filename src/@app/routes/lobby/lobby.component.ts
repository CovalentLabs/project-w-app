import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'

import { Router } from '@angular/router'

import { AppStateService, AppState } from '@app/core'

import { LobbyRendererService, RenderedItemGroup } from './lobby-renderer'

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
  ItemGroups: RenderedItemGroup

  private _stateSub: Subscription
  private _renderSub: Subscription

  constructor(
      private _app: AppStateService,
      private _render: LobbyRendererService,
      private _ref: ElementRef,
      private _router: Router) {
    this._stateSub = this._app.state.subscribe(
        appState => {
      this.AppState = appState
      this._render.updateLobby(appState.Lobby)
    })
    this._renderSub = this._render.render.subscribe(
        render => this.ItemGroups = render)
  }

  ngOnInit() {
    // trigger update so AppState becomes set.
    this._app.next()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._stateSub.unsubscribe()
    this._renderSub.unsubscribe()
  }
}