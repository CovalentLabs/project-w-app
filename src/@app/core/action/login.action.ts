import { Injectable } from '@angular/core'

import { AppStateService, ActionUpdate } from '@app/core/app-state'
import * as M from '@app/core/model'

@Injectable()
export class LoginActions {
  constructor(private app: AppStateService) {}

  /**
   * My goal is to decorate these functions so that upon call, we can store
   * the arguments passed to it,
   * and then we can replay the function calls over again in the future for
   * extremely easy testing set up.
   * Now, in this case with Action, we are able to store the update produced
   * by the prompt and apply it to our app's state.
   */
  promptLogin() {
    const update: ActionUpdate = this.app.action("Prompt Login")

    setTimeout(
      () => update("Successfully Logged In", createLoggedInUpdate('Cole', 'Lawrence', '1')),
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
        Profile: {},
        UserId: user_id
      }
    }
  }
}
