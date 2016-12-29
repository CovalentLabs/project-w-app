
import { AppState, PartialAppState, DefaultAppState } from '@app/core'
import moment = require('moment')

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


// Profiles
const pr$0: M.Profile = {
  Id: 'pr0',
  Tagline: 'Captain Action',
  FirstName: 'Jackson',
}
// My Pod
const pr$1: M.Profile = {
  Id: 'pr$1',
  Tagline: 'Meep! Meep!',
  FirstName: 'Road',
}
const pr$2: M.Profile = {
  Id: 'pr$2',
  Tagline: 'I tawt I taw a puddy-tat!',
  FirstName: 'Tweety',
}

const pra1: M.Profile = {
  Id: 'pra1',
  Tagline: 'What a maroon!',
  FirstName: 'Bugs',
}
const pra2: M.Profile = {
  Id: 'pra2',
  Tagline: 'You\'re dethpicable',
  FirstName: 'Daffy',
}
const pra3: M.Profile = {
  Id: 'pra4',
  Tagline: 'Y-y-you can\'t fool me.',
  FirstName: 'Porky',
}
const pra4: M.Profile = {
  Id: 'pra3',
  Tagline: 'Don\'t ever call me doll',
  FirstName: 'Lola',
}
const prb1: M.Profile = {
  Id: 'prb1',
  Tagline: 'Great horny toads!',
  FirstName: 'Yosemite',
}
const prb2: M.Profile = {
  Id: 'prb2',
  Tagline: 'Gweat gwasshoppers!',
  FirstName: 'Elmer',
}
const prc1: M.Profile = {
  Id: 'prc1',
  Tagline: 'Arriba! Arriba!',
  FirstName: 'Speedy',
}
const prc2: M.Profile = {
  Id: 'prc2',
  Tagline: 'YEeooooowwwwwwwww!!!',
  FirstName: 'Wile',
}

// Friends
const fr1: M.Friend = nfri(pr$1, M.FriendStatus.IN_GROUP)
const fr2: M.Friend = nfri(pr$2, M.FriendStatus.ONLINE)

// Peas and Pods

// Pod $: Jackson (me), Road
const pe$0: M.Pea = npea(pr$0, { start: 1, end: 3.5 })
const pe$1: M.Pea = npea(pr$1, { start: .5, end: 3 })
const pe$2: M.Pea = npea(pr$2, { start: 1, end: 4 })
const pod$: M.Pod = npod('$', pe$0, pe$1, pe$2)

// Pod A: Bugs, Daffy, Lola, Porky
const pea1: M.Pea = npea(pra1, { start: 1, end: 3 })
const pea2: M.Pea = npea(pra2, { start: 1.5, end: 3 })
const pea3: M.Pea = npea(pra3, { start: 1, end: 2.5 })
const pea4: M.Pea = npea(pra4, { start: 1, end: 3 })
const poda: M.Pod = npod('a', pea1, pea2, pea3, pea4)

// Pod B: Yosemite, Elmer
const peb1: M.Pea = npea(prb1, { start: 1, end: 3 })
const peb2: M.Pea = npea(prb2, { start: 1.5, end: 3 })
const podb: M.Pod = npod('b', peb1, peb2)

// Pod C: Speedy, Wile
const pec1: M.Pea = npea(prc1, { start: 4, end: 7 })
const pec2: M.Pea = npea(prc2, { start: 4.5, end: 7 })
const podc: M.Pod = npod('c', pec1, pec2)

function nfri(profile: M.Profile, status: M.FriendStatus): M.Friend {
  return {
    Id: profile.Id + '+fri',
    Profile: profile,
    Status: status
  }
}
// Create new Pea Model using provided profile and availability
// Availability is represented as hours relative from time now.
function npea(profile: M.Profile, avail_rel_hours: { start: number, end: number }): M.Pea {
  const {start, end} = avail_rel_hours
  return {
    Id: profile.Id + '+pea',
    Profile: profile,
    Availability: [{ Id: profile.Id + '+av', Start: reltime(start, 'h'), End: reltime(end, 'h') }],
  }
}
function npod(id: string, ...peas: M.Pea[]): M.Pod {
  return {
    Id: id + '+pod',
    Peas: peas,
  }
}

// Relative time from now
function reltime(rel: number, unit: moment.unitOfTime.DurationConstructor): Date {
  return moment().add(rel, unit).toDate()
}

export
type MockState = { name: string, state: AppState }

// States
const MOCK_STATES: MockState[] = (function () {
  let res: MockState[] = []
  let add = state(res)

  let notLoggedInBase: AppState =
    assign(DefaultAppState, {
      // This should be the default anyway,
      // but here we are being very deliberate.
      Login: {
        Credentials: null,
        HasLoggedOut: false,
        IsLoggedIn: false,
        LoginError: null
      }
    })

  add(//////////////////
    'Login/Not logged in/Not logged in',
    notLoggedInBase
  )

  add(//////////////////
    'Login/Not logged in/Has logged out',
    notLoggedInBase,
    { Login: { HasLoggedOut: true } }
  )


  add(//////////////////
    'Login/Not logged in/Log in error',
    notLoggedInBase,
    {
      Login: {
        LoginError: { ErrorId: 'conn-0', Reason: 'We lost connection unfortunately' }
      }
    }
  )

  const loggedInBase1: AppState
  = assign(notLoggedInBase, {
    Login: {
      Credentials: {
        FirstName: 'Jackson',
        LastName: 'Rains',
        Profile: pr$0,
        Id: 'jr0'
      },
      IsLoggedIn: true,
      UserItems: [],
    }
  })

  add(//////////////////
    'Login/Logged in 1',
    loggedInBase1
  )

  const loggedInBase2: AppState
  = assign(notLoggedInBase, {
    Login: {
      Credentials: {
        FirstName: 'Bugs',
        LastName: 'Bunny',
        Profile: pra1,
        Id: 'pa0'
      },
      IsLoggedIn: true,
      UserItems: [],
    }
  })

  add(//////////////////
    'Login/Logged in 2',
    loggedInBase2
  )

  const discoverBase1: AppState
  = assign(loggedInBase1, {
    Device: {
      URL: '/discovering'
    },
    Discover: {
      Pea: pe$0,
      Pod: pod$,
      Matches: <M.PodMatch[]> [
        { Id: 'm-a', Pod: poda, Status: M.PodMatchStatus.NOT_RESPONDED },
        { Id: 'm-b', Pod: podb, Status: M.PodMatchStatus.ACCEPTED },
        { Id: 'm-c', Pod: podc, Status: M.PodMatchStatus.REJECTED },
        { Id: 'm-a1', Pod: poda, Status: M.PodMatchStatus.NOT_RESPONDED },
        { Id: 'm-b1', Pod: podb, Status: M.PodMatchStatus.NOT_RESPONDED },
        { Id: 'm-c1', Pod: podc, Status: M.PodMatchStatus.NOT_RESPONDED },
      ],
      IsDiscovering: true,
      ShowDiscover: true,
      IsPodLocked: false,
      InvitationOptions: {
        Friends: [ fr1, fr2 ]
      },
      ShowAvailabilityOptions: false,
      ShowInvitationOptions: false
    }
  })

  add(//////////////////
    'Discover/Base',
    discoverBase1
  )

  add(//////////////////
    'Discover/Show Availability',
    discoverBase1,
    { Discover: { ShowAvailabilityOptions: true } }
  )

  add(//////////////////
    'Discover/Show Invitations',
    discoverBase1,
    { Discover: { ShowInvitationOptions: true } }
  )

  // TODO Future mocks please retain comment delimiters,
  // These help us visually delimit this file.

  return res;
})();

Object.freeze(MOCK_STATES)


export function getMockState(name: string) {
  return MOCK_STATES.find(state => state.name === name)
}

function state (arr: MockState[]) {
  return function AddMockState (name: string, state: AppState, partial?: PartialAppState): void {
    state = assign(state, partial)
    arr.push({ name, state })
  }
}

function assign (state: AppState, partial?: PartialAppState): AppState {
  state = mergeWith({}, state)
  if (partial != null) {
    mergeWith(state, partial, mergeExceptArrays)
  }
  return state
}

export const MOCK_STATE_KEYS = MOCK_STATES.map(state => state.name)
