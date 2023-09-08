import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from './auth/auth.guard';

import { PagesLoginComponent } from './auth/pages-login/pages-login.component';
import { HrmConfigurationComponent } from './pages/human-resource/hrm-configuration/hrm-configuration/hrm-configuration.component';
import { EmployeeManagmentComponent } from './pages/human-resource/employee-managment/employee-managment.component';
import { EmployeeDetailComponent } from './pages/human-resource/employee-managment/employee-detail/employee-detail.component';
import { ConfigurationComponent } from './pages/configuration/configuration/configuration.component';



const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DashboardComponent, data: { permittedRoles: ['Admin'] } },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, data: { permittedRoles: ['Admin'] } },
  { path: 'configuration', canActivate: [AuthGuard], component: ConfigurationComponent, data: { permittedRoles: ['Admin'] } },  
  { path: 'HRM/employeeMangment', canActivate: [AuthGuard], component: EmployeeManagmentComponent, data: { permittedRoles: ['Admin'] } },
  { path: 'HRM/employeeDetail', canActivate: [AuthGuard], component: EmployeeDetailComponent, data: { permittedRoles: ['Admin'] } },
  { path: 'HRM/configuration', canActivate: [AuthGuard], component: HrmConfigurationComponent, data: { permittedRoles: ['Admin'] } },
  { path: 'pages-login', component: PagesLoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
