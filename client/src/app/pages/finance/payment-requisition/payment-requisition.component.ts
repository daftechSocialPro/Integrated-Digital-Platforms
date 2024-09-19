import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPaymentRequisitionComponent } from './add-payment-requisition/add-payment-requisition.component';

@Component({
  selector: 'app-payment-requisition',
  templateUrl: './payment-requisition.component.html',
  styleUrls: ['./payment-requisition.component.css'],
})
export class PaymentRequisitionComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private modalService: NgbModal) {}

  addPayment() {
    let modalRef = this.modalService.open(AddPaymentRequisitionComponent, {
      size: 'xl',
      backdrop: 'static',
    });

    modalRef.result.then(() => {
      window.location.reload();
    });
  }
}
