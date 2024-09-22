import { Component, OnInit } from '@angular/core';
import { PMService } from 'src/app/services/pm.services';
import { ApprovePaymentRequsition, IPaymentRequisitionGetDto } from '../IPaymentRequisition';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentRequisitionViewComponent } from '../payment-requisition-view/payment-requisition-view.component';
import { FinanceService } from 'src/app/services/finance.service';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-pending-payment-requisition',
  templateUrl: './pending-payment-requisition.component.html',
  styleUrls: ['./pending-payment-requisition.component.css'],
})
export class PendingPaymentRequisitionComponent implements OnInit {
  pendingPayments: IPaymentRequisitionGetDto[] = [];
  user: UserView;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getPendingPaymentRequisition()
  }

  constructor(private financeService: FinanceService,
              private modalService : NgbModal,
             private userService: UserService,
            private confirmationService: ConfirmationService,
             private messageService: MessageService,
            ) {}

  getPendingPaymentRequisition() {
    this.financeService.getPendingPaymentRequisitions().subscribe({
      next: (res) => {
        this.pendingPayments = res;
      },
    });
  }


  approvePayment(paymentRequsition: IPaymentRequisitionGetDto){
    this.financeService.getBudgetByActivity(paymentRequsition.activityId).subscribe({
      next: (res) => {
        if (res.allocatedBudget < (res.usedBudget + paymentRequsition.ammount)) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'total allocated budget for this activity is less than the requested budget' });
        }
        else {
          this.confirmationService.confirm({
            target: event.target,
            message: `Are you sure that you want to Approve Payment ? \n total allocated budget is ${res.allocatedBudget} \n used budget ${res.usedBudget} \n requested ammount \n ${paymentRequsition.ammount}`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              var approvePayment: ApprovePaymentRequsition = {
                id: paymentRequsition.id,
                employeeId: this.user.employeeId,
                approve: false,
              }
              this.financeService.approvePaymentRequisition(approvePayment).subscribe({
                next: (res) => {
                  this.getPendingPaymentRequisition();
                },
              });
            },
            reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have rejected the request' });
            }
          });
        }
      }
    });
  }

  paymentView (payment){
    let modalRef = this.modalService.open(PaymentRequisitionViewComponent,{size:'xl',backdrop:"static"});
    modalRef.componentInstance.paymentView = payment;
  }
}
