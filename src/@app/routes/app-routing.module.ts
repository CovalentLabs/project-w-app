import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/* Shared Modules */
import { SharedModule } from '@app/shared/shared.module'

/* Feature Modules */
import { LoginModule } from './login/login.module'
import { HomeModule } from './home/home.module'
import { SearchingModule } from './searching/searching.module'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    SharedModule,

    /* Feature Routes */
    LoginModule,
    HomeModule,
    SearchingModule,
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
