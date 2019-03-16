import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSchedulePage } from './match-schedule.page';

describe('DashPage', () => {
  let component: MatchSchedulePage;
  let fixture: ComponentFixture<MatchSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
