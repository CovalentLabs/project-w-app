
import * as S from './shared'

export
type Discover = {
  // Discovering connection is set up and active
  IsDiscovering: boolean

  // ShowDiscover determines whether the top discover navbar shows
  // if IsDiscovering is false, then bar will show a spinner
  ShowDiscover: boolean

  IsPodLocked: boolean

  Pea: S.Pea
  Pod: S.Pod
  Matches: S.PodMatch[]
  ShowAvailabilityOptions: boolean
  ShowInvitationOptions: boolean
  InvitationOptions: {
    Friends: S.Friend[]
  }
}

export
const DefaultDiscover: Discover = {
  IsDiscovering: false,
  ShowDiscover: false,
  IsPodLocked: false,
  Pea: null,
  Pod: null,
  Matches: null,
  ShowAvailabilityOptions: false,
  ShowInvitationOptions: false,
  InvitationOptions: null
}
