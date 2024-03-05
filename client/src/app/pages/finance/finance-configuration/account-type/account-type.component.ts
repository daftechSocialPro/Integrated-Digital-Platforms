import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountTypePostDto } from 'src/app/model/Finance/IAccountTypeDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddAccountTypeComponent } from './add-account-type/add-account-type.component';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})

export class AccountTypeComponent implements OnInit {
  
  accountTypes! : AccountTypePostDto[]

  ngOnInit(): void {

    this.getReportingPeriods()
    
  }

  constructor (private financeService : FinanceService, private modalService:NgbModal){}


  getReportingPeriods (){
    this.financeService.getAccountTypes().subscribe({
      next:(res)=>{      
          this.accountTypes = res      
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  addNew(){
    let modalRef = this.modalService.open(AddAccountTypeComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getReportingPeriods()
    })
  }

  updateAccountType (accountType :AccountTypePostDto){
    let modalRef = this.modalService.open(AddAccountTypeComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.accountType = accountType
    modalRef.result.then(()=>{
      this.getReportingPeriods()
    });
  }
}
