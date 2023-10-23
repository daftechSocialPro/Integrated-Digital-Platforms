import { Component, Input } from '@angular/core';

import { ActivityView } from '../view-activties/activityview';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activityforapproval',
  templateUrl: './activityforapproval.component.html',
  styleUrls: ['./activityforapproval.component.css']
})
export class ActivityforapprovalComponent {

 @Input() Activties!: ActivityView[]
 user!:UserView

  constructor(

    private pmService: PMService,
    private userService: UserService

  ) {

  }

  ngOnInit(): void {
if(!this.Activties){
    this.user = this.userService.getCurrentUser();
    this.getActivityForApproval()
}

  }

  getActivityForApproval() {
    this.pmService.getActivityForApproval(this.user.employeeId).subscribe({
      next: (res) => {
        this.Activties = res
      }, error: (err) => {
        console.log(err)
      }
    })
  }




}
