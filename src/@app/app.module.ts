import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule }      from '@angular/common';

/* App Root */
import { AppComponent } from './app.component';

/* Shared Modules */
import { SharedModule } from '@app/shared';

import { CoreModule } from '@app/core';

/* Routing Module */
import { AppRoutingModule } from '@app/routes/app-routing.module';


import { AppStateService } from '@app/core/app-state'
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,

    // CoreModule defines everything that needs to be imported once,
    // and app-wide singletons such as the DeviceStateService
    CoreModule.forRoot(),

    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      public appRef: ApplicationRef,
      private _appStateService: AppStateService
  ) {}

  hmrOnInit(store) {
    if ('clear' in console) { console.clear() }

    console.log("HMR store", store)

    if (store && store.appState) {
      this._appStateService.updateState(store.appState)

      // change detection
      this.appRef.tick()
      delete store.appState

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
    store.appState = Object.assign({}, this._appStateService.getState())

    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
