import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

// import moment = require('moment')

@Component({
  selector: 'pw-input-time',
  template: require('./input-time.component.html'),
  styles: [
    require('./input-time.component.scss'),
  ]
})
export class InputTimeComponent implements OnInit, OnChanges {
  @Input() value: Date
  @Output() change = new EventEmitter<Date>()

  private isAm = true
  private hours: number
  private minutes: number

  constructor() {}

  ngOnInit() {
    // on init
    this.ngOnChanges()
  }

  ngOnChanges() {
    this.hours = this.value.getHours() % 12
    if (this.hours === 0) {
      this.hours = 12
    }

    this.minutes = this.value.getMinutes()

    this.isAm = this.value.getHours() < 12
  }

  onChange() {
    this.change.emit()
  }
}
