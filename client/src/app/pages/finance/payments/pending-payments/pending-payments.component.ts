import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import {
  PaymentGetDto,
  ApprovePaymentDto,
  PaymentDetailListDto,
} from 'src/app/model/Finance/IPaymentDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';
import { AddJournalVoucherComponent } from '../../journal-voucher/add-journal-voucher/add-journal-voucher.component';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.css'],
})
export class PendingPaymentsComponent implements OnInit {
  pendingPaymentsList: PaymentGetDto[];
  user!: UserView;

  constructor(
    private financeService: FinanceService,
    private commonService: CommonService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getPendingPayments();
  }

  getPendingPayments() {
    this.financeService.getPendingPayments().subscribe({
      next: (res) => {
        this.pendingPaymentsList = res;
      },
    });
  }

  roleMatch(value: string[]) {
    return this.userService.roleMatch(value);
  }

  approvePayment(
    paymentId: string,
    paymentNumber: string,
    paymentType: string,
    paymentDate: Date,
    paymentBank: string,
    paymentSupplier: string,
    paymentRemark: string
  ) {
    this.confirmationService.confirm({
      message: `<b>Are You sure you want to Approve this Payment?</b><br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Number:</b> ${paymentNumber}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Type:</b> ${paymentType}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Date:</b> ${paymentDate}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Bank:</b> ${paymentBank}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Supplier:</b> ${paymentSupplier}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Remark:</b> ${paymentRemark}`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const approvePay: ApprovePaymentDto = {
          id: paymentId,
          approvedById: this.user.employeeId,
        };
        this.financeService.approvePayment(approvePay).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfull',
                detail: res.message,
              });
              this.getPendingPayments();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Something went Wrong',
                detail: res.message,
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Something went Wrong',
              detail: err,
            });
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  addJV(paymentDetailList: PaymentDetailListDto[]){
    let modalRef = this.modalService.open(AddJournalVoucherComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.paymentDetailList = paymentDetailList
    modalRef.result.then(()=>{
      this.getPendingPayments()
    })
  }
  createImagePath(url: string) {
    return this.commonService.createImgPath(url);
  }

  addPayeeDetail(paymentId: string){
    let modalRef = this.modalService.open(AddJournalVoucherComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.paymentId = paymentId
    modalRef.result.then(()=>{
      this.getPendingPayments()
    })
  }
}
