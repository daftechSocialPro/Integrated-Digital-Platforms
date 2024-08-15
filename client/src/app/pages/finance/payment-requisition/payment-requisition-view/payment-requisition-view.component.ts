import { Component, Input, OnInit } from '@angular/core';
import { IPaymentRequisitionGetDto } from '../IPaymentRequisition';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-requisition-view',
  templateUrl: './payment-requisition-view.component.html',
  styleUrls: ['./payment-requisition-view.component.css']
})
export class PaymentRequisitionViewComponent implements OnInit {

  @Input() paymentView:IPaymentRequisitionGetDto
  ngOnInit(): void {
      
  }

  constructor(private activeModal :NgbActiveModal) {}


  closeModal(){
    
    this.activeModal.close();
  }
}
