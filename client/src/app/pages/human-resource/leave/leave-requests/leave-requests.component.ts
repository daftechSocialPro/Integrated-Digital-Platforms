import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AppliedLeavesGetDto } from 'src/app/model/HRM/ILeaveDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit  {

  userView!:UserView
  employeeLeaves!: AppliedLeavesGetDto[]
  constructor(
    private router : Router,
    private hrmService: HrmService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userView = this.userService.getCurrentUser()
  
    this.getAppliedLeave()
  }

  getBadge(item: string) {
    if (item == 'pending') {

      return 'warning'
    }
    else if (item == 'rejected')
      return 'danger'

    else
      return 'warning'
  }

  getAppliedLeave() {
    this.hrmService.getLeaveRequests().subscribe({
      next: (res) => {
        this.employeeLeaves = res

      }
    })
  }

  goToDetails(id:string){
    
    this.router.navigate(['/HRM/leaverequest/', id]);   
  }

}
