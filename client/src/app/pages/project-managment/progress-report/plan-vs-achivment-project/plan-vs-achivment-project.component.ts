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

        console.log("activities", res)
        this.Activties = res
        this.filterdActivities = res
        this.Projects = [...new Set(res.map((item)=>item.projectName))]

        this.filterActivites("")
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

  changeActivityStatus(activityId : string ,isCancelled:any, isCompleted:any,isStarted:any){

    console.log(activityId ,isCancelled?.checked, isCompleted?.checked,isStarted?.checked)

    this.projectService.changeActivityStatus(activityId,isCompleted?.checked,isCancelled?.checked,isStarted?.checked).subscribe({
      next:(res)=>{

        if(res.success){

        this.messageService.add({severity:'success',summary:'Successfully updated',detail:res.message})
        this.getAssignedActivites()
        }
        else {

          console.log(res)
          this.messageService.add({severity:'error',summary:'Something went wrong',detail:res.message})
        }

      },error:(err)=>{
        this.messageService.add({severity:'error',summary:'Something went wrong',detail:err.message})
        console.log(err)
      }
    })
  }

}


//   Quarter:number
//   selectedProject:string
//   Activities:any
//   filterdActivities:any
//   currentYear:number

//   projects : PlanView[]
//   ngOnInit(): void {

//     this.getProjects()
    
//   }

//   constructor(
//     private planService : PlanService,
//     private projectService :ProjectmanagementService
//   ){
//     this.currentYear = new Date().getFullYear();
//   }

// getProjects (){
//   this.planService.getPlans().subscribe({
//     next: (res) => {     
//       this.projects = res     
//     },
//     error: (err) => {
//       console.error(err)
//     }
//   })
// }

// onPorjectCHange(){
//   this.Quarter=0
// }

//   filterProjects (){
//   this.projectService.getActivitiesFromProject(this.selectedProject).subscribe({
//     next:(res)=>{
//       this.Activities =res
//       this.filterdActivities =res 

//       console.log(res)
//     }
//   })

//   }

//   onQuarterChange(){
//     this.filterProjects()

//   }

//   exportAsExcel(name:string) {
  
//     const uri = 'data:application/vnd.ms-excel;base64,';
//     const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
//     const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
//     const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };
//     const table = this.excelTable.nativeElement;
//     const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

//     const link = document.createElement('a');
//     link.download = `${name}.xls`;
//     link.href = uri + base64(format(template, ctx));
//     link.click();
// }
//   getMonthPeroformance (monthPerformance:MonthPerformanceView [] ) {
   
//   if (monthPerformance.length==0|| !monthPerformance )
//   {
//     return 0

//   }

//     if (this.Quarter==1){
//       return monthPerformance[0]?.planned+monthPerformance[1]?.planned+monthPerformance[2]?.planned;
//     }
//     if (this.Quarter==2){
//       return monthPerformance[3]?.planned+monthPerformance[4]?.planned+monthPerformance[5]?.planned;
//     }
//     if (this.Quarter==3){
//       return monthPerformance[6]?.planned+monthPerformance[7]?.planned+monthPerformance[8]?.planned;
//     }
//     if (this.Quarter==4){
//       return monthPerformance[9]?.planned+monthPerformance[10]?.planned+monthPerformance[11]?.planned;
//     }
   
//       return 0
    
//   }
//   getMonthPeroformance2 (monthPerformance:MonthPerformanceView [] ) {
   
//     if (monthPerformance.length==0|| !monthPerformance )
//     {
//       return 0
  
//     }
  
//       if (this.Quarter==1){
//         return monthPerformance[0]?.actual+monthPerformance[1]?.actual+monthPerformance[2]?.actual;
//       }
//       if (this.Quarter==2){
//         return monthPerformance[3]?.actual+monthPerformance[4]?.actual+monthPerformance[5]?.actual;
//       }
//       if (this.Quarter==3){
//         return monthPerformance[6]?.actual+monthPerformance[7]?.actual+monthPerformance[8]?.actual;
//       }
//       if (this.Quarter==4){
//         return monthPerformance[9]?.actual+monthPerformance[10]?.actual+monthPerformance[11]?.actual;
//       }
     
//         return 0
//     }
      
//   getMonthPeroformance3 (monthPerformance:MonthPerformanceView [] ) {
//     if (monthPerformance.length==0 || !monthPerformance)
//     {
//       return 0
  
//     }
//     if (this.Quarter==1){
//       return monthPerformance[0]?.plannedBudget  +monthPerformance[1]?.plannedBudget+monthPerformance[2]?.plannedBudget;
//     }
//     if (this.Quarter==2){
//       return monthPerformance[3]?.plannedBudget+monthPerformance[4]?.plannedBudget+monthPerformance[5]?.plannedBudget;
//     }
//     if (this.Quarter==3){
//       return monthPerformance[6]?.plannedBudget+monthPerformance[7]?.plannedBudget+monthPerformance[8]?.plannedBudget;
//     }
//     if (this.Quarter==4){
//       return monthPerformance[9]?.plannedBudget+monthPerformance[10]?.plannedBudget+monthPerformance[11]?.plannedBudget;
//     }
//     return 0
//   }

//   getMonthPeroformance4 (monthPerformance:MonthPerformanceView [] ) {
//     if (monthPerformance.length==0 || !monthPerformance)
//     {
//       return 0
  
//     }
//     if (this.Quarter==1){
//       return monthPerformance[0]?.usedBudget  +monthPerformance[1]?.usedBudget+monthPerformance[2]?.usedBudget;
//     }
//     if (this.Quarter==2){
//       return monthPerformance[3]?.usedBudget+monthPerformance[4]?.usedBudget+monthPerformance[5]?.usedBudget;
//     }
//     if (this.Quarter==3){
//       return monthPerformance[6]?.usedBudget+monthPerformance[7]?.usedBudget+monthPerformance[8]?.usedBudget;
//     }
//     if (this.Quarter==4){
//       return monthPerformance[9]?.usedBudget+monthPerformance[10]?.usedBudget+monthPerformance[11]?.usedBudget;
//     }
//     return 0
//   }
// }
