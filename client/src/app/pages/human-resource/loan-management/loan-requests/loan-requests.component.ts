import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApproveInitialRequestDto, RequestedLoanListDto } from 'src/app/model/HRM/ILoanManagmentDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.css']
})
export class LoanRequestsComponent implements OnInit  {


  requestLists!: RequestedLoanListDto[];
  user!: UserView;

  constructor(
    private router : Router,
    private hrmService: HrmService,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLoanRequests()
    this.user = this.userService.getCurrentUser();
  }


  getLoanRequests() {
    this.hrmService.loanRequestList().subscribe({
      next: (res) => {
        this.requestLists = res
      }
    })
  }


  approveRequest(requestId: string){
      let initialRequest :ApproveInitialRequestDto = 
      {
          approverId:this.user.employeeId,
          createdBId: this.user.userId,
          requestId: requestId
      }

      this.hrmService.approveInitialRequest(initialRequest).subscribe({
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