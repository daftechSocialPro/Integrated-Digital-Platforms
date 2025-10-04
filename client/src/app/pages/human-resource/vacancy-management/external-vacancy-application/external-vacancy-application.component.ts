import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VacancyService } from 'src/app/services/vacancy.service';
import { VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';

@Component({
  selector: 'app-external-vacancy-application',
  templateUrl: './external-vacancy-application.component.html',
  styleUrls: ['./external-vacancy-application.component.css']
})
export class ExternalVacancyApplicationComponent implements OnInit {

  vacancyId!: string;
  vacancyDetail!: VacancyListDto;
  applicationForm!: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private vacancyService: VacancyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('vacancyId')!;
    this.initForm();
    this.getVacancyDetail();
  }

  initForm() {
    this.applicationForm = this.formBuilder.group({
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
      coverLetter: [''],
      resume: [null]
    });
  }

  getVacancyDetail() {
    this.vacancyService.getVacancyDetail(this.vacancyId).subscribe({
      next: (res) => {
        this.vacancyDetail = res;
      },
      error: (err) => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Failed to load vacancy details' 
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.patchValue({
        resume: file
      });
    }
  }

  submitApplication() {
    if (this.applicationForm.valid) {
      this.loading = true;
      
      const formData = new FormData();
      const formValue = this.applicationForm.value;
      
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
            this.applicationForm.reset();
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
