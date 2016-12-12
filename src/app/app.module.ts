import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule }      from '@angular/common';

/* App Root */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

/* Shared Modules */
import { SharedModule } from './shared/shared.module';

/* Feature Modules */
/*
import { LobbyModule } from './lobby/lobby.module';

import { StatusModule } from './status/status.module'
import { ConfigureSearchModule } from './configure-search/configure-search.module'
import { ConfigureRankModule } from './configure-rank/configure-rank.module'
import { LoginModule } from './login/login.module'
import { HistoryModule } from './history/history.module'
// import { RouteUndefinedModule } from './route-undefined/route-undefined.module'
import { BetaSignupModule } from './beta-signup/beta-signup.module'


import { CoreModule } from './core/core.module';
*/
/* Routing Module */
import { AppRoutingModule } from './app-routing.module';


// import { DeviceStateService } from './core/device-state.service'
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
/*
    // Feature Routes
    StatusModule,
    ConfigureSearchModule,
    ConfigureRankModule,
    LoginModule,
    HistoryModule,
    BetaSignupModule,
    LobbyModule,

    // CoreModule defines everything that needs to be imported once,
    // and app-wide singletons such as the DeviceStateService
    CoreModule.forRoot(),
*/
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      public appRef: ApplicationRef,
      // private _deviceStateService: DeviceStateService
  ) {}

  hmrOnInit(store) {
    if ('clear' in console) { console.clear() }

    console.log("HMR store", store)

    if (store && store.deviceState) {
      // this._deviceStateService.setState(store.deviceState)

      // change detection
      this.appRef.tick()
      delete store.deviceState

      if (store.hash) {
        // set app path back
        setTimeout(() => {
          window.location.hash = store.hash
          delete store.hash
        })
      }
    }
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);

    // hash
    store.hash = window.location.hash

    // Save state to hmr
    // store.deviceState = Object.assign({}, this._deviceStateService.getState())

    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
