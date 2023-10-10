import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';
import { NotificationDto } from 'src/app/model/INotificationDto';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { SelectList } from 'src/app/model/common';
import { HrmService } from 'src/app/services/hrm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user !: UserView
  contactEndEMployees!: SelectList[]
  vacancies!: NotificationDto[]
  constructor(@Inject(DOCUMENT) private document: Document,
    private authGuard: AuthGuard,
    private route: Router,
    private hrmService: HrmService,
    private userService: UserService,
    private notificationService: NotificationService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getVacancyList()
    this.getContractEndEmp()

  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  logOut() {

    this.authGuard.logout();
  }

  createImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }

  getVacancyList() {

    this.notificationService.getVacanciesNotification().subscribe({

      next: (res) => {
        this.vacancies = res
      }
    })

  }
  navigateToDetail(id: string) {

    this.route.navigate(['/HRM/vacancyDetail', id])

  } navigateToempDetail(id: string) {


    this.route.navigate(['HRM/employeeDetail', { employeeId: id }])
  }

  roleMatch(value: string[]) {
    return this.userService.roleMatch(value)
  }

  getContractEndEmp() {

    this.hrmService.getEmployeeswithContractend().subscribe({
      next: (res) => {
        this.contactEndEMployees = res
      }
    })


  }
}
