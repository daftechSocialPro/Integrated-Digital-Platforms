import { Component, OnInit } from '@angular/core';
import { NotificationDto } from 'src/app/model/INotificationDto';
import { ActivityView } from 'src/app/model/PM/ActivityViewDto';
import { UserView } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user !: UserView
  Activties!: ActivityView[]
  leaves !: NotificationDto[]
  constructor(private userService: UserService, 
    private notificationService: NotificationService,
    private pmService : PMService) { }

  ngOnInit(): void {
    this.getEligibleLeaves()
  }


  roleMatch(value: string[]) {
    return this.userService.roleMatch(value)
  }

  getEligibleLeaves (){
    this.notificationService.getEligibleLeaves().subscribe({
      next:(res)=>{
        this.leaves = res 
      }
    })
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
