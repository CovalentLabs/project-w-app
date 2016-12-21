import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Folder } from '../mock-state-selector.component'

@Component({
  selector: 'pw-mock-tree-view',
  template: require('./mock-tree-view.component.html'),
  styles: [
    require('./mock-tree-view.component.scss'),
  ]
})
export class MockTreeViewComponent implements OnInit {
  @Input() folder: Folder
  @Output() select = new EventEmitter<string>()

  constructor() {}

  ngOnInit() {
    // on init
  }

  onSelect(key: string) {
    this.select.emit(key)
  }
}
