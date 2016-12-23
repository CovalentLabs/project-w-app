
import { Login, DefaultLogin } from './login.model'
export { Login, DefaultLogin }
import { Search, DefaultSearch } from './search.model'
export { Search, DefaultSearch }
import { Lobby, DefaultLobby } from './lobby.model'
export { Lobby, DefaultLobby }
import { Mock, DefaultMock } from './mock.model'
export { Mock, DefaultMock }

export * from './shared'

// The interface of our entire application's state.
// Here defines every part of the application which
// can be modified for the user.
export
type AppState = {
  Login: Login,
  Search: Search,
  Lobby: Lobby,
  Mock: Mock
}

export
const DefaultAppState: AppState = {
  Login: DefaultLogin,
  Lobby: DefaultLobby,
  Search: DefaultSearch,
  Mock: DefaultMock,
}

// PartialModel for defining update functions
export
type PartialAppState = {
  [P in keyof AppState]?: Partial<AppState[P]>
}

// Helper to define Partials
// This is a feature od
type Partial<T> = {
    [P in keyof T]?: T[P]
}
