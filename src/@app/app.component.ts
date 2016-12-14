import { Component } from '@angular/core';

// import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'pw-app', // <pw-app></pw-app>
  template: require('./app.component.html'),
  styles: [ require('./app.component.scss') ],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';

  constructor() {
    // Do something with api
  }
}
