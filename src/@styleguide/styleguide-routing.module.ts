import { NgModule, Component } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/* Shared Modules */
import { SharedModule } from '@app/shared/shared.module'

import { routes as sroutes, DECLARATIONS } from './styleguide/styleguide-routes';

@Component({
  selector: 'pw-parent', // <pw-app></pw-app>
  template: `<router-outlet></router-outlet>`,
  styles: [require('@app/style/component/full.scss')],
})
class ParentComponent {}

const routes: Routes = [
  { path: 'styleguide',
    component: ParentComponent,
    children: sroutes
  },
  { path: '', pathMatch: 'full', redirectTo: 'styleguide' },
  { path: '**', pathMatch: 'full', redirectTo: 'styleguide' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    SharedModule,
  ],
  declarations: [ ParentComponent, ...DECLARATIONS ],
  exports: [RouterModule]
})
export class StyleguideRoutingModule {}
