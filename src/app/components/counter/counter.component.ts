import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  numberToChange = 0

  @Input()
  name: string

  @Input()
  lower: number

  @Input()
  upper: number

  @Output()
  value = new EventEmitter()

  constructor() { }

  add() {
    this.numberToChange += (this.numberToChange >= this.upper) ? 0 : 1
    this.value.emit(this.numberToChange)
  }

  remove() {
    this.numberToChange -= (this.numberToChange <= this.lower) ? 0 : 1
    this.value.emit(this.numberToChange)
  }

}
