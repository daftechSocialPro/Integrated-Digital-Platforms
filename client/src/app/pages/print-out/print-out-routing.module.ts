import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractAgreementComponent } from './HRM/contract-agreement/contract-agreement.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'contractLetter', component: ContractAgreementComponent },
  ])],
  exports: [RouterModule]
})
export class PrintOutRoutingModule { }
