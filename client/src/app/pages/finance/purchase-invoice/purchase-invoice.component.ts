import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent {


  constructor(
    private routerService: Router,
  ){}


  addPurchaseInvoice() {

    this.routerService.navigateByUrl('/finance/purchaseinvoice/addpurchaseinvoice')

    
  }
  
}
