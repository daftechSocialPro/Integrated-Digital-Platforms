import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { PMService } from 'src/app/services/pm.services';
import { IPlannedReport } from '../planned-report/planned-report';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-strategic-plan-report',
  templateUrl: './strategic-plan-report.component.html',
  styleUrls: ['./strategic-plan-report.component.css']
})

export class StrategicPlanReportComponent implements OnInit {

  serachForm!: FormGroup
  strategicPlans!:SelectList[]
  plannedreport  !: IPlannedReport
  cnt: number = 0
 

  constructor(
    private dropDownService:DropDownService,
    private formBuilder:FormBuilder,
    private pmService : PMService){}

  ngOnInit(): void {

    this.getStrategicPlans()
    this.serachForm = this.formBuilder.group({
      BudgetYear: [''],
      StrategicPlanId: [''],
      ReportBy: ['Quarter']
    })
    
  }

  getStrategicPlans(){

    this.dropDownService.getStrategicPlans().subscribe({
      next:(res)=>{
        console.log(res)
        this.strategicPlans = res 
      }
    })
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
  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }

}
