
export enum SwipeDirection {
  START = 0, END = 1
}

function dirToSwipeDir(dir: Direction): SwipeDirection {
  return dir % 2
}

function isXDir(dir: Direction): boolean {
  return dir > Direction.BOTTOM
}

enum Direction {
  TOP = 0, BOTTOM = 1, LEFT = 2, RIGHT = 3
}

export type SwipeStartInput = {
  direction: SwipeDirection,
  delta: number,
  origin: number,
}

// delta
export type SwipeMoveInput = number

// velocity
export type SwipeEndInput = number

export
class VitreSwipeDetector {
  startSwipe: (input: SwipeStartInput) => any
  moveSwipe: (input: SwipeMoveInput) => any
  endSwipe: (input: SwipeEndInput) => any
  private offsetLeft: number
  private offsetWidth: number
  private offsetTop: number
  private offsetHeight: number

  constructor(
      private host: HTMLElement,
      private isX: boolean,
      public curtainWidth: number = 100,
      public curtainHeight: number = 100) {
    let noop = function(_){}
    this.startSwipe = noop
    this.moveSwipe = noop
    this.endSwipe = noop

    listenForSwipes({
      host,
      isX,
      detector: this
    })

    this.resize()
  }

  resize() {
    this.offsetLeft = this.host.offsetLeft
    this.offsetWidth = this.host.offsetWidth
    this.offsetTop = this.host.offsetTop
    this.offsetHeight = this.host.offsetHeight
  }

  moveHandler (dX: number) {
    this.moveSwipe(dX)
  }

  endHandler (velocity: number) {
    this.endSwipe(velocity)
  }

  startHandler(
      direction: Direction,
      origin: number,
      delta: number
  ) {
    // Change direction to emit to
    if (this.isX !== isXDir(direction)) { return }
    this.startSwipe({
      direction: dirToSwipeDir(direction),
      delta: delta,
      origin: origin
    })
  }
  inRightCurtain(ox) {
    let localX = ox - this.offsetLeft
    // console.log({localX})
    return (localX + this.curtainWidth) > this.offsetWidth
        && localX < this.offsetWidth
  }
  inLeftCurtain(ox) {
    let localX = ox - this.offsetLeft
    // console.log({localX})
    return 0 < (this.curtainWidth - localX)
        && localX > 0
  }
  inBottomCurtain(oy) {
    let localY = oy - this.offsetTop
    // console.log({localY})
    return (localY + this.curtainHeight) > this.offsetHeight
        && localY < this.offsetHeight
  }
  inTopCurtain(oy) {
    let localY = oy - this.offsetTop
    // console.log({localY})
    return 0 < (this.curtainHeight - localY)
        && localY > 0
  }

  destroy() {
    // TODO unsubscribe from hammer
  }
}

function listenForSwipes(
    opts: {
      host: HTMLElement,
      isX: boolean,
      detector: VitreSwipeDetector
    }) {
  const detector = opts.detector
  const meetsAngleRequirement = getAngleThreshold()
  const velocityThresh = 1
  let origin = 0
  let isStopped = true
  let velocities = [0, 0, 0]
  let recordVelocity = rotateRecord(velocities)

  // setup start
  function setupEndListener() {
    isStopped = false
    $(document.body).one('touchend mouseleave mouseup', () => {
      detector.endHandler(avg(velocities))
      isStopped = true
    })
  }

  const mc = new Hammer.Manager(opts.host, {
    recognizers: [
      [Hammer.Pan, { direction: opts.isX ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL }]
    ]
  })

  function start(velocity: number, angle: number, delta: number) {

    let meetsVelocityReq = Math.abs(velocity) > velocityThresh
    // console.log('vel', Math.abs(ev.velocityX))
    if (!meetsVelocityReq) { return }

    /*
    let meetsOriginDistReq = Math.abs(ev.deltaX) + Math.abs(ev.deltaY) < 150
    // console.log('odx', Math.abs(ev.deltaX))
    if (!meetsOriginDistReq) { return console.log("WRONG ORIGIN",
      {dx: ev.deltaX, dy: ev.deltaY})}
      */

    // console.log('ang', (ang > 90 ? 180 - ang : ang))
    let direction = meetsAngleRequirement(angle)
    if (direction == null) { return }

    switch (direction) {
      case Direction.LEFT:
        if (!detector.inRightCurtain(origin)) { return }
        break
      case Direction.RIGHT:
        if (!detector.inLeftCurtain(origin)) { return }
        break
      case Direction.TOP:
        if (!detector.inBottomCurtain(origin)) { return }
        break
      case Direction.BOTTOM:
        if (!detector.inTopCurtain(origin)) { return }
        break
    }
    detector.startHandler(direction, origin, delta)
    setupEndListener()
  }

  type velpass = { o, v, d, a, t }
  const vel: (ev: HammerInput) => velpass = make_vel(opts.isX)
  const onpan = function ({ o, v, d, a, t }: velpass) {
    if (!isStopped) {
      recordVelocity(v)
      detector.moveHandler(d)
    } else {
      if (t === 'panstart') {
        origin = o
      }
      start(v, a, d)
    }
  }
  mc.on('panstart panmove', function (ev: HammerInput) { onpan(vel(ev)) })
}

function make_vel(isX: boolean): (ev: HammerInput) => { o, v, d, a, t } {
  return isX
    ? function (ev: HammerInput) {
      return { o: (<PointerEvent>ev.srcEvent).clientX, v: ev.velocityX, d: ev.deltaX, t: ev.type, a: ev.angle }
    }
    : function (ev: HammerInput) {
      return { o: (<PointerEvent>ev.srcEvent).clientY, v: ev.velocityY, d: ev.deltaY, t: ev.type, a: ev.angle }
    }
}

function avg(n: number[]) {
  return n.reduce((p, c) => p + c, 0) / n.length
}

// I'm sorry.
// This is essentially a way for us to find numbers in ranges quickly.
function getAngleThreshold(): (ang: number) => Direction {
  const degs = 360
  const degs2 = degs * .5
  // 'LEFT - TOP - RIGHT - BOTTOM - LEFT'.split(' ')
  const directions = [Direction.LEFT, null, Direction.TOP, null, Direction.RIGHT, null, Direction.BOTTOM, null]
  const len = 8
  const rec  = len / degs
  const centering = degs / len * .5
  return an => {
    // let ang = Math.abs(an)
    let cang = (an + degs2 + centering) % degs
    /* tslint:disable:no-bitwise */
    let lm = (cang * rec) | 0
    return directions[lm]
    // (ang > 90 ? 180 - ang : ang) < leftRightThreshAngle
  }
}


function rotateRecord(arr: number[], len: number = arr.length) {
  let i = 0
  return n => {
    arr[i++ % len] = n
  }
}
