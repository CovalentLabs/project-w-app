
import { AppState, PartialAppState, MockDefault } from '@app/core'

const mergeWith = <(obj: any, source: any, customizer?: (objValue, srcValue) => any) => any> require('lodash.mergewith')
// https://lodash.com/docs/4.16.4#mergeWith
// In the future, we may be interested in customizing this further
// for better support of large message arrays maybe.
function mergeExceptArrays (objValue, srcValue) {
  if (objValue instanceof Array && srcValue instanceof Array) {
    return srcValue
  }
}

export
type MockState = { name: string, state: AppState }

const MOCK_STATES: MockState[] = (function () {
  let res: MockState[] = []
  let add = state(res)

  let notLoggedInBase: AppState = {
    Mock: MockDefault,
    Login: {
      Credentials: null,
      HasLoggedOut: false,
      IsLoggedIn: false,
      LoginError: null
    }
  }

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
        Profile: {},
        UserId: 'jr0'
      },
      IsLoggedIn: true
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
        FirstName: 'Cole',
        LastName: 'Lawrence',
        Profile: {},
        UserId: 'cl0'
      },
      IsLoggedIn: true
    }
  })

  add(//////////////////
    'Login/Logged in 2',
    loggedInBase2
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
