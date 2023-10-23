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

@Component({
  selector: 'app-view-activties',
  templateUrl: './view-activties.component.html',
  styleUrls: ['./view-activties.component.css']
})
export class ViewActivtiesComponent implements OnInit {

  @Input() actView!: ActivityView;
  isMember: boolean = false;
  user!: UserView;

  months: string[] = [
    'August (ነሃሴ)',
    'September (መስከረም)',
    'October (ጥቅምት)',
    'November (ህዳር)',
    'December (ታህሳስ)',
    'January (ጥር)',
    'February (የካቲት)',
    'March (መጋቢት)',
    'April (ሚያዚያ)',
    'May (ግንቦት)',
    'June (ሰኔ)'
  ];

  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    private userService: UserService) { }

  ngOnInit(): void {
    console.log("task", this.actView)
    this.user = this.userService.getCurrentUser()
    if (this.actView.members.find(x => x.employeeId?.toLowerCase() == this.user.employeeId.toLowerCase()) ) {
      this.isMember = true;
    }
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

  Showonmap(lat:number,lng:number){

    console.log(lat,lng)
  let modalRef =this.modalService.open(ShowonmapComponent,{size:'xl',backdrop:'static'})
  modalRef.componentInstance.lat=lat
  modalRef.componentInstance.lng = lng
  modalRef.componentInstance.title = "Project Location"
  }

}
