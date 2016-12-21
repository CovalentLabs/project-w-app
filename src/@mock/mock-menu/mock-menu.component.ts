import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { getMockState, MOCK_STATE_KEYS, MockState } from '@mock/states'

import { AppStateService, AppState } from '@app/core'
import { Subscription } from 'rxjs'

type FolderItem = { name: string, key: string }
export
type Folder = { name: string, children: Folder[] } | FolderItem

@Component({
  selector: 'pw-mock-menu',
  template: require('./mock-menu.component.html'),
  styles: [
    require('./mock-menu.component.scss'),
  ]
})
export class MockMenuComponent implements OnDestroy, OnInit {
  // Overall AppState
  AppState: AppState
  private _stateSub: Subscription

  mockStateKeys: string[] = []
  @Output() selectState = new EventEmitter<MockState>()

  showState = false
  mockSelectionOpen = false

  mockStateFolders: Folder[] = []
  constructor(private _app: AppStateService) {
    this.mockStateKeys = MOCK_STATE_KEYS

    this.setupFolders()

    this._stateSub = this._app.state
      .subscribe(appState => this.AppState = appState)
  }

  select(key: string) {
    this.setState(getMockState(key))
  }

  setState(ms: MockState) {
    const update = this._app.action("Mock Update State", 'reset')

    update("Mock:" + ms.name, ms.state)
  }

  toggleMockMenu(show?: boolean) {
    if (show == null) {
      show = !this.AppState.Mock.ShowMockMenu
    }
    const update = this._app.action("Mock ShowMockMenu", 'skip')

    update(show ? 'Show' : 'Hide',  {
      Mock: { ShowMockMenu: show }
    })
  }

  toggleDebugState(show?: boolean) {
    if (show == null) {
      show = !this.AppState.Mock.ShowDebugState
    }
    const update = this._app.action("Mock ShowDebugState", 'skip')

    update(show ? 'Show' : 'Hide',  {
      Mock: { ShowDebugState: show }
    })
  }

  setupFolders() {
    let keys = this.mockStateKeys
    let contents = createFolders(keys)
    this.mockStateFolders = contents
  }

  ngOnInit() {
    // trigger update so AppState becomes set.
    this._app.next()
  }

  ngOnDestroy() {
    // free up resources by unsubscribing.
    this._stateSub.unsubscribe()
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
      .map(pre => ({ name: pre, children: createFolders(items[pre], prefix + pre) }))
  )
}
