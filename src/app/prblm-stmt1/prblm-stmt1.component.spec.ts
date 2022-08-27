import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrblmStmt1Component } from './prblm-stmt1.component';

describe('PrblmStmt1Component', () => {
  let component: PrblmStmt1Component;
  let fixture: ComponentFixture<PrblmStmt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrblmStmt1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrblmStmt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
