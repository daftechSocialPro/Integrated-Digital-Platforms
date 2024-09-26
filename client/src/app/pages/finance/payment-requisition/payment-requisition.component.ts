import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-requisition',
  templateUrl: './payment-requisition.component.html',
  styleUrls: ['./payment-requisition.component.css'],
})
export class PaymentRequisitionComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private modalService: NgbModal) {}

  
}
