import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelliPage } from './appelli.page';

describe('AppelliPage', () => {
  let component: AppelliPage;
  let fixture: ComponentFixture<AppelliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppelliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
