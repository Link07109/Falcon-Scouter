import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditorPage } from './form-editor.page';

describe('FormEditorPage', () => {
  let component: FormEditorPage;
  let fixture: ComponentFixture<FormEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
