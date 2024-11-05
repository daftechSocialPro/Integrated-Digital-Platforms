import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractEndEmployeesDto } from 'src/app/model/HRM/IContractEndEmployeesDto';
import { HrmService } from 'src/app/services/hrm.service';
import { TerminateEmployeeComponent } from '../employee-managment/employee-termination/terminate-employee/terminate-employee.component';
import { ExtendContractComponent } from './extend-contract/extend-contract.component';

@Component({
  selector: 'app-contract-end-employees',
  templateUrl: './contract-end-employees.component.html',
  styleUrls: ['./contract-end-employees.component.css']
})
export class ContractEndEmployeesComponent implements OnInit {

  contractEndEmployees!: ContractEndEmployeesDto[]

  constructor(private hrmService: HrmService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.getContractEndEmployees();
  }


  getContractEndEmployees() {
    this.hrmService.getContractEndEmployees().subscribe({
      next: (res) => {
        this.contractEndEmployees = res;
      }, error: (err) => {
       
      }
    });
  }


  terminateContract(employeeId:string){
    let modalRef = this.modalService.open(TerminateEmployeeComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.empId = employeeId
    modalRef.result.then (()=>{
      this.getContractEndEmployees();
    });
  }

  extendContract(employeeId: string){
    let modalRef = this.modalService.open(ExtendContractComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.empId = employeeId
    modalRef.result.then (()=>{
      this.getContractEndEmployees();
    });
  }


}
