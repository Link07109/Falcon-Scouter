import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopoverPage } from '../../pages/popover/popover.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.scss']
})
export class CustomToolbarComponent {

  constructor(private popoverController: PopoverController, ) { }

  @Input()
  title: string

  @Input()
  startIcon = 'more'

  @Input()
  endIcon = 'more'

  @Output()
  startClicked = new EventEmitter()

  @Output()
  endClicked = new EventEmitter()

  startClick() {
    if (this.startIcon == 'more') {
      this.presentPopover(event)
      return
    }
    this.startClicked.emit()
  }

  endClick() {
    if (this.endIcon == 'more') {
      this.presentPopover(event)
      return
    }
    this.endClicked.emit()
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    })
    popover.present()
  }
}
