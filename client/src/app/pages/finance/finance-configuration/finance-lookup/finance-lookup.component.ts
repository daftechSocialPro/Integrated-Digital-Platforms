import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanceLookupPostDto } from 'src/app/model/Finance/IFinanceLookupTypeDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddFinanceLookupComponent } from './add-finance-lookup/add-finance-lookup.component';

@Component({
  selector: 'app-finance-lookup',
  templateUrl: './finance-lookup.component.html',
  styleUrls: ['./finance-lookup.component.css']
})
export class FinanceLookupComponent implements OnInit {
  
  financelookup! : FinanceLookupPostDto[]

  ngOnInit(): void {
    this.getFinanceLookup();
  }

  constructor (private financeService : FinanceService, private modalService:NgbModal){}


  getFinanceLookup (){
    this.financeService.getFinanceLookups().subscribe({
      next:(res)=>{      
          this.financelookup = res      
      },error:(err)=>{
       
      }
    })
  }

  addNew(){
    let modalRef = this.modalService.open(AddFinanceLookupComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getFinanceLookup()
    })
  }

  updateFinancelookup (financelookup :FinanceLookupPostDto){
    let modalRef = this.modalService.open(AddFinanceLookupComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.financelookup = financelookup
    modalRef.result.then(()=>{
      this.getFinanceLookup()
    });
  }
}
