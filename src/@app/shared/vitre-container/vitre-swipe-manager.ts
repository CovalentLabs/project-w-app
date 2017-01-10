/* tslint:disable:member-ordering */

import { VitreSwipeDetector, SwipeDirection } from './listen-for-swipes'

export enum SwipeOrientation {
  ROW = 0, COLUMN = 1
}

import { VitreComponent } from './vitre/vitre.component'
export { VitreComponent }

export class VitreSwipeManager {
  private frameIndex: number
  private framesLength: number
  private frameWidth: number
  private detector: VitreSwipeDetector

  // <vitre-container (open)="">
  // @Output() open = new EventEmitter()
  constructor(
      private orientation: SwipeOrientation,
      private container: HTMLElement,
      private content: HTMLElement
      ) {
    let isX = this.orientation === SwipeOrientation.ROW
    this.detector = new VitreSwipeDetector(container, isX)
    this.resize()
    this.listen()
  }

  private listen() {
    let origin = 0
    let delta: number
    let currentDirection: SwipeDirection = null
    let isStopped = true
    const move = (del) => {
      if (isStopped) { return }
      delta = del
      // set location of container
      this.translateFromIndex(delta)
    }
    const end = (velocity) => {
      if (isStopped) { return }
      let width = this.frameWidth
      // set location of container
      console.log("Nulltrans")
      this.content.style.transition = null

      const time = 1000
      const travel = velocity * time
      const travel300 = velocity * 300
      if (currentDirection === SwipeDirection.START) {
        // FORWARD
        const moveForeGoal = width * -.5
        // Would it make it to the goal in 300ms?
        const moveFore = delta + travel300 < moveForeGoal
        if (moveFore) {
          // See how far this would travel with avg velocity
          const goalDist = -1 * width - delta
          let dur = `${calcTransitionDur(goalDist, travel)}s`
          this.content.style.transitionDuration = dur
          console.log("Transdur", dur)
          // Set transitions?
          this.setIndex(this.frameIndex + 1)
          console.log("forward", this.frameIndex, {goalDist, travel})
        }
      } else {
        // BACKWARD
        const moveBackGoal = width * .5
        // Would it make it to the goal in 300ms?
        const moveBack = delta + travel300 > moveBackGoal
        if (moveBack) {
          // See how far this would travel with avg velocity
          const goalDist = delta - width
          let dur = `${calcTransitionDur(goalDist, travel)}s`
          this.content.style.transitionDuration = dur
          console.log("Transdur", dur)
          // Set transitions based on velocity?
          this.setIndex(this.frameIndex - 1)
          console.log("backward", this.frameIndex, {goalDist, travel})
        }
      }
      console.log("put back", { width, delta, index: this.frameIndex })
      console.log({origin, delta })
      isStopped = true
      // if (travel > ) {
      //   console.log("put back")
      //   panes.style.transform = `translateX(0px)`
      //   handlerRight = handleRight
      // } else {
      //   console.log("open")
      //   panes.style.transform = `translateX(-${w}px)`
      //   handlerRight = handleLeft
      // }
      this.translateFromIndex()
    }

    this.detector.startSwipe = (input) => {
      origin = input.origin
      currentDirection = input.direction
      if (currentDirection === SwipeDirection.START) {
        if (this.canGoForward()) {
          console.log("Can Move Forward")
          isStopped = false
        } else {
          console.log("Cannot Move Forward")
          isStopped = true
        }

      } else if (currentDirection === SwipeDirection.END) {
        if (this.canGoBackward()) {
          console.log("Cannot Move Backward")
          isStopped = false
        } else {
          console.log("Cannot Move Backward")
          isStopped = true
        }
      }
      if (!isStopped) {
        console.log("Notrans")
        this.content.style.transition = 'none'
        move(input.delta)
      }
    }
    this.detector.moveSwipe = move
    this.detector.endSwipe = end
  }

  setFramesLength(frames: number) {
    this.framesLength = frames
    this.setIndex()
  }

  public resize() {
    let size = this.orientation ===  SwipeOrientation.ROW
        ? this.container.offsetWidth
        : this.container.offsetHeight

    this.setSize(size)

    this.setIndex()

    // just in case
    this.detector.resize()
  }

  public destroy() {
    this.detector.destroy()
  }

  // which frame are we currently viewing
  private setSize(frameWidth: number) {
    let framesLength = this.framesLength
    if (this.orientation === SwipeOrientation.ROW) {
      this.content.style.width = `${frameWidth * framesLength}px`
    } else {
      this.content.style.height = `${frameWidth * framesLength}px`
    }

    this.frameWidth = frameWidth
  }

  private translateZero: number = 0
  private translateMin: number
  private translateMax: number

  // recalibrate's min and max
  private setIndex(frameIndex: number = this.frameIndex) {
    if (frameIndex == null) {
      frameIndex = 0
    }

    // Keep Frame Index inbounds
    // if frame index is gt 0, it has a value we need to keep in bounds
    if (frameIndex >= this.framesLength) {
      frameIndex = this.framesLength - 1
    } else if (frameIndex < 0) {
      frameIndex = 0
    }

    // base index
    // Everything is in terms of X, though X is Y if the direction is column
    this.translateZero = -1 * frameIndex * this.frameWidth

    this.frameIndex = frameIndex

    // Set translateMin and translateMax
    // set max to frame width
    this.translateMax = this.canGoBackward()
        ? this.frameWidth
        : 0

    // set min to negative frame width
    this.translateMin = this.canGoForward()
        ? -1 * this.frameWidth
        : 0

    // set location of container
    // no additional arg resets it to 0
    this.translateFromIndex()

    // console.log('setIndex', { zero: this.translateZero, frameIndex, len: this.framesLength })
  }

  private canGoForward(): boolean {
    return this.frameIndex + 1 < this.framesLength
  }
  private canGoBackward(): boolean {
    return this.frameIndex - 1 >= 0
  }

  private translateFromIndex(delta: number = 0) {
    // set location of container
    delta = delta < this.translateMin
      ? this.translateMin
      : delta > this.translateMax
        ? this.translateMax
        : delta
    let isRow = this.orientation === SwipeOrientation.ROW
    translateContent(this.content, this.translateZero + delta, isRow)
  }
}

// ensures that we don't jerk too much
const maxPixelsPerSecond = 1000
// since we use ease-out, we are going to need the animation to be a little longer for
// our velocities to match up correctly
const easeStartAdjust = 1.2
function calcTransitionDur(dist, pxPerSecond) {
  return easeStartAdjust * Math.abs(Math.min(dist / Math.min(Math.abs(pxPerSecond), maxPixelsPerSecond), .8))
}

function translateContent(content: HTMLElement, dist: number, isRow: boolean) {
  content.style.transform = `translate${isRow ? 'X' : 'Y'}(${dist}px)`
}
