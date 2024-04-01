import { Component, OnInit } from '@angular/core';
import { PaymentGetDto } from 'src/app/model/Finance/IPaymentDto';
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


  constructor(
   private financeService : FinanceService, 
   private userService: UserService,
   private commonService: CommonService
  ){}

  ngOnInit(): void {
    this.getApprovedPayments()
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

}
