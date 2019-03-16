import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-custom-selector',
  templateUrl: './custom-selector.component.html',
  styleUrls: ['./custom-selector.component.scss']
})
export class CustomSelectorComponent {

  @Input()
  name

  @Input()
  options

  constructor() { }

}
