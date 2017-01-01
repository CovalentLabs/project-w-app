import { Injectable } from '@angular/core'

import { Observer, Observable } from 'rxjs'

import { RenderedItemGroup } from './lobby-renderer.interface'
import { LobbyItemGroupsRendererService } from './lobby-item-groups-renderer.service'

import * as I from './lobby-renderer-data-structures'

import * as M from '@app/core/model'

@Injectable()
export class LobbyRendererService {
  private _renderObserver: Observer<RenderedItemGroup[]>
  public render: Observable<RenderedItemGroup[]>

  constructor(private _renderer: LobbyItemGroupsRendererService) {
    this.render = Observable.create(observer => {
      this._renderObserver = observer
      // Any cleanup logic might go here
      return () => console.log('disposed lobby render subscription')
    })
    this.render.subscribe(noop => noop)
    this.reset()
  }

  updateLobby(lobby: M.Lobby) {
    this._renderer.update(lobby.LobbyItems)
    // TODO debounce and cache render (write in item groups renderer maybe?)
    this.next()
  }

  // Force emit render update
  next() {
    this._renderObserver.next(this._renderer.render())
  }

  reset() {

  }
}
