import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormEditorPage } from './form-editor.page';

import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: FormEditorPage
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
  declarations: [FormEditorPage]
})
export class FormEditorPageModule {}
