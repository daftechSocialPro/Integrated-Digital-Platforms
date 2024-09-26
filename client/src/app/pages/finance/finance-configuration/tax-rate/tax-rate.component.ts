import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxRateDto } from 'src/app/model/Finance/ITaxRateDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddTaxRateComponent } from './add-tax-rate/add-tax-rate.component';

@Component({
  selector: 'app-tax-rate',
  templateUrl: './tax-rate.component.html',
  styleUrls: ['./tax-rate.component.css']
})
export class TaxRateComponent implements OnInit {
  
  taxRate! : TaxRateDto[]

  ngOnInit(): void {

    this.getReportingPeriods()
    
  }

  constructor (private financeService : FinanceService, private modalService:NgbModal){}


  getReportingPeriods (){
    this.financeService.getTaxRate().subscribe({
      next:(res)=>{      
          this.taxRate = res      
      },error:(err)=>{
     
      }
    })
  }

  addNew(){
    let modalRef = this.modalService.open(AddTaxRateComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getReportingPeriods()
    })
  }


}
