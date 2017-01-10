/* tslint:disable:member-ordering */
import {
  Component,
  AfterContentInit, OnChanges, OnDestroy,
  ElementRef,
  Input, ContentChildren, QueryList, ViewEncapsulation
} from '@angular/core'

import { VitreSwipeManager, SwipeOrientation } from './vitre-swipe-manager'

import { VitreComponent } from './vitre/vitre.component'
export { VitreComponent }

const VITRE_COLUMNS = 12
enum DIR { row, column }
const AMBER_COLORS =
`50 #FFF8E1
100 #FFECB3
200 #FFE082
300 #FFD54F
400 #FFCA28
500 #FFC107
600 #FFB300
700 #FFA000
800 #FF8F00
900 #FF6F00`
.split(/\n/g)
.map(a => a.split(/\s+/)[1])

const AMBER_COLORS_LEN = AMBER_COLORS.length

@Component({
  selector: 'pw-vitre-container',
  template: require('./vitre-container.component.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./vitre-container.component.scss'),
  ]
})
export class VitreContainerComponent implements AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(VitreComponent) vitres: QueryList<VitreComponent>
  @Input('vitre-view') view: null | 'sm' | 'md' | 'lg' | 'xl' = null
  @Input('vitre-direction') direction: null | 'row' | 'column' = null
  @Input('vitre-frame-index') frameIndexAttr: string

  // <vitre-container [curtainSize]="">
  // TODO connect manager to listener for these curtains
  @Input() curtainSize: number = 100
  private frames: number
  private swipeManager: VitreSwipeManager

  resizeDebounceInterval = 400
  resizeDebounce: any
  onresize = () => {
    clearTimeout(this.resizeDebounce)
    this.resizeDebounce =
    setTimeout(
      () => this.reset(),
      this.resizeDebounceInterval
    )
  }
  constructor(private _ref: ElementRef) {}
  private setup(orientation: SwipeOrientation) {
    let container = <HTMLElement> this.host()
    let content = <HTMLElement> this.host().firstElementChild
    this.swipeManager = new VitreSwipeManager(orientation, container, content)


    window.addEventListener('resize', this.onresize)
  }

  ngOnChanges() {
    this.reset()
  }

  ngAfterContentInit() {
    // Clear console on destruction
    if ('clear' in console) { console.clear() }

    // only once.
    this.setup(this.direction === 'column' ? SwipeOrientation.COLUMN : SwipeOrientation.ROW)

    this.vitres.forEach((v, i) => v.backgroundColor = AMBER_COLORS[i % AMBER_COLORS_LEN])

    this.reset()
    ; (<any> window).$ = $;
  }

  private reset() {
    this.resetFrame()
    if (this.frames == null) { return }

    this.swipeManager.resize()

    this.setAttrs()
  }

  ngOnDestroy() {
    // this.swipeManager.destroy()
    // window.removeEventListener('resize', this.onresize)
  }

  private resetFrame() {
    const view = this.view || null
    const vits = this.vitres
    if (vits == null) { return }
    const widths = vits.map(vit => vit.getCol(view))
    // using these widths, we can calculat the number of frames we need.
    let frames = 0
    widths.reduce((prev, curr) => {
      let total = prev + curr
      if (total < VITRE_COLUMNS) {
        return total
      } else if (total === VITRE_COLUMNS) {
        frames += 1
        return 0
      } else {
        throw new Error(
          `Vitre columns do not divide evenly over total ${VITRE_COLUMNS} columns.`
          + `\n(Received widths: ${widths.join(', ')} for view: ${view})`)
      }
    }, 0)
    this.frames = frames

    this.swipeManager.setFramesLength(frames)
  }


  private setAttrs() {
    this.attr('vitre-view', this.view)
    this.attr('vitre-direction', this.direction || 'row')
  }

  private host(): HTMLElement {
    return this._ref.nativeElement
  }

  private attr(key: string, value: any) {
    let el = this.host()

    return value == null
        ? el.removeAttribute(key)
        : el.setAttribute(key, '' + value)
  }
}
