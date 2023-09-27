import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddLeaveRequestComponent } from './add-leave-request/add-leave-request.component';
import { LeaveBalanceComponent } from './leave-balance/leave-balance.component';
import { AppliedLeavesGetDto, LeaveBalanceGetDto } from 'src/app/model/HRM/ILeaveDto';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/app/model/user';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css']
})
export class RequestLeaveComponent implements OnInit {

  leaves: any[] = []
  userView !: UserView
  LeaveBalance!: LeaveBalanceGetDto
  AppliedLeaves!: AppliedLeavesGetDto[]
  constructor(
    private modalService: NgbModal,
    private hrmService: HrmService,
    private userService: UserService,
    private router : Router) { }

  ngOnInit(): void {
    this.userView = this.userService.getCurrentUser()
    this.getLeaveBalance()
    this.getAppliedLeave()
  }

  requestLeave() {
    let modalRef = this.modalService.open(AddLeaveRequestComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {

      this.getLeaveBalance(),
      this.getAppliedLeave()
    })
  }

  addLeavebalance() {

    let modalRef = this.modalService.open(LeaveBalanceComponent, { size: 'lg', backdrop: 'static' })

    modalRef.result.then(() => {
      this.getLeaveBalance(),
      this.getAppliedLeave()

    })
  }
  getLeaveBalance() {

    this.hrmService.getLeaveBalance(this.userView.employeeId).subscribe({
      next: (res) => {
        this.LeaveBalance = res
      }
    })
  }

  getAppliedLeave() {
    this.hrmService.getAppliedLeaves(this.userView.employeeId).subscribe({
      next: (res) => {
        this.AppliedLeaves = res

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
      return 'success'
  }
  goToDetails(id:string){
    
    this.router.navigate(['/HRM/leaverequest/', id]);   
  }
}
