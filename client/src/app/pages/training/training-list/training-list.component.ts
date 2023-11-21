import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';
import { AddTrainingListComponent } from '../add-training-list/add-training-list.component';
import { TrainerListComponent } from '../trainer-list/trainer-list.component';
import { TraineesFormComponent } from '../trainees-form/trainees-form.component';
import { TrainingReportFormComponenT } from '../training-report-form/training-report-form.component';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  @Input() activityId! : string 
  trainingList :ITrainingGetDto[]=[]

  ngOnInit(): void {
    
    this.getTrainingList()
  }

  constructor(
    private trainingService : TrainingService,
    private modalService : NgbModal,
    private activeModal : NgbActiveModal){}

  getTrainingList (){

    this.trainingService.getTrainings(this.activityId).subscribe({
      next:(res)=>{
        this.trainingList = res 
      }
    })
  }

  addTraining(){
    
    let modalRef = this.modalService.open(AddTrainingListComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.activityId  = this.activityId
    modalRef.result.then(()=>{
      this.getTrainingList()
    })

  }

  viewTrainers(trainingId:string,trainingTitle:string){

    let modalRef = this.modalService.open(TrainerListComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.trainingId =trainingId
    modalRef.componentInstance.TrainingTitle = trainingTitle
  }
  viewTrainees(trainingId:string,trainingTitle:string){
    let modalRef = this.modalService.open(TraineesFormComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.traininggId =trainingId
    modalRef.componentInstance.TrainingTitle = trainingTitle
  }

  viewTrainingReport(trainingId:string,trainingTitle:string){
    let modalRef = this.modalService.open(TrainingReportFormComponenT,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.traininggId =trainingId
    modalRef.componentInstance.TrainingTitle = trainingTitle
  }



  closeModal(){
    this.activeModal.close()
  }

}
