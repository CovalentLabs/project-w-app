import { Injectable } from '@angular/core'

import { Observer, Observable } from 'rxjs'

import * as M from '@app/core/model'

// Results from Device action
export type TimelineAction = {
  type: string,
  name: string,
  from: M.PartialAppState,
  to: M.PartialAppState
}
// Results from Server action
export type TimelineEffect = TimelineAction

export type TimelineNavigation = {
  reason: string,
  from: string,
  to: string,
}

export type TimelineEntryType = 'action' | 'effect' | 'navigation'
export type TimelineEntryData = TimelineAction | TimelineEffect | TimelineNavigation

export type TimelineEntry = {
  id: any
  type: TimelineEntryType
  data: TimelineEntryData
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

  getAfter(id: any): Timeline {
    id = Number(id)

    return this._timeline
      .filter(entry => entry.id > id)
  }

  getUpTo(id: any): Timeline {
    id = Number(id)

    return this._timeline
      .filter(entry => entry.id <= id)
  }

  getTimeline(): Timeline {
    return this._timeline
  }

  enter(entry_type: TimelineEntryType, data: TimelineEntryData) {
    // FUTURE: log or store etc. for time travel. Time travel is so hot right now.
    let type
    let name
    switch (entry_type) {
      case 'navigation':
        let navdata = (<TimelineNavigation> data)
        type = navdata.reason
        name = `${navdata.from} => ${navdata.to}`
        break
      case 'action':
        type = (<TimelineAction> data).type
        name = (<TimelineAction> data).name
        break
      case 'effect':
        type = (<TimelineEffect> data).type
        name = (<TimelineEffect> data).name
        break
    }
    console.log(entry_type.toUpperCase() + ': %c' + type + ' %c' + name, 'font-weight: bold', 'color: blue')

    this._timeline.push({
      id: this._id++,
      type: entry_type,
      data: data
    })

    this.next()
  }
}
