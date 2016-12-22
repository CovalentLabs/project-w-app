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

// Mocks
import { MockModule } from '@mock/mock.module'

import { AppStateService, TimelineService } from '@app/core/app-state'
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,

    // CoreModule defines everything that needs to be imported once,
    // and app-wide singletons such as the DeviceStateService
    CoreModule.forRoot(),

    MockModule,

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
      private _appStateService: AppStateService,
      private _timelineService: TimelineService
  ) {}

  hmrOnInit(store) {
    // Clear console on initiallization
    if ('clear' in console) { console.clear() }

    console.log("HMR store", store)

    if (store && store.timeline) {
      this._appStateService.applyTimeline(store.timeline)

      // change detection
      this.appRef.tick()
      delete store.timeline

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
    store.timeline = this._timelineService.getTimeline()

    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}