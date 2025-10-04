import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITrainingGetDto } from 'src/app/model/Training/TrainingDto';
import { TrainingService } from 'src/app/services/training.service';
import { TraineesFormComponent } from '../trainees-form/trainees-form.component';
import { TrainingReportFormComponenT } from '../training-report-form/training-report-form.component';
import { Router } from '@angular/router';
import { AllTrainingListComponent } from '../all-training-list/all-training-list.component';

@Component({
  selector: 'app-training-dashboard',
  templateUrl: './training-dashboard.component.html',
  styleUrls: ['./training-dashboard.component.css']
})
export class TrainingDashboardComponent implements OnInit {

  Trainings: ITrainingGetDto[] = [];
  sum = 0
maleSum = 0 
femaleSum = 0 

  filterText!:string
  startDateFilter!: string;
  endDateFilter!: string;

  ngOnInit(): void {

    this.getTrainingList()
  }
  constructor(
    private trainingService: TrainingService,
    private router : Router,
   
    private modalService: NgbModal) {

  }

  getTrainingList() {
    // Reset counters
    this.sum = 0;
    this.maleSum = 0;
    this.femaleSum = 0;

    this.trainingService.getTrainingLists().subscribe({
      next: (res) => {
        this.Trainings = res || [];
        
        if (this.Trainings.length > 0) {
          this.Trainings.forEach((item => {
            this.getTotalTrainees(item.id);
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching training list:', err);
        this.Trainings = [];
      }
    });
  }

  viewdetail(){
    console.log('Navigating to trainee/allreport');
    this.router.navigateByUrl('/trainee/allreport');
  }

  getTotalTrainers(trainingId: string) {
    var length = 0
    this.trainingService.getTrainerList(trainingId).subscribe({
      next: (res) => {
        length = res.length
        

      }
    })
  
  }

  getTotalTrainees(trainingId: string) {
    var length = 0;
    this.trainingService.getTraineeList(trainingId).subscribe({
      next: (res) => {
        if (res && Array.isArray(res)) {
          this.sum += res.length;
          length = res.length;
          
          this.maleSum += res.filter(item => item.gender && item.gender.toLowerCase() === "male").length;
          this.femaleSum += res.filter(item => item.gender && item.gender.toLowerCase() === "female").length;
        }
      },
      error: (err) => {
        console.error('Error fetching trainee list for training:', trainingId, err);
      }
    });

    return length;
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


  viewDetail(trainingId:string , activityId:string){
    this.router.navigate(['pm/training-detail',trainingId,activityId,"00000000-0000-0000-0000-000000000000"])
  
  }

  get filteredItems(): any[] {
    return this.Trainings.filter(item =>
      (this.filterText ? this.matchesFilterText(item) : true) &&
      (this.startDateFilter ? this.matchesStartDate(item) : true) &&
      (this.endDateFilter ? this.matchesEndDate(item) : true)
    );
  }

  matchesFilterText(item: any): boolean {
    return (
      item.title.toLowerCase().includes(this.filterText.toLowerCase()) ||
      item.activityNumber.toLowerCase().includes(this.filterText.toLowerCase()) ||
      item.project.toLowerCase().includes(this.filterText.toLowerCase()) 
    );
  }

  matchesStartDate(item: any): boolean {
    if (!this.startDateFilter) {
      return true;
    }
    const startDateFilterDate = new Date(this.startDateFilter);
    const itemStartDate = new Date(item.startDate);
    return itemStartDate >= startDateFilterDate;
  }
  
  matchesEndDate(item: any): boolean {
    if (!this.endDateFilter) {
      return true;
    }
    const endDateFilterDate = new Date(this.endDateFilter);
    const itemEndDate = new Date(item.endDate);
    return itemEndDate <= endDateFilterDate;
  }
  
}


