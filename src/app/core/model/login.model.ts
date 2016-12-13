
import { Profile } from './shared'

export
interface Login {
  IsLoggedIn: boolean

  Credentials: {
    UserId: string
    FirstName: string
    LastName: string
    Profile: Profile
  }

  LoginError: {
    ErrorId: string
    Reason: string
  }
}
