import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { PurchaseInvoiceGetDto } from 'src/app/model/Finance/IPurchaseInvoiceDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pending-purchase-invoice',
  templateUrl: './pending-purchase-invoice.component.html',
  styleUrls: ['./pending-purchase-invoice.component.css']
})
export class PendingPurchaseInvoiceComponent implements OnInit {
  
  pendingPurchaseInvoiceList: PurchaseInvoiceGetDto[]
  user!: UserView

  constructor(
    private financeService : FinanceService, 
    private modalService: NgbModal,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.getPendingPurchaseInovice()
  }

  getPendingPurchaseInovice(){
    this.financeService.getPendingPurchaseInvoices().subscribe({
      next : (res) => {
        this.pendingPurchaseInvoiceList = res
      }
    })
  }

  approvePurchaseInvoice(purchaseId: string, purchaseRequestNo: string, supplier:string, vocherNo: string, date: string){
    this.confirmationService.confirm({
      message: `Are You sure you want to Approve this Purchase Invoice?<br>
                Purchase Request Number: ${purchaseRequestNo}<br>
                Supplier: ${supplier}<br>
                Vocher Number: ${vocherNo}<br>
                Date: ${date}`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        
        this.financeService.approvePurchaseInvoice(purchaseId, this.user.employeeId).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });
    
 
  }


}
