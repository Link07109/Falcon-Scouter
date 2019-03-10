import { NgModule } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { IonicModule } from '@ionic/angular';
import { CustomToolbarComponent } from './custom-toolbar/custom-toolbar.component';

@NgModule({
    declarations: [CounterComponent, CustomToolbarComponent],
    imports: [IonicModule],
    exports: [CounterComponent, CustomToolbarComponent]
})
export class ComponentsModule {}
