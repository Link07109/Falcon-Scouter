import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const customValueProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterComponent),
    multi: true
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
    providers: [ customValueProvider ]
})
export class CounterComponent implements ControlValueAccessor {

  numberToChange = 0
  
  valuee = ''

  @Input()
  name: string

  @Input()
  lower: number

  @Input()
  upper: number

  @Output()
  value = new EventEmitter()

  propagateChange: any = () => {}

  constructor() { }

  add() {
    this.numberToChange += (this.numberToChange >= this.upper) ? 0 : 1
    this.value.emit(this.numberToChange)
  }

  remove() {
    this.numberToChange -= (this.numberToChange <= this.lower) ? 0 : 1
    this.value.emit(this.numberToChange)
  }

  writeValue(value: any) {
    // if (value) {
    //   this.numberToChange = value
    // }
  }
  
  registerOnChange(fn) {
    this.propagateChange = fn
  }
  registerOnTouched(fn: () => void): void { }
  
  onChange(event) {
    console.log(event)
    this.propagateChange(this.numberToChange + 1)
  }

}
