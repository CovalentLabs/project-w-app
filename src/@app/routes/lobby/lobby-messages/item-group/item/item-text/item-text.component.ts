import { Component, Input } from '@angular/core';

import { DataText } from '@app/core/model/lobby-item.model'

@Component({
  selector: 'pw-item-text',
  template: require('./item-text.component.html'),
  styles: [
    require('./item-text.component.scss'),
  ]
})
export class ItemTextComponent {
  @Input() data: DataText
}
