import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractAgreementComponent } from './HRM/contract-agreement/contract-agreement.component';
import { PaymentTransferComponent } from './Finance/payment-transfer/payment-transfer.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'contractLetter', component: ContractAgreementComponent },
    { path: 'paymentTransferLetter', component: PaymentTransferComponent },
  ])],
  exports: [RouterModule]
})
export class PrintOutRoutingModule { }
