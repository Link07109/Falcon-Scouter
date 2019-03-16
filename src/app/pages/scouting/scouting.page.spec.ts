import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutingPage } from './scouting.page';

describe('FormEditorPage', () => {
  let component: ScoutingPage;
  let fixture: ComponentFixture<ScoutingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoutingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoutingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
