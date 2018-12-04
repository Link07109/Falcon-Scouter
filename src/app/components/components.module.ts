import { NgModule } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [CounterComponent],
    imports: [IonicModule],
    exports: [CounterComponent]
})
export class ComponentsModule {}
