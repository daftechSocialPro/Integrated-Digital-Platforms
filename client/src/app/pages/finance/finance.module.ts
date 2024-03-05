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


@NgModule({
  declarations: [
    FinanceConfigurationComponent,
    AddAccountTypeComponent,
    AccountTypeComponent,
    FinanceLookupComponent,
    AddFinanceLookupComponent
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
    TabViewModule
  ]
})
export class FinanceModule { }
