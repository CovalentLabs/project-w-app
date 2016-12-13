import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

/* Shared Modules */
import { SharedModule } from '../shared/shared.module';

/* Feature Modules */
import { LoginModule } from './login/login.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    SharedModule,

    /* Feature Routes */
    LoginModule,
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  exports: [RouterModule, LoginModule]
})
export class AppRoutingModule {}
