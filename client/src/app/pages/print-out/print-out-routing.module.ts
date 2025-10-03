import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractAgreementComponent } from './HRM/contract-agreement/contract-agreement.component';
import { PaymentTransferComponent } from './Finance/payment-transfer/payment-transfer.component';
import { GuaranteeLetterComponent } from './HRM/guarantee-letter/guarantee-letter.component';
import { ContractExtentionLetterComponent } from './HRM/contract-extention-letter/contract-extention-letter.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'contractLetter', component: ContractAgreementComponent },
    { path: 'guaranteeLetter', component: GuaranteeLetterComponent },
    { path: 'contractExtentionLetter', component: ContractExtentionLetterComponent },
    { path: 'paymentTransferLetter', component: PaymentTransferComponent },
  ])],
  exports: [RouterModule]
})
export class PrintOutRoutingModule { }
