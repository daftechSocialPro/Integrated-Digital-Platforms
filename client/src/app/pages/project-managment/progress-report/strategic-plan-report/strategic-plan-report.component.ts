import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { PMService } from 'src/app/services/pm.services';
import { IPlannedReport } from '../planned-report/planned-report';
import * as XLSX from 'xlsx';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { Router } from '@angular/router';
import { ActivityView } from '../../view-activties/activityview';
import { StrategicPeriodGetDto } from 'src/app/model/PM/StrategicPlanDto';
@Component({
  selector: 'app-strategic-plan-report',
  templateUrl: './strategic-plan-report.component.html',
  styleUrls: ['./strategic-plan-report.component.css']
})

export class StrategicPlanReportComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  strategicActivites:Map<string, any[]> = new Map<string, any[]>()
  
  serachForm!: FormGroup
  strategicPlans!:SelectList[]
  strategicPeriods: StrategicPeriodGetDto[] = []
  selectedStrategicPeriod: string = 'ALL'

  filterdStrategicPlans:SelectList[]=[] 
  plannedreport  !: IPlannedReport
  cnt: number = 0

  Quarter:number = 0    
filterBy:number=1
selectedYear: number = 0;
selectedStrategicPlan !: string


items: number[] = Array(13).fill(0);
items2: number[] = Array(16).fill(0);

items3: number[] = Array(7).fill(0);
taskItems :number[] =Array(68).fill(0)
taskItems2 :number[] =Array(20).fill(0)

 

  constructor(
    private dropDownService:DropDownService,
    private formBuilder:FormBuilder,
    private router: Router,
    private pmService : PMService,
    private projectService : ProjectmanagementService){}

  ngOnInit(): void {

    this.getStrategicPeriods()
    this.getStrategicPlans()
    this.serachForm = this.formBuilder.group({
      BudgetYear: [''],
      StrategicPlanId: [''],
      ReportBy: ['Quarter']
    })
    
  }

  getStrategicPeriods() {
    this.projectService.getStrategicPeriods().subscribe({
      next: (res) => {
        this.strategicPeriods = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getStrategicPlans(){

    // Get full strategic plans list with period information
    this.projectService.getStragegicPlan().subscribe({
      next:(res)=>{
        this.applyStrategicPeriodFilter(res);
        res.forEach((str) => {
          if (str.id !== undefined) {
            this.getStrategicPlanForReport(str.id)
          }
        });
      },
      error: (err) => {
        // Fallback to dropdown service if pmService fails
        this.dropDownService.getStrategicPlans().subscribe({
          next:(res)=>{
            this.strategicPlans = res 
            this.filterdStrategicPlans = res 
            res.forEach((str) => {
              if (str.id !== undefined) {
                this.getStrategicPlanForReport(str.id)
              }
            });
          }
        });
      }
    })
  }

  onStrategicPeriodChange() {
    // Reload strategic plans and apply filter
    this.projectService.getStragegicPlan().subscribe({
      next: (res) => {
        this.applyStrategicPeriodFilter(res);
        // Reset strategic plan selection when period changes
        this.selectedStrategicPlan = '';
        this.filterStrategicPlans();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  applyStrategicPeriodFilter(allPlans: any[]) {
    if (this.selectedStrategicPeriod === 'ALL' || !this.selectedStrategicPeriod) {
      // Show all strategic plans
      this.strategicPlans = allPlans.map(plan => ({
        id: plan.id,
        name: plan.name
      }));
      this.filterdStrategicPlans = this.strategicPlans;
    } else {
      // Filter strategic plans by period
      const filteredPlans = allPlans.filter(
        plan => plan.strategicPeriodId === this.selectedStrategicPeriod
      );
      // Update strategicPlans dropdown with filtered list
      this.strategicPlans = filteredPlans.map(plan => ({
        id: plan.id,
        name: plan.name
      }));
      this.filterdStrategicPlans = this.strategicPlans;
    }
  }

  
  onFilterByChange(){
    this.Quarter = 0
    if (this.filterBy==0){
      this.items= Array(37).fill(0);
      this.items2= Array(64).fill(0);
    }else  {
      this.items= Array(13).fill(0);
      this.items2= Array(16).fill(0);
    }
  }
  onQuarterChange(){
    if (this.Quarter==0){
      this.items= Array(37).fill(0);
      this.items2= Array(64).fill(0);
    }else  {
      this.items= Array(13).fill(0);
      this.items2= Array(16).fill(0);
    }
  }
  getStrategicPlanForReport(strategicPlanId : string) {

    this.projectService.getStrategicPlanForReport(strategicPlanId).subscribe({
      next:(res)=>{
       
        this.strategicActivites.set(strategicPlanId, res);
      }
    })

    
  }
  filterStrategicPlans(){

    this.filterdStrategicPlans  = this.strategicPlans.filter(item=>
        item.id=== this.selectedStrategicPlan
      )
    
  }

  
  Search() {

    this.pmService.getStrategicPlanReport(this.serachForm.value.BudgetYear, this.serachForm.value.ReportBy, this.serachForm.value.StrategicPlanId).subscribe({
      next: (res) => {

             this.plannedreport = res 
             this.cnt=  this.plannedreport?.pMINT

      }, error: (err) => {
        console.error(err)
      }
    })
    
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


getQuarterValue(i:number){

  if(this.Quarter==0){
    return true
  }
  else{
    let result:number
    if (i >= 0 && i <= 2) {
      result = 1;
    } else if (i >= 3 && i <= 5) {
      result = 2;
    } else if (i >= 6 && i <= 8) {
      result = 3;
    } else if (i >= 9 && i <= 11) {
      result = 4;
    } 
    
    return result == this.Quarter;
  }
}

}
