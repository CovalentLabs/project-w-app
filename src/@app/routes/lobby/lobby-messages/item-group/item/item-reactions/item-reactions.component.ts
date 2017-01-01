import { Component, Output, Input, EventEmitter } from '@angular/core';

import { RenderedItem } from '@app/core/data'

import { LobbyActions } from '@app/core'

@Component({
  selector: 'pw-item-reactions',
  template: require('./item-reactions.component.html'),
  styles: [
    require('./item-reactions.component.scss'),
  ]
})
export class ItemReactionsComponent {
  @Output() react = new EventEmitter<string>()
  @Input() renderedItem: RenderedItem

  constructor(private _lobby: LobbyActions) {}

  onAddReaction(value?: string) {
    this.react.emit(value)
  }
}
