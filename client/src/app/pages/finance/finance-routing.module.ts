import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FinanceConfigurationComponent } from './finance-configuration/finance-configuration.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';

const routes: Routes = [
  { path: 'financeconfig', canActivate: [AuthGuard], component: FinanceConfigurationComponent },
  { path: 'payments', canActivate: [AuthGuard], component: PaymentsComponent },
  { path: 'payroll', canActivate: [AuthGuard], component: PayrollComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
