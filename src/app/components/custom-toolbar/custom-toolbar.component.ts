import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.scss']
})
export class CustomToolbarComponent {

  constructor() { }

  @Input()
  title: string

  @Input()
  startIcon: string

  @Input()
  endIcon: string

  @Output()
  startClicked = new EventEmitter()

  @Output()
  endClicked = new EventEmitter()

  startClick() {
    this.startClicked.emit()
  }

  endClick() {
    this.endClicked.emit()
  }

}
