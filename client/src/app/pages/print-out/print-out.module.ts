import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintOutRoutingModule } from './print-out-routing.module';
import { ContractAgreementComponent } from './HRM/contract-agreement/contract-agreement.component';
import { PaymentTransferComponent } from './Finance/payment-transfer/payment-transfer.component';


@NgModule({
  declarations: [
    ContractAgreementComponent,
    PaymentTransferComponent
  ],
  imports: [
    CommonModule,
    PrintOutRoutingModule
  ]
})
export class PrintOutModule { }
