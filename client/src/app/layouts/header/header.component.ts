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
import { ActivityView } from 'src/app/model/PM/ActivityViewDto';
import { PMService } from 'src/app/services/pm.services';
import { FinanceService } from 'src/app/services/finance.service';
import { ApprovePaymentRequsition, PendingRequestAmmountDto } from 'src/app/pages/finance/payment-requisition/IPaymentRequisition';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activites!: ActivityView[]
  user !: UserView
  contactEndEMployees!: SelectList[]
  vacancies!: NotificationDto[]
  visibleSidebar2: boolean;
  pendingPayments: PendingRequestAmmountDto[] = [];

  constructor(@Inject(DOCUMENT) private document: Document,
    private authGuard: AuthGuard,
    private route: Router,
    private hrmService: HrmService,
    private userService: UserService,
    private notificationService: NotificationService,
    private commonService: CommonService,
    private pmService: PMService,
    private financeService: FinanceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this.visibleSidebar2 = true;
    this.user = this.userService.getCurrentUser();
    this.getVacancyList();
    this.getContractEndEmp();
    this.getActivityForApproval();
    this.getPendingPaymentRequsitions();
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
    });
  }

  getActivityForApproval() {
    this.pmService.getActivityForApproval(this.user.employeeId).subscribe({
      next: (res) => {
        this.activites = res
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  navigateToDetail(id: string) {
    this.route.navigate(['/HRM/vacancyDetail', id])
  }
  navigateToempDetail(id: string) {
    this.route.navigate(['HRM/employeeDetail', { employeeId: id }])
  }

  getPendingPaymentRequsitions() {
    this.financeService.getPendignRequestsByProjectManager(this.user.employeeId).subscribe({
      next: (res) => {
        this.pendingPayments = res
      }, error: (err) => {
        console.error(err)
      }
    });
  }


  routeToApproval(act: ActivityView) {
    this.route.navigate(['pm/actForApproval', { Activties: act }])
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

  approvePayment(id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Are you sure that you want to Approve Payment ?`,
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
        let item: ApprovePaymentRequsition = {
          id: id,
          approve: true,
          employeeId: this.user.employeeId
        }
        this.financeService.approvePaymentRequisition(item).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.pendingPayments =  this.pendingPayments.filter(x => x.id != id);
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try Again or contact your administrator' });
            console.error(err)
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have rejected the request' });
      }
    });
  }



}



