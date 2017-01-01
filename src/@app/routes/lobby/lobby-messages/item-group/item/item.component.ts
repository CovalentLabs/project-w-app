import { Component, Input } from '@angular/core';

import { RenderedItem } from '../../../lobby-renderer'

import * as MLI from '@app/core/model/lobby-item.model'

import { ItemLockUpdateComponent } from './item-lock-update/item-lock-update.component'
import { ItemTextComponent } from './item-text/item-text.component'
import { ItemUserStatusUpdateComponent } from './item-user-status-update/item-user-status-update.component'
import { ItemReactionsComponent } from './item-reactions/item-reactions.component'
export const ITEM_COMPONENTS = [
  ItemTextComponent,
  ItemLockUpdateComponent,
  ItemUserStatusUpdateComponent,
  ItemReactionsComponent,
]

@Component({
  selector: 'pw-item',
  template: require('./item.component.html'),
  styles: [
    require('./item.component.scss'),
  ]
})
export class ItemComponent {
  LOCK_UPDATE = MLI.LobbyItemType.LOCK_UPDATE
  // REACTION = MLI.LobbyItemType.REACTION
  TEXT = MLI.LobbyItemType.TEXT
  USER_DATA_UPDATE = MLI.LobbyItemType.USER_DATA_UPDATE
  USER_HAS_ARRIVED_UPDATE = MLI.LobbyItemType.USER_HAS_ARRIVED_UPDATE
  USER_STATUS_UPDATE = MLI.LobbyItemType.USER_STATUS_UPDATE

  // <item [item]="">
  @Input() item: RenderedItem

  constructor() {}
}
