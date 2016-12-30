
import * as S from './shared'

import { LobbyItem } from './lobby-item.model'

export
type Lobby = {
  Group: S.Group
  LobbyItems: LobbyItem[]
  // tracking data from Phoenix (send since last received)
  LastReceivedItem: LobbyItem,
  // For showing unseen notifications
  UnseenItems: LobbyItem[],
  // If set, show modal for responding.
  ItemOptions: {
    LobbyItem: LobbyItem
    // FUTURE: Do we want to show previous versions of this message?
    // Versions: LobbyItem[], // Versions/PastVersions etc..
  }
  // If set, show modal for editing.
  Editing: LobbyItem
  // If set, show modal for confirmation.
  Deleting: LobbyItem
}

export
const DefaultLobby: Lobby = {
  Group: null,
  LobbyItems: null,
  LastReceivedItem: null,
  UnseenItems: [],
  ItemOptions: null,
  Editing: null,
  Deleting: null
}
