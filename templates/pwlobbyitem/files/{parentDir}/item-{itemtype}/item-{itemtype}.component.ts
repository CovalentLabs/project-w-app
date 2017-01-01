import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

import { Data<%=ItemType%> } from '@app/core/model/lobby-item.model'

@Component({
  selector: 'pw-item-<%=itemtype%>',
  template: require('./item-<%=itemtype%>.component.html'),
  styles: [
    require('./item-<%=itemtype%>.component.scss'),
  ]
})
export class Item<%=ItemType%>Component implements OnInit {
  @Output() options = new EventEmitter()
  @Input() data: Data<%=ItemType%>

  triggerOptions() {
    this.options.emit()
  }

  ngOnInit() {
    console.log(
      this.data
    )
  }
}
