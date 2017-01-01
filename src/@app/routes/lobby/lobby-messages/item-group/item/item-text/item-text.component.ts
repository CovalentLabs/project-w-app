import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';

import { DataText } from '@app/core/model/lobby-item.model'

@Component({
  selector: 'pw-item-text',
  template: require('./item-text.component.html'),
  styles: [
    require('./item-text.component.scss'),
  ]
})
export class ItemTextComponent implements OnInit {
  @Output() options = new EventEmitter()
  @Input() data: DataText

  triggerOptions() {
    this.options.emit()
  }

  ngOnInit() {
    console.log(
      this.data
    )
  }
}
