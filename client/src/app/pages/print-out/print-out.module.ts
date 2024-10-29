import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintOutRoutingModule } from './print-out-routing.module';
import { ContractAgreementComponent } from './HRM/contract-agreement/contract-agreement.component';
import { PaymentTransferComponent } from './Finance/payment-transfer/payment-transfer.component';
import { GuaranteeLetterComponent } from './HRM/guarantee-letter/guarantee-letter.component';
import { ContractExtentionLetterComponent } from './HRM/contract-extention-letter/contract-extention-letter.component';


@NgModule({
  declarations: [
    ContractAgreementComponent,
    PaymentTransferComponent,
    GuaranteeLetterComponent,
    ContractExtentionLetterComponent
  ],
  imports: [
    CommonModule,
    PrintOutRoutingModule
  ]
})
export class PrintOutModule { }
