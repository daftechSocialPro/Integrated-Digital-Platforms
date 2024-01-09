import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipReportComponent } from './membership-report/membership-report.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'membership-report',
        component: MembershipReportComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
