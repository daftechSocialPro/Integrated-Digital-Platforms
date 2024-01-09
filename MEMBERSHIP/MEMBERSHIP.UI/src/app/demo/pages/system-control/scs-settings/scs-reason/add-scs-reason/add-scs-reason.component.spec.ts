import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScsReasonComponent } from './add-scs-reason.component';

describe('AddScsReasonComponent', () => {
  let component: AddScsReasonComponent;
  let fixture: ComponentFixture<AddScsReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScsReasonComponent]
    });
    fixture = TestBed.createComponent(AddScsReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
