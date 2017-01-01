
import { Directive, Output, EventEmitter, ElementRef } from '@angular/core'

// Listens for hammer press events
@Directive({ selector: '[press]' })
export class PressDirective {
  @Output() press = new EventEmitter<HammerInput>()
  constructor(elref: ElementRef) {
    const ref: HTMLElement = elref.nativeElement
    const hammer = new Hammer(ref)
    hammer.on('press', (event) => {
      this.press.emit(event)
    })
  }
}

export const HAMMER_DIRECTIVES = [
  PressDirective,
]
