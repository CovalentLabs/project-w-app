import { Injectable } from '@angular/core'

import { Observer, Observable } from 'rxjs'

import { RenderedItemGroup, RenderedItem } from './lobby-renderer.interface'

import * as I from './items-dictionary.class'

import * as M from '@app/core/model'
import * as MLI from '@app/core/model/lobby-item.model'

@Injectable()
export class LobbyRendererService {
  private _renderObserver: Observer<RenderedItemGroup>
  private _posts: I.ItemsDictionary
  private _reactions: I.ReactionsDictionary

  public render: Observable<RenderedItemGroup>

  constructor() {
    this._posts = new I.ItemsDictionary()
    this._reactions = new I.ReactionsDictionary(this._posts)

    this.render = Observable.create(observer => {
      this._renderObserver = observer
      // Any cleanup logic might go here
      return () => console.log('disposed lobby render subscription')
    })
    this.render.subscribe(noop => noop)
    this.reset()
  }

  updateLobby(lobby: M.Lobby) {
    lobby.LobbyItems.forEach(this._process.bind(this))
    this.next()
  }

  private _process(item: MLI.LobbyItem) {
    this._posts.add(item)

    switch (item.Type) {
      case MLI.LobbyItemType.LOCK_UPDATE:
        this._processLockUpdate(item); break
      case MLI.LobbyItemType.TEXT:
        this._processText(item); break
      case MLI.LobbyItemType.REACTION:
        this._processReaction(item); break
      case MLI.LobbyItemType.USER_STATUS_UPDATE:
        this._processUserStatusUpdate(item); break
      case MLI.LobbyItemType.USER_DATA_UPDATE:
        this._processUserDataUpdate(item); break
      case MLI.LobbyItemType.USER_HAS_ARRIVED_UPDATE:
        this._processUserHasArrivedUpdate(item); break
      default:
        console.error(`Unknown LobbyItemType: ${item.Type}`)
        console.error(item)
        break
    }
  }

  private _processLockUpdate(item: MLI.LobbyItem) {
    // LockUpdate
    const data = <MLI.DataText> item.Data
  }
  private _processText(item: MLI.LobbyItem) {
    // Text
    const data = <MLI.DataText> item.Data
  }
  private _processReaction(item: MLI.LobbyItem) {
    // Reaction
    const data = <MLI.DataReaction> item.Data
  }
  private _processUserStatusUpdate(item: MLI.LobbyItem) {
    // UserStatusUpdate
    const data = <MLI.DataUserStatusUpdate> item.Data
  }
  private _processUserDataUpdate(item: MLI.LobbyItem) {
    // UserDataUpdate
    const data = <MLI.DataUserDataUpdate> item.Data
  }
  private _processUserHasArrivedUpdate(item: MLI.LobbyItem) {
    // UserHasArrivedUpdate
    const data = <MLI.DataUserHasArrivedUpdate> item.Data
  }


  // Force emit render update
  next() {

  }

  reset() {

  }
}
