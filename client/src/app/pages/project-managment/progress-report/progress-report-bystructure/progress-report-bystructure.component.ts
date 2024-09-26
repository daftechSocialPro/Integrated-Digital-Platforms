import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IPlannedReport } from '../planned-report/planned-report';
import * as XLSX from 'xlsx';
import { SelectList } from 'src/app/model/common';
import { PMService } from 'src/app/services/pm.services';
import { DropDownService } from 'src/app/services/dropDown.service';

@Component({
  selector: 'app-progress-report-bystructure',
  templateUrl: './progress-report-bystructure.component.html',
  styleUrls: ['./progress-report-bystructure.component.css']
})
export class ProgressReportBystructureComponent implements OnInit {

  serachForm!: FormGroup
  progressReportByStructure  !: any
  branchs!: SelectList[]
  structures !: SelectList[]
  cnt: number = 0
  programs !: SelectList[]


  constructor(
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private orgService: DropDownService) {

  }

  ngOnInit(): void {

    this.serachForm = this.formBuilder.group({
      // BudgetYear: ['', Validators.required],
      selectStructureId: ['', Validators.required],
      ReportBy: ['Quarter']
    })
this.OnBranchChange()



  }


  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }

  
  Search() {

    this.pmService.GetProgressReportByStructure('2023', this.serachForm.value.ReportBy, this.serachForm.value.selectStructureId).subscribe({
      next: (res) => {

     
             this.progressReportByStructure = res 
            this.cnt = this.progressReportByStructure?.planDuration

      }, error: (err) => {
        console.error(err)
      }
    })

  }

  OnBranchChange() {

    this.orgService.getDepartmentsDropdown().subscribe({
      next: (res) => {
        this.structures = res

      }, error: (err) => {
        console.error(err)
      }
    })

  }

  range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }



}