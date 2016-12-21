import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'
import { SearchingComponent } from './searching.component'

// Availability
import { InputAvailabilityComponent } from './input-availability/input-availability.component'
import { InputTimeComponent } from './input-availability/input-time/input-time.component'

import { SearchingRoutingModule } from './searching-routing.module'
@NgModule({
  imports:      [ SharedModule, SearchingRoutingModule ],
  declarations: [
    SearchingComponent,
    InputAvailabilityComponent, InputTimeComponent
  ],
  providers:    []
})
export class SearchingModule { }
