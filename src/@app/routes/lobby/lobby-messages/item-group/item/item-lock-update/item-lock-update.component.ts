import { Component, Input } from '@angular/core';

import { DataLockStatusUpdate } from '@app/core/model/lobby-item.model'
import * as M from '@app/core/model'

@Component({
  selector: 'pw-item-lock-update',
  template: require('./item-lock-update.component.html'),
  styles: [
    require('../shared/item-md-icon.scss'),
  ]
})
export class ItemLockUpdateComponent {
  LOCKED = M.GroupLockStatus.LOCKED
  UNLOCKED = M.GroupLockStatus.UNLOCKED

  @Input() data: DataLockStatusUpdate
}
