import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotePage } from './promote.page';

describe('PromotePage', () => {
  let component: PromotePage;
  let fixture: ComponentFixture<PromotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
