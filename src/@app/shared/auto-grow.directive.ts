
import { Directive, HostListener, ElementRef } from '@angular/core'

// Listens for hammer press events
@Directive({ selector: 'textarea[pw-auto-grow]' })
export class AutoGrowDirective {
  @HostListener('input') onInput() {
    autoGrow(this._ref.nativeElement)
  }
  constructor(private _ref: ElementRef) {
    setTimeout(() => autoGrow(this._ref.nativeElement), 0)
  }
}

function autoGrow(textarea: HTMLTextAreaElement) {
  textarea.style.height = "5px";
  textarea.style.height = (textarea.scrollHeight) + "px";
}
