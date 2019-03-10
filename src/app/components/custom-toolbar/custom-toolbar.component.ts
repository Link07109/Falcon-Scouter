import { Component, Input } from '@angular/core';
import { PopoverPage } from '../../pages/popover/popover.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.scss']
})
export class CustomToolbarComponent {

  constructor(private popoverController: PopoverController,) { }

  @Input()
  title: string

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    })
    popover.present()
  }
}
