import { Component, Input } from '@angular/core'

import * as M from '@app/core/model'

@Component({
  selector: 'pw-profile-message',
  template: require('./profile-message.component.html'),
  styles: [
    require('./profile-message.component.scss'),
    require('../shared/message.scss'),
  ]
})
export class ProfileMessageComponent {
  @Input() profile: M.Profile
  @Input() messageText: string
  @Input() action: string
  @Input() time: string
}
