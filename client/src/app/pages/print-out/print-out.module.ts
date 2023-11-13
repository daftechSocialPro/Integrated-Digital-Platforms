import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintOutRoutingModule } from './print-out-routing.module';
import { ContractAgreementComponent } from './HRM/contract-agreement/contract-agreement.component';


@NgModule({
  declarations: [
    ContractAgreementComponent
  ],
  imports: [
    CommonModule,
    PrintOutRoutingModule
  ]
})
export class PrintOutModule { }
