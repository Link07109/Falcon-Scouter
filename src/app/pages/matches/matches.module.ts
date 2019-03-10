import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IgxCategoryChartModule } from 'igniteui-angular-charts/ES5/igx-category-chart-module';

import { MatchesPage } from './matches.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    IgxCategoryChartModule,
    RouterModule.forChild([
      {
        path: '',
        component: MatchesPage
      }
    ])
  ],
  declarations: [MatchesPage]
})
export class MatchesPageModule {}
