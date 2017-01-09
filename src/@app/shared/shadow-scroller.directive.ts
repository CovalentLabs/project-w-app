
import { Directive, HostListener, ElementRef, OnDestroy } from '@angular/core'

// Listens for textarea input events
@Directive({
  selector: '[pw-shadow-scroller]'
})
export class ShadowScrollerDirective implements OnDestroy {
  _shader: HTMLDivElement
  @HostListener('scroll') onScroll() {
    this.fn()
  }
  fn = () => autoShade(this._ref.nativeElement, this._shader)
  constructor(private _ref: ElementRef) {
    this._shader = addStyles(this._ref.nativeElement)
    window.addEventListener("resize", this.fn)
    setTimeout(this.fn, 0)
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.fn)
  }
}

function addStyles(elt: HTMLElement): HTMLDivElement {
  elt.style.overflowY = 'auto'
  elt.style.flex = "1"
  const shader = document.createElement('div')
  Object.assign(shader.style, {
    position: 'absolute',
    zIndex: '10',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    transition: 'box-shadow .4s ease-in'
  })
  elt.appendChild(shader)
  return shader
}

const topShadow = `inset 0 13px 10px -10px rgba(0,0,0,0.2)`
const topShadow0 = `inset 0 13px 10px -10px rgba(0,0,0,0)`
const btmShadow = `inset 0 -13px 10px -10px rgba(0,0,0,0.2)`
const btmShadow0 = `inset 0 -13px 10px -10px rgba(0,0,0,0)`

function autoShade(elt: HTMLElement, shader: HTMLElement) {
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

  shader.style.boxShadow = shadows.join(', ')
}
