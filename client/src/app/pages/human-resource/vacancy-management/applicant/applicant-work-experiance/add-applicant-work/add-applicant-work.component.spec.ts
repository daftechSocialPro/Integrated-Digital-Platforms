import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantWorkComponent } from './add-applicant-work.component';

describe('AddApplicantWorkComponent', () => {
  let component: AddApplicantWorkComponent;
  let fixture: ComponentFixture<AddApplicantWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicantWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplicantWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
