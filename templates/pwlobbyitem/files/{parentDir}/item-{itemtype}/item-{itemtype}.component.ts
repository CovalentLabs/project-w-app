import { Component, Input } from '@angular/core';

import { Data<%=ItemType%> } from '@app/core/model/lobby-item.model'

@Component({
  selector: 'pw-item-<%=itemtype%>',
  template: require('./item-<%=itemtype%>.component.html'),
  styles: [
    require('./item-<%=itemtype%>.component.scss'),
  ]
})
export class Item<%=ItemType%>Component {
  @Input() data: Data<%=ItemType%>
}
