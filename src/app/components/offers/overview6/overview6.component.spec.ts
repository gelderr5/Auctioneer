import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview5Component } from './overview6.component';

describe('Overview2Component', () => {
  let component: Overview5Component;
  let fixture: ComponentFixture<Overview5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Overview5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
