import { Component, OnInit } from '@angular/core';
import { NotificationDto } from 'src/app/model/INotificationDto';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  leaves !: NotificationDto[]
  constructor(private userService: UserService, private notificationService: NotificationService) { }

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


}
