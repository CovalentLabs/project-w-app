import { Component, Input } from '@angular/core'

@Component({
  selector: 'pw-panel-header',
  template: require('./panel-header.component.html'),
  styles: [
    require('./panel-header.component.scss'),
  ]
})
export class PanelHeaderComponent {
  @Input() title: string
  @Input() subtitle: string
}
