import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScsServicchargeComponent } from './add-scs-serviccharge.component';

describe('AddScsServicchargeComponent', () => {
  let component: AddScsServicchargeComponent;
  let fixture: ComponentFixture<AddScsServicchargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScsServicchargeComponent]
    });
    fixture = TestBed.createComponent(AddScsServicchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
