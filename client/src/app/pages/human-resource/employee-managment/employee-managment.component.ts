import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  EmployeeListDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Table } from 'primeng/table';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

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
    private confirmationService : ConfirmationService,
    private messageService : MessageService,
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

  DeleteEmployee(employeeId:string){

    this.confirmationService.confirm({
      message: 'Do you want to Delete this Employee Information ?',
      header: 'Employee Delete Confirmation !',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployee(employeeId).subscribe({

          next: (res) => {
            if (res.success) {
  
              this.messageService.add({ severity: 'success', summary: `Successfully Delted`, detail: res.message })
              window.location.reload()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went wrong!!! ', detail: res.message })
  
            }
  
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error ', detail: err })
  
          }
  
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
   


  }


}
