import { Injectable } from '@angular/core'

import { Observer, Observable } from 'rxjs'

import * as M from '@app/core/model'

const mergeWith = <(obj: any, source: any, customizer?: (objValue, srcValue) => any) => any> require('lodash.mergewith')


// https://lodash.com/docs/4.16.4#mergeWith
// In the future, we may be interested in customizing this further
// for better support of large message arrays maybe.
function mergeExceptArrays (objValue, srcValue) {
  if (objValue instanceof Array && srcValue instanceof Array) {
    return srcValue
  }
}

export type TimelineEntry = {
  id: any,
  type: string,
  name: string,
  from: M.PartialAppState,
  to: M.PartialAppState
}
export type Timeline = TimelineEntry[]

@Injectable()
export class TimelineService {
  private _timeline: Timeline
  private _id: number = 0
  private _timelineObserver: Observer<Timeline>

  public timeline: Observable<Timeline>

  constructor() {
    this.timeline = Observable.create(observer => {
      this._timelineObserver = observer
      // Any cleanup logic might go here
      return () => console.log('disposed timeline subscription')
    })
    this.timeline.subscribe(noop => noop)
    this.reset()
  }

  next() {
    this._timelineObserver.next(this._timeline)
  }

  reset() {
    // FUTURE Reset timeline
    console.log('%cTimeline Reset', 'font-weight: bold; color: green')

    this._timeline = []
    this._id = 0
    this.next()
  }

  goBackTo(id: any): M.PartialAppState {
    id = Number(id)

    return this._timeline
      .filter(entry => entry.id > id)
      .reduceRight((prev, entry) => {
        // Special merge update of traits
        mergeWith(prev, entry.from, mergeExceptArrays)
        return prev
      }, <M.PartialAppState> {})
  }

  getUpTo(id: any): Timeline {
    id = Number(id)

    return this._timeline
      .filter(entry => entry.id <= id)
  }

  getTimeline(): Timeline {
    return this._timeline
  }

  enter(type: string, name: string, from: M.PartialAppState, to: M.PartialAppState) {
    // FUTURE: log or store etc. for time travel. Time travel is so hot right now.
    console.log('%c' + type + ' %c' + name, 'font-weight: bold', 'color: blue')

    this._timeline.push({
      id: this._id++,
      type,
      name,
      from,
      to,
    })

    this.next()
  }
}
