
import * as S from './shared'

export
type Search = {
  IsSearching: boolean
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
const DefaultSearch: Search = {
  IsSearching: false,
  Pea: null,
  Pod: null,
  Matches: null,
  ShowAvailabilityOptions: false,
  ShowInvitationOptions: false,
  InvitationOptions: null
}
