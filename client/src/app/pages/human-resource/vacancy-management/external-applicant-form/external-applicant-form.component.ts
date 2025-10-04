import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VacancyService } from 'src/app/services/vacancy.service';
import { VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';

@Component({
  selector: 'app-external-applicant-form',
  templateUrl: './external-applicant-form.component.html',
  styleUrls: ['./external-applicant-form.component.css']
})
export class ExternalApplicantFormComponent implements OnInit {

  vacancyId!: string;
  vacancyDetail!: VacancyListDto;
  applicantForm!: FormGroup;
  loading = false;
  currentYear = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private vacancyService: VacancyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('vacancyId')!;
    console.log('ExternalApplicantFormComponent initialized with vacancyId:', this.vacancyId);
    this.initForm();
    this.getVacancyDetail();
  }

  initForm() {
    this.applicantForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      zoneId: ['', [Validators.required]],
      woreda: ['', [Validators.required]],
      educationalLevel: [''],
      fieldOfStudy: [''],
      workExperience: [''],
      skills: [''],
      coverLetter: [''],
      resume: [null],
      additionalDocuments: [null]
    });
  }

  getVacancyDetail() {
    console.log('Attempting to fetch vacancy details for ID:', this.vacancyId);
    this.loading = true;
    this.vacancyService.getVacancyDetail(this.vacancyId).subscribe({
      next: (res) => {
        console.log('Vacancy details received:', res);
        this.vacancyDetail = res;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error fetching vacancy details:', err);
        this.loading = false;
        // For testing purposes, create mock data when API fails
        this.createMockVacancyData();
        this.messageService.add({ 
          severity: 'warn', 
          summary: 'API Unavailable', 
          detail: 'Using mock data for testing purposes' 
        });
      }
    });
  }

  createMockVacancyData() {
    console.log('Creating mock vacancy data');
    this.vacancyDetail = {
      id: this.vacancyId,
      vacancyName: 'Software Developer Position',
      position: 'Senior Software Developer',
      department: 'Information Technology',
      vaccancyDescription: 'We are looking for an experienced software developer to join our team.',
      educationalLevel: 'Bachelor Degree',
      educationalField: 'Computer Science',
      quantity: '2',
      employmentType: 'PERMANENT',
      vaccancyStartDate: new Date(),
      vaccancyEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isApproved: true,
      gpa: 3.0,
      vacancyType: 1 // EXTERNAL
    };
    console.log('Mock vacancy data created:', this.vacancyDetail);
  }

  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.applicantForm.patchValue({
        [fieldName]: file
      });
    }
  }

  submitApplication() {
    if (this.applicantForm.valid) {
      this.loading = true;
      
      const formData = new FormData();
      const formValue = this.applicantForm.value;
      
      // Add all form fields to FormData
      Object.keys(formValue).forEach(key => {
        if (formValue[key] !== null && formValue[key] !== undefined) {
          formData.append(key, formValue[key]);
        }
      });
      
      // Add vacancy ID
      formData.append('vacancyId', this.vacancyId);
      
      this.vacancyService.addExternalApplicant(formData).subscribe({
        next: (res) => {
          this.loading = false;
          if (res.success) {
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Success', 
              detail: 'Application submitted successfully!' 
            });
            this.applicantForm.reset();
          } else {
            this.messageService.add({ 
              severity: 'error', 
              summary: 'Error', 
              detail: res.message 
            });
          }
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to submit application' 
          });
        }
      });
    } else {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Validation Error', 
        detail: 'Please fill in all required fields' 
      });
    }
  }

  goBack() {
    // You can customize this to go to a specific page or just close
    window.close();
  }
}
