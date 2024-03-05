import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FinanceConfigurationComponent } from './finance-configuration/finance-configuration.component';

const routes: Routes = [
  { path: 'financeconfig', canActivate: [AuthGuard], component: FinanceConfigurationComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
