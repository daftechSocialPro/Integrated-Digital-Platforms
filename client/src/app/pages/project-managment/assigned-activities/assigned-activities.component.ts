import { Component, OnInit } from '@angular/core';

import { ActivityView } from '../view-activties/activityview';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assigned-activities',
  templateUrl: './assigned-activities.component.html',
  styleUrls: ['./assigned-activities.component.css']
})
export class AssignedActivitiesComponent implements OnInit {

  user !: UserView
  Activties!: ActivityView[]

  constructor(

    private pmService: PMService,
    private userService: UserService

  ) {

  }

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites()

  }

  getAssignedActivites() {
    this.pmService.getAssignedActivities(this.user.employeeId).subscribe({
      next: (res) => {
        this.Activties = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }



}
