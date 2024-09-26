import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitIndicatorsComponent } from './unit-indicators.component';

describe('UnitIndicatorsComponent', () => {
  let component: UnitIndicatorsComponent;
  let fixture: ComponentFixture<UnitIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
