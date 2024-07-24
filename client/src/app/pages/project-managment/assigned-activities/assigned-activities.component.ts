import { Component, Inject, OnInit } from '@angular/core';

import {
  ActivityView,
  MonthPerformanceView,
} from '../view-activties/activityview';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { UpdateActivityProgressDto } from 'src/app/model/PM/StrategicPlanDto';
import { MessageService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewProgressComponent } from '../view-activties/view-progress/view-progress.component';
import { DOCUMENT, DatePipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomConfirmationComponent } from '../../human-resource/leave/leave-requests/custom-confirmation/custom-confirmation.component';
import { CustomResceduleConfirtamionComponent } from './custom-rescedule-confirtamion/custom-rescedule-confirtamion.component';

@Component({
  selector: 'app-assigned-activities',
  templateUrl: './assigned-activities.component.html',
  styleUrls: ['./assigned-activities.component.css'],
})
export class AssignedActivitiesComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  Quarter: number = 1;
  user!: UserView;
  Activties!: ActivityView[];
  filterdActivities: any;
  selectedProject: string;
  currentYear: number;
  selectedMonth: number = 13;

  Projects: string[];

  months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'Feburary' },
    { value: 2, label: 'March' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private projectService: ProjectmanagementService,
    private pmService: PMService,
    private userService: UserService,
    private modalService: NgbModal,
    public dialogService: DialogService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.document.body.classList.toggle('toggle-sidebar');

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites();
    this.currentYear = new Date().getFullYear();
  }

  onMonthSelected() {}
  ViewProgress(actView: ActivityView) {
    let modalRef = this.modalService.open(ViewProgressComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.activity = actView;
  }

  getAssignedActivites() {
    this.pmService.getAssignedActivities(this.user.employeeId).subscribe({
      next: (res) => {
     
        this.Activties = res;
        this.filterdActivities = res;
        this.Projects = [...new Set(res.map((item) => item.projectName))];
        this.filterActivites('');
      },
      error: (err) => {
   
      },
    });
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

  getMonthPeroformance(
    monthPerformance: MonthPerformanceView[],
    order: number
  ) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0;
    }
    return monthPerformance[order]?.planned;
  }

  getMonthPeroformance2(
    monthPerformance: MonthPerformanceView[],
    order: number
  ) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0;
    }
    return monthPerformance[order]?.actual;
  }

  getMonthPeroformance3(
    monthPerformance: MonthPerformanceView[],
    order: number
  ) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0;
    }

    return monthPerformance[order]?.plannedBudget;
  }
  getMonthPeroformance4(
    monthPerformance: MonthPerformanceView[],
    order: number
  ) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0;
    }

    return monthPerformance[order]?.usedBudget;
  }

  onProjectChange() {
    this.filterdActivities = this.Activties.filter((item) => {
      return (
        item.projectName && item.projectName.includes(this.selectedProject)
      );
    });
  }

  onQuarterChange() {
    if (this.Quarter == 1) {
      this.months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'Feburary' },
        { value: 2, label: 'March' },
      ];
      this.selectedMonth = 0;
    } else if (this.Quarter == 2) {
      this.months = [
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
      ];

      this.selectedMonth = 3;
    } else if (this.Quarter == 3) {
      this.months = [
        { value: 6, label: 'July' },
        { value: 7, label: 'Augest' },
        { value: 8, label: 'September' },
      ];

      this.selectedMonth = 6;
    } else {
      this.months = [
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' },
      ];
      this.selectedMonth = 9;
    }

    // this.filterProjects()
  }

  filterActivites(value: string) {
    if (this.selectedProject) {
      this.filterdActivities = this.Activties.filter((item) => {
        return (
          item.projectName && item.projectName.includes(this.selectedProject)
        );
      });
    } else {
      this.filterdActivities = this.Activties;
    }

    var searchTerm = value.toString();
    this.filterdActivities = this.filterdActivities.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm) ||
        item.activityNumber.toLowerCase().includes(searchTerm)
      );
    });
  }

  onProgressAdded(activityId: string, month: any, target: any) {
    var actprogress: UpdateActivityProgressDto = {
      activityId: activityId,
      usedBudget: 0,
      actualWorked: target.value,
      employeeId: this.user.employeeId,
      createdBy: this.user.userId,
      order: month.value,
      progressType: 1,
    };

    this.projectService.updateActivityProgress(actprogress).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully Updated',
            detail: res.message,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Something Went Wrong',
            detail: res.message,
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Something Went Wrong',
          detail: err.message,
        });
      },
    });
  }

  onProgressBudgetAdded(activityId: string, month: any, target: any,monthPerfr:any,selectedMonth:number) {


    var tar = this.getMonthPeroformance3(monthPerfr, selectedMonth);
   
    

    if (target.value > tar) {
      var valll = this.getMonthPeroformance4(monthPerfr, selectedMonth);
      target.value = valll;

     

      this.messageService.add({
        severity: 'error',
            summary: 'Budget Error!',
            detail: "used budget is greater than targeted budget",
      })

      return
    }

   
    var actprogress: UpdateActivityProgressDto = {
      activityId: activityId,
      usedBudget: target.value,
      actualWorked: 0,
      employeeId: this.user.employeeId,
      createdBy: this.user.userId,
      order: month.value,
      progressType: 0,
    };

    this.projectService.updateActivityProgress(actprogress).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully Updated',
            detail: res.message,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Something Went Wrong',
            detail: res.message,
          });
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Something Went Wrong',
          detail: err.message,
        });
      },
    });
  }

  getMonthName() {
    var k = this.months.filter((item) => {
      return item.value == this.selectedMonth;
    });

    return k[0].label;
  }

  getTodayDate(): string {
    const today = new Date();
    return this.datePipe.transform(today, 'yyyy-MM-dd') || '';
  }

  changeActivityStatus(
    activityId: string,
    isCancelled: any,
    isCompleted: any,
    isStarted: any,
    resceduled :any
  ) {
    if (isCancelled != null) {
      this.ref = this.dialogService.open(CustomConfirmationComponent, {
        header: 'Cancel Activity !!!',

        data: {
          message: 'Do you want to Cancel this Activity?',
        },
        width: '500px',
        closable: false,
      });

      this.ref.onClose.subscribe((result) => {
        if (result) {
          var date = this.getTodayDate();
          this.projectService
          .changeActivityStatus(
            activityId,
            isCompleted?.checked,
            isCancelled?.checked,
            isStarted?.checked,
            resceduled?.checked,
            result,         
            date,
            date        
          )
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successfully updated',
                  detail: res.message,
                });
                this.getAssignedActivites();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Something went wrong',
                  detail: res.message,
                });
                if (isCancelled) {
                  isCancelled.checked = false;
                }
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Something went wrong',
                detail: err.message,
              });
              if (isCancelled) {
                isCancelled.checked = false;
              }
             
            },
          });
        }
      });
    }

    else if (resceduled!=null){
      this.ref = this.dialogService.open(CustomResceduleConfirtamionComponent, {
        header: 'Rescedule Activity !!!',

        data: {
          message: 'Do you want to Rescedule this Activity?',
        },
        width: '500px',
        closable: false,
      });

      this.ref.onClose.subscribe((result) => {
        if (result) {
          
          this.projectService
          .changeActivityStatus(
            activityId,
            isCompleted?.checked,
            isCancelled?.checked,
            isStarted?.checked,
            resceduled?.checked,
            result.remark,         
            result.startDate,
            result.endDate        
          )
          .subscribe({
            next: (res) => {
              if (res.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successfully updated',
                  detail: res.message,
                });
                this.getAssignedActivites();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Something went wrong',
                  detail: res.message,
                });
                if (resceduled) {
                  resceduled.checked = false;
                }
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Something went wrong',
                detail: err.message,
              });
              if (isCancelled) {
                resceduled.checked = false;
              }
            
            },
          });
        }
      });
    }
    else {
      var date = this.getTodayDate();
      this.projectService
        .changeActivityStatus(
          activityId,
          isCompleted?.checked,
          isCancelled?.checked,
          isStarted?.checked,
          resceduled?.checked,
          "",         
          date,
          date        
        )
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully updated',
                detail: res.message,
              });
              this.getAssignedActivites();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Something went wrong',
                detail: res.message,
              });
              if (isCompleted) {
                isCompleted.checked = false;
              }
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong',
              detail: err.message,
            });

            if (isCompleted != null) {
              isCompleted.checked = false;
            }
          },
        });
    }
  }
}
