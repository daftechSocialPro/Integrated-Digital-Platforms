import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';
import { TraineesFormComponent } from '../trainees-form/trainees-form.component';
import { TrainingReportFormComponenT } from '../training-report-form/training-report-form.component';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.css']
})
export class TrainingDashboardComponent implements OnInit {

  Trainings: ITrainingGetDto[] = []
  sum = 0

  ngOnInit(): void {

    this.getTrainingList()
  }
  constructor(
    private trainingService: TrainingService,
    private modalService: NgbModal) {

  }

  getTrainingList() {

    this.trainingService.getTrainingLists().subscribe({
      next: (res) => {
        this.Trainings = res
        console.log(res)
      }
    })
  }

  getTotalTrainers(trainingId: string) {
    var length = 0
    this.trainingService.getTrainerList(trainingId).subscribe({
      next: (res) => {
        length = res.length
      }
    })
    return length
  }

  getTotalTrainees(trainingId: string) {
    var length = 0
    this.trainingService.getTraineeList(trainingId).subscribe({
      next: (res) => {
        this.sum += res.length
        length = res.length
      }
    })

    return length
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

}
