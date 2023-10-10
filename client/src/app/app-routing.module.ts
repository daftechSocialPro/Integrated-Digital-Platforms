import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from './auth/auth.guard';

import { PagesLoginComponent } from './auth/pages-login/pages-login.component';
import { HrmConfigurationComponent } from './pages/human-resource/hrm-configuration/hrm-configuration/hrm-configuration.component';
import { EmployeeManagmentComponent } from './pages/human-resource/employee-managment/employee-managment.component';
import { EmployeeDetailComponent } from './pages/human-resource/employee-managment/employee-detail/employee-detail.component';
import { VacancyListComponent } from './pages/human-resource/vacancy-management/vacancy-list/vacancy-list.component';
import { ConfigurationComponent } from './pages/configuration/configuration/configuration.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { UserManagementComponent } from './pages/configuration/user-management/user-management.component';
import { LeaveComponent } from './pages/human-resource/leave/leave.component';
import { RequestDetailComponent } from './pages/human-resource/leave/leave-requests/request-detail/request-detail.component';
import { EmployeeTerminationComponent } from './pages/human-resource/employee-managment/employee-termination/employee-termination.component';
import { VacancyDetailComponent } from './pages/human-resource/vacancy-management/vacancy-list/vacancy-detail/vacancy-detail.component';
import { ApplicantComponent } from './pages/human-resource/vacancy-management/applicant/applicant.component';
import { EmployeeSupervisorsComponent } from './pages/human-resource/employee-supervisors/employee-supervisors.component';
import { PerformanceManagementComponent } from './pages/human-resource/performance-management/performance-management.component';
import { VolunterComponent } from './pages/human-resource/volunter/volunter.component';
import { VolunterDetailComponent } from './pages/human-resource/volunter/volunter-detail/volunter-detail.component';



const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  { path: 'configuration', canActivate: [AuthGuard], component: ConfigurationComponent, data: { permittedRoles: ['GENERAL-CONFIGURATION'] } },  
  { path: 'HRM/employeeMangment', canActivate: [AuthGuard], component: EmployeeManagmentComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT','USER-MANAGER'] } },
  { path: 'HRM/volunters', canActivate: [AuthGuard], component: VolunterComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT','USER-MANAGER'] } },
 
  { path: 'HRM/employeeTermination', canActivate: [AuthGuard], component: EmployeeTerminationComponent,  data: { permittedRoles: ['EMPLOYEE-MANAGEMENT'] }},     
  { path: 'HRM/employeeDetail', canActivate: [AuthGuard], component: EmployeeDetailComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT','USER-MANAGER'] } },
  { path: 'HRM/volunterDetail', canActivate: [AuthGuard], component: VolunterDetailComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT','USER-MANAGER'] } },
  { path: 'HRM/configuration', canActivate: [AuthGuard], component: HrmConfigurationComponent, data: { permittedRoles: ['HRM-CONFIGURATION'] } },
  { path: 'HRM/vacancyList', canActivate:[AuthGuard],component:VacancyListComponent,data:{permittedRoles:['VACANCY-POST','VACANCY-APPROVER','VACANCY-2ND-APPROVER']} },
  { path: 'HRM/vacancyDetail/:id', canActivate:[AuthGuard],component:VacancyDetailComponent,data:{permittedRoles:['VACANCY-POST','VACANCY-APPROVER','VACANCY-2ND-APPROVER']} },
  { path: 'HRM/leave', canActivate:[AuthGuard],component:LeaveComponent},
  { path: 'HRM/internalApplicant/:id', canActivate:[AuthGuard],component:ApplicantComponent,data:{permittedRoles:['VACANCY-APPROVER','VACANCY-2ND-APPROVER']} },
  { path: 'HRM/internalApplicant/:id/:applicantId', canActivate:[AuthGuard],component:ApplicantComponent },
  { path: 'HRM/leaverequest/:id', canActivate:[AuthGuard],component:RequestDetailComponent },
  { path: 'HRM/employeesupervisor', canActivate:[AuthGuard],component:EmployeeSupervisorsComponent,data:{permittedRoles:['EVALUATER']} },
  { path: 'HRM/employeeperformance', canActivate:[AuthGuard],component:PerformanceManagementComponent,data:{permittedRoles:['EVALUATER']} },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'user-profile',canActivate:[AuthGuard], component: UsersProfileComponent },
  { path : 'user_managment',canActivate:[AuthGuard],component:UserManagementComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
