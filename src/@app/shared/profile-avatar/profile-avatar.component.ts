import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { SafeStyle, DomSanitizer } from '@angular/platform-browser'

import * as M from '@app/core/model'

const noImage = "giphy_cecy-meade_rainbow-piano.gif"
const mockImages = [
  "giphy-andrei-robu-1.gif",
  "giphy_april-faison_popsicle.gif",
  "giphy_ori-toor_whacky-arms-flailing-tube-man.gif",
]

@Component({
  selector: 'pw-profile-avatar',
  template: require('./profile-avatar.component.html'),
  styles: [
    require('./profile-avatar.component.scss'),
  ]
})
export class ProfileAvatarComponent implements OnInit, OnChanges {
  @Input() profile: M.Profile
  hasImage = true
  bgImg: SafeStyle = null


  constructor(private _d: DomSanitizer) {}

  ngOnInit() {
    this.update()
  }

  ngOnChanges() {
    this.update()
  }

  update() {
    let url: string
    if (this.profile) {
      // this.imageURL = this.profile.ImageURL

      // stub for now.
      let i = this.profile.FirstName.length % mockImages.length
      url = `img/${mockImages[i]}`

      this.hasImage = !!this.bgImg
    } else {
      this.hasImage = true
      this.bgImg = noImage
    }

    this.bgImg = this._d.bypassSecurityTrustStyle(`url(${url})`)
  }
}
