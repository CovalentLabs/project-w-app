import { Injectable } from '@angular/core'

import { Observer, Observable } from 'rxjs'

import { DefaultAppState } from './default-app-state'

const mergeWith = <(obj: any, source: any, customizer?: (objValue, srcValue) => any) => any> require('lodash.mergewith')
const deepEqual = <(value: any, other: any, customizer?: (objValue, srcValue) => any) => any> require('lodash.isequalwith')


// https://lodash.com/docs/4.16.4#mergeWith
// In the future, we may be interested in customizing this further
// for better support of large message arrays maybe.
function mergeExceptArrays (objValue, srcValue) {
  if (objValue instanceof Array && srcValue instanceof Array) {
    return srcValue
  }
}

import * as M from '@app/core/model'

export type ActionUpdate = (name: string, partial: M.PartialAppState) => void

import { TimelineService, Timeline } from './timeline.service'

@Injectable()
export class AppStateService {
  private _state: M.AppState = DefaultAppState
  private _stateObserver: Observer<M.AppState>

  public state: Observable<M.AppState>

  constructor(private _timeline: TimelineService) {
    this.state = Observable.create(observer => {
      this._stateObserver = observer
      // Any cleanup logic might go here
      return () => console.log('disposed state subscription')
    })
    this.state.subscribe(noop => noop)
  }

  private updateState(partial: M.PartialAppState) {
    let track_from: M.PartialAppState = {}
    let to: M.PartialAppState = {}
    for (let key in partial) {
      if (!deepEqual(this._state[key], partial[key])) {
        track_from[key] = this._state[key]
        to[key] = partial[key]
      }
    }

    // Special merge update of traits
    let from: M.PartialAppState = {}
    mergeWith(from, track_from, mergeExceptArrays)
    mergeWith(this._state, to, mergeExceptArrays)

    this.next()

    return { from, to }
  }

  getState(): M.AppState {
    return this._state
  }

  next() {
    this._stateObserver.next(this._state)
  }

  applyTimeline(timeline: Timeline) {
    this._state = DefaultAppState
    this._timeline.reset()
    for (let entry of timeline) {
      // enter each timeline entry back into timeline
      this.action(entry.type)(entry.name, entry.to)
    }
  }

  // This is the fundamental way to change the Application,
  // Here you can create an update function, which can be passed
  // your PartialAppState update, and it will be stored and logged.
  action(type: string, time_travel?: 'reset' | 'skip' | 'store'): ActionUpdate {
    function ActionUpdateFunction (name: string, partial: M.PartialAppState) {
      const app = (<AppStateService> this)

      if (time_travel === 'reset') {
        app._timeline.reset()
      }

      const change = app.updateState(partial)

      if (time_travel !== 'skip') {
        app._timeline.enter(type, name, change.from, change.to)
      }
    }

    return ActionUpdateFunction.bind(this)
  }
}
