
import { Profile } from './shared'

export
type Login = {
  IsLoggedIn: boolean

  // TODO: review ways to architect in-progress updates to see
  // if there is a way to track which tasks are in progress...
  // initial thought is an ActionsInProgress Array on the state
  // OR, we can just keep track of it on a component level.
  // IsLoggingIn: boolean

  // TODO: Review whether there is a better way to keep track
  // of a dismissable message like this, that really only
  // needs to appear once, so that in the future we aren't
  // needing to introduce incredibly complex updates.
  // OR, we could start composing updates together, so
  // `setsLoginState` returns a partial already turning
  // a feature, like this one, off.
  HasLoggedOut: boolean

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
