import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppliedLeavesGetDto, LeaveBalanceGetDto } from 'src/app/model/HRM/ILeaveDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { AddLeaveRequestComponent } from '../../human-resource/leave/request-leave/add-leave-request/add-leave-request.component';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  leaves: any[] = []
  userView !: UserView
  LeaveBalance!: LeaveBalanceGetDto
  AppliedLeaves!: AppliedLeavesGetDto[]

  constructor(
    private modalService: NgbModal,
    private hrmService: HrmService,
    private userService: UserService,
    private router: Router) { }

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
  

}
