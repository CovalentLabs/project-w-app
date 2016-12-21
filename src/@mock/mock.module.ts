import { NgModule }           from '@angular/core'
import { SharedModule }       from '@app/shared/shared.module'

// Mock State Selector
import { MockMenuComponent } from './mock-menu/mock-menu.component'
import { MockTreeViewComponent } from './mock-menu/mock-tree-view/mock-tree-view.component'

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ MockMenuComponent, MockTreeViewComponent ],
  exports: [ MockMenuComponent ],
  providers:    [
    // Mock Providers?
  ]
})
export class MockModule { }
