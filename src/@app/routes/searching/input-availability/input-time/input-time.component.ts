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

  timeform = new FormGroup({
    apradio: new FormControl('AM'),
    hours: new FormControl(0),
    minutes: new FormControl(0),
  })

  constructor() {
    this.timeform.valueChanges.subscribe((n) => {
      console.log(n)
      const apradio = this.timeform.controls['apradio']
      console.log(apradio.value)
    })
  }

  alert() { alert.apply(this, arguments) }

  ngOnInit() {
    // on init
    this.ngOnChanges()
  }

  ngOnChanges() {
    console.log(this.timeform.controls)
    const { apradio, hours, minutes } = this.timeform.controls
    const hs = this.value.getHours() % 12 || 12
    hours.setValue(hs)

    minutes.setValue(this.value.getMinutes())

    const apvalue = this.value.getHours() < 12 ? 'AM' : 'PM'
    apradio.setValue(apvalue)
  }

  onChange() {
    this.change.emit()
  }
}
