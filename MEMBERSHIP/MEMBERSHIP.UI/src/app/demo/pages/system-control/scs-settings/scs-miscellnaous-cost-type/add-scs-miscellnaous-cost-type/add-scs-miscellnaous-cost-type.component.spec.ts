import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScsMiscellnaousCostTypeComponent } from './add-scs-miscellnaous-cost-type.component';

describe('AddScsMiscellnaousCostTypeComponent', () => {
  let component: AddScsMiscellnaousCostTypeComponent;
  let fixture: ComponentFixture<AddScsMiscellnaousCostTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScsMiscellnaousCostTypeComponent]
    });
    fixture = TestBed.createComponent(AddScsMiscellnaousCostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
