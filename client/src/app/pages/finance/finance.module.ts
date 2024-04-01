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
import { PayrollReportComponent } from './finance-reports/payroll-report/payroll-report.component';


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
    PayrollReportComponent
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
    FileUploadModule

  ]
})
export class FinanceModule { }
