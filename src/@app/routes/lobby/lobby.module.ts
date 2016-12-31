import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'
import { LobbyComponent } from './lobby.component'

import { LobbyRendererService } from './lobby-renderer'


import { LobbyRoutingModule } from './lobby-routing.module'
@NgModule({
  imports:      [ SharedModule, LobbyRoutingModule ],
  declarations: [ LobbyComponent ],
  providers:    [ LobbyRendererService ]
})
export class LobbyModule { }
