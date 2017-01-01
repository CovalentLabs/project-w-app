import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'
import { LobbyComponent } from './lobby.component'

// message-window
import { LobbyMessagesComponent } from './lobby-messages/lobby-messages.component'
import { ItemGroupComponent } from './lobby-messages/item-group/item-group.component'
import { ItemComponent, ITEM_DECLARATIONS } from './lobby-messages/item-group/item/item.component'

import { LobbyItemInputComponent } from './lobby-item-input/lobby-item-input.component'

import { LobbyRendererService } from './lobby-renderer'

import { MaterialModule } from '@angular/material';

import { LobbyRoutingModule } from './lobby-routing.module'
@NgModule({
  imports:      [ SharedModule, LobbyRoutingModule, MaterialModule ],
  declarations: [
    LobbyComponent,

    LobbyItemInputComponent,

    LobbyMessagesComponent,
    ItemGroupComponent,

    ...ITEM_DECLARATIONS,
    ItemComponent,
  ],
  providers:    [ LobbyRendererService ]
})
export class LobbyModule { }
