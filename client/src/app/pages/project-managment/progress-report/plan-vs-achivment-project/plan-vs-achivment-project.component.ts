import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlanView } from 'src/app/model/PM/PlansDto';
import { PlanService } from 'src/app/services/plan.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { ActivityView, MonthPerformanceView } from '../../view-activties/activityview';

@Component({
  selector: 'app-plan-vs-achivment-project',
  templateUrl: './plan-vs-achivment-project.component.html',
  styleUrls: ['./plan-vs-achivment-project.component.css']
})
export class PlanVsAchivmentProjectComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  Quarter:number
  selectedProject:string
  Activities:any
  filterdActivities:any
  currentYear:number

  projects : PlanView[]
  ngOnInit(): void {

    this.getProjects()
    
  }

  constructor(
    private planService : PlanService,
    private projectService :ProjectmanagementService
  ){
    this.currentYear = new Date().getFullYear();
  }

getProjects (){
  this.planService.getPlans().subscribe({
    next: (res) => {     
      this.projects = res     
    },
    error: (err) => {
      console.error(err)
    }
  })
}

onPorjectCHange(){
  this.Quarter=0
}

  filterProjects (){
  this.projectService.getActivitiesFromProject(this.selectedProject).subscribe({
    next:(res)=>{
      this.Activities =res
      this.filterdActivities =res 

      console.log(res)
    }
  })

  }

  onQuarterChange(){
    this.filterProjects()

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
  getMonthPeroformance (monthPerformance:MonthPerformanceView [] ) {
   
  if (monthPerformance.length==0|| !monthPerformance )
  {
    return 0

  }

    if (this.Quarter==1){
      return monthPerformance[0]?.planned+monthPerformance[1]?.planned+monthPerformance[2]?.planned;
    }
    if (this.Quarter==2){
      return monthPerformance[3]?.planned+monthPerformance[4]?.planned+monthPerformance[5]?.planned;
    }
    if (this.Quarter==3){
      return monthPerformance[6]?.planned+monthPerformance[7]?.planned+monthPerformance[8]?.planned;
    }
    if (this.Quarter==4){
      return monthPerformance[9]?.planned+monthPerformance[10]?.planned+monthPerformance[11]?.planned;
    }
   
      return 0
    
  }
  getMonthPeroformance2 (monthPerformance:MonthPerformanceView [] ) {
   
    if (monthPerformance.length==0|| !monthPerformance )
    {
      return 0
  
    }
  
      if (this.Quarter==1){
        return monthPerformance[0]?.actual+monthPerformance[1]?.actual+monthPerformance[2]?.actual;
      }
      if (this.Quarter==2){
        return monthPerformance[3]?.actual+monthPerformance[4]?.actual+monthPerformance[5]?.actual;
      }
      if (this.Quarter==3){
        return monthPerformance[6]?.actual+monthPerformance[7]?.actual+monthPerformance[8]?.actual;
      }
      if (this.Quarter==4){
        return monthPerformance[9]?.actual+monthPerformance[10]?.actual+monthPerformance[11]?.actual;
      }
     
        return 0
    }
      
  getMonthPeroformance3 (monthPerformance:MonthPerformanceView [] ) {
    if (monthPerformance.length==0 || !monthPerformance)
    {
      return 0
  
    }
    if (this.Quarter==1){
      return monthPerformance[0]?.plannedBudget  +monthPerformance[1]?.plannedBudget+monthPerformance[2]?.plannedBudget;
    }
    if (this.Quarter==2){
      return monthPerformance[3]?.plannedBudget+monthPerformance[4]?.plannedBudget+monthPerformance[5]?.plannedBudget;
    }
    if (this.Quarter==3){
      return monthPerformance[6]?.plannedBudget+monthPerformance[7]?.plannedBudget+monthPerformance[8]?.plannedBudget;
    }
    if (this.Quarter==4){
      return monthPerformance[9]?.plannedBudget+monthPerformance[10]?.plannedBudget+monthPerformance[11]?.plannedBudget;
    }
    return 0
  }

  getMonthPeroformance4 (monthPerformance:MonthPerformanceView [] ) {
    if (monthPerformance.length==0 || !monthPerformance)
    {
      return 0
  
    }
    if (this.Quarter==1){
      return monthPerformance[0]?.usedBudget  +monthPerformance[1]?.usedBudget+monthPerformance[2]?.usedBudget;
    }
    if (this.Quarter==2){
      return monthPerformance[3]?.usedBudget+monthPerformance[4]?.usedBudget+monthPerformance[5]?.usedBudget;
    }
    if (this.Quarter==3){
      return monthPerformance[6]?.usedBudget+monthPerformance[7]?.usedBudget+monthPerformance[8]?.usedBudget;
    }
    if (this.Quarter==4){
      return monthPerformance[9]?.usedBudget+monthPerformance[10]?.usedBudget+monthPerformance[11]?.usedBudget;
    }
    return 0
  }
}
