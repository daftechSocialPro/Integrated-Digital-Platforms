import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { FilterationCriteria } from './Iprogress-report';

import * as XLSX from 'xlsx';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.css']
})
export class ProgressReportComponent implements OnInit {

  serachForm!: FormGroup
  progressReport  !: any
  user !: UserView
  cnt: number = 0
  programs !: SelectList[]
  plans !: SelectList[]
  tasks!: SelectList[]
  activities!: SelectList[]
  actparents!: SelectList[]


  constructor(
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private commonService: CommonService,
    private userService : UserService) {

  }

  ngOnInit(): void {

    this.serachForm = this.formBuilder.group({
      // BudgetYear: ['', Validators.required],
      // programId: ['', Validators.required],
      planId: ['', Validators.required],
      taskId: [''],
      actParentId : [null],
      activityId: [null],
      ReportBy: ['Quarter']
    })


    this.getProjects()

    this.user = this.userService.getCurrentUser()


  }

  
exportTableToExcel(table: HTMLElement, fileName: string): void {
  const worksheet = XLSX.utils.table_to_sheet(table);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, fileName + '.xlsx');
}

  Search() {

    let filterationCriteria : FilterationCriteria ={
      budgetYear : this.serachForm.value.BudgetYear,
      empId : this.user.employeeId,
      planId : this.serachForm.value.planId,
      taskId: this.serachForm.value.taskId,
      actId : this.serachForm.value.activityId,
      actParentId : this.serachForm.value.actParentId,
      reporttype : this.serachForm.value.ReportBy
    }

    this.pmService.GetProgressReport(filterationCriteria).subscribe({
      next: (res) => {

        this.progressReport = res
        this.cnt = this.progressReport?.planDuration

      }, error: (err) => {
        console.error(err)
      }
    })

  }


  getProjects() {

    this.pmService.getByProgramIdSelectList().subscribe({
      next: (res) => {
        this.plans = res
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onPlanChange(value: string) {
    this.pmService.getByTaskIdSelectList(value).subscribe({
      next: (res) => {
        this.tasks = res
      },
      error: (err) => {
        console.error(err)
      }
    })

    this.onChangeActParent(value,undefined,undefined)
  }

  onTaskChange(value: string) {
    this.pmService.getActivitieParentsSelectList(value).subscribe({
      next: (res) => {
        this.actparents = res
      },
      error: (err) => {
        console.error(err)
      }
    })
    this.onChangeActParent(undefined,value,undefined)
  }

  onChangeActParent(planId?: string, taskId ?: string , actParentId?:string) {


    this.pmService.GetActivitiesSelectList(planId,taskId,actParentId).subscribe({
      next: (res) => {
        this.activities = res
      },
      error: (err) => {
        console.error(err)
      }

    })
  }
  range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }

  getImage (value : string){

    return this.commonService.createImgPath(value)
  }
  applyStyles(act: number) {

    //let percentage = (completed / act) * 100
    const styles = { 'width': act + "%" };
    return styles;
  }


}
