import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityForSettlementDto } from 'src/app/model/Finance/ActivityForSettlementDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-employee-settlements',
  templateUrl: './employee-settlements.component.html',
  styleUrls: ['./employee-settlements.component.css']
})
export class EmployeeSettlementsComponent implements OnInit {

  activityForSettelment!: ActivityForSettlementDto[]


  constructor(
    private routerService: Router,
    private financeService: FinanceService,
  ) { }

  ngOnInit(): void {
    this.getJournalVouchers();
  }


  getJournalVouchers() {

    this.financeService.getEmployeePaymentSettlements().subscribe({
      next: (res) => {
        this.activityForSettelment = res
      }
    })
  }


  approvePayment(){
    
  }

}
