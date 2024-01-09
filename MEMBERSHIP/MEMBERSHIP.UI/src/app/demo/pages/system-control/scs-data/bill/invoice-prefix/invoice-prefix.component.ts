import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddInvoicePrefixComponent } from './add-invoice-prefix/add-invoice-prefix.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-invoice-prefix',
  templateUrl: './invoice-prefix.component.html',
  styleUrls: ['./invoice-prefix.component.scss']
})
export class InvoicePrefixComponent implements OnInit {

  InvoicePrefixs:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getInvoicePrefixs()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getInvoicePrefixs(){

    this.controlService.getGeneralSetting("InvoicePrefix").subscribe({
      next:(res)=>{
        this.InvoicePrefixs = res 
      }
    })
  }

  addInvoicePrefix(){


    let modalRef = this.modalService.open(AddInvoicePrefixComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getInvoicePrefixs()
    })

  }

  removeInvoicePrefix(InvoicePrefixId:string) {

    console.log(InvoicePrefixId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Invoice Prefix?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(InvoicePrefixId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getInvoicePrefixs()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


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

  
  updateInvoicePrefix(InvoicePrefix:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddInvoicePrefixComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.InvoicePrefix=InvoicePrefix

    modalRef.result.then(()=>{
      this.getInvoicePrefixs()
    })

  }

}

