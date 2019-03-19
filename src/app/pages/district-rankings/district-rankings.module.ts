import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DistrictRankingsPage } from './district-rankings.page';
import {ComponentsModule} from '../../components/components.module'

const routes: Routes = [
  {
    path: '',
    component: DistrictRankingsPage
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DistrictRankingsPage]
})
export class DistrictRankingsPageModule {}
