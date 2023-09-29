import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { TerminateEmployeeComponent } from '../employee-termination/terminate-employee/terminate-employee.component';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId!: string;
  employee!: EmployeeGetDto
  ngOnInit(): void {
    this.employeeId = this.router.snapshot.paramMap.get('employeeId')!
    this.getEmployee()
  }

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private hrmService: HrmService,
    private modalService: NgbModal,
    private commonService: CommonService) { }

  getEmployee() {

    this.hrmService.getEmployee(this.employeeId).subscribe({
      next: (res) => {
        this.employee = res
      }
    })
  }
  getImagePath(url: string) {

    return this.commonService.createImgPath(url)
  }

  callcuclateAge(date: Date) {

    return this.commonService.calculateAge(date)
  }
  employeeList() {
    this.route.navigate(["HRM/employeeMangment"])
  }



  updateEmployee(selectedEmployee: EmployeeGetDto) {
    let modalRef = this.modalService.open(UpdateEmployeeComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.selectedEmployee = selectedEmployee

    modalRef.result.then (()=>{

      this.getEmployee()
    })

  }

  terminateEmployee(empId:string){
    let modalRef = this.modalService.open(TerminateEmployeeComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.empId = empId

    modalRef.result.then (()=>{

      this.getEmployee()
    })
  }



}
