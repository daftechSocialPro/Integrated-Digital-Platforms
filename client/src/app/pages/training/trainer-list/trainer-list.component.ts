import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainerGetDto } from 'src/app/model/Training/TrainerDto';
import { TrainingService } from 'src/app/services/training.service';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { ITrainerEmailDto } from 'src/app/model/Training/TraineeDto';
import { MessageService } from 'primeng/api';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {

  @ViewChild('myInput') myInput: ElementRef;
  baseUrl: string = environment.Client_URL 
  

  trainerList:ITrainerGetDto[]=[]
  @Input()  trainingId!:string


  @Input() Training!: ITrainingGetDto
  constructor(
    private trainingService:TrainingService,
   
    private messageService : MessageService,
    private modalService:NgbModal){}


  ngOnInit(): void {
    
    this.getTrainerList()
    this.getSingleTraining()
  }

  copyToClipboard(): void {
    const url = `${this.baseUrl}/trainee-form/training-report-form/${this.trainingId}`;

    const inputElement = this.myInput.nativeElement;
    inputElement.value = url;
    inputElement.select();
 
    navigator.clipboard.writeText(url)
    .then(() => {
      this.messageService.add({severity:'info',summary:'Copied to Clipboard',detail:'Training Report form Url Copied'});
    })
    .catch((error) => {
      console.error('Failed to copy to clipboard:', error);
    });
  }
  copyToClipboard2(): void {
  
    const url=`${this.baseUrl}/trainee-form/${this.trainingId}`
    const inputElement = this.myInput.nativeElement;
    inputElement.value = url;
    inputElement.select();
    
  navigator.clipboard.writeText(url)
  .then(() => {
    this.messageService.add({severity:'info',summary:'Copied to Clipboard',detail:'Training Report form Url Copied'});
  })
  .catch((error) => {
    console.error('Failed to copy to clipboard:', error);
  });
  
  navigator.clipboard.writeText(url)
    .then(() => {
      this.messageService.add({severity:'info',summary:'Copied to Clipboard',detail:'Training List Url Copied'});
    })
    .catch((error) => {
      console.error('Failed to copy to clipboard:', error);
    });
   
  }

  getTrainerList(){

    this.trainingService.getTrainerList(this.trainingId).subscribe({
      next:(res)=>{
        this.trainerList =res 
      }
    })
  }

  getSingleTraining(){
    this.trainingService.getSingleTraining(this.trainingId).subscribe({
      next:(res)=>{
        this.Training = res 
      }
    })
  }
  addTrainer(){

    let modalRef = this.modalService.open(AddTrainerComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.trainerId = this.trainingId
    modalRef.result.then(()=>{
      this.getTrainerList()
    })

  }
  sendEmail(trainer:ITrainerGetDto,type:string){

    let trainerEmail : ITrainerEmailDto={
      Email : trainer.email,
      FullName : trainer.fullName,
      TrainingId : this.trainingId
    }

    this.trainingService.sendTrainerEmail(trainerEmail,type).subscribe({
      next:(res)=>{
        if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });

          this.getSingleTraining()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went wrong.', detail: res.message });


        }
      
      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went wrong.', detail: err});

      }
    })
  }

  closeModal(){

   
  }

}
