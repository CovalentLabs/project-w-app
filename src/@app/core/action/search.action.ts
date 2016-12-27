import { Injectable } from '@angular/core'

import { AppStateService, ActionUpdate, EffectUpdate } from '@app/core/app-state'

import moment = require('moment')

function reltime(num: number, unit: moment.unitOfTime.DurationConstructor): Date {
  return moment().add(num, unit).toDate()
}

@Injectable()
export class SearchActions {
  constructor(private app: AppStateService) {}

  stopSearch() {
    const update: ActionUpdate = this.app.action("Searching")

    // Kick off showing the SearchBar which will have a spinner
    // as IsSearching is likely false
    update("Stopping", {
      Search: {
        // Show Search Header Bar at top of app
        ShowSearch: false,
        IsSearching: false
      },
      Device: {
        // Navigate to search page
        URL: '/home'
      }
    })
  }

  startSearch() {
    const update: ActionUpdate = this.app.action("Searching")

    const state = this.app.getState()

    // Kick off showing the SearchBar which will have a spinner
    // as IsSearching is likely false
    update("Setting Up", {
      Search: {
        // Show Search Header Bar at top of app
        ShowSearch: true
      },
      Device: {
        // Navigate to search page
        URL: '/searching'
      }
    })

    // TODO: Everything here would be triggered by Server communication

    const server_update: EffectUpdate = this.app.effect("Searching")

    // Start Search channel
    let pea = {
      Id: 'pea0',
      Availability: [{ Id: 'p0av0', Start: reltime(1, 'hour'), End: reltime(3, 'hours') }],
      Profile: state.Login.Credentials.Profile
    }

    setTimeout(
      () => server_update("Started", {
        Search: {
          IsSearching: true,
          ShowSearch: true,
          Pea: pea,
          Pod: {
            Id: 'pod0p0',
            Peas: [pea]
          },
          Matches: [],
          InvitationOptions: {
            Friends: []
          },
        }
      }),
      1500
    )
  }

  toggleShowAvailability(show?: boolean) {
    const update: ActionUpdate = this.app.action("Search Toggle ShowAvailabilityOptions")

    // If no value, then toggle
    if (show == null) {
      show = !this.app.getState().Search.ShowAvailabilityOptions
    }

    update(show ? "Show" : "Hide", {
      Search: {
        ShowAvailabilityOptions: show
      }
    })
  }

  // Toggle the options menu for showing friends you may invite.
  toggleShowInvitationOptions(show?: boolean) {
    const update: ActionUpdate = this.app.action("Search Toggle ShowInvitationOptions")

    // If no value, then toggle
    if (show == null) {
      show = !this.app.getState().Search.ShowInvitationOptions
    }

    // TODO: Should we populate the InvitationOptions now?

    update(show ? "Show" : "Hide", {
      Search: {
        ShowInvitationOptions: show
      }
    })
  }
}
