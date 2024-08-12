import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FinanceConfigurationComponent } from './finance-configuration/finance-configuration.component';
import { PaymentsComponent } from './payments/payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AddPaymentsComponent } from './payments/add-payments/add-payments.component';
import { BeginningBalanceComponent } from './beginning-balance/beginning-balance.component';
import { LoanIssuanceComponent } from './loan-issuance/loan-issuance.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { AddPurchaseInvoiceComponent } from './purchase-invoice/add-purchase-invoice/add-purchase-invoice.component';
import { IncomeTaxDeclarationComponent } from './income-tax-declaration/income-tax-declaration.component';
import { AccountReconcilliationComponent } from './account-reconcilliation/account-reconcilliation.component';
import { FinanceReportComponent } from './finance-report/finance-report.component';
import { PensionDeclarationComponent } from './pension-declaration/pension-declaration.component';
import { ActivityProgressApproverComponent } from './activity-progress-approver/activity-progress-approver.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { AddJournalVoucherComponent } from './journal-voucher/add-journal-voucher/add-journal-voucher.component';

const routes: Routes = [
  
  { path: 'financeconfig', canActivate: [AuthGuard], component: FinanceConfigurationComponent },
  { path: 'income-tax-declaration', canActivate: [AuthGuard], component: IncomeTaxDeclarationComponent },
  { path: 'payments', canActivate: [AuthGuard], component: PaymentsComponent },
  { path: 'payments/addpayment', canActivate: [AuthGuard], component: AddPaymentsComponent },
  { path: 'journalVoucher', canActivate: [AuthGuard], component: JournalVoucherComponent },
  { path: 'journalVoucher/addJournalVoucher', canActivate: [AuthGuard], component: AddJournalVoucherComponent },
  { path: 'payroll', canActivate: [AuthGuard], component: PayrollComponent },
  { path: 'beginnigbalance', canActivate: [AuthGuard], component: BeginningBalanceComponent },
  { path: 'loanissuance', canActivate: [AuthGuard], component: LoanIssuanceComponent },
  { path: 'purchaseinvoice', canActivate: [AuthGuard], component: PurchaseInvoiceComponent },
  { path: 'income-tax-declartion', canActivate:[AuthGuard], component: IncomeTaxDeclarationComponent},
  { path: 'purchaseinvoice/addpurchaseinvoice', canActivate: [AuthGuard], component: AddPurchaseInvoiceComponent },
  { path: 'accountreconcilliation', canActivate: [AuthGuard], component: AccountReconcilliationComponent },
  { path: 'financereport', canActivate: [AuthGuard], component: FinanceReportComponent },
  { path: 'pensiondeclaration', canActivate: [AuthGuard], component: PensionDeclarationComponent },
  { path: 'activity-progress-approver', canActivate: [AuthGuard], component: ActivityProgressApproverComponent },
  { path: 'receipt', canActivate: [AuthGuard], component: ReceiptComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: FinanceDashboardComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
