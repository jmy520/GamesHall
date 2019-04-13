import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeBoxPage } from './safe-box.page';

describe('SafeBoxPage', () => {
  let component: SafeBoxPage;
  let fixture: ComponentFixture<SafeBoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeBoxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
