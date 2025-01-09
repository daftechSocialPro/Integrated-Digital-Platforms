import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetReceipts, ReceiptDetailGetDto } from 'src/app/model/Finance/IReceiptModel';
import { FinanceService } from 'src/app/services/finance.service';
import { AddJournalVoucherComponent } from '../journal-voucher/add-journal-voucher/add-journal-voucher.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{

  receipts!: GetReceipts[]

  constructor(
    private financeService: FinanceService,
    private modalService: NgbModal,
    private routerService: Router,
  ){}
  
  ngOnInit(): void {
      this.getReceipts()
  }
  getReceipts(){
    this.financeService.getReceipts().subscribe({
      next: (res) => {
        this.receipts = res
      }
    })
  }

  addReceipts(){
    this.routerService.navigateByUrl('/finance/receipt/addreceipt')
  }

  addJV(receiptDetailGet: ReceiptDetailGetDto[]){
    let modalRef = this.modalService.open(AddJournalVoucherComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.receiptDetailGet = receiptDetailGet
    modalRef.result.then(()=>{
      this.getReceipts()
    })
  }
}