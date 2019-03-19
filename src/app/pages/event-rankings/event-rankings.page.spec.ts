import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRankingsPage } from './event-rankings.page';

describe('EventInfoPage', () => {
  let component: EventRankingsPage;
  let fixture: ComponentFixture<EventRankingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRankingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRankingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
