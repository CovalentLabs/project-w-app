import { Injectable } from '@angular/core'

import { AppStateService, ActionUpdate } from '@app/core/app-state'
import * as M from '@app/core/model'

@Injectable()
export class LoginActions {
  constructor(private app: AppStateService) {}

  /**
   * Each action creates an update which is tracked on a timeline
   * for feedback/error reports and debugging ease.
   */
  promptLogin() {
    const update: ActionUpdate = this.app.action("Prompt Login")

    setTimeout(
      () => update("Successfully Logged In as Cole!", createLoggedInUpdate('Cole', 'Lawrence', '1')),
      1500
    )
  }

  /**
   * Can we use decorators to simplify our A/B testing strategies?
   */
  promptLogout() {
    const update: ActionUpdate = this.app.action("Prompt Logout")

    createLoggedOutUpdate()
      .then(partial => update("Successfully Logged Out", partial))
      .catch(partial => update("Failed to Log Out", partial))
  }
}

function createLoggedOutUpdate() {
  // promise to resolve.
  return new Promise<M.PartialAppState>((resolve) => {
    resolve({
      Login: {
        IsLoggedIn: false,
        HasLoggedOut: true,
        Credentials: null
      }
    })
  })
}

function createLoggedInUpdate(firstname: string, lastname: string, user_id: string): M.PartialAppState {
  // return a partial update to the device state
  return {
    Login: {
      IsLoggedIn: true,
      HasLoggedOut: false,
      Credentials: {
        FirstName: firstname,
        LastName: lastname,
        Profile: {
          Id: user_id + 'p',
          Tagline: 'Some tagline',
          FirstName: firstname,
        },
        Id: user_id
      }
    }
  }
}
