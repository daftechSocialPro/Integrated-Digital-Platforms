import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddVacancyDto, VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';
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

  vaccancy! :AddVacancyDto

  vacancyForm!: FormGroup;
  positions: SelectList[] = [];
  departments: SelectList[] = [];
  educationalFields: SelectList[] = [];
  educationalLevels: SelectList[] = [];
  today: Date = new Date();
  minDate: Date = new Date();
  vacancyTypes: any[] = [
    { value: 0, name: "INTERNAL" },
    { value: 1, name: "EXTERNAL" },
    { value: 2, name: "BOTH" },
  ];
  employementTypes: any[] = [
    { value: 0, name: "PERMANENT" },
    { value: 1, name: "CONTRAT" },
  ];

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder, 
              private vacancyService: VacancyService,
              private dropServices: DropDownService,
              private messageService: MessageService,
              private commonService: CommonService){}    
  
  
  
  ngOnInit() {

    this.initVacancyForm();
    this.getDropValues();
    if(this.vacancyId){
    
      this.getVaccancy()
     
     
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
      gpa: [null],
      vacancyType: ['', Validators.required]
    });
  }
  updateVacancyForm() {
    this.vacancyForm.controls['vacancyName'].setValue(this.vaccancy.vacancyName)
    this.vacancyForm.controls['positionId'].setValue(this.vaccancy.positionId)
    this.vacancyForm.controls['departmentId'].setValue(this.vaccancy.departmentId)
    this.vacancyForm.controls['vaccancyDescription'].setValue(this.vaccancy.vaccancyDescription)
    this.vacancyForm.controls['educationalLevelId'].setValue(this.vaccancy.educationalLevelId)
    this.vacancyForm.controls['educationalFieldId'].setValue(this.vaccancy.educationalFieldId)
    this.vacancyForm.controls['quantity'].setValue(this.vaccancy.quantity)
    this.vacancyForm.controls['employmentType'].setValue(this.vaccancy.employmentType)
    this.vacancyForm.controls['vaccancyStartDate'].setValue(this.commonService.convertToDate(this.vaccancy.vaccancyStartDate.toString()))
    this.vacancyForm.controls['vaccancyEndDate'].setValue(this.commonService.convertToDate(this.vaccancy.vaccancyEndDate.toString()))
    this.vacancyForm.controls['gpa'].setValue(this.vaccancy.gpa)
    this.vacancyForm.controls['vacancyType'].setValue(this.vaccancy.vacancyType)
  }

  

  getVaccancy (){

    this.vacancyService.getVacancyEdit(this.vacancyId).subscribe({
      next:(res)=>{
        this.vaccancy = res 
        this.updateVacancyForm()
      }
    })

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
        this.educationalFields = res
      }
    });
    this.dropServices.getEducationLevelDropdown().subscribe({
      next: (res) => {
        this.educationalLevels = res
      }
    });
  }

  getminEndDate(date: any){
      this.minDate = date;
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
        employmentType: parseInt(this.vacancyForm.value.employmentType),
        gpa: this.vacancyForm.value.gpa,
        quantity: this.vacancyForm.value.quantity,
        vacancyType: parseInt(this.vacancyForm.value.vacancyType),
        vaccancyDescription: this.vacancyForm.value.vaccancyDescription,
        vaccancyStartDate: this.vacancyForm.value.vaccancyStartDate,
        vaccancyEndDate: this.vacancyForm.value.vaccancyEndDate,
      }

      if (this.vacancyId!=null){
        vacancyAdd.id = this.vacancyId
        this.vacancyService.updateVacancy(vacancyAdd).subscribe(
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
      else {
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
}
