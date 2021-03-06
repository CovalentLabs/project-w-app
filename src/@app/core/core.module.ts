import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ACTIONS } from './action'
import { AppStateService, TimelineService } from './app-state'
import { DataService, LobbyItemReceiverService } from './data'

// import { DeviceStateService }from './device-state.service';

// import actions

// import action mocks
// import { LoginWriterMock } from '../mocks/core/writers/login.writer.mock'

@NgModule({
  imports:      [ CommonModule, HttpModule, FormsModule ],
  declarations: [],
  // exports:      [ TitleComponent ],
  providers:    [
    AppStateService,
    TimelineService,
    DataService,
    LobbyItemReceiverService,

    ...ACTIONS,

    // feature flags?
    // {provide: LoginWriter, useClass: LoginWriterMock},
  ]
})
export class CoreModule {
  // From https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#what-is-the-_forroot_-method-
  // The forRoot static method is a convention that makes it easy for developers to
  // configure the module's provider(s).
  static forRoot(/*config: UserServiceConfig*/): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // {provide: UserServiceConfig, useValue: config }
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
