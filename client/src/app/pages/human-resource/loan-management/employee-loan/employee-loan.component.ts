import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApproveInitialRequestDto, EmployeeLoanDto, RequestedLoanListDto } from 'src/app/model/HRM/ILoanManagmentDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-loan',
  templateUrl: './employee-loan.component.html',
  styleUrls: ['./employee-loan.component.css']
})
export class EmployeeLoanComponent implements OnInit  {

  user!: UserView;
  employeeLoan!: EmployeeLoanDto[];

  constructor(
    private router : Router,
    private hrmService: HrmService,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLoanRequests();
    this.user = this.userService.getCurrentUser();
  }


  getLoanRequests() {
    this.hrmService.getEmployeeLoans().subscribe({
      next: (res) => {
        this.employeeLoan = res
      }
    });
  }


  approveRequest(requestId: string){
    let initialRequest :ApproveInitialRequestDto = 
    {
        approverId:this.user.employeeId,
        createdBId: this.user.userId,
        requestId: requestId
    }

    this.hrmService.approveSecondRequest(initialRequest).subscribe({
      next:(res)=>{
        if (res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
        
          this.getLoanRequests();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
        
        }
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
      }
    });
}

}