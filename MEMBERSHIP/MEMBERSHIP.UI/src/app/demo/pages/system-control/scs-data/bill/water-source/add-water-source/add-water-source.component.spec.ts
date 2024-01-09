import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaterSourceComponent } from './add-water-source.component';

describe('AddWaterSourceComponent', () => {
  let component: AddWaterSourceComponent;
  let fixture: ComponentFixture<AddWaterSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWaterSourceComponent]
    });
    fixture = TestBed.createComponent(AddWaterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
