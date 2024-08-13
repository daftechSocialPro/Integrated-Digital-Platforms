import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetJournalVoucherDto } from 'src/app/model/Finance/IJournalVoucherDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.css']
})
export class JournalVoucherComponent implements OnInit{
  
  journalVouchersList!: GetJournalVoucherDto[]
  typeofJVList = [
    {name: 'Payment', code:0 },
    {name: 'Journal Voucher', code:1 },
    {name: 'Recivable', code:2 }
  ]
   

  constructor(
    private routerService: Router,
    private financeService : FinanceService, 
  ){}
  
  ngOnInit(): void {
    
  }


  getJournalVouchers(typeofJV: string){
    var typeofJVnum = Number(typeofJV)
    this.financeService.getJournalVoucher(typeofJVnum).subscribe({
      next : (res) => {
        this.journalVouchersList = res
      }
    })
  }
  addJv(){
    this.routerService.navigateByUrl('/finance/journalVoucher/addJournalVoucher')

  }

}
