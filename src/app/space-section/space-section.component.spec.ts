import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceSectionComponent } from './space-section.component';

describe('SpaceSectionComponent', () => {
  let component: SpaceSectionComponent;
  let fixture: ComponentFixture<SpaceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
