/**
 * Here, we establish Data structures which are easier to use than
 * base datastructures provided by JavaScript, and typing is nice.
 * Thank you @Basarat for typescript-collections.
 */

import { Dictionary, Set } from 'typescript-collections'

import * as MLI from '@app/core/model/lobby-item.model'

export
class ItemsDictionary extends Dictionary<string, MLI.LobbyItem> {
  constructor() {
    super()
  }
  add(item: MLI.LobbyItem) {
    if (!this.containsKey(item.Id)) {
      this.setValue(item.Id, item)
    }
  }
}

export
class ReactionsDictionary extends Dictionary<MLI.LobbyItem, ReactionDictionary> {
  constructor(private posts: ItemsDictionary) {
    super(LobbyItemToString)
  }

  // TODO Remove Reaction
  // Keep track of where lobby items are being reacted... something something

  addReaction(reaction: MLI.LobbyItem) {
    if (reaction.Type !== MLI.LobbyItemType.REACTION) {
      // LobbyItem of wrong type, so return.
      return
    }
    const data = <MLI.DataReaction> reaction.Data
    const post = this.posts.getValue(data.ItemId)
    if (post == null) {
      console.error(`Received unknown reaction data ItemId "${data.ItemId}"!`)
      return
    }
    const reactions = this.ensurePost(post)
    reactions.addReaction(reaction)
  }

  // Gets value for post, if it doesn't exist, it sets it and returns it.
  ensurePost(post: MLI.LobbyItem): ReactionDictionary {
    let res = this.getValue(post)
    if (res == null) {
      res = new ReactionDictionary()
      this.setValue(post, res)
    }

    return res
  }
}


// If the DataType for reaction value ever changes,
// then we should update it here as well.
type ReactionValue = string

class ReactionDictionary extends Dictionary<ReactionValue, LobbyItemSet> {
  constructor() {
    super()
  }

  // Maybe this will be indexed...
  hasReaction(reaction: MLI.LobbyItem): boolean {
    if (reaction.Type !== MLI.LobbyItemType.REACTION) {
      // LobbyItem of wrong type, so return.
      return false
    }

    // TODO check for Reaction
    return true
  }

  removeReaction(reaction: MLI.LobbyItem) {
    if (!this.hasReaction(reaction)) {
      return
    }
    // TODO remove reaction
  }

  addReaction(reaction: MLI.LobbyItem) {
    if (reaction.Type !== MLI.LobbyItemType.REACTION) {
      // LobbyItem of wrong type, so return.
      return
    }
    const data = <MLI.DataReaction> reaction.Data

    const value: ReactionValue = data.Reaction

    // Get value for ReactionValue, if it doesn't exist, it sets it.
    let res = this.getValue(value)
    if (res == null) {
      res = new LobbyItemSet()
      this.setValue(value, res)
    }

    // Add LobbyItem Reaction to reaction.
    res.add(reaction)
  }
}

export
class LobbyItemSet extends Set<MLI.LobbyItem> {
  constructor() {
    super(LobbyItemToString)
  }
}

function LobbyItemToString(item: MLI.LobbyItem): string {
  return item.Id
}
