import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApprovePaymentDto, PaymentGetDto } from 'src/app/model/Finance/IPaymentDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddPaymentsComponent } from './add-payments/add-payments.component';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit{



  pendingPaymentsList: PaymentGetDto[]
  user!: UserView

  constructor(
  
    private financeService : FinanceService, 
    private modalService:NgbModal,
    private routerService  : Router,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
  ){}

  ngOnInit(): void {

   
    this.user = this.userService.getCurrentUser()
    this.getPendingPayments()
  }

  getPendingPayments(){
    this.financeService.getPendingPayments().subscribe({
      next : (res) => {
        this.pendingPaymentsList = res
      }
    })
  }

  addPayment(){

this.routerService.navigateByUrl('/finance/payments/addpayment')




    // let modalRef = this.modalService.open(AddPaymentsComponent,{ size:'xxl',   backdrop:'static'})
    // modalRef.result.then(()=>{
    //   this.getPendingPayments()
    // })
  }
  
  approvePayment(paymentId: string,paymentNumber: string, paymentType: string, paymentDate: Date, paymentBank: string, paymentSupplier: string, paymentRemark:string){
    this.confirmationService.confirm({
      message: `Are You sure you want to Approve this Payment?<br>Payment Number: ${paymentNumber}<br>Payment Type: ${paymentType}<br>Payment Date: ${paymentDate}<br>Payment Bank: ${paymentBank}<br>Payment Supplier: ${paymentSupplier}<br>Payment Remark: ${paymentRemark}`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const approvePay: ApprovePaymentDto = {
          id: paymentId,
          approvedById: this.user.userId
        }
        this.financeService.approvePayment(approvePay).subscribe({
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
