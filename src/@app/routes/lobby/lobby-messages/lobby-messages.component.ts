import { Component, Input } from '@angular/core';

import { RenderedItemGroup } from '../lobby-renderer'

import * as M from '@app/core/model'

@Component({
  selector: 'pw-lobby-messages',
  template: require('./lobby-messages.component.html'),
  styles: [
    require('./lobby-messages.component.scss'),
  ]
})
export class LobbyMessagesComponent {
  // <pw-lobby-messages [itemGroups]="" [myProfile]>
  @Input() itemGroups: RenderedItemGroup[]
  @Input() myProfileId: string
}
