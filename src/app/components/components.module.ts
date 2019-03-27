import { NgModule } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { IonicModule } from '@ionic/angular';
import { CustomToolbarComponent } from './custom-toolbar/custom-toolbar.component';
import { CustomSelectorComponent } from './custom-selector/custom-selector.component';
import {CommonModule} from '@angular/common'
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CounterComponent, CustomToolbarComponent, CustomSelectorComponent],
    imports: [IonicModule, CommonModule, FormsModule],
    exports: [CounterComponent, CustomToolbarComponent, CustomSelectorComponent]
})
export class ComponentsModule {}
