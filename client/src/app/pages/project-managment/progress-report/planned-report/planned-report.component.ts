import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IPlannedReport } from './planned-report';
import * as XLSX from 'xlsx';
import { GetStartEndDate, SelectList } from 'src/app/model/common';
import { PMService } from 'src/app/services/pm.services';
import { DropDownService } from 'src/app/services/dropDown.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { PlanSingleview } from 'src/app/model/PM/PlansDto';
import { TaskView } from 'src/app/model/PM/TaskDto';
import { UserView } from 'src/app/model/user';
import { ExcelService } from 'src/app/services/excel.service';
import { PlanService } from 'src/app/services/plan.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { AddActivitiesComponent } from '../../activity-parents/add-activities/add-activities.component';
import { UpdateActivitiesComponent } from '../../activity-parents/update-activities/update-activities.component';
import { AddTasksComponent } from '../../tasks/add-tasks/add-tasks.component';
import { UpdateTasksComponent } from '../../tasks/update-tasks/update-tasks.component';
import { ActivityTargetComponent } from '../../view-activties/activity-target/activity-target.component';
import { ActivityView } from '../../view-activties/activityview';
import { StrategicPlanGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';

@Component({
  selector: 'app-planned-report',
  templateUrl: './planned-report.component.html',
  styleUrls: ['./planned-report.component.css']
})
export class PlannedReportComponent implements OnInit {
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;


  strategicPlans: SelectList[]=[];

  strategicActivites:Map<string, any[]> = new Map<string, any[]>()
  

  projects:PlanSingleview[]=[]
  items: number[] = Array(13).fill(0);
  items2: number[] = Array(8).fill(0);

  items3: number[] = Array(7).fill(0);
  taskItems :number[] =Array(37).fill(0)
  taskItems2 :number[] =Array(13).fill(0)
  planId!: string;
  
  exportingToExcel = false;
  Plans!: PlanSingleview
  user!: UserView
  plan!: PlanSingleview
  planTasks: Map<string, any[]> = new Map<string, any[]>();
  taskActivities: Map<String, any[]> = new Map<String, any[]>();
  projectYears: SelectList[] = []
  selectedYear: number = 0;
  filterBy:number=1

  

  constructor(
   
    private activatedROute: ActivatedRoute,
    private planService: PlanService,
    private taskService: TaskService,
    private userService: UserService,
    private modalService : NgbModal,
    private excelService : ExcelService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private pmService: PMService,
    private projectService : ProjectmanagementService


  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getStrategicPlans()

  }

  getStrategicPlans (){

    this.projectService.getStragegicPlan().subscribe({
      next:(res)=>{
        this.strategicPlans =res

        res.forEach((str) => {
          if (str.id !== undefined) {
            this.getStrategicPlanForReport(str.id)
          }

        });
      }
    })
  }


  onFilterByChange(){
    if (this.filterBy==0){
      this.items= Array(37).fill(0);
      this.items2= Array(32).fill(0);
    }else  {
      this.items= Array(13).fill(0);
      this.items2= Array(9).fill(0);
    }
  }
  getStrategicPlanForReport(strategicPlanId : string) {

    this.projectService.getStrategicPlanForReport(strategicPlanId).subscribe({
      next:(res)=>{
        console.log(res)
        this.strategicActivites.set(strategicPlanId, res);
      }
    })

    
  }



  getPlans() {
    this.planService.getSinglePlans(this.planId).subscribe({
      next: (res) => {
        console.log("projects", res)

        this.Plans = res
        this.getProjectYears(this.Plans.startDate,this.Plans.endDate)

        this.ListTask(this.planId);
        console.log('this.planTasks: ', this.planTasks);

      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  getProjectYears(startDate: any, endDate: any) {
    this.projectYears = [];
    const startYear = new Date(startDate).getFullYear();
    
    const endYear = new Date(endDate).getFullYear();
    
    
    let index = 0
    for (let year = startYear; year <= endYear; year++) {
      this.projectYears.push({ name: year.toString(), id: index.toString() });
      index+=12
    }

    console.log("startYear" , this.projectYears)

    
  }

  getSingleTaskActivities(taskId: String) {
    this.taskService.getSingleTask(taskId).subscribe({
      next: (res) => {
        if (res.activityViewDtos !== undefined) {
          const result = res.activityViewDtos;
          this.taskActivities.set(taskId, result);
        }


      }, error: (err) => {
        console.error(err)
      }
    })

  }

  ListTask(planId: string) {

    this.planService.getSinglePlans(planId).subscribe({
      next: (res) => {
        this.plan = res
        const result = res.tasks
        result.forEach((task) => {
          if (task.id !== undefined) {
            this.getSingleTaskActivities(task.id)
          }

        });

        this.planTasks.set(planId, result);
        console.log('this.taskActivities: ', this.taskActivities);

      }
    })
  }

  addTask() {
    let modalRef = this.modalService.open(AddTasksComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.plan = this.plan
    modalRef.result.then((res) => {
      this.getPlans()
    })

  }

  updateTask(task: Task) {
    let modalRef = this.modalService.open(UpdateTasksComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.plan = this.plan
    modalRef.componentInstance.task = task
    modalRef.result.then((res) => {
      this.getPlans()
    })

  }

  DeleteTask(taskId:string){

    this.confirmationService.confirm({
      message: 'Do you want to Delete this Task Information ?',
      header: 'Task Delete Confirmation !',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.taskService.deleteTask(taskId).subscribe({

          next: (res) => {
            if (res.success) {
  
              this.messageService.add({ severity: 'success', summary: `Successfully Delted`, detail: res.message })
              window.location.reload()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went wrong!!! ', detail: res.message })
  
            }
  
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error ', detail: err })
  
          }
  
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
   


  }

  addActivity(task:TaskView) {
    let modalRef = this.modalService.open(AddActivitiesComponent, { size: "xxl", backdrop: 'static' })
    modalRef.componentInstance.planId = this.planId

    var dateTime : GetStartEndDate={
      fromDate:this.Plans.startDate.toString(),
      endDate:this.Plans.endDate.toString()

    }

    console.log(task)
    modalRef.componentInstance.task = task
    modalRef.componentInstance.requestFrom = "ACTIVITY";
    modalRef.componentInstance.requestFromId = task.id;
    modalRef.componentInstance.dateAndTime = dateTime

    }


    updateActivity(task:TaskView, activity:any) {
      let modalRef = this.modalService.open(UpdateActivitiesComponent, { size: "xxl", backdrop: 'static' })
      modalRef.componentInstance.planId = this.planId
      var dateTime : GetStartEndDate={
        fromDate:this.Plans.startDate.toString(),
        endDate:this.Plans.endDate.toString()
  
      }
  
      console.log(task)
      modalRef.componentInstance.task = task
      modalRef.componentInstance.requestFrom = "ACTIVITY";
      modalRef.componentInstance.requestFromId = task.id;
      modalRef.componentInstance.dateAndTime = dateTime
      modalRef.componentInstance.activity = activity
  
      }

    DeleteActivity(activityId:string,taskId:string){
      this.confirmationService.confirm({
        message: 'Do you want to Delete this Activity Information ?',
        header: 'Activity Delete Confirmation !',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.pmService.deleteActivity(activityId,taskId).subscribe({
  
            next: (res) => {
              if (res.success) {
    
                this.messageService.add({ severity: 'success', summary: `Successfully Delted`, detail: res.message })
                window.location.reload()
              }
              else {
                this.messageService.add({ severity: 'error', summary: 'Something went wrong!!! ', detail: res.message })
    
              }
    
            }, error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Error ', detail: err })
    
            }
    
          })
  
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        },
        key: 'positionDialog'
      });    
    }
    


    
  AssignTarget(actview:ActivityView ) {
    let modalRef = this.modalService.open(ActivityTargetComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = actview
  }

  exportToExcel(name:string): void {
    this.excelService.exportToExcel('myTable', name);
  }
  exportAsExcel(name:string) {
    this.exportingToExcel= true
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

viewDetail (item:ActivityView)
{
  
  this.router.navigate(['/pm/activityDetail', item.id, this.planId  ]);
}


getGroupValue(order: number): boolean {
  
  const groupSize = 12; 
  
  
  // Number of months in each group

  //return Math.floor((order - 1) / groupSize) + 1 === this.selectedYear;
  return (Math.floor(order / groupSize) * groupSize) == this.selectedYear
}

onProjectYearChange(){
  console.log("Selected Year",this.selectedYear)
  this.ListTask(this.planId);
  

}


 
}
