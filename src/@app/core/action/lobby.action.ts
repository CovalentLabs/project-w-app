import { Injectable } from '@angular/core'

import { AppStateService } from '@app/core/app-state'

import * as M from '@app/core/model'

import moment = require('moment')
function reltime(num: number, unit: moment.unitOfTime.DurationConstructor): Date {
  return moment().add(num, unit).toDate()
}

@Injectable()
export class LobbyActions {
  constructor(private app: AppStateService) {}

  // TODO set up listener to phoenix channel coming back
  // TODO: Listen for new LobbyItems,
  //   Note which Items are ours, (establish common pattern to be used with Pea and Pods)
  //   Reduce Deletes,
  //   Reduce Edits,
  //   Collect Reactions,
  //   etc,

  sendText(body: string) {
    // TODO
    const message = {
      op: 'post_text',
      body: body
    }
    // push(message)
  }

  editText(target: M.LobbyItem, body: string) {
    // TODO push up change
    const message = {
      op: 'edit_text',
      id: target.Id,
      body: body
    }
    // push(message)
  }

  deleteText(target: M.LobbyItem) {
    // TODO send message to delete text
    const message = {
      op: 'delete_text',
      id: target.Id
    }
    // push(message)
  }

  react(item: M.LobbyItem, reaction: string) {
    // TODO note that our pod accepts the other pod
    const message = {
      op: 'post_react',
      // Item we are reacting to
      item_id: item.Id,
      reaction: reaction,
    }
    // push(message)
  }

  showItemOptions(item: M.LobbyItem) {
    // TODO action
    const update = this.app.action("Show LobbyItem Options")

    update(`Options:(${item.Id}):${item.Type}`, {
      Device: { URL: '/lobby' },
      Lobby: {
        // Only one modal may be open
        ItemOptions: { LobbyItem: item },
        Editing: null,
        Deleting: null,
      }
    })
  }

  showEditItem(item: M.LobbyItem) {
    // TODO action
    const update = this.app.action("Show Edit LobbyItem")

    update(`Edit:(${item.Id}):${item.Type}`, {
      Device: { URL: '/lobby' },
      Lobby: {
        ItemOptions: null,
        Editing: item,
        Deleting: null,
      }
    })
  }

  showDeleteItem(item: M.LobbyItem) {
    // TODO action
    const update = this.app.action("Show Delete LobbyItem Confirmation")

    update(`Delete:(${item.Id}):${item.Type}`, {
      Device: { URL: '/lobby' },
      Lobby: {
        ItemOptions: null,
        Editing: null,
        Deleting: item,
      }
    })
  }


}
