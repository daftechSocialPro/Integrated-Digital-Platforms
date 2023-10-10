import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeLoanDto, RequestedLoanListDto } from 'src/app/model/HRM/ILoanManagmentDto';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-loan',
  templateUrl: './employee-loan.component.html',
  styleUrls: ['./employee-loan.component.css']
})
export class EmployeeLoanComponent implements OnInit  {


  employeeLoan!: EmployeeLoanDto[];

  constructor(
    private router : Router,
    private hrmService: HrmService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getLoanRequests()
  }


  getLoanRequests() {
    this.hrmService.getEmployeeLoans().subscribe({
      next: (res) => {
        this.employeeLoan = res
      }
    });
  }


}