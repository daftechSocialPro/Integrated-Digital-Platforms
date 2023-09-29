import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantEducationComponent } from './add-applicant-education.component';

describe('AddApplicantEducationComponent', () => {
  let component: AddApplicantEducationComponent;
  let fixture: ComponentFixture<AddApplicantEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicantEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplicantEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
