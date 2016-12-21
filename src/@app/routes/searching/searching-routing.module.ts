import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchingComponent } from './searching.component';

const routes: Routes = [
  { path: 'searching', component: SearchingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SearchingRoutingModule {}
