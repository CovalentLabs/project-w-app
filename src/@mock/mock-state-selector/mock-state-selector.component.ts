import { Component, Output, EventEmitter } from '@angular/core';

import { getMockState, MOCK_STATE_KEYS, MockState } from '@mock/states'

type FolderItem = { name: string, key: string }
export
type Folder = { name: string, children: Folder[] } | FolderItem

@Component({
  selector: 'pw-mock-state-selector',
  template: require('./mock-state-selector.component.html'),
  styles: [
    require('./mock-state-selector.component.scss'),
  ]
})
export class MockStateSelectorComponent {
  mockStateKeys: string[] = []
  @Output() selectState = new EventEmitter<MockState>()

  mockSelectionOpen = true

  mockStateFolders: Folder[] = []
  constructor() {
    this.mockStateKeys = MOCK_STATE_KEYS
    this.setupFolders()
  }

  select(key: string) {
    this.selectState.emit(getMockState(key))
  }

  setupFolders() {
    let keys = this.mockStateKeys
    let contents = createFolders(keys)
    this.mockStateFolders = contents
  }
}

const prefix_re = /^[^\/]+\//
function createFolders(keys: string[], prefix = ''): Folder[] {
  const res: Folder[] = []
  const items: {[prefix: string]: string[]} = {}
  keys
    .map(key => ({ name: key.replace(prefix, ''), key: key }))
    .map(nk => {
      let match = nk.name.match(prefix_re)
      if (match) {
        let pre = match[0]
        if (!items[pre]) {
          items[pre] = []
        }
        items[pre].push(nk.key)
      } else {
        res.push(nk)
      }
    })
  return res.concat(
    Object.keys(items)
      .map(pre => ({ name: pre, children: createFolders(items[pre], pre) }))
  )
}
