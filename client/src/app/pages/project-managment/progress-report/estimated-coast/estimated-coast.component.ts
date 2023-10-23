import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IPlannedReport } from '../planned-report/planned-report';
import * as XLSX from 'xlsx';
import { SelectList } from 'src/app/model/common';
import { PMService } from 'src/app/services/pm.services';
import { DropDownService } from 'src/app/services/dropDown.service';


@Component({
  selector: 'app-estimated-coast',
  templateUrl: './estimated-coast.component.html',
  styleUrls: ['./estimated-coast.component.css']
})
export class EstimatedCoastComponent implements OnInit {

  serachForm!: FormGroup
  estimatedCosts  !: any
  branchs!: SelectList[]
  structures !: SelectList[]
 

  constructor(
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private orgService: DropDownService) {

  }

  ngOnInit(): void {

    this.serachForm = this.formBuilder.group({
      BudgetYear: ['', Validators.required],
      selectStructureId: ['', Validators.required],
      ReportBy: ['Quarter']
    })

  
   


  }

  exportTableToExcel(table: HTMLElement, fileName: string): void {
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  }
  Search() {

    this.pmService.GetEstimatedCost(this.serachForm.value.selectStructureId,this.serachForm.value.BudgetYear).subscribe({
      next: (res) => {
             this.estimatedCosts = res 
             console.log(this.estimatedCosts)
             //this.cnt=  this.plannedreport?.pMINT

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