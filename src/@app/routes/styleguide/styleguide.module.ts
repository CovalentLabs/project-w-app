import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'
import { StyleguideComponent } from './styleguide.component'

import { StyleguideRoutingModule } from './styleguide-routing.module'
@NgModule({
  imports:      [ SharedModule, StyleguideRoutingModule ],
  declarations: [ StyleguideComponent ],
  providers:    []
})
export class StyleguideModule { }
