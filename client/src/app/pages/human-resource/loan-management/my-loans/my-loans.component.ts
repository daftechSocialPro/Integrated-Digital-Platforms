import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeLoanDto } from 'src/app/model/HRM/ILoanManagmentDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { RequestLoanComponent } from './request-loan/request-loan.component';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.css']
})
export class MyLoansComponent implements OnInit  {


  myLoans!: EmployeeLoanDto[];
  user!: UserView;

  constructor(
    private router : Router,
    private hrmService: HrmService,
    private userService: UserService,
    private modalService: NgbModal,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getMyLoans()
  }


  getMyLoans() {
    this.hrmService.getMyLoans(this.user.employeeId).subscribe({
      next: (res) => {
        this.myLoans = res
      }
    })
  }

  requestLoan() {
    let modalRef = this.modalService.open(RequestLoanComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.employeeId = this.user.employeeId
    modalRef.result.then(() => {
    })
  }
  
 
}