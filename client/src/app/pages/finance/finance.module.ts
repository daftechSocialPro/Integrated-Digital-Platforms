import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceConfigurationComponent } from './finance-configuration/finance-configuration.component';
import { AddAccountTypeComponent } from './finance-configuration/account-type/add-account-type/add-account-type.component';
import { AccountTypeComponent } from './finance-configuration/account-type/account-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { FinanceLookupComponent } from './finance-configuration/finance-lookup/finance-lookup.component';
import { AddFinanceLookupComponent } from './finance-configuration/finance-lookup/add-finance-lookup/add-finance-lookup.component';
import { AccountingPeriodComponent } from './finance-configuration/accounting-period/accounting-period.component';
import { AddAccountingPeriodComponent } from './finance-configuration/accounting-period/add-accounting-period/add-accounting-period.component';
import { ChartOfAccountsComponent } from './finance-configuration/chart-of-accounts/chart-of-accounts.component';
import { AddChartOfAccountsComponent } from './finance-configuration/chart-of-accounts/add-chart-of-accounts/add-chart-of-accounts.component';
import { AddSubsidiaryAccountComponent } from './finance-configuration/chart-of-accounts/add-subsidiary-account/add-subsidiary-account.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PayrollSettingComponent } from './finance-configuration/payroll-setting/payroll-setting.component';
import { GeneralSettingsComponent } from './finance-configuration/payroll-setting/general-settings/general-settings.component';
import { IncomeTaxComponent } from './finance-configuration/payroll-setting/income-tax/income-tax.component';
import { BenefitPayrollComponent } from './finance-configuration/payroll-setting/benefit-payroll/benefit-payroll.component';
import { AddGeneralPayrollSettingComponent } from './finance-configuration/payroll-setting/general-settings/add-general-payroll-setting/add-general-payroll-setting.component';
import { AddIncomeTaxComponent } from './finance-configuration/payroll-setting/income-tax/add-income-tax/add-income-tax.component';
import { AddBenefitPayrollComponent } from './finance-configuration/payroll-setting/benefit-payroll/add-benefit-payroll/add-benefit-payroll.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaymentsComponent } from './payments/payments.component';
import { AddPaymentsComponent } from './payments/add-payments/add-payments.component';
import { PayrollComponent } from './payroll/payroll.component';
import { FileUploadModule } from 'primeng/fileupload';

import { PendingPaymentsComponent } from './payments/pending-payments/pending-payments.component';
import { ApprovedPaymentsComponent } from './payments/approved-payments/approved-payments.component';
import { BeginningBalanceComponent } from './beginning-balance/beginning-balance.component';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { LoanIssuanceComponent } from './loan-issuance/loan-issuance.component';
import { AddPurchaseInvoiceComponent } from './purchase-invoice/add-purchase-invoice/add-purchase-invoice.component';
import { PendingPurchaseInvoiceComponent } from './purchase-invoice/pending-purchase-invoice/pending-purchase-invoice.component';
import { ApprovedPurchaseInvoiceComponent } from './purchase-invoice/approved-purchase-invoice/approved-purchase-invoice.component';
import { PayLoanComponent } from './loan-issuance/pay-loan/pay-loan.component';


import { IncomeTaxDeclarationComponent } from './income-tax-declaration/income-tax-declaration.component';
import { AccountReconcilliationComponent } from './account-reconcilliation/account-reconcilliation.component';
import { FinanceReportComponent } from './finance-report/finance-report.component';
import { PensionReportComponent } from './finance-report/pension-report/pension-report.component';
import { IncomeTaxReportComponent } from './finance-report/income-tax-report/income-tax-report.component';
import { PensionDeclarationComponent } from './pension-declaration/pension-declaration.component';
import { PayrollReportComponent } from './finance-report/payroll-report/payroll-report.component';
import { NumberToWordPipe } from './finance-report/payroll-report/numberToWord.pipe';
import { ActivityProgressApproverComponent } from './activity-progress-approver/activity-progress-approver.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ClientListComponent } from './finance-configuration/client-list/client-list.component';
import { AddClientComponent } from './finance-configuration/client-list/add-client/add-client.component';
import { TaxRateComponent } from './finance-configuration/tax-rate/tax-rate.component';
import { AddTaxRateComponent } from './finance-configuration/tax-rate/add-tax-rate/add-tax-rate.component';
import { AuthorizedPaymentsComponent } from './payments/authorized-payments/authorized-payments.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LedgerPostingComponent } from './finance-configuration/ledger-posting/ledger-posting.component';
import { AddLedgerPostingComponent } from './finance-configuration/ledger-posting/add-ledger-posting/add-ledger-posting.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { AddJournalVoucherComponent } from './journal-voucher/add-journal-voucher/add-journal-voucher.component';
// import { PensionDeclarationComponent } from './pension-declaration/pension-declaration.component';
import { AccordionModule } from 'primeng/accordion';
import { PaymentRequisitionComponent } from './payment-requisition/payment-requisition.component';
import { PendingPaymentRequisitionComponent } from './payment-requisition/pending-payment-requisition/pending-payment-requisition.component';
import { ApprovedPaymentRequisitionComponent } from './payment-requisition/approved-payment-requisition/approved-payment-requisition.component';
import { PaymentRequisitionViewComponent } from './payment-requisition/payment-requisition-view/payment-requisition-view.component';
import { EmployeeSettlementsComponent } from './employee-settlements/employee-settlements.component';
import { AddPayeeDetailsComponent } from './payments/pending-payments/add-payee-details/add-payee-details.component';
import { AddReceiptComponent } from './receipt/add-receipt/add-receipt.component';



@NgModule({
  declarations: [
    FinanceConfigurationComponent,
    AddAccountTypeComponent,
    AccountTypeComponent,
    FinanceLookupComponent,
    AddFinanceLookupComponent,
    AccountingPeriodComponent,
    AddAccountingPeriodComponent,
    ChartOfAccountsComponent,
    AddChartOfAccountsComponent,
    AddSubsidiaryAccountComponent,
    PayrollSettingComponent,
    GeneralSettingsComponent,
    IncomeTaxComponent,
    BenefitPayrollComponent,
    AddGeneralPayrollSettingComponent,
    AddIncomeTaxComponent,
    AddBenefitPayrollComponent,
    PaymentsComponent,
    AddPaymentsComponent,
    PayrollComponent,
    PayrollReportComponent,
    PendingPaymentsComponent,
    ApprovedPaymentsComponent,
    BeginningBalanceComponent,
    PurchaseInvoiceComponent,
    LoanIssuanceComponent,
    AddPurchaseInvoiceComponent,
    PendingPurchaseInvoiceComponent,
    ApprovedPurchaseInvoiceComponent,
    PayLoanComponent,
    IncomeTaxDeclarationComponent,     
    AccountReconcilliationComponent,
    FinanceReportComponent, 
    PensionReportComponent,
    IncomeTaxReportComponent,
    PensionDeclarationComponent,
    NumberToWordPipe,
    ActivityProgressApproverComponent,
    ReceiptComponent,
    ClientListComponent,
    AddClientComponent,
    TaxRateComponent,
    AddTaxRateComponent,
    AuthorizedPaymentsComponent,
    FinanceDashboardComponent,
    LedgerPostingComponent,
    AddLedgerPostingComponent,
    JournalVoucherComponent,
    AddJournalVoucherComponent,
    PaymentRequisitionComponent,
    PendingPaymentRequisitionComponent,
    ApprovedPaymentRequisitionComponent,
    PaymentRequisitionViewComponent,
    EmployeeSettlementsComponent,
    AddPayeeDetailsComponent,
    AddReceiptComponent,

  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    ConfirmPopupModule,
    TabViewModule,
    CheckboxModule,
    MultiSelectModule,
    FileUploadModule,
    AccordionModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ]
})
export class FinanceModule { }
