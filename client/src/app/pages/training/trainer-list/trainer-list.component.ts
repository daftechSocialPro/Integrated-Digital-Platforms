import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainerGetDto } from 'src/app/model/Training/TrainerDto';
import { TrainingService } from 'src/app/services/training.service';
import { AddTrainerComponent } from '../add-trainer/add-trainer.component';
import { ITrainerEmailDto } from 'src/app/model/Training/TraineeDto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {

  trainerList:ITrainerGetDto[]=[]
  @Input()  trainingId!:string
  @Input()  TrainingTitle!:string
  constructor(
    private trainingService:TrainingService,
    private activeModal : NgbActiveModal,
    private messageService : MessageService,
    private modalService:NgbModal){}


  ngOnInit(): void {
    
    this.getTrainerList()
  }

  getTrainerList(){

    this.trainingService.getTrainerList(this.trainingId).subscribe({
      next:(res)=>{
        this.trainerList =res 
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
  sendEmail(trainer:ITrainerGetDto){

    let trainerEmail : ITrainerEmailDto={
      Email : trainer.email,
      FullName : trainer.fullName,
      TrainingId : this.trainingId
    }

    this.trainingService.sendTrainerEmail(trainerEmail).subscribe({
      next:(res)=>{
        if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfully created.', detail: res.message });

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

    this.activeModal.close()
  }

}
