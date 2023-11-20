import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  EmployeeListDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-employee-managment',
  templateUrl: './employee-managment.component.html',
  styleUrls: ['./employee-managment.component.css']
})
export class EmployeeManagmentComponent implements OnInit {

  employees!: EmployeeListDto[]
  ngOnInit(): void {

    this.getEmployees()
  }
  constructor(
    private hrmService: HrmService, 
    private router : Router,
    private commmonService : CommonService,
    private modalService: NgbModal) {



  }

  getEmployees() {

    this.hrmService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addEmployee() {

    let modalRef = this.modalService.open(AddEmployeeComponent, { size: 'xl', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getEmployees()
    })
  }

  employeeDetail (employeeId: string ){
    this.router.navigate(['HRM/employeeDetail',{employeeId:employeeId}])
  }

  getImagePath(url:string){
     return this.commmonService.createImgPath(url)
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
