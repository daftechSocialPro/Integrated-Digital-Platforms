import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ApprovePaymentDto, PaymentGetDto } from 'src/app/model/Finance/IPaymentDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-approved-payments',
  templateUrl: './approved-payments.component.html',
  styleUrls: ['./approved-payments.component.css']
})
export class ApprovedPaymentsComponent implements OnInit{

  approvedPaymentsList: PaymentGetDto[]
  user!: UserView;

  constructor(
   private financeService : FinanceService, 
   private userService: UserService,
   private commonService: CommonService,
   private messageService: MessageService,
   private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getApprovedPayments();
  }

  getApprovedPayments(){
    this.financeService.getApprovedPayments().subscribe({
      next : (res) => {
        this.approvedPaymentsList = res
      }
    })
  }

  createImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }

  AuthorizePayment(payment: PaymentGetDto){
    this.confirmationService.confirm({
      message: `<b>Are You sure you want to Authorize this Payment?</b><br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Number:</b> ${payment.paymentNumber}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Type:</b> ${payment.paymentType}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Date:</b> ${payment.paymentDate}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Payment Bank:</b> ${payment.bank}`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const approvePay: ApprovePaymentDto = {
          id: payment.id,
          approvedById: this.user.employeeId,
        };
        this.financeService.authorizePayment(approvePay).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfull',
                detail: res.message,
              });
              this.getApprovedPayments();
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

}
