import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterClassComponent } from './meter-class.component';

describe('MeterClassComponent', () => {
  let component: MeterClassComponent;
  let fixture: ComponentFixture<MeterClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeterClassComponent]
    });
    fixture = TestBed.createComponent(MeterClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
