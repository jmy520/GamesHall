import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeBoxValidateComponent } from './safe-box-validate.component';

describe('SafeBoxValidateComponent', () => {
  let component: SafeBoxValidateComponent;
  let fixture: ComponentFixture<SafeBoxValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeBoxValidateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeBoxValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
