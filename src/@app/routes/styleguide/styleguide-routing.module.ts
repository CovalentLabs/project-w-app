import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StyleguideComponent } from './styleguide.component';

const routes: Routes = [
  { path: 'styleguide', component: StyleguideComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StyleguideRoutingModule {}
