import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';
import { IPaymentRequisitionGetDto, ApprovePaymentRequsition } from '../../finance/payment-requisition/IPaymentRequisition';
import { PaymentRequisitionViewComponent } from '../../finance/payment-requisition/payment-requisition-view/payment-requisition-view.component';
import { EmployeeRequsitionsDto } from './IEmployee-payment.model';
import { RequestPaymentComponent } from './request-payment/request-payment.component';

@Component({
  selector: 'app-payment-setlments',
  templateUrl: './payment-setlments.component.html',
  styleUrls: ['./payment-setlments.component.css']
})
export class PaymentSetlmentsComponent implements OnInit {
  employeeRequsitions: EmployeeRequsitionsDto[] = [];
  user: UserView;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.getEmployeeRequests()
  }

  constructor(private financeService: FinanceService,
              private modalService : NgbModal,
             private userService: UserService) {}

getEmployeeRequests() {
    this.financeService.getEmployeeRequsitions(this.user.userId).subscribe({
      next: (res) => {
        this.employeeRequsitions = res;
      },
    });
  }

  addPayment() {
    let modalRef = this.modalService.open(RequestPaymentComponent, {
      size: 'xl',
      backdrop: 'static',
    });

    modalRef.result.then(() => {
      window.location.reload();
    });
  }
}
