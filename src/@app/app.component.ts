import { Component } from '@angular/core'

import '../style/app.scss';

@Component({
  selector: 'pw-app', // <pw-app></pw-app>
  template: require('./app.component.html'),
  styles: [ require('./app.component.scss') ],
})
export class AppComponent {
  constructor() {}
}
