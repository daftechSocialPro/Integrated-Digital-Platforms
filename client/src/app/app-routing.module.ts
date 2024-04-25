
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
import { LoanManagementComponent } from './pages/human-resource/loan-management/loan-management.component';
import { PMConfigurationComponent } from './pages/project-managment/pm-configuration/pm-configuration.component';
import { StrategicPlanComponent } from './pages/project-managment/strategic-plan/strategic-plan.component';
import { PlansComponent } from './pages/project-managment/plans/plans.component';
import { ComittesComponent } from './pages/project-managment/comittes/comittes.component';
import { TasksComponent } from './pages/project-managment/tasks/tasks.component';
import { ActivityParentsComponent } from './pages/project-managment/activity-parents/activity-parents.component';
import { AssignedActivitiesComponent } from './pages/project-managment/assigned-activities/assigned-activities.component';
import { ActivityforapprovalComponent } from './pages/project-managment/activityforapproval/activityforapproval.component';
import { PlanReportTodayComponent } from './pages/project-managment/progress-report/plan-report-today/plan-report-today.component';
import { PlannedReportComponent } from './pages/project-managment/progress-report/planned-report/planned-report.component';
import { EstimatedCoastComponent } from './pages/project-managment/progress-report/estimated-coast/estimated-coast.component';
import { PerformanceReportComponent } from './pages/project-managment/progress-report/performance-report/performance-report.component';
import { ProgressReportBystructureComponent } from './pages/project-managment/progress-report/progress-report-bystructure/progress-report-bystructure.component';
import { ProgressReportComponent } from './pages/project-managment/progress-report/progress-report/progress-report.component';
import { StrategicPlanReportComponent } from './pages/project-managment/progress-report/strategic-plan-report/strategic-plan-report.component';
import { DisciplinaryCasesComponent } from './pages/human-resource/employee-managment/disciplinary-cases/disciplinary-cases.component';
import { ActivityLocationComponent } from './pages/project-managment/progress-report/activity-location/activity-location.component';
import { StaffWeeklyPlanComponent } from './pages/project-managment/progress-report/staff-weekly-plan/staff-weekly-plan.component';
import { WeeklyPlanPerformanceComponent } from './pages/project-managment/progress-report/weekly-plan-performance/weekly-plan-performance.component';
import { TraineesFormComponent } from './pages/training/trainees-form/trainees-form.component';
import { TrainingReportFormComponenT } from './pages/training/training-report-form/training-report-form.component';
import { TrainingDashboardComponent } from './pages/training/training-dashboard/training-dashboard.component';
import { EmployeeFingerPrintComponent } from './pages/human-resource/employee-finger-print/employee-finger-print.component';
import { ForgetPasswordComponent } from './auth/pages-login/forget-password/forget-password.component';
import { EmployeePenaltyComponent } from './pages/human-resource/employee-penalty/employee-penalty.component';
import { ContractEndEmployeesComponent } from './pages/human-resource/contract-end-employees/contract-end-employees.component';
import { PlanDetailComponent } from './pages/project-managment/plans/plan-detail/plan-detail.component';
import { ActivityDetailComponent } from './pages/project-managment/plans/activity-detail/activity-detail.component';
import { TrainingDetailComponent } from './pages/training/training-detail/training-detail.component';
import { WeeklyActivitiesComponent } from './pages/project-managment/weekly-activities/weekly-activities.component';

import { PlanVsAchivmentProjectComponent } from './pages/project-managment/progress-report/plan-vs-achivment-project/plan-vs-achivment-project.component';

import { PlanDashboardComponent } from './pages/project-managment/plans/plan-dashboard/plan-dashboard.component';
import { AllTrainingListComponent } from './pages/training/all-training-list/all-training-list.component';
import { HrmDashboardComponent } from './pages/human-resource/hrm-dashboard/hrm-dashboard.component';
import { PaymentRequisitionComponent } from './pages/project-managment/payment-requisition/payment-requisition.component';




const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: PlanDashboardComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: PlanDashboardComponent },
  { path: 'configuration', canActivate: [AuthGuard], component: ConfigurationComponent, data: { permittedRoles: ['GENERAL-CONFIGURATION'] } },
  { path: 'pm/configuration', canActivate: [AuthGuard], component: PMConfigurationComponent },
  { path: 'pm/strategicPlans', canActivate: [AuthGuard], component: StrategicPlanComponent },

  { path: 'pm/projects', canActivate: [AuthGuard], component: PlansComponent },
  { path: 'pm/task', canActivate: [AuthGuard], component: TasksComponent },
  { path: 'pm/activityparent', canActivate: [AuthGuard], component: ActivityParentsComponent },
  { path: 'pm/assignedactivities', canActivate: [AuthGuard], component: AssignedActivitiesComponent },
  { path: 'pm/actForApproval', canActivate: [AuthGuard], component: ActivityforapprovalComponent },

  { path: 'pm/planDetail/:planId', canActivate: [AuthGuard], component: PlanDetailComponent },
  { path: 'pm/planDashboard', canActivate: [AuthGuard], component: PlanDashboardComponent },
  { path: 'pm/activityDetail/:actId/:planId', canActivate: [AuthGuard], component: ActivityDetailComponent },

  { path: 'pm/payment-requisition', canActivate: [AuthGuard], component: PaymentRequisitionComponent },

  

  //report


  { path: 'activityLocation', canActivate: [AuthGuard], component: ActivityLocationComponent },
  { path: 'strategicplanreport', canActivate: [AuthGuard], component: StrategicPlanReportComponent },
  { path: 'planreportdetail', canActivate: [AuthGuard], component: PlanReportTodayComponent },
  { path: 'plannedreport', canActivate: [AuthGuard], component: PlannedReportComponent },
  { path: 'progressreport', canActivate: [AuthGuard], component: ProgressReportComponent },
  { path: 'progressreportbystructure', canActivate: [AuthGuard], component: ProgressReportBystructureComponent },
  { path: 'performancereport', canActivate: [AuthGuard], component: PerformanceReportComponent },
  { path: 'weeklyPlanReport', canActivate: [AuthGuard], component: StaffWeeklyPlanComponent },
  { path: 'weeklyProgressPlanReport', canActivate: [AuthGuard], component: WeeklyPlanPerformanceComponent },

  { path: 'estimatedcoast', canActivate: [AuthGuard], component: EstimatedCoastComponent },
  { path: 'projectAchivment', canActivate: [AuthGuard], component: PlanVsAchivmentProjectComponent },



  { path: 'pm/projectTeam', canActivate: [AuthGuard], component: ComittesComponent },
  { path: 'pm/training-dashboard', canActivate: [AuthGuard], component: TrainingDashboardComponent },
  { path: 'pm/training-detail/:id/:actId/:planId', canActivate: [AuthGuard], component: TrainingDetailComponent },

  { path: 'pm/weekly-activity', canActivate: [AuthGuard], component: WeeklyActivitiesComponent },

  { path: 'HRM/employeeMangment', canActivate: [AuthGuard], component: EmployeeManagmentComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT', 'USER-MANAGER'] } },
  { path: 'HRM/volunters', canActivate: [AuthGuard], component: VolunterComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT', 'USER-MANAGER'] } },

  { path: 'HRM/employeeTermination', canActivate: [AuthGuard], component: EmployeeTerminationComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT'] } },
  { path: 'HRM/employeeDetail', canActivate: [AuthGuard], component: EmployeeDetailComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT', 'USER-MANAGER'] } },
  { path: 'HRM/empFingerPrint', canActivate: [AuthGuard], component: EmployeeFingerPrintComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT', 'USER-MANAGER'] } },
  { path: 'HRM/volunterDetail', canActivate: [AuthGuard], component: VolunterDetailComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT', 'USER-MANAGER'] } },
  { path: 'HRM/configuration', canActivate: [AuthGuard], component: HrmConfigurationComponent, data: { permittedRoles: ['HRM-CONFIGURATION'] } },
  { path: 'HRM/vacancyList', canActivate: [AuthGuard], component: VacancyListComponent, data: { permittedRoles: ['VACANCY-POST', 'VACANCY-APPROVER', 'VACANCY-2ND-APPROVER'] } },
  { path: 'HRM/vacancyDetail/:id', canActivate: [AuthGuard], component: VacancyDetailComponent, data: { permittedRoles: ['VACANCY-POST', 'VACANCY-APPROVER', 'VACANCY-2ND-APPROVER'] } },
  { path: 'HRM/leave', canActivate: [AuthGuard], component: LeaveComponent },
  { path: 'HRM/internalApplicant/:id', canActivate: [AuthGuard], component: ApplicantComponent, data: { permittedRoles: ['VACANCY-APPROVER', 'VACANCY-2ND-APPROVER'] } },
  { path: 'HRM/internalApplicant/:id/:applicantId', canActivate: [AuthGuard], component: ApplicantComponent },
  { path: 'HRM/leaverequest/:id', canActivate: [AuthGuard], component: RequestDetailComponent },
  { path: 'HRM/employeesupervisor', canActivate: [AuthGuard], component: EmployeeSupervisorsComponent, data: { permittedRoles: ['EVALUATER'] } },
  { path: 'HRM/employeeperformance', canActivate: [AuthGuard], component: PerformanceManagementComponent, data: { permittedRoles: ['EVALUATER'] } },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'user-profile', canActivate: [AuthGuard], component: UsersProfileComponent },
  { path: 'user_managment', canActivate: [AuthGuard], component: UserManagementComponent },
  { path: 'HRM/loan-managment', canActivate: [AuthGuard], component: LoanManagementComponent },
  { path: 'HRM/disciplinary-case', canActivate: [AuthGuard], component: DisciplinaryCasesComponent, data: { permittedRoles: ['EVALUATER'] } },
  { path: 'HRM/employee-penalty', canActivate: [AuthGuard], component: EmployeePenaltyComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT'] } },
  { path: 'HRM/contractEndEmployees', canActivate: [AuthGuard], component: ContractEndEmployeesComponent, data: { permittedRoles: ['EMPLOYEE-MANAGEMENT'] } },
  { path: 'HRM/dashboard', canActivate: [AuthGuard], component: HrmDashboardComponent },
  //trainee

  { path: 'trainee-form/:trainingId', component: TraineesFormComponent },
  { path: 'trainee/allreport', component: AllTrainingListComponent },
  { path: 'trainee-form/training-report-form/:trainingId', component: TrainingReportFormComponenT },
  { path: 'forgetPassword', component: ForgetPasswordComponent },

  { path: 'printout', loadChildren: () => import('./pages/print-out/print-out.module').then(m => m.PrintOutModule) },
  { path: 'inventory', loadChildren: () => import('./pages/inventory/inventory.module').then(m => m.InventoryModule) },
  { path: 'finance', loadChildren: () => import('./pages/finance/finance.module').then(m => m.FinanceModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
