import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  minNumber = 0
  maxNumber = 8
  numberToChange = 0

  @Input()
  data: number

  @Input()
  name: string

  @Output()
  something = new EventEmitter()

  constructor() { }

  add() {
    this.numberToChange += (this.numberToChange >= this.maxNumber) ? 0 : 1
    this.something.emit({value: this.data})
  }

  remove() {
    this.numberToChange -= (this.numberToChange <= this.minNumber) ? 0 : 1
    this.something.emit({value: this.data})
  }

}
