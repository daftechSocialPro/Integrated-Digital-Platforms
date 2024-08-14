import { Component, Input, OnInit } from '@angular/core';
import { AcceptRejectComponent } from '../../project-managment/view-activties/view-progress/accept-reject/accept-reject.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { PMService } from 'src/app/services/pm.services';
import {
  ActivityView,
  ViewProgressDto,
} from '../../project-managment/view-activties/activityview';
import { FinanceService } from 'src/app/services/finance.service';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AddPaymentsComponent } from '../payments/add-payments/add-payments.component';

@Component({
  selector: 'app-activity-progress-approver',
  templateUrl: './activity-progress-approver.component.html',
  styleUrls: ['./activity-progress-approver.component.css'],
})
export class ActivityProgressApproverComponent implements OnInit {
  progress!: ViewProgressDto[];
  userId: string;
  userType: string[] = ['Director', 'Project Manager', 'Finance'];
  actionType: string[] = ['Accept', 'Reject'];
  constructor(
    private modalService: NgbModal,
    private financeService: FinanceService,
    private commonService: CommonService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userId = this.userService.getCurrentUser().employeeId;
    this.getProgress();
  }

  getProgress() {
    this.financeService.viewFinanceProgress(this.userId).subscribe({
      next: (res) => {
        this.progress = res;
      },
      error: (err) => {},
    });
  }

  getFilePath(value: string) {
    return this.commonService.createImgPath(value);
  }

  ApporveReject(progressId: string, user: string, actiontype: string) {
    let modalRef = this.modalService.open(AcceptRejectComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.progressId = progressId;
    modalRef.componentInstance.userType = user;
    modalRef.componentInstance.actiontype = actiontype;
    modalRef.result.then(() => {
      window.location.reload();
    });
  }

  Approve(pro: ViewProgressDto) {
    let modalRef = this.modalService.open(AddPaymentsComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.callFrom = true;
    modalRef.componentInstance.progress = pro;
    modalRef.componentInstance.paymentApproved.subscribe(
      (approvedProgress: boolean) => {
        if (approvedProgress) {
          console.log('Payment Approved:', approvedProgress);

          this.ApporveReject(pro.id, this.userType[2], this.actionType[0]);
          // Perform any additional logic or UI updates
        }
      }
    );
  }
}
