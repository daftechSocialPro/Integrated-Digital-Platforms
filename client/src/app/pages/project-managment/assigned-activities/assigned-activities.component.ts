import { Component, OnInit } from '@angular/core';

import { ActivityView, MonthPerformanceView } from '../view-activties/activityview';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { UpdateActivityProgressDto } from 'src/app/model/PM/StrategicPlanDto';
import { MessageService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewProgressComponent } from '../view-activties/view-progress/view-progress.component';

@Component({
  selector: 'app-assigned-activities',
  templateUrl: './assigned-activities.component.html',
  styleUrls: ['./assigned-activities.component.css']
})
export class AssignedActivitiesComponent implements OnInit {

  Quarter: number = 1
  user !: UserView
  Activties!: ActivityView[]
  filterdActivities: any
  selectedProject: string
  currentYear: number

  months = [{ value: 0, label: "January" }, { value: 1, label: "Feburary" }, { value: 2, label: "March" }]



  constructor(
    private projectService: ProjectmanagementService,
    private pmService: PMService,
    private userService: UserService,
    private modalService : NgbModal,
    private messageService: MessageService

  ) {

  }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites()
    this.currentYear = new Date().getFullYear();

  }

  ViewProgress(actView:ActivityView) {

    let modalRef = this.modalService.open(ViewProgressComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = actView

  }

  getAssignedActivites() {
    this.pmService.getAssignedActivities(this.user.employeeId).subscribe({
      next: (res) => {

        console.log("activities", res)
        this.Activties = res
        this.filterdActivities = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Activties.length; i++) {
      if (this.Activties[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }


  getMonthPeroformance(monthPerformance: MonthPerformanceView[], order: number) {

    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }
    return monthPerformance[order]?.planned




  }

  getMonthPeroformance2(monthPerformance: MonthPerformanceView[], order: number) {

    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }
    return monthPerformance[order]?.actual




  }

  getMonthPeroformance3(monthPerformance: MonthPerformanceView[], order: number) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }

    return monthPerformance[order]?.plannedBudget


  }
  getMonthPeroformance4(monthPerformance: MonthPerformanceView[], order: number) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }

    return monthPerformance[order]?.usedBudget


  }


  onQuarterChange() {


    if (this.Quarter == 1) {
      this.months = [{ value: 0, label: "January" }, { value: 1, label: "Feburary" }, { value: 2, label: "March" }]
    }
    else if (this.Quarter == 2) {

      this.months = [{ value: 3, label: "April" }, { value: 4, label: "May" }, { value: 5, label: "June" }]

    }
    else if (this.Quarter == 3) {

      this.months = [{ value: 6, label: "July" }, { value: 7, label: "Augest" }, { value: 8, label: "September" }]

    }
    else {
      this.months = [{ value: 9, label: "October" }, { value: 10, label: "November" }, { value: 11, label: "December" }]
    }




    // this.filterProjects()

  }

  filterActivites(value: string) {


    var searchTerm = value.toString();
    this.filterdActivities = this.Activties.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.activityNumber.toLowerCase().includes(searchTerm)
      )
    })



  }


  onProgressAdded(activityId: string, month: any, target: any) {

    var actprogress: UpdateActivityProgressDto = {
      activityId: activityId,
      usedBudget: 0,
      actualWorked: target.value,
      employeeId:this.user.employeeId,
      createdBy: this.user.userId,
      order: month.value,
      progressType: 1
    }

    this.projectService.updateActivityProgress(actprogress).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfully Updated', detail: res.message })
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: res.message })
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: err.message })
      }
    })

  }

  onProgressBudgetAdded(activityId: string, month: any, target: any) {

    var actprogress: UpdateActivityProgressDto = {
      activityId: activityId,
      usedBudget: target.value,
      actualWorked: 0,
      employeeId:this.user.employeeId,
      createdBy: this.user.userId,
      order: month.value,
      progressType: 0
    }

    this.projectService.updateActivityProgress(actprogress).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfully Updated', detail: res.message })
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: res.message })
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: err.message })
      }
    })

  }


}
