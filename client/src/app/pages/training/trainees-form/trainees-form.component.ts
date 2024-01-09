import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

import { ITraineeGetDto, ITraineePostDto } from 'src/app/model/Training/TraineeDto';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';

import { DropDownService } from 'src/app/services/dropDown.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-trainees-form',
  templateUrl: './trainees-form.component.html',
  styleUrls: ['./trainees-form.component.css'],
 
  
})
export class TraineesFormComponent implements OnInit {


  @Input()traininggId !:string
  @Input()TrainingTitle :string=""
  trainingId!:string
  educationalFields:SelectList[]=[]
  educationalLevels:SelectList[]=[]
  training !: ITrainingGetDto

  regions:SelectList[]=[]

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
      typeofOrganization: ['', Validators.required]
    });
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

  getAge(birthDate:Date){

    return this.commonService.calculateAge(birthDate)

  }


  changeTraineeReportStatus(){

    this.confirmationService.confirm({
      message: 'Do you want to Submit this trainee list form?',
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

  

}
