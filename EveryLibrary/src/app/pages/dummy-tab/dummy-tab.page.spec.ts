import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyTabPage } from './dummy-tab.page';

describe('DummyTabPage', () => {
  let component: DummyTabPage;
  let fixture: ComponentFixture<DummyTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
