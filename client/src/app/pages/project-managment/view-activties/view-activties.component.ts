import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ActivityTargetComponent } from './activity-target/activity-target.component';

import { ActivityView, MonthPerformanceView } from './activityview';
import { AddProgressComponent } from './add-progress/add-progress.component';
import { ViewProgressComponent } from './view-progress/view-progress.component';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ShowonmapComponent } from '../progress-report/performance-report/showonmap/showonmap.component';
import { SelectList } from 'src/app/model/common';
import { TrainingListComponent } from '../../training/training-list/training-list.component';

@Component({
  selector: 'app-view-activties',
  templateUrl: './view-activties.component.html',
  styleUrls: ['./view-activties.component.css']
})
export class ViewActivtiesComponent implements OnInit {

  @Input() actView!: ActivityView;
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
    private userService: UserService) { }

  ngOnInit(): void {
  
    this.user = this.userService.getCurrentUser()
    if (this.actView.members.find(x => x.employeeId?.toLowerCase() == this.user.employeeId.toLowerCase()) ) {
      this.isMember = true;
    }
   this.getMonthDifference(this.actView.startDate,this.actView.endDate)

   
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

  Showonmap(lat:number,lng:number,projectLocation:string){


  let modalRef =this.modalService.open(ShowonmapComponent,{size:'xl',backdrop:'static'})
  modalRef.componentInstance.lat=lat
  modalRef.componentInstance.lng = lng
  modalRef.componentInstance.title = `Project Locatio: \n ${projectLocation}`
  }


 

  getMonthDifference(startDate: string, endDate: string) {
    
    const startYear = new Date(startDate).getFullYear();
    const startMonth = new Date(startDate).getMonth();
    const endYear = new Date(endDate).getFullYear();
    const endMonth = new Date(endDate).getMonth();
    
    const monthDifference: { [year: number]: number } = {};
  
    for (let year = startYear; year <= endYear; year++) {
      let monthStart = 0;
      let monthEnd = 11;
  
      if (year === startYear) {
        monthStart = startMonth;
      }
  
      if (year === endYear) {
        monthEnd = endMonth;
      }
  
      const months = (monthEnd - monthStart) + 1;
      monthDifference[year] = months;
    }
  

    const currentYear = new Date().getFullYear();
    this.generateMonthsArray(monthDifference[currentYear])
    
  }

  getStartMonth(){
    const currentYear = new Date().getFullYear();
    const startYear = (new Date(this.actView.startDate)).getFullYear()
    if(currentYear == startYear){
      return (new Date (this.actView.startDate)).getMonth()
    }
    else{
      return 0

    }
    
  }

  generateMonthsArray(monthDifference: number) {
   
   let startMonth:number = this.getStartMonth();
   
   
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


  

  getPerformancesByCurrentYear(): any[] {
    const currentYear = new Date().getFullYear();
    const startIndex = this.getStartMonth(); 
    const filteredArray = this.actView.monthPerformance.filter(item => {
      const itemYear = item.year
      return itemYear === currentYear;
    });
    return filteredArray.slice(startIndex);
  }
  
}
