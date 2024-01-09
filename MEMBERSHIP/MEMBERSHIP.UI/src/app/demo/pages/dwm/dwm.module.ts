import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DwmRoutingModule } from './dwm-routing.module';
import { DwmHomeComponent } from './dwm-home/dwm-home.component';
import { PaginatorModule } from 'primeng/paginator';
import { DwmMobileUsersMgmtComponent } from './dwm-mobile-users-mgmt/dwm-mobile-users-mgmt.component';
import { AddMobileUsersComponent } from './dwm-mobile-users-mgmt/add-mobile-users/add-mobile-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DwmReadingSheetComponent } from './dwm-reading-sheet/dwm-reading-sheet.component';
import { DwmQrcodeComponent } from './dwm-qrcode/dwm-qrcode.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DwmReaderTrackingComponent } from './dwm-reader-tracking/dwm-reader-tracking.component';
import { DwmReportsComponent } from './dwm-reports/dwm-reports.component';
import { ReadingLogComponent } from './dwm-reports/reading-log/reading-log.component';
import { PendingLogComponent } from './dwm-reports/pending-log/pending-log.component';
import { ReadingAccuracyComponent } from './dwm-reports/reading-accuracy/reading-accuracy.component';
import { ReadingEfficencyComponent } from './dwm-reports/reading-efficency/reading-efficency.component';
import { ReadingConsumptionComponent } from './dwm-reports/reading-consumption/reading-consumption.component';

@NgModule({

  declarations: [   
    DwmHomeComponent, DwmMobileUsersMgmtComponent, AddMobileUsersComponent, DwmReadingSheetComponent, DwmQrcodeComponent, DwmReaderTrackingComponent, DwmReportsComponent, ReadingLogComponent, PendingLogComponent, ReadingAccuracyComponent, ReadingEfficencyComponent, ReadingConsumptionComponent
  ],
  imports: [
    CommonModule, DwmRoutingModule, PaginatorModule,ReactiveFormsModule,NgApexchartsModule
  ]
})
export class DwmModule { }
