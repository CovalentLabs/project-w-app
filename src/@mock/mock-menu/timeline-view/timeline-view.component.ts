import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Timeline, TimelineEntry } from '@app/core'

@Component({
  selector: 'pw-timeline-view',
  template: require('./timeline-view.component.html'),
  styles: [
    require('./timeline-view.component.scss'),
  ]
})
export class TimelineViewComponent {
  @Input() timeline: Timeline
  @Output() selectEntry = new EventEmitter<any>()

  onClick(entry: TimelineEntry) {
    this.selectEntry.emit(entry.id)
  }
}
