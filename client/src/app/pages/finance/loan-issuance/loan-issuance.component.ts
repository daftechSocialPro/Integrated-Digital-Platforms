import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApprovedLoansDto, LoanPaymentDto } from 'src/app/model/Finance/ILoanIssuanceDto';
import { ApprovePaymentDto } from 'src/app/model/Finance/IPaymentDto';
import { FinanceService } from 'src/app/services/finance.service';
import { PayLoanComponent } from './pay-loan/pay-loan.component';

@Component({
  selector: 'app-loan-issuance',
  templateUrl: './loan-issuance.component.html',
  styleUrls: ['./loan-issuance.component.css']
})
export class LoanIssuanceComponent implements OnInit {

  approvedLoanList!: ApprovedLoansDto[]

  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal,
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
  ){}

  ngOnInit(): void {
    this.getApprovedLoans()
  }

  getApprovedLoans(){
    this.financeService.getApprovedLoans().subscribe({
      next: (res) => {
        this.approvedLoanList = res
      }
    })
  }

  payLoan(loan: ApprovedLoansDto){
    let modalRef = this.modalService.open(PayLoanComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.loan = loan
    modalRef.result.then(()=>{
      this.getApprovedLoans()
    })
  }

  giveLoan(id: string){

    this.confirmationService.confirm({
      message: `Are You sure you want to Give this Loan?`,
      header: 'Approve Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        
        this.financeService.giveLoan(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.getApprovedLoans();
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
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  

}
