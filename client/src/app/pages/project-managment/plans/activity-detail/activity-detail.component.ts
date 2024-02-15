import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { TrainingListComponent } from 'src/app/pages/training/training-list/training-list.component';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ShowonmapComponent } from '../../progress-report/performance-report/showonmap/showonmap.component';
import { ActivityTargetComponent } from '../../view-activties/activity-target/activity-target.component';
import { ActivityView, MonthPerformanceView } from '../../view-activties/activityview';
import { AddProgressComponent } from '../../view-activties/add-progress/add-progress.component';
import { ViewProgressComponent } from '../../view-activties/view-progress/view-progress.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

 planId !: string
  actId !: string
  actView!: ActivityView;
  isMember: boolean = false;
  user!: UserView;
 
  monthsArray :SelectList[]=[];

  months: string[] = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private router : Router,
    private planService:PlanService,
    private route : ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {




    this.actId = this.route.snapshot.paramMap.get('actId')!
    this.planId = this.route.snapshot.paramMap.get('planId')!
  
    this.getSingleActivity();

   

  }
  getImage(value: string) {
    return this.commonService.createImgPath(value)
  }


  AssignTarget() {
    let modalRef = this.modalService.open(ActivityTargetComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = this.actView
  }

  AddProgress() {
    let modalRef = this.modalService.open(AddProgressComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.activity = this.actView
    modalRef.componentInstance.ProgressStatus = "0"
  }
  FinalizeProgress() {
    let modalRef = this.modalService.open(AddProgressComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.activity = this.actView
    modalRef.componentInstance.ProgressStatus = "1"
  }

  ViewProgress() {

    let modalRef = this.modalService.open(ViewProgressComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = this.actView

  }

  applyStyles(value: number) {

    let percentage = value
    const styles = { 'width': percentage + "%" };
    return styles;
  }


  getUpTo(index: number, list: MonthPerformanceView[]) {

    let actualNumber = 0
    let upToNumber = 0
    let total = 0
    list = list.sort((a, b) => a.order - b.order).slice(0, index + 1);

    list.map((item, index) => {
      actualNumber += item.actual
      upToNumber += item.planned

    })

    if (upToNumber != 0) {

      total = (actualNumber / upToNumber) * 100
    }
    else {
      total = 0
    }

    return total;



  }

  Showonmap(actview:ActivityView){

 
  let modalRef =this.modalService.open(ShowonmapComponent,{size:'xl',backdrop:'static'})
  modalRef.componentInstance.locations=actview.activityLocations
  modalRef.componentInstance.title = `${actview.name} (${actview.activityNumber})` 


  }


  getMonthDifference(startDate: string, endDate: string) {
    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth();
  
    const monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);
  
    console.log('Month Difference:', monthDifference);

    this.generateMonthsArray(monthDifference)
  
  }

  generateMonthsArray(monthDifference: number) {
  
   let startMonth = (new Date (this.actView.startDate)).getMonth()
   let total =  monthDifference+startMonth
    while (startMonth< total) {
      const monthObject :SelectList = {
        id: startMonth.toString(),
        name: this.getMonthName(startMonth),
      };
  
      this.monthsArray.push(monthObject);

      startMonth+=1
    }

  
  }

  getMonthName(monthIndex: number): string {

    if (monthIndex>12){
      monthIndex-=12
    }
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    return monthNames[monthIndex];
  }

  viewTrainings(activityId : string ){

    let modalRef = this.modalService.open(TrainingListComponent,{size:'xxl',backdrop:'static'})
    modalRef.componentInstance.activityId  = activityId


  }


  planDetail(){

    this.router.navigate(['/pm/planDetail/',this.planId])
  }
  
  getSingleActivity (){

    this.planService.getSingleActivity(this.actId).subscribe({
      next:(res)=>{
        this.actView = res 

        console.log(res)
        this.user = this.userService.getCurrentUser()
        if (this.actView.members.find(x => x.employeeId?.toLowerCase() == this.user.employeeId.toLowerCase()) ) {
          this.isMember = true;
        }
       this.getMonthDifference(this.actView.startDate,this.actView.endDate)
      }
    })

  }

  
}
