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

@Injectable()
export class AppStateService {
  private _state: M.AppState = DefaultAppState
  private _stateObserver: Observer<M.AppState>

  public state: Observable<M.AppState>

  constructor() {
    this.state = Observable.create(observer => {
      this._stateObserver = observer
      // Any cleanup logic might go here
      return () => console.log('disposed state service')
    });
  }

  updateState(partial: M.PartialAppState) {
    // let from: M.PartialModel = {}
    let to: M.PartialAppState = {}
    for (let key in partial) {
      if (!deepEqual(this._state[key], partial[key])) {
        // from[key] = this._state[key]
        to[key] = partial[key]
      }
    }
    // Store from -> to for time travelling?

    // Special merge update of traits
    mergeWith(this._state, to, mergeExceptArrays)

    this.next()
  }

  getState(): M.AppState {
    return this._state
  }

  next() {
    this._stateObserver.next(this._state)
  }

  action(message: string): ActionUpdate {
    function ActionUpdateFunction (name: string, partial: M.PartialAppState) {
      // FUTURE: log or store etc. for time travel. Time travel is so hot right now.
      console.log('%c' + message, 'font-weight: bold', name)

      this.updateState(partial)
    }

    return ActionUpdateFunction.bind(this)
  }
}
