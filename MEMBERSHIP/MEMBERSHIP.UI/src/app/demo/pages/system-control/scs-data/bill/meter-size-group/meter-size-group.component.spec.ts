import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterSizeGroupComponent } from './meter-size-group.component';

describe('MeterSizeGroupComponent', () => {
  let component: MeterSizeGroupComponent;
  let fixture: ComponentFixture<MeterSizeGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterSizeGroupComponent]
    });
    fixture = TestBed.createComponent(MeterSizeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
