import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.css']
})
export class TrainingDetailComponent implements OnInit {

  trainingId!: string
  actId!:string
  planId!:string 

  training !: ITrainingGetDto
  ngOnInit(): void {

    this.trainingId = this.router.snapshot.paramMap.get('id')!
    this.actId = this.router.snapshot.paramMap.get('actId')!
    this.planId = this.router.snapshot.paramMap.get('planId')!

    this.getSingleTraining()
  }
  constructor(
    private trainingService : TrainingService,
    private router: ActivatedRoute,private route : Router) { }


  goToActivity(){
    this.route.navigate(['/pm/activityDetail', this.actId, this.planId  ]);
  }

  goToTrainingDashboard (){
    this.route.navigate(['pm/training-dashboard' ]);
  }

  
  getSingleTraining() {

    this.trainingService.getSingleTraining(this.trainingId).subscribe({
      next: (res) => {
        this.training = res
        console.log(res)
      }
    })

  }


}
