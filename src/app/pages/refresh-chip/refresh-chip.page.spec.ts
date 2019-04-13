import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshChipPage } from './refresh-chip.page';

describe('RefreshChipPage', () => {
  let component: RefreshChipPage;
  let fixture: ComponentFixture<RefreshChipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshChipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshChipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
