import { Component, OnInit } from '@angular/core';
import { PMService } from 'src/app/services/pm.services';
import { IPaymentRequisitionGetDto } from '../IPaymentRequisition';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentRequisitionViewComponent } from '../payment-requisition-view/payment-requisition-view.component';

@Component({
  selector: 'app-pending-payment-requisition',
  templateUrl: './pending-payment-requisition.component.html',
  styleUrls: ['./pending-payment-requisition.component.css'],
})
export class PendingPaymentRequisitionComponent implements OnInit {
  pendingPayments: IPaymentRequisitionGetDto[] = [];
  ngOnInit(): void {

    this.getPendingPaymentRequisition()
  }

  constructor(private pmService: PMService,private modalService : NgbModal) {}

  getPendingPaymentRequisition() {
    this.pmService.getPendingPaymentRequisitions().subscribe({
      next: (res) => {
        this.pendingPayments = res;
        
      },
    });
  }

  paymentView (payment){
    let modalRef = this.modalService.open(PaymentRequisitionViewComponent,{size:'xl',backdrop:"static"});
    modalRef.componentInstance.paymentView = payment;
  }
}
