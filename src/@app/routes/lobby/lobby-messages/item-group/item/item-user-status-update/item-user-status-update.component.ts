import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';

import { DataUserStatusUpdate } from '@app/core/model/lobby-item.model'

@Component({
  selector: 'pw-item-user-status-update',
  template: require('./item-user-status-update.component.html'),
  styles: [
    require('../shared/item-md-icon.scss'),
  ]
})
export class ItemUserStatusUpdateComponent implements OnInit {
  @Output() options = new EventEmitter()
  @Input() data: DataUserStatusUpdate

  triggerOptions() {
    this.options.emit()
  }

  ngOnInit() {
    console.log(
      this.data
    )
  }
}
