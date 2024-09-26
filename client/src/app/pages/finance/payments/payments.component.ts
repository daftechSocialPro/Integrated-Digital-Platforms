import { Component, OnInit } from '@angular/core';
import { PaymentGetDto } from 'src/app/model/Finance/IPaymentDto';
import { UserView } from 'src/app/model/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  pendingPaymentsList: PaymentGetDto[]
  user!: UserView

  constructor(
    private routerService: Router,
    
  ){}

 

  addPayment() {

    this.routerService.navigateByUrl('/finance/payments/addpayment')

    // let modalRef = this.modalService.open(AddPaymentsComponent,{ size:'xxl',   backdrop:'static'})
    // modalRef.result.then(()=>{
    //   this.getPendingPayments()
    // })
  }
  
  

  
}
