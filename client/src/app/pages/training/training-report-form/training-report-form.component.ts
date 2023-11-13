import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITraineeGetDto } from 'src/app/model/Training/TraineeDto';
import { ITrainerGetDto } from 'src/app/model/Training/TrainerDto';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-report-form',
  templateUrl: './training-report-form.component.html',
  styleUrls: ['./training-report-form.component.css']
})
export class TrainingReportFormComponenT implements OnInit {

  @Input()traininggId !:string
  @Input()TrainingTitle !:string

  training !: ITrainingGetDto
  trainers: ITrainerGetDto[]=[]
  trainingId!:string


  ngOnInit(): void {

    this.trainingId = this.route.snapshot.paramMap.get('trainingId')!

    this.getSingleTraining()
    this.getTrainer()
    
  }
  constructor(private trainingService : TrainingService,private route : ActivatedRoute){}

  closeModal(){}


  getSingleTraining(){

    this.trainingService.getSingleTraining(this.trainingId).subscribe({
      next:(res)=>{
        this.training = res 
      }
    })

  }

  getTrainer(){
    this.trainingService.getTrainerList(this.trainingId).subscribe({
      next:(res)=>{
        this.trainers = res 
      }
    })
  }

}
