import { Component, OnInit } from '@angular/core';
import { AppliedLeavesGetDto, LeaveBalanceGetDto } from 'src/app/model/HRM/ILeaveDto';
import { HrmService } from 'src/app/services/hrm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';


import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomConfirmationComponent } from '../custom-confirmation/custom-confirmation.component';
@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  userView!:UserView
  LeaveBalance!: LeaveBalanceGetDto
  leaveRequest !: AppliedLeavesGetDto
  employee!:EmployeeGetDto
  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.userView = this.userService.getCurrentUser()
    this.getSingleLeaveRequest(id)
    this.getLeaveBalance()
    
  }
  constructor(
    private userService:UserService,
    private commonService:CommonService,
    private hrmService: HrmService,
    private router : ActivatedRoute,
    private route: Router,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    public dialogService: DialogService){}

  getSingleLeaveRequest(requestId : string ){
    this.hrmService.getSingleLeaveRequest(requestId).subscribe({
      next:(res)=>{
        this.leaveRequest = res
      
        this.getEmployee() 
      }
    })
  }

  getImagePath(url: string) {

    return this.commonService.createImgPath(url)
  }

  callcuclateDate(fromDate:Date,toDate: Date) {
    

    return this.commonService.calculateDate(fromDate,toDate)
  }
 goToRequestList() {
    this.route.navigate(["HRM/leave"])
  }

  getEmployee() {

    this.hrmService.getEmployee(this.leaveRequest.employeeId).subscribe({
      next: (res) => {
        this.employee = res
      }
    })
  }

  getLeaveBalance() {

    this.hrmService.getLeaveBalance(this.userView.employeeId).subscribe({
      next: (res) => {
        this.LeaveBalance = res
      }
    })
  }
  getBadge(item: string) {
    if (item == 'PENDING') {

      return 'warning'
    }
    else if (item == 'REJECTED')
      return 'danger'

    else
      return 'SUCCESS'
  }

  approveRequest (){

    this.confirmationService.confirm({
      message: 'Do you want to Approve this Leave Request?',
      header: 'Leave Approval',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.approveLeaveRequest(this.leaveRequest.id).subscribe({
          next:(res)=>{

            if(res.success){
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
             this.goToRequestList()
            }
            else{
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {
  
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
  
     
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
  rejectRequest (){


    this.ref = this.dialogService.open(CustomConfirmationComponent, { header: 'Leave Rejection',
    
      data: {
        message: 'Do you want to Reject this Leave Request?',
      },
        width: '500px',
      closable: false,
      
    });
  
    this.ref.onClose.subscribe((result) => {
      if (result) {
       
        this.hrmService.rejectLeaveRequest(this.leaveRequest.id,result).subscribe({
                  next:(res)=>{
        
                    if(res.success){
                      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
                     this.goToRequestList()
                    }
                    else{
                      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
                    }
                  }, error: (err) => {
          
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });
          
             
                  }
                })






      } else {
        // Handle reject action
        console.log('Leave Request Rejection Cancelled');
      }
    });


  }
}
