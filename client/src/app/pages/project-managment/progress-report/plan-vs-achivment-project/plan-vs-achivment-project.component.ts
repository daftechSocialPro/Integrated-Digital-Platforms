import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { PlanView } from 'src/app/model/PM/PlansDto';
import { PlanService } from 'src/app/services/plan.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { ActivityView, MonthPerformanceView } from '../../view-activties/activityview';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UpdateActivityProgressDto } from 'src/app/model/PM/StrategicPlanDto';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { ViewProgressComponent } from '../../view-activties/view-progress/view-progress.component';

@Component({
  selector: 'app-plan-vs-achivment-project',
  templateUrl: './plan-vs-achivment-project.component.html',
  styleUrls: ['./plan-vs-achivment-project.component.css']
})
export class PlanVsAchivmentProjectComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  Quarter: number = 1
  user !: UserView
  Activties!: ActivityView[]
  filterdActivities: any
  selectedProject: string
  currentYear: number
  selectedMonth:number=13

  Projects :string[]=[]

 
  

  months = [{ value: 0, label: "January" }, { value: 1, label: "Feburary" }, { value: 2, label: "March" }]



  constructor(
    @Inject(DOCUMENT) private document: Document,
    private projectService: ProjectmanagementService,
    private pmService: PMService,
    private userService: UserService,
    private planService : PlanService,
    private modalService : NgbModal,
    private messageService: MessageService

  ) {

  }

  ngOnInit(): void {

    this.document.body.classList.toggle('toggle-sidebar');

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites()
    this.currentYear = new Date().getFullYear();

  }



  onMonthSelected(){

  }
  ViewProgress(actView:ActivityView) {

    let modalRef = this.modalService.open(ViewProgressComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = actView

  }

  getAssignedActivites() {
    this.pmService.GetActivityForPlan(this.user.employeeId,this.user.role).subscribe({
      next: (res) => {

       
        this.filterdActivities = res
        this.Projects = [...new Set(res.map((item)=>item.projectName))]

        this.filterActivites("")
      }, error: (err) => {
      
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

  onProjectChange(){
    this.filterdActivities = this.Activties.filter((item)=>{
      return (item.projectName&& item.projectName.includes(this.selectedProject))
    })
  }

  onQuarterChange() {


    if (this.Quarter == 1) {
      this.months = [{ value: 0, label: "January" }, { value: 1, label: "Feburary" }, { value: 2, label: "March" }]
      this.selectedMonth = 0 
    }
    else if (this.Quarter == 2) {

      this.months = [{ value: 3, label: "April" }, { value: 4, label: "May" }, { value: 5, label: "June" }]

      this.selectedMonth = 3

    }
    else if (this.Quarter == 3) {

      this.months = [{ value: 6, label: "July" }, { value: 7, label: "Augest" }, { value: 8, label: "September" }]

      this.selectedMonth = 6 

    }
    else {
      this.months = [{ value: 9, label: "October" }, { value: 10, label: "November" }, { value: 11, label: "December" }]
      this.selectedMonth = 9
    }

 





    // this.filterProjects()

  }

  filterActivites(value: string) {

    

    if (this.selectedProject){
    this.filterdActivities = this.Activties.filter((item)=>{
      return (item.projectName&& item.projectName.includes(this.selectedProject))
    })
  }
  else{
    this.filterdActivities = this.Activties
  }



    var searchTerm = value.toString();
    this.filterdActivities = this.filterdActivities.filter((item) => {
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

  getMonthName (){

    var k =  this.months.filter((item)=> 
    {
    return (item.value == this.selectedMonth )
    })
  
    return k[0].label
  }

    exportAsExcel(name:string) {
  
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

 

}

