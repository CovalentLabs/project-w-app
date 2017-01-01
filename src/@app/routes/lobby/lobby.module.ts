import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'
import { LobbyComponent } from './lobby.component'

// message-window
import { LobbyMessagesComponent } from './lobby-messages/lobby-messages.component'
import { ItemGroupComponent } from './lobby-messages/item-group/item-group.component'
import { ItemComponent, ITEM_COMPONENTS } from './lobby-messages/item-group/item/item.component'

import { LobbyRendererService, LobbyItemGroupsRendererService } from './lobby-renderer'

import { MaterialModule } from '@angular/material';

import { LobbyRoutingModule } from './lobby-routing.module'
@NgModule({
  imports:      [ SharedModule, LobbyRoutingModule, MaterialModule ],
  declarations: [
    LobbyComponent,

    LobbyMessagesComponent,
    ItemGroupComponent,

    ...ITEM_COMPONENTS,
    ItemComponent,
  ],
  providers:    [ LobbyRendererService, LobbyItemGroupsRendererService ]
})
export class LobbyModule { }
