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
  icon = 'more'

  @Output()
  notify = new EventEmitter()

  emitClick() {
    if (this.icon == 'more') {
      this.presentPopover(event)
      return
    }
    this.notify.emit()
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
