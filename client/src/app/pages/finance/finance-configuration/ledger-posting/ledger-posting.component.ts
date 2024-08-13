import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LedgerPostingAccountDto } from 'src/app/model/Finance/ITaxRateDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddLedgerPostingComponent } from './add-ledger-posting/add-ledger-posting.component';

@Component({
  selector: 'app-ledger-posting',
  templateUrl: './ledger-posting.component.html',
  styleUrls: ['./ledger-posting.component.css']
})

export class LedgerPostingComponent implements OnInit {
  
  ledger! : LedgerPostingAccountDto[]

  ngOnInit(): void {

    this.getLedgerAccounts()
    
  }

  constructor (private financeService : FinanceService, private modalService:NgbModal){}


  getLedgerAccounts (){
    this.financeService.getLedgerPosting().subscribe({
      next:(res)=>{      
          this.ledger = res      
      },error:(err)=>{
     
      }
    })
  }

  addNew(){
    let modalRef = this.modalService.open(AddLedgerPostingComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getLedgerAccounts()
    })
  }


}