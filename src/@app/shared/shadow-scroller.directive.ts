
import { Directive, HostListener, ElementRef, OnDestroy } from '@angular/core'

// Listens for textarea input events
@Directive({
  selector: '[pw-shadow-scroller]'
})
export class ShadowScrollerDirective implements OnDestroy {
  @HostListener('scroll') onScroll() {
    autoShade(this._ref.nativeElement)
  }
  fn = () => autoShade(this._ref.nativeElement)
  constructor(private _ref: ElementRef) {
    addStyles(this._ref.nativeElement)
    window.addEventListener("resize", this.fn)
    setTimeout(this.fn, 0)
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.fn)
  }
}

function addStyles(elt: HTMLElement) {
  elt.style.overflowY = 'auto'
  elt.style.transition = 'box-shadow .4s ease-in'
  elt.style.flex = "1"
}

const topShadow = `inset 0 13px 10px -10px rgba(0,0,0,0.2)`
const topShadow0 = `inset 0 13px 10px -10px rgba(0,0,0,0)`
const btmShadow = `inset 0 -13px 10px -10px rgba(0,0,0,0.2)`
const btmShadow0 = `inset 0 -13px 10px -10px rgba(0,0,0,0)`

function autoShade(elt: HTMLElement) {
  let height = elt.offsetHeight
  let scrollHeight = elt.scrollHeight
  let scrollTop = elt.scrollTop

  let shadows = []
  if (scrollTop > 2) {
    shadows.push(topShadow)
  } else {
    shadows.push(topShadow0)
  }
  if (scrollHeight - height - scrollTop > 2) {
    shadows.push(btmShadow)
  } else {
    shadows.push(btmShadow0)
  }

  if (shadows.length) {
    elt.style.boxShadow = shadows.join(', ')
  } else {
    elt.style.boxShadow = null
  }
}
