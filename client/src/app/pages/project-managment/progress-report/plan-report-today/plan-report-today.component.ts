import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IPlanReportDetailDto } from './IplanReportDetai';
import * as XLSX from 'xlsx';
import { SelectList } from 'src/app/model/common';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-plan-report-today',
  templateUrl: './plan-report-today.component.html',
  styleUrls: ['./plan-report-today.component.css']
})
export class PlanReportTodayComponent implements OnInit {

  serachForm!: FormGroup
  planReportDetail  !: IPlanReportDetailDto
  cnt: number = 0
  programs !: SelectList[]
  constructor(private formBuilder: FormBuilder, private pmService: PMService) {

  }

  ngOnInit(): void {

    this.serachForm = this.formBuilder.group({
      BudgetYear: [''],
      ProgramId: [''],
      ReportBy: ['Quarter']
    })

    this.pmService.getProgramSelectList().subscribe({
      next: (res) => {
        this.programs = res
    
      }, error: (err) => {
 
      }
    })


  }

  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  
  Search() {

    this.pmService.getPlanDetailReport(this.serachForm.value.BudgetYear, this.serachForm.value.ReportBy,this.serachForm.value.ProgramId).subscribe({
      next: (res) => {
    

       this.planReportDetail = res 
       this.cnt= res.MonthCounts.length

      }, error: (err) => {
        console.error(err)
      }
    })

  }
}