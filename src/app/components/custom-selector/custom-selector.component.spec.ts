import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectorComponent } from './custom-selector.component';

describe('CustomSelectorComponent', () => {
  let component: CustomSelectorComponent;
  let fixture: ComponentFixture<CustomSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
