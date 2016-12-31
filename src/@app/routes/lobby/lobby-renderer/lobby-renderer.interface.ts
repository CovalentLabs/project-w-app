
import * as M from '@app/core/model'
import * as MLI from '@app/core/model/lobby-item.model'

export
type RenderedItem = {
  ItemId: string,
  Data: MLI.LobbyItemTypeAndData,
  Reactions: {
    // Unique for Array
    Reaction: string,

    // All Items with this Reaction.
    Items: {
      ItemId: string,
      Profile: M.Profile
    }[]
  }[],
  IsEdited: boolean,
  IsDeleted: boolean,
}

export
type RenderedItemGroup = {
  Profile: M.Profile,
  PostedAt: Date,
  Items: RenderedItem[],
}
