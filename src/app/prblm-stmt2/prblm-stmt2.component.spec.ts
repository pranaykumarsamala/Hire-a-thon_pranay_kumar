import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrblmStmt2Component } from './prblm-stmt2.component';

describe('PrblmStmt2Component', () => {
  let component: PrblmStmt2Component;
  let fixture: ComponentFixture<PrblmStmt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrblmStmt2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrblmStmt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
