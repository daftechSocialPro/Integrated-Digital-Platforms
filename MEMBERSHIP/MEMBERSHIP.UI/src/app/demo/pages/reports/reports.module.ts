import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/inputmask';

import { ReactiveFormsModule } from '@angular/forms';

import {ReportsRoutingModule} from './reports-routing.module'
import { PaginatorModule } from 'primeng/paginator';
import { MembershipReportComponent } from './membership-report/membership-report.component';


@NgModule({
  declarations: [MembershipReportComponent],
  imports: [CommonModule, ReportsRoutingModule, InputMaskModule, ReactiveFormsModule, PaginatorModule]
})
export class ReportsModule {}
