import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG modules
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Chart modules
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

// QR Code module
import { QRCodeModule } from 'angularx-qrcode';

// Shared module
import { SharedModule } from 'src/app/theme/shared/shared.module';

// Component
import AdminDashbordComponent from './admin-dashbord.component';

@NgModule({
  declarations: [
    AdminDashbordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
    NgApexchartsModule,
    QRCodeModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  exports: [
    AdminDashbordComponent
  ]
})
export class AdminDashboardModule { }
