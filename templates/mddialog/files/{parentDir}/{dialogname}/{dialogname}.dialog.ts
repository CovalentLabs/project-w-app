import { Component } from '@angular/core'
import { MdDialogRef } from '@angular/material'

import { ItemDialog, ItemDialogOptions } from '../item-dialog.interface'

import * as M from '@app/core/model'
import * as MLI from '@app/core/model/lobby-item.model'
import { AppStateService, LobbyActions } from '@app/core'

@Component({
  selector: 'pw-dialog-<%=dialogname%>',
  template: require('./<%=dialogname%>.dialog.html')
})
export class <%=DialogName%>DialogComponent implements ItemDialog {

  content: string = null
  itemId: string = null

  constructor(
      private app: AppStateService,
      private lobby: LobbyActions,
      public dialogRef: MdDialogRef<<%=DialogName%>DialogComponent>
  ) {}

  set(options: ItemDialogOptions) {
    this.itemId = options.Post.Id

    if (options.Post.Type === M.LobbyItemType.TEXT) {
      const data = <MLI.DataText> options.Data
      this.content = data
    }
  }

  onConfirm(doEdit: boolean) {
    if (doEdit) {
      // lobby action to delete
      // this.lobby.editText(this.itemId, this.content)
    }
    // close dialog
    this.dialogRef.close()
  }
}
