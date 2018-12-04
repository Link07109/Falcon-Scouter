import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderPage } from './form-builder.page';

describe('FormBuilderPage', () => {
  let component: FormBuilderPage;
  let fixture: ComponentFixture<FormBuilderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuilderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
