import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantWorkExperianceComponent } from './applicant-work-experiance.component';

describe('ApplicantWorkExperianceComponent', () => {
  let component: ApplicantWorkExperianceComponent;
  let fixture: ComponentFixture<ApplicantWorkExperianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantWorkExperianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantWorkExperianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
