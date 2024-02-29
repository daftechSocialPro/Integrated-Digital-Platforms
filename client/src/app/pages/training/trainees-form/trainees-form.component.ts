import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

import { ITraineeGetDto, ITraineePostDto } from 'src/app/model/Training/TraineeDto';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';

import { DropDownService } from 'src/app/services/dropDown.service';
import { TrainingService } from 'src/app/services/training.service';
import { UpdateTraineeComponent } from './update-trainee/update-trainee.component';

@Component({
  selector: 'app-trainees-form',
  templateUrl: './trainees-form.component.html',
  styleUrls: ['./trainees-form.component.css'],
 
  
})
export class TraineesFormComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  @Input()traininggId !:string
  @Input()TrainingTitle :string=""
  trainingId!:string
  educationalFields:SelectList[]=[]
  educationalLevels:SelectList[]=[]
  training !: ITrainingGetDto

  regions:SelectList[]=[]


  filterdTraines:ITraineeGetDto[] = [];  
  

  genders=[    
    {label:"MALE",value:"MALE"},{label:"FEMALE",value:"FEMALE"}
  ]

  

  traineeForm!:FormGroup;
  traineeData: ITraineeGetDto[] = [];  
  ngOnInit(): void {

    
    this.trainingId = this.route.snapshot.paramMap.get('trainingId')!
    this.getEducationalFields()
    this.getEducationalLevels()
    this.getTrainee()
    this.getRegions()

    if(this.trainingId){
      this.getSingleTraining(this.trainingId)
     }
      else{
        this.getSingleTraining(this.traininggId)
        
      }
  }

  constructor(
    private dropdownService:DropDownService,
    private route : ActivatedRoute,
    private formBuilder:FormBuilder,
    private messageService : MessageService,
    private trainingService:TrainingService,
    private modalService:NgbModal,
    private commonService : CommonService,
    private confirmationService : ConfirmationService,
   
   )
    {
    this.traineeForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      profession: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      region: ['', Validators.required],
      zone: ['', Validators.required],
      woreda: ['', Validators.required],  
      
      educationalLevel: ['', Validators.required],
      educationalField: ['', Validators.required],
      nameofOrganizaton: ['', Validators.required],
      typeofOrganization: ['', Validators.required],
      preSummary: ['', Validators.required],
      postSummary: [''],
   
    });
  }

  revertStatus(){

    this.trainingService.changeTraineeReportStatus(this.training.id,'SENT').subscribe({
      next:(res)=>{
        if (res.success) {

          this.messageService.add({ severity: 'success', summary: `Successfully SUBMITTED`, detail: res.message })
          window.location.reload()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!! ', detail: res.message })

        }

      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error ', detail: err })

      }

      
    })
  }

  addRow(): void {

    console.log(this.traineeForm.value)
    if (this.traineeForm.valid) {
      const newRow = this.traineeForm.value;
      this.traineeData.push(newRow);     
      this.addTrainee(newRow)
      this.traineeForm.reset();
    }
  }

  getRegions (){
    this.dropdownService.getRegionsDropdown('18EEF146-FC48-4074-94E7-E5DD4A3BE242').subscribe({
      next:(res)=>{

        this.regions =res 
      }
    })
  }
  getSingleTraining(trainingId:string) {

    this.trainingService.getSingleTraining(trainingId).subscribe({
      next: (res) => {
        this.training = res
        console.log(res)
      }
    })

  }

  addTrainee(traineePost: ITraineePostDto)
  {
   traineePost.regionId = this.traineeForm.value.region
    traineePost.EducationalLevelId= this.traineeForm.value.educationalLevel
    traineePost.TraningId = this.trainingId
    this.trainingService.createTrainee(traineePost).subscribe({
      next:(res)=>{
        if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });

          this.getTrainee()

        }else{
          this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: res.message });

        }

      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went wrong!!!', detail: err });

      }
    })

  }
  getEducationalFields(){
    this.dropdownService.getEducationFieldDropdown().subscribe({
      next:(res)=>{
        this.educationalFields = res 
      }
    })
  }

  getEducationalLevels(){
    this.dropdownService.getEducationLevelDropdown().subscribe({
      next:(res)=>{
        this.educationalLevels = res 
      }
    })
  }

  getTrainee(){
    if(this.trainingId){
    this.trainingService.getTraineeList(this.trainingId).subscribe({
      next:(res)=>{
        this.traineeData = res 
        this.filterdTraines= res 
      }
    })}
    else{
      this.trainingService.getTraineeList(this.traininggId).subscribe({
        next:(res)=>{
          this.traineeData = res 
        }
      })
    }
  }

  filterTrainees(value:string){

    var searchTerm = value.toLowerCase();
    this.filterdTraines = this.traineeData.filter((item)=>{

      return (
        item.fullName.toLowerCase().includes(searchTerm) ||
        item.phoneNumber.toLowerCase().includes(searchTerm)

      )
    })
  }

  getAge(birthDate:Date){

    return this.commonService.calculateAge(birthDate)

  }


  changeTraineeReportStatus(){

    this.confirmationService.confirm({
      message: 'Are you sure you want to Submit this trainee list form, you can not add or update trainee after you submit ?',
      header: 'Trainee Report Status',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.trainingService.changeTraineeReportStatus(this.trainingId,'SUBMITTED').subscribe({
          next:(res)=>{
            if (res.success) {
    
              this.messageService.add({ severity: 'success', summary: `Successfully SUBMITTED`, detail: res.message })
              window.location.reload()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went wrong!!! ', detail: res.message })
    
            }
    
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error ', detail: err })
    
          }
    
          
        })
      
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
   

  

  
  }
  editRow(row: any): void {
   
    let modalRef= this.modalService.open(UpdateTraineeComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.row=row
    modalRef.result.then(()=>{

      this.getTrainee()
    })
  }

  exportAsExcel(name:string) {
   
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

  

}
