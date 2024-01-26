import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';

import { ReactiveFormsModule } from '@angular/forms';

import {ReportsRoutingModule} from './reports-routing.module'
import { PaginatorModule } from 'primeng/paginator';
import { MembershipReportComponent } from './membership-report/membership-report.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';


@NgModule({
  declarations: [MembershipReportComponent, TotalRevenueComponent],
  imports: [CommonModule, ReportsRoutingModule, InputMaskModule, ReactiveFormsModule, PaginatorModule]
})
export class ReportsModule {}
