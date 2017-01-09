import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core'

import { ActivatedRoute } from '@angular/router'

import { AppState } from '@app/core'
import { getMockState } from '@mock/states'

import { Subscription } from 'rxjs'

const mock = getMockState("Lobby/Base").state

@Component({
  // Nunjucks now available for templating
  template: require('./test.html'),
  styles: [
    require('@app/style/component/full.scss'),
    require('@app/shared/shared/message.scss'),
    require('./test.scss'),
  ]
})
export class TestComponent implements OnInit, OnDestroy, AfterViewInit {
  // Test vars
  time = 'Now'
  AppState: AppState = mock
  pods$ = mock.Lobby.Group.GroupUsers.slice(0, 3)
  pods1 = mock.Lobby.Group.GroupUsers.slice(3)

  private _paramsSub: Subscription

  constructor(
      private _route: ActivatedRoute,
      private _ref: ElementRef) {
    this._paramsSub = this._route.params.subscribe(
        params => {
      console.log('Styleguide params:', params)
    })
  }

  ngAfterViewInit() {
    const elt = <HTMLElement> this._ref.nativeElement
    const telt = <HTMLDivElement> elt.querySelector('.test-elt')
    const panes = <HTMLDivElement> elt.querySelector('.panes')

    const mc = new Hammer(elt)

    let handlerLeft = handleLeft
    let handlerRight = handleRight

    let ox = 0
    const w = window.innerWidth
    let trans: number
    function handleLeft(dX: number) {
      trans = dX + ox
      console.log('handleLeft', dX, ox)
      panes.style.transform = `translateX(${trans - w}px)`
    }
    function handleLeftEnd(vX: number) {
      console.log(vX)
      panes.style.transition = null
      // See how far this would travel with avg velocity
      if (vX * 800 + trans > w) {
        console.log("put back")
        panes.style.transform = `translateX(0px)`
        handlerRight = handleRight
      } else {
        console.log("open")
        panes.style.transform = `translateX(-${w}px)`
        handlerRight = handleLeft
      }
    }
    function handleRight(dX: number) {
      telt.style.transform = `translateX(${dX + ox}px)`
    }
    let handler = handleLeft
    let handleEnd = handleLeftEnd
    mc.on('panstart panmove', listenForSwipes(
      (direction, startX, dX) => {
        ox = startX
        switch (direction) {
          case 'right':
            telt.style.transition = 'none'
            panes.style.transition = 'none'
            telt.style.backgroundColor = 'lawngreen'
            handler = handlerRight
            handler(dX)
            break;
          case 'left':
            panes.style.transition = 'none'
            handler = handlerLeft
            handler(dX)
            break;
        }
      },
      (dx) => handler ? handler(dx) : null,
      (vx) => handleEnd ? handleEnd(vx) : null
    ))
  }

  test(...args) {
    console.log.apply(console, ["%ctest", 'font-weight: bold;'].concat(args))
  }

  ngOnInit() {
    // Set up -----------------
    // jQuery of the :host element of our template.
    const ref = $(this._ref.nativeElement)


    // Tooltips ---------------
    const tooltipped = ref.find('[data-toggle="tooltip"]')
    // Creating a Bootstrap tooltip!
    tooltipped.tooltip()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._paramsSub.unsubscribe()
  }
}

// pure
function listenForSwipes(
    startHandler: (direction: 'left' | 'right', startX: number, dX: number) => any,
    moveHandler: (dX: number) => any,
    endHandler: (vX: number) => any) {
  const clientWidth = window.innerWidth
  const rightThresh = Math.min(clientWidth / 3, 200)
  const meetsRightThresh = ox => ox < rightThresh
  const leftThresh = clientWidth - rightThresh
  const meetsLeftThresh = ox => ox > leftThresh
  const leftRightThreshAngle = 45
  const lrVelocityThresh = .1
  let ox = 0
  let oy = 0
  let isStopped = true
  let velocities = [0, 0, 0]
  let recordVel = rotateRecord(velocities)

  // setup start
  function setupEndListener() {
    isStopped = false
    $(document.body).one('touchend mouseleave mouseup', () => {
      endHandler(avg(velocities))
      isStopped = true
    })
  }

  return (ev: HammerInput) => {
    let name = ev.type
    let srcCX = (<PointerEvent>ev.srcEvent).clientX
    let srcCY = (<PointerEvent>ev.srcEvent).clientY
    if (name === 'panstart') {
      ox = srcCX
      oy = srcCY
    }

    if (isStopped) {
      let meetsVelocityReq = Math.abs(ev.velocityX) > lrVelocityThresh
      // console.log('vel', Math.abs(ev.velocityX))
      if (!meetsVelocityReq) { return }

      let meetsOriginDistReq = Math.abs(ev.deltaX) < 100
      // console.log('odx', Math.abs(ev.deltaX))
      if (!meetsOriginDistReq) { return }

      let ang = Math.abs(ev.angle)
      // console.log('ang', (ang > 90 ? 180 - ang : ang))
      let meetsAngleRequirement = (ang > 90 ? 180 - ang : ang) < leftRightThreshAngle
      if (!meetsAngleRequirement) { return }

      if (ev.deltaX > 0) {
        if (!meetsRightThresh(ox)) { return }
        // RIGHT
        startHandler("right", ox, ev.deltaX)
        setupEndListener()
      } else if (meetsLeftThresh(ox)) {
        // LEFT
        startHandler("left", ox, ev.deltaX)
        setupEndListener()
      }
    } else {
      recordVel(ev.velocityX)
      moveHandler(ev.deltaX)
    }
  }
}

function avg(n: number[]) {
  return n.reduce((p, c) => p + c, 0) / n.length
}


function rotateRecord(arr: number[], len: number = arr.length) {
  let i = 0
  return n => {
    arr[i++ % len] = n
  }
}
