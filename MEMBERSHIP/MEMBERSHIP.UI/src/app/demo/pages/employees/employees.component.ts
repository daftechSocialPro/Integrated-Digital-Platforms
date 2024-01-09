import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { IEmployeeGetDto } from 'src/models/hrm/IEmployeeDto';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, SharedModule,TableModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export default class EmployeesComponent implements OnInit{

  
  employees :IEmployeeGetDto[]
  
  constructor(
    private commonService : CommonService,
    private hrmService : HrmService,
    private modalService:NgbModal

  ){}

  ngOnInit(): void {
    
    this.getEmployees()
  }
  getEmployees() {

    this.hrmService.getEmployees().subscribe({
      next: (res) => {
        console.log(res)
        this.employees = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addEmployee() {

    let modalRef = this.modalService.open(AddEmployeeComponent, { size: 'lg', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getEmployees()
    })
  }

  updateEmployee(employee: IEmployeeGetDto){
    console.log(employee)

    let modalRef = this.modalService.open(UpdateEmployeeComponent,{size:'lg',backdrop:'static'})
    
    modalRef.componentInstance.employee = employee
    modalRef.result.then(()=>{
      this.getEmployees()
    })
  }



  getImagePath(url:string){
     return this.commonService.createImgPath(url)
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



}
