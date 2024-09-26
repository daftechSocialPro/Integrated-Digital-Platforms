import { Component, OnInit } from '@angular/core';
import { IPaymentRequisitionGetDto } from '../IPaymentRequisition';
import { FinanceService } from 'src/app/services/finance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approved-payment-requisition',
  templateUrl: './approved-payment-requisition.component.html',
  styleUrls: ['./approved-payment-requisition.component.css']
})
export class ApprovedPaymentRequisitionComponent implements OnInit {
  pendingPayments: IPaymentRequisitionGetDto[] = [];
  ngOnInit(): void {

    this.getPendingPaymentRequisition()
  }

  constructor(private financeService: FinanceService,private modalService : NgbModal) {}

  getPendingPaymentRequisition() {
    this.financeService.getAuthorizedPaymentRequisitions().subscribe({
      next: (res) => {
        this.pendingPayments = res;
        
      },
    });
  }

 
}
