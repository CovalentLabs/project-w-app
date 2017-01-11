import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import * as M from '@app/core/model'

@Component({
  selector: 'pw-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: [
    './profile-item.component.scss',
  ]
})
export class ProfileItemComponent implements OnInit {
  // <profile-item [profile]="">
  @Input() profile: M.Profile
  // <profile-item []="">
  @Input() peaSize: number
  // <profile-item (open)="">
  // @Output() open = new EventEmitter()

  constructor() {}

  ngOnInit() {
    // on init
  }
}
