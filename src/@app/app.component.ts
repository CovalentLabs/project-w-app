import { Component } from '@angular/core'

import '../style/app.scss';

import { MockState } from '@mock/states'

import { AppStateService } from '@app/core'

@Component({
  selector: 'pw-app', // <pw-app></pw-app>
  template: require('./app.component.html'),
  styles: [ require('./app.component.scss') ],
})
export class AppComponent {
  constructor(private _app: AppStateService) {}

  setState(ms: MockState) {
    const update = this._app.action("Mock Update State")

    update("Mock:" + ms.name, ms.state)
  }
}
