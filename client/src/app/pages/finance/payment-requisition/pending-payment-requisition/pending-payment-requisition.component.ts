import { Component, OnInit } from '@angular/core';
import { PMService } from 'src/app/services/pm.services';
import { ApprovePaymentRequsition, IPaymentRequisitionGetDto } from '../IPaymentRequisition';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentRequisitionViewComponent } from '../payment-requisition-view/payment-requisition-view.component';
import { FinanceService } from 'src/app/services/finance.service';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

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
             private userService: UserService) {}

  getPendingPaymentRequisition() {
    this.financeService.getPendingPaymentRequisitions().subscribe({
      next: (res) => {
        this.pendingPayments = res;
      },
    });
  }

  approvePayment(paymentRequsitionId: string){
    var approvePayment: ApprovePaymentRequsition ={
        id: paymentRequsitionId,
        employeeId: this.user.employeeId
    }
    this.financeService.approvePaymentRequisition(approvePayment).subscribe({
      next: (res) => {
        this.getPendingPaymentRequisition();
      },
    });
  }

  paymentView (payment){
    let modalRef = this.modalService.open(PaymentRequisitionViewComponent,{size:'xl',backdrop:"static"});
    modalRef.componentInstance.paymentView = payment;
  }
}
