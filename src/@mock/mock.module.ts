import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'

// Mock State Selector
import { MockStateSelectorComponent } from './mock-state-selector/mock-state-selector.component'
import { MockTreeViewComponent } from './mock-state-selector/mock-tree-view/mock-tree-view.component'

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ MockStateSelectorComponent, MockTreeViewComponent ],
  exports: [ MockStateSelectorComponent ],
  providers:    [
    // Mock Providers?
  ]
})
export class MockModule { }
