
import * as S from './shared'

import { LobbyItem } from './lobby-item.model'

export
type Lobby = {
  HasGroup: boolean
  Group: S.Group
  LobbyItems: LobbyItem[]
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
  HasGroup: false,
  Group: null,
  LobbyItems: null,
  ItemOptions: null,
  Editing: null,
  Deleting: null
}
