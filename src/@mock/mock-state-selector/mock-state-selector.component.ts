import { Component, Output, EventEmitter } from '@angular/core';

import { getMockState, MOCK_STATE_KEYS, MockState } from '@mock/states'

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

  mockSelectionOpen = false

  constructor() {
    this.mockStateKeys = MOCK_STATE_KEYS
  }

  select(key: string) {
    console.log(getMockState(key))
    this.selectState.emit(getMockState(key))
  }
}
