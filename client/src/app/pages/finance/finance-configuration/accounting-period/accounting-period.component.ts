import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanceService } from 'src/app/services/finance.service';
import { AddAccountingPeriodComponent } from './add-accounting-period/add-accounting-period.component';
import { AccountingPeriodGetDto } from 'src/app/model/Finance/IAccountingPeriodDto';

@Component({
  selector: 'app-accounting-period',
  templateUrl: './accounting-period.component.html',
  styleUrls: ['./accounting-period.component.css']
})
export class AccountingPeriodComponent implements OnInit {

  accountingPeriods : AccountingPeriodGetDto[]



  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal

  ){}

  ngOnInit() {
      this.getAccountingPeriods()
  }

  getAccountingPeriods(){
    this.financeService.getAccountingPeriod().subscribe({
      next : (res) => {
        this.accountingPeriods = res
        
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  addAccountingPeriod(){
    let modalRef = this.modalService.open(AddAccountingPeriodComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getAccountingPeriods()
    })
  }



}
