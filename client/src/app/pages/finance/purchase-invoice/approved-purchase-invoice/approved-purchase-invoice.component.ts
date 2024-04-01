import { Component, OnInit } from '@angular/core';
import { PurchaseInvoiceGetDto } from 'src/app/model/Finance/IPurchaseInvoiceDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-approved-purchase-invoice',
  templateUrl: './approved-purchase-invoice.component.html',
  styleUrls: ['./approved-purchase-invoice.component.css']
})
export class ApprovedPurchaseInvoiceComponent implements OnInit {
 
  approvedPurchaseInvoiceList: PurchaseInvoiceGetDto[]
  

  constructor(
    private financeService : FinanceService, 
        
  ){}

  ngOnInit(): void {
    
    this.getApprovedPurchaseInovice()
  }

  getApprovedPurchaseInovice(){
    this.financeService.getPurchaseInvoices().subscribe({
      next : (res) => {
        this.approvedPurchaseInvoiceList = res
      }
    })
  }




  

}
