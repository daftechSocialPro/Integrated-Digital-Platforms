import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ApprovedLoansDto, LoanPaymentDto } from 'src/app/model/Finance/ILoanIssuanceDto';
import { UserView } from 'src/app/model/user';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.component.html',
  styleUrls: ['./pay-loan.component.css']
})
export class PayLoanComponent implements OnInit {

  @Input() loan!: string 
  payLoanForm!: FormGroup
  user!: UserView



  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private userService: UserService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    console.log("loan",this.loan)
    this.user = this.userService.getCurrentUser()

    this.payLoanForm = this.formBuilder.group({
      totalPayment: ['', Validators.required]
    })
      
  }

  closeModal() {
    this.activeModal.close();
  }

  submit(){
    var payLoanData: LoanPaymentDto = {
      totalPayment: this.payLoanForm.value.totalPayment,
      employeeLoanId: this.loan,
      createdById: this.user.userId
    }

    this.financeService.payLoan(payLoanData).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

          this.closeModal();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
      }
    })
  }

}
