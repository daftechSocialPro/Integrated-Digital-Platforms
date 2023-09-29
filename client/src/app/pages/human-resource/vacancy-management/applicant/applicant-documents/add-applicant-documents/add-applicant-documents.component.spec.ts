import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantDocumentsComponent } from './add-applicant-documents.component';

describe('AddApplicantDocumentsComponent', () => {
  let component: AddApplicantDocumentsComponent;
  let fixture: ComponentFixture<AddApplicantDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicantDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplicantDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
