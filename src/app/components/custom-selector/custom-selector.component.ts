import {Component, Input, EventEmitter, forwardRef, Output} from '@angular/core'

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const customValueProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelectorComponent),
    multi: true
}

@Component({
  selector: 'app-custom-selector',
  templateUrl: './custom-selector.component.html',
  styleUrls: ['./custom-selector.component.scss']
})
export class CustomSelectorComponent implements ControlValueAccessor {

  @Input()
  name

  @Input()
  options

  @Output()
  value = new EventEmitter()

  hi = ''

  propagateChange: any = () => {}

  constructor() { }

  writeValue(value: any) {
    if (value) {
      this.hi = value
      this.value.emit(this.hi)
    }
  }
  
  registerOnChange(fn) {
    this.propagateChange = fn
  }
  registerOnTouched(fn: () => void): void { }
  
  onChange(event) {
    console.log(event)
    this.propagateChange(event.target.value)
  }

}
