
import * as M from '@app/core/model'

export
const DefaultAppState: M.AppState = {

  Login: {
    IsLoggedIn: false,
    HasLoggedOut: false,
    LoginError: null,
    Credentials: null,
  }

}
