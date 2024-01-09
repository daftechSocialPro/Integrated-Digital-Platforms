import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import DefaultComponent from '../../default/default.component';
import { DwmHomeComponent } from './dwm-home/dwm-home.component';
import { DwmMobileUsersMgmtComponent } from './dwm-mobile-users-mgmt/dwm-mobile-users-mgmt.component';
import { DwmReadingSheetComponent } from './dwm-reading-sheet/dwm-reading-sheet.component';
import { DwmQrcodeComponent } from './dwm-qrcode/dwm-qrcode.component';
import { DwmReaderTrackingComponent } from './dwm-reader-tracking/dwm-reader-tracking.component';
import { DwmReportsComponent } from './dwm-reports/dwm-reports.component';

const routes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'home',
        component:DwmHomeComponent
      },
      {
        path: 'mobile-users-mgmt',
        component:DwmMobileUsersMgmtComponent
      },
          
      {
        path: 'reading-sheet',
        component:DwmReadingSheetComponent
      },
      {
        path: 'qr-code',
        component:DwmQrcodeComponent
      },
      {
        path: 'reader-tracking',
        component:DwmReaderTrackingComponent
      },
      {
        path: 'report',
        component:DwmReportsComponent
      },
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DwmRoutingModule { }
