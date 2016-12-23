import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export
type TimeRange = { from: Date, to: Date }

@Component({
  selector: 'pw-input-availability',
  template: require('./input-availability.component.html'),
  styles: [
    require('./input-availability.component.scss'),
  ]
})
export class InputAvailabilityComponent implements OnInit {
  @Input() default: TimeRange
  @Output() confirm = new EventEmitter<TimeRange>()

  from: Date
  to: Date

  constructor() {}

  ngOnInit() {
    // on init
    if (this.default) {
      this.from = this.default.from
      this.to = this.default.to
    } else {
      this.from = new Date
      this.to = new Date
    }
  }

  onConfirm() {
    // TODO Actually update from and to when time inputs change
    this.confirm.emit({ from: this.from, to: this.to })
  }
}
