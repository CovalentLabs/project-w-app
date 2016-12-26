import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
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

  radioform = new FormGroup({
    apradio: new FormControl('AM')
  })

  private isAm = true
  private hours: number
  private minutes: number

  constructor() {
    this.radioform.valueChanges.subscribe((n) => {
      console.log(n)
      const apradio = this.radioform.controls['apradio']
      console.log(apradio.value)
    })
  }

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

    const apvalue = this.value.getHours() < 12 ? 'AM' : 'PM'
    this.radioform.controls['apradio'].setValue(apvalue)
  }

  onChange() {
    this.change.emit()
  }
}
