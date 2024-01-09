import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddScsPaymentComponent } from './add-scs-payment/add-scs-payment.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-scs-payment',
  templateUrl: './scs-payment.component.html',
  styleUrls: ['./scs-payment.component.scss']
})
export class ScsPaymentComponent implements OnInit {

  Payments:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getPayments()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getPayments(){

    this.controlService.getGeneralSetting("PAYMENTMODE").subscribe({
      next:(res)=>{
        this.Payments = res 
      }
    })
  }

  addPayment(){


    let modalRef = this.modalService.open(AddScsPaymentComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getPayments()
    })

  }

  removePayment(PaymentId:string) {

    console.log(PaymentId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Payment?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(PaymentId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getPayments()
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

  
  updatePayment(Payment:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddScsPaymentComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.Payment=Payment

    modalRef.result.then(()=>{
      this.getPayments()
    })

  }
}