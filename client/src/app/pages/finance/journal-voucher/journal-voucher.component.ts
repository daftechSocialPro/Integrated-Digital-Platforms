import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.css']
})
export class JournalVoucherComponent implements OnInit{
  
  constructor(private routerService: Router){
  }
  
  ngOnInit(): void {
    
  }

  addJv(){
    this.routerService.navigateByUrl('/finance/journalVoucher/addJournalVoucher')

  }

}
