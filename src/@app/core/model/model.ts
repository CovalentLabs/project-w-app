
import { Login } from './login.model'

export
type Model = {
  Login: Login
}

export
type PartialModel = {
  [P in keyof Model]?: Partial<Model[P]>
}

// Helper to define Partials
// This is a feature od
type Partial<T> = {
    [P in keyof T]?: T[P];
}
