import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

import { RenderedItem } from '../../../../lobby-renderer'

@Component({
  selector: 'pw-item-reactions',
  template: require('./item-reactions.component.html'),
  styles: [
    require('./item-reactions.component.scss'),
  ]
})
export class ItemReactionsComponent implements OnInit {
  @Output() options = new EventEmitter()
  @Input() renderedItem: RenderedItem

  ngOnInit() {
    console.log(
      "reactions",
      this.renderedItem.Data,
      this.renderedItem && this.renderedItem.Reactions
    )
  }
}
