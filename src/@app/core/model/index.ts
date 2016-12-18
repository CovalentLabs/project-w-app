
import { Login } from './login.model'
export { Login }

// The interface of our entire application's state.
// Here defines every part of the application which
// can be modified for the user.
export
type AppState = {
  Login: Login
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
