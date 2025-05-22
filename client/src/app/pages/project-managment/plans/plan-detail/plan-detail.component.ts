import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanView, PlanSingleview } from 'src/app/model/PM/PlansDto';
import { UserView } from 'src/app/model/user';
import { PlanService } from 'src/app/services/plan.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { AddTasksComponent } from '../../tasks/add-tasks/add-tasks.component';
import { AddActivitiesComponent } from '../../activity-parents/add-activities/add-activities.component';
import { Task, TaskView } from 'src/app/model/PM/TaskDto';
import { GetStartEndDate, SelectList } from 'src/app/model/common';
import { ActivityTargetComponent } from '../../view-activties/activity-target/activity-target.component';
import { ActivityView } from 'src/app/model/PM/ActivityViewDto';
import { ExcelService } from 'src/app/services/excel.service';
import { UpdateTasksComponent } from '../../tasks/update-tasks/update-tasks.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UpdateActivitiesComponent } from '../../activity-parents/update-activities/update-activities.component';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  items: number[] = Array(13).fill(0);
  items2: number[] = Array(8).fill(0);

  taskItems :number[] =Array(37).fill(0)
  taskItems2 :number[] =Array(13).fill(0)
  planId!: string;
  
  exportingToExcel = false;
  Plans!: PlanSingleview
  user!: UserView
  plan!: PlanSingleview
  planTasks: Map<string, any[]> = new Map<string, any[]>();
  taskActivities: Map<String, any[]> = new Map<String, any[]>();
  projectYears: any[] = []
  selectedYear!: number;
  filterBy:number=1
  dataLoaded: boolean = true;

  assignedBudget:number = 0 
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


  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.planId = this.activatedROute.snapshot.paramMap.get('planId')!
    this.getPlans()
  }


  onFilterByChange(){
    if (this.filterBy==0){
      this.items= Array(37).fill(0);
      this.items2= Array(32).fill(0);
    }else  {
      this.items= Array(13).fill(0);
      this.items2= Array(8).fill(0);
    }
  }




  getPlans() {
    this.planService.getSinglePlans(this.planId,0).subscribe({
      next: (res) => {
       

        this.Plans = res
        this.getProjectYears(this.Plans.startDate,this.Plans.endDate)

        this.ListTask(this.planId);
      

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
    this.selectedYear = startYear;
    
    
    for (let year = startYear; year <= endYear; year++) {
      this.projectYears.push({ name: year.toString(), id: year });
    }


  }

  getSingleTaskActivities(taskId: String) {
    this.taskService.getSingleTask(taskId,this.selectedYear).subscribe({
      next: (res) => {
        if (res.activityViewDtos !== undefined) {
          const result = res.activityViewDtos;

         
          this.assignedBudget += res.activityViewDtos.reduce((accumulator, item) => accumulator + item.plannedBudget, 0);
          this.taskActivities.set(taskId, result);
        }


      }, error: (err) => {
        console.error(err)
      }
    })

  }



  ListTask(planId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.planService.getSinglePlans(planId,this.selectedYear).subscribe({
        next: (res) => {
          this.plan = res;
          const result = res.tasks;
          this.assignedBudget=0;
          const promises = result.map(task => this.getSingleTaskActivities(task.id));
          Promise.all(promises).then(() => {
            this.planTasks.set(planId, result);
           
            resolve(); // Resolve the promise once data is loaded
          }).catch(error => {
            reject(error); // Reject the promise if there's an error
          });
        },
        error: (err) => {
          reject(err); // Reject the promise if there's an error
        }
      });
    });
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



onProjectYearChange(){
  this.dataLoaded = false

  this.ListTask(this.planId).then(() => {
    this.dataLoaded = true; 
  });
}


getPerformancesByCurrentYear(monthPerformance: any): any[] {

  if (!this.dataLoaded) return []; // Return empty array if data is not loaded yet
  const currentYear = this.selectedYear; 
  const filteredArray = monthPerformance.filter(item => {
    const itemYear = item.year;
    return itemYear == currentYear;
  });
  
  return filteredArray;
}

}





