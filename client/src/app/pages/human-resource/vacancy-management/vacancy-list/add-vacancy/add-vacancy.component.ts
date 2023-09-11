import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddVacancyDto } from 'src/app/model/Vacancy/vacancyList.Model';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit{

  @Input() vacancyId !: string;

  vacancyForm!: FormGroup;
  positions: SelectList[] = [];
  departments: SelectList[] = [];
  educationalField: SelectList[] = [];
  educationalLevel: SelectList[] = [];
  vacancyType: any[] = [
    { value: 0, name: "INTERNAL" },
    { value: 1, name: "EXTERNAL" },
    { value: 2, name: "BOTH" },
  ];
  employementType: any[] = [
    { value: 0, name: "PERMANENT" },
    { value: 1, name: "CONTRAT" },
  ];

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder, 
              private vacancyService: VacancyService,
              private dropServices: DropDownService,
              private messageService: MessageService){}    
  
  
  
  ngOnInit() {
    if(this.vacancyId){
      this.initVacancyForm();
      this.getDropValues();
    }
    else{
      
    }
    
  }

  initVacancyForm() {
    this.vacancyForm = this.formBuilder.group({
      vacancyName: ['', Validators.required],
      positionId: ['', Validators.required],
      departmentId: ['', Validators.required],
      vaccancyDescription: ['',],
      educationalLevelId: ['', Validators.required],
      educationalFieldId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      employmentType: ['', Validators.required],
      vaccancyStartDate: ['', Validators.required],
      vaccancyEndDate: ['', Validators.required],
      gPA: ['', Validators.pattern('^[0-9]+$')],
      vacancyType: ['', Validators.required]
    });
  }

  getDropValues(){
    this.dropServices.getPositionsDropdown().subscribe({
      next: (res) => {
        this.positions = res
      }
    });
    this.dropServices.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.departments = res
      }
    });
    this.dropServices.getEducationFieldDropdown().subscribe({
      next: (res) => {
        this.educationalField = res
      }
    });
    this.dropServices.getEducationLevelDropdown().subscribe({
      next: (res) => {
        this.educationalLevel = res
      }
    });
  }


  closeModal() {
    this.activeModal.close()
  }

  submit(){

    if (this.vacancyForm.valid) {


      var vacancyAdd: AddVacancyDto = {
        vacancyName: this.vacancyForm.value.vacancyName,
        departmentId: this.vacancyForm.value.departmentId,
        positionId: this.vacancyForm.value.positionId,
        educationalFieldId: this.vacancyForm.value.educationalFieldId,
        educationalLevelId: this.vacancyForm.value.educationalLevelId,
        employmentType: this.vacancyForm.value.employmentType,
        gPA: this.vacancyForm.value.gPA,
        quantity: this.vacancyForm.value.quantity,
        vacancyType: this.vacancyForm.value.vacancyType,
        vaccancyDescription: this.vacancyForm.value.vaccancyDescription,
        vaccancyStartDate: this.vacancyForm.value.vaccancyStartDate,
        vaccancyEndDate: this.vacancyForm.value.vaccancyEndDate,
      }

      this.vacancyService.addVacancy(vacancyAdd).subscribe(
        {
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: "Success!!", detail: res.message });
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: "Error!!", detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        }
      )
    }
  }
}
