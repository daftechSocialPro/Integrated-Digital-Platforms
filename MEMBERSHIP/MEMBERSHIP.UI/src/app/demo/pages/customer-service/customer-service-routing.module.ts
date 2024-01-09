import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CssHomeComponent } from './css-home/css-home.component';
import { CssSetupComponent } from './css-setup/css-setup.component';
import { CssCustomerComponent } from './css-customer/css-customer.component';
import { CssReportComponent } from './css-report/css-report.component';
import { CssBillReportComponent } from './css-bill-report/css-bill-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'home',
        component:CssHomeComponent
      },
       {
        path: 'setup',
        component:CssSetupComponent ,
      },
      {
        path: 'customer',
        component:CssCustomerComponent ,
      },
      {
        path: 'report',
        component:CssReportComponent ,
      },
      {
        path: 'bill-report',
        component:CssBillReportComponent ,
      },
 
   
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerServiceRoutingModule { }
