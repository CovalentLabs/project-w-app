import { Component } from '@angular/core'

@Component({
  selector: 'pw-app', // <pw-app></pw-app>
  template: require('./app.component.html'),
  styles: [
    require('@app/style/component/full.scss'),
    require('./app.component.scss'),
  ],
})
export class AppComponent {
}
