import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';

import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';

import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderIneterceptor } from './http-interceptors/auth-header-interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { ToastrModule } from 'ngx-toastr';
import { PagesLoginComponent } from './auth/pages-login/pages-login.component';
import { HrmConfigurationComponent } from './pages/human-resource/hrm-configuration/hrm-configuration/hrm-configuration.component';
import { DepartmentComponent } from './pages/human-resource/hrm-configuration/department/department.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AddDepartmentComponent } from './pages/human-resource/hrm-configuration/department/add-department/add-department.component';
import { UpdateDepartmentComponent } from './pages/human-resource/hrm-configuration/department/update-department/update-department.component';
import { PositionComponent } from './pages/human-resource/hrm-configuration/position/position.component';
import { AddPositionComponent } from './pages/human-resource/hrm-configuration/position/add-position/add-position.component';
import { UpdatePositionComponent } from './pages/human-resource/hrm-configuration/position/update-position/update-position.component';
import { EmployeeManagmentComponent } from './pages/human-resource/employee-managment/employee-managment.component';
import { AddEmployeeComponent } from './pages/human-resource/employee-managment/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './pages/human-resource/employee-managment/employee-detail/employee-detail.component'
import { StepsModule } from 'primeng/steps';
import { EmploymentHistoryComponent } from './pages/human-resource/employee-managment/employee-detail/employment-history/employment-history.component';
import { AddEmploymentHistoryComponent } from './pages/human-resource/employee-managment/employee-detail/employment-history/add-employment-history/add-employment-history.component';
import { UpdateEmploymentHistoryComponent } from './pages/human-resource/employee-managment/employee-detail/employment-history/update-employment-history/update-employment-history.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmployeeFamilyComponent } from './pages/human-resource/employee-managment/employee-detail/employee-family/employee-family.component';
import { AddEmployeeFamilyComponent } from './pages/human-resource/employee-managment/employee-detail/employee-family/add-employee-family/add-employee-family.component';
import { UpdateEmployeeFamilyComponent } from './pages/human-resource/employee-managment/employee-detail/employee-family/update-employee-family/update-employee-family.component';
import { VacancyListComponent } from './pages/human-resource/vacancy-management/vacancy-list/vacancy-list.component';
import { AddVacancyComponent } from './pages/human-resource/vacancy-management/vacancy-list/add-vacancy/add-vacancy.component';

import { EmployeeEducationComponent } from './pages/human-resource/employee-managment/employee-detail/employee-education/employee-education.component';
import { AddEmployeeEducationComponent } from './pages/human-resource/employee-managment/employee-detail/employee-education/add-employee-education/add-employee-education.component';
import { UpdateEmployeeEducationComponent } from './pages/human-resource/employee-managment/employee-detail/employee-education/update-employee-education/update-employee-education.component';
import { CompanyProfileComponent } from './pages/configuration/company-profile/company-profile.component';
import { ConfigurationComponent } from './pages/configuration/configuration/configuration.component';
import { CommonComponent } from './pages/configuration/common/common.component';
import { AddressComponent } from './pages/configuration/address/address.component';
import { TabViewModule } from 'primeng/tabview';
import { CountryComponent } from './pages/configuration/address/country/country.component';
import { RegionComponent } from './pages/configuration/address/region/region.component';
import { ZoneComponent } from './pages/configuration/address/zone/zone.component';
import { AddCountryComponent } from './pages/configuration/address/country/add-country/add-country.component';
import { UpdateCountryComponent } from './pages/configuration/address/country/update-country/update-country.component';
import { AddRegionComponent } from './pages/configuration/address/region/add-region/add-region.component';
import { UpdateRegionComponent } from './pages/configuration/address/region/update-region/update-region.component';
import { AddZoneComponent } from './pages/configuration/address/zone/add-zone/add-zone.component';
import { UpdateZoneComponent } from './pages/configuration/address/zone/update-zone/update-zone.component';
import { EducationalFieldComponent } from './pages/configuration/common/educational-field/educational-field.component';
import { EducationalLevelComponent } from './pages/configuration/common/educational-level/educational-level.component';
import { AddEdcuationalFieldComponent } from './pages/configuration/common/educational-field/add-edcuational-field/add-edcuational-field.component';
import { UpdateEductionalFieldComponent } from './pages/configuration/common/educational-field/update-eductional-field/update-eductional-field.component';
import { AddEdcuationalLevelComponent } from './pages/configuration/common/educational-level/add-edcuational-level/add-edcuational-level.component';
import { UpdateEdcuationalLevelComponent } from './pages/configuration/common/educational-level/update-edcuational-level/update-edcuational-level.component';
import { GeneralCodesComponent } from './pages/configuration/common/general-codes/general-codes.component';
import { LeaveTypeComponent } from './pages/human-resource/hrm-configuration/leave-type/leave-type.component';
import { UpdateEmployeeComponent } from './pages/human-resource/employee-managment/update-employee/update-employee.component';
import { AddLeaveTypeComponent } from './pages/human-resource/hrm-configuration/leave-type/add-leave-type/add-leave-type.component';
import { UpdateLeaveTypeComponent } from './pages/human-resource/hrm-configuration/leave-type/update-leave-type/update-leave-type.component'
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { AddVaccancyDocumentComponent } from './pages/human-resource/vacancy-management/add-vaccancy-document/add-vaccancy-document.component';
import { UserManagementComponent } from './pages/configuration/user-management/user-management.component';
import { HrmSettingComponent } from './pages/human-resource/hrm-configuration/hrm-setting/hrm-setting.component';
import { AddHrmSettingComponent } from './pages/human-resource/hrm-configuration/hrm-setting/add-hrm-setting/add-hrm-setting.component';
import { UpdateHrmSettingComponent } from './pages/human-resource/hrm-configuration/hrm-setting/update-hrm-setting/update-hrm-setting.component';
import { AddUserComponent } from './pages/configuration/user-management/add-user/add-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TimelineModule } from 'primeng/timeline';


import { AutoCompleteModule } from 'primeng/autocomplete';
import { UpdateRolesComponent } from './pages/configuration/user-management/update-roles/update-roles.component';
import { LeaveComponent } from './pages/human-resource/leave/leave.component';
import { RequestLeaveComponent } from './pages/human-resource/leave/request-leave/request-leave.component';
import { LeaveRequestsComponent } from './pages/human-resource/leave/leave-requests/leave-requests.component';
import { AddLeaveRequestComponent } from './pages/human-resource/leave/request-leave/add-leave-request/add-leave-request.component';
import { LeaveBalanceComponent } from './pages/human-resource/leave/request-leave/leave-balance/leave-balance.component';
import { HolidaySettingComponent } from './pages/configuration/holiday-setting/holiday-setting.component';
import { AddHolidayComponent } from './pages/configuration/holiday-setting/add-holiday/add-holiday.component';
import { BadgeModule } from 'primeng/badge';
import { RequestDetailComponent } from './pages/human-resource/leave/leave-requests/request-detail/request-detail.component';
import { CustomConfirmationComponent } from './pages/human-resource/leave/leave-requests/custom-confirmation/custom-confirmation.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ResignationLetterComponent } from './pages/users-profile/resignation-letter/resignation-letter.component';
import { ResignationRequestComponent } from './pages/users-profile/resignation-letter/resignation-request/resignation-request.component';
import { EmployeeTerminationComponent } from './pages/human-resource/employee-managment/employee-termination/employee-termination.component';
import { ViewPdfComponent } from './components/view-pdf/view-pdf.component';
import { ResignationListComponent } from './pages/human-resource/employee-managment/employee-termination/resignation-list/resignation-list.component';
import { TerminateEmployeeComponent } from './pages/human-resource/employee-managment/employee-termination/terminate-employee/terminate-employee.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { VaccancyPostComponent } from './pages/users-profile/vaccancy-post/vaccancy-post.component';
import { VacancyDetailComponent } from './pages/human-resource/vacancy-management/vacancy-list/vacancy-detail/vacancy-detail.component';
import { ApplicantComponent } from './pages/human-resource/vacancy-management/applicant/applicant.component';
import { ApplicantEducationComponent } from './pages/human-resource/vacancy-management/applicant/applicant-education/applicant-education.component';
import { AddApplicantEducationComponent } from './pages/human-resource/vacancy-management/applicant/applicant-education/add-applicant-education/add-applicant-education.component';
import { ApplicantWorkExperianceComponent } from './pages/human-resource/vacancy-management/applicant/applicant-work-experiance/applicant-work-experiance.component';
import { AddApplicantWorkComponent } from './pages/human-resource/vacancy-management/applicant/applicant-work-experiance/add-applicant-work/add-applicant-work.component';
import { ApplicantDocumentsComponent } from './pages/human-resource/vacancy-management/applicant/applicant-documents/applicant-documents.component';
import { AddApplicantDocumentsComponent } from './pages/human-resource/vacancy-management/applicant/applicant-documents/add-applicant-documents/add-applicant-documents.component';
import { PerformanceSettingComponent } from './pages/human-resource/hrm-configuration/performance-setting/performance-setting.component';
import { AddPerformanceSettingComponent } from './pages/human-resource/hrm-configuration/performance-setting/add-performance-setting/add-performance-setting.component';
import { PerformancePlanComponent } from './pages/human-resource/hrm-configuration/performance-plan/performance-plan.component';
import { AddPerformancePlanComponent } from './pages/human-resource/hrm-configuration/performance-plan/add-performance-plan/add-performance-plan.component';
import { AddPerformanceDetailPlanComponent } from './pages/human-resource/hrm-configuration/performance-plan/add-performance-detail-plan/add-performance-detail-plan.component';
import { EmployeeSupervisorsComponent } from './pages/human-resource/employee-supervisors/employee-supervisors.component';
import { AssignSupervisorComponent } from './pages/human-resource/employee-supervisors/assign-supervisor/assign-supervisor.component';
import { PerformanceManagementComponent } from './pages/human-resource/performance-management/performance-management.component';
import { ChangeStatusComponent } from './pages/human-resource/vacancy-management/applicant/change-status/change-status.component';
import { LoanSettingComponent } from './pages/human-resource/hrm-configuration/loan-setting/loan-setting.component';
import { AddLoanSettingComponent } from './pages/human-resource/hrm-configuration/loan-setting/add-loan-setting/add-loan-setting.component';
import { HistorySalaryComponent } from './pages/human-resource/employee-managment/employee-detail/employment-history/history-salary/history-salary.component';
import { EmployeeFilesComponent } from './pages/human-resource/employee-managment/employee-detail/employee-files/employee-files.component';
import { AddEmployeeFileComponent } from './pages/human-resource/employee-managment/employee-detail/employee-files/add-employee-file/add-employee-file.component';
import { UpdateEmployeeFileComponent } from './pages/human-resource/employee-managment/employee-detail/employee-files/update-employee-file/update-employee-file.component';
import { EmployeeSuretyComponent } from './pages/human-resource/employee-managment/employee-detail/employee-surety/employee-surety.component';
import { AddEmployeeSuretyComponent } from './pages/human-resource/employee-managment/employee-detail/employee-surety/add-employee-surety/add-employee-surety.component';
import { UpdateEmployeeSuretyComponent } from './pages/human-resource/employee-managment/employee-detail/employee-surety/update-employee-surety/update-employee-surety.component';
import { ExternalVacancyApplicationComponent } from './pages/human-resource/vacancy-management/external-vacancy-application/external-vacancy-application.component';
import { ExternalApplicantFormComponent } from './pages/human-resource/vacancy-management/external-applicant-form/external-applicant-form.component';
import { VolunterComponent } from './pages/human-resource/volunter/volunter.component';
import { AddVolunterComponent } from './pages/human-resource/volunter/add-volunter/add-volunter.component';
import { UpdateVolunterComponent } from './pages/human-resource/volunter/update-volunter/update-volunter.component';
import { VolunterDetailComponent } from './pages/human-resource/volunter/volunter-detail/volunter-detail.component';
import { LoanManagementComponent } from './pages/human-resource/loan-management/loan-management.component';
import { LoanRequestsComponent } from './pages/human-resource/loan-management/loan-requests/loan-requests.component';
import { EmployeeLoanComponent } from './pages/human-resource/loan-management/employee-loan/employee-loan.component';
import { PMConfigurationComponent } from './pages/project-managment/pm-configuration/pm-configuration.component';
import { UnitIndicatorsComponent } from './pages/project-managment/pm-configuration/unit-indicators/unit-indicators.component';
import { AddMeasurementComponent } from './pages/project-managment/pm-configuration/unit-indicators/add-measurement/add-measurement.component';
import { UpdateMeasurmentComponent } from './pages/project-managment/pm-configuration/unit-indicators/update-measurment/update-measurment.component';
import { StrategicPlanComponent } from './pages/project-managment/strategic-plan/strategic-plan.component';
import { AddStrategicPlanComponent } from './pages/project-managment/strategic-plan/add-strategic-plan/add-strategic-plan.component';
import { UpdateStrategicPlanComponent } from './pages/project-managment/strategic-plan/update-strategic-plan/update-strategic-plan.component';
import { PlansComponent } from './pages/project-managment/plans/plans.component';
import { AddPlansComponent } from './pages/project-managment/plans/add-plans/add-plans.component';
import { CommitteeEmployeeComponent } from './pages/project-managment/comittes/committee-employee/committee-employee.component';
import { AddComiteeComponent } from './pages/project-managment/comittes/add-comitee/add-comitee.component';
import { UpdateCpmmitteeComponent } from './pages/project-managment/comittes/update-cpmmittee/update-cpmmittee.component';
import { ComittesComponent } from './pages/project-managment/comittes/comittes.component';
import { TasksComponent } from './pages/project-managment/tasks/tasks.component';
import { AddTasksComponent } from './pages/project-managment/tasks/add-tasks/add-tasks.component';
import { ActivityParentsComponent } from './pages/project-managment/activity-parents/activity-parents.component';
import { AddActivitiesComponent } from './pages/project-managment/activity-parents/add-activities/add-activities.component';
import { ActivityforapprovalComponent } from './pages/project-managment/activityforapproval/activityforapproval.component';
import { AssignedActivitiesComponent } from './pages/project-managment/assigned-activities/assigned-activities.component';
import { ViewActivtiesComponent } from './pages/project-managment/view-activties/view-activties.component';
import { ActivityTargetComponent } from './pages/project-managment/view-activties/activity-target/activity-target.component';
import { AddProgressComponent } from './pages/project-managment/view-activties/add-progress/add-progress.component';
import { ViewProgressComponent } from './pages/project-managment/view-activties/view-progress/view-progress.component';
import { AcceptRejectComponent } from './pages/project-managment/view-activties/view-progress/accept-reject/accept-reject.component';
import { Autocomplete2Component } from './components/autocomplete/autocomplete2/autocomplete2.component';
import { PerformanceReportComponent } from './pages/project-managment/progress-report/performance-report/performance-report.component';
import { PlanReportTodayComponent } from './pages/project-managment/progress-report/plan-report-today/plan-report-today.component';
import { PlannedReportComponent } from './pages/project-managment/progress-report/planned-report/planned-report.component';
import { ProgressReportComponent } from './pages/project-managment/progress-report/progress-report/progress-report.component';
import { ProgressReportBystructureComponent } from './pages/project-managment/progress-report/progress-report-bystructure/progress-report-bystructure.component';
import { EstimatedCoastComponent } from './pages/project-managment/progress-report/estimated-coast/estimated-coast.component';
import { GetActivityProgressComponent } from './pages/project-managment/progress-report/performance-report/get-activity-progress/get-activity-progress.component';
import { ProjectLocationComponent } from './pages/project-managment/pm-configuration/project-location/project-location.component';
import { AddProjectLocationComponent } from './pages/project-managment/pm-configuration/project-location/add-project-location/add-project-location.component';
import { StrategicPlanReportComponent } from './pages/project-managment/progress-report/strategic-plan-report/strategic-plan-report.component';
import { DisciplinaryCasesComponent } from './pages/human-resource/employee-managment/disciplinary-cases/disciplinary-cases.component';
import { AddDisciplinaryCaseComponent } from './pages/human-resource/employee-managment/disciplinary-cases/add-disciplinary-case/add-disciplinary-case.component';
import { LeaveCalanderComponent } from './pages/human-resource/hrm-configuration/leave-setting/leave-calander/leave-calander.component';
import { ActivityLocationComponent } from './pages/project-managment/progress-report/activity-location/activity-location.component';
import { ActivityMapComponent } from './pages/project-managment/progress-report/activity-location/activity-map/activity-map.component';
import { StaffWeeklyPlanComponent } from './pages/project-managment/progress-report/staff-weekly-plan/staff-weekly-plan.component';
import { WeeklyPlanPerformanceComponent } from './pages/project-managment/progress-report/weekly-plan-performance/weekly-plan-performance.component';
import { ReportingPeriodComponent } from './pages/project-managment/pm-configuration/reporting-period/reporting-period.component';
import { BudgetYearComponent } from './pages/project-managment/pm-configuration/budget-year/budget-year.component';
import { AddReportPeriodComponent } from './pages/project-managment/pm-configuration/reporting-period/add-report-period/add-report-period.component';
import { AddBudgetYearComponent } from './pages/project-managment/pm-configuration/budget-year/add-budget-year/add-budget-year.component';
import { TrainingListComponent } from './pages/training/training-list/training-list.component';
import { AddTrainingListComponent } from './pages/training/add-training-list/add-training-list.component';
import { AddTrainerComponent } from './pages/training/add-trainer/add-trainer.component';
import { TrainerListComponent } from './pages/training/trainer-list/trainer-list.component';
import { TraineesFormComponent } from './pages/training/trainees-form/trainees-form.component';
import { TrainingReportFormComponenT } from './pages/training/training-report-form/training-report-form.component';
import { BenefitListsComponent } from './pages/human-resource/hrm-configuration/benefit-lists/benefit-lists.component';
import { AddBenefitListComponent } from './pages/human-resource/hrm-configuration/benefit-lists/add-benefit-list/add-benefit-list.component';
import { EmployeeBenefitsComponent } from './pages/human-resource/employee-managment/employee-detail/employee-benefits/employee-benefits.component';
import { AddEmployeeBenefitComponent } from './pages/human-resource/employee-managment/employee-detail/employee-benefits/add-employee-benefit/add-employee-benefit.component';
import { BankListComponent } from './pages/configuration/bank-list/bank-list.component';
import { AddBankListComponent } from './pages/configuration/bank-list/add-bank-list/add-bank-list.component';
import { TrainingDashboardComponent } from './pages/training/training-dashboard/training-dashboard.component';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePipe } from '@angular/common';
import { RehireEmployeeComponent } from './pages/human-resource/employee-managment/employee-detail/rehire-employee/rehire-employee.component';
import { DeviceSettingComponent } from './pages/human-resource/hrm-configuration/device-setting/device-setting.component';
import { AddDeviceSettingsComponent } from './pages/human-resource/hrm-configuration/device-setting/add-device-settings/add-device-settings.component';
import { EmployeeFingerPrintComponent } from './pages/human-resource/employee-finger-print/employee-finger-print.component';
import { AddEmployeeFingerprintComponent } from './pages/human-resource/employee-finger-print/add-employee-fingerprint/add-employee-fingerprint.component';
import { ForgetPasswordComponent } from './auth/pages-login/forget-password/forget-password.component';
import { ShiftSettingComponent } from './pages/human-resource/hrm-configuration/shift-setting/shift-setting.component';
import { AddShiftSettingComponent } from './pages/human-resource/hrm-configuration/shift-setting/add-shift-setting/add-shift-setting.component';
import { BindShiftComponent } from './pages/human-resource/employee-managment/employee-detail/bind-shift/bind-shift.component';
import { EmployeePenaltyComponent } from './pages/human-resource/employee-penalty/employee-penalty.component';
import { AddEmployeePenaltyComponent } from './pages/human-resource/employee-penalty/add-employee-penalty/add-employee-penalty.component';
import { EmployeeBanksComponent } from './pages/human-resource/employee-managment/employee-detail/employee-banks/employee-banks.component';
import { AddShiftDetailComponent } from './pages/human-resource/hrm-configuration/shift-setting/add-shift-detail/add-shift-detail.component';
import { MyLoansComponent } from './pages/human-resource/loan-management/my-loans/my-loans.component';
import { RequestLoanComponent } from './pages/human-resource/loan-management/my-loans/request-loan/request-loan.component';
import { AddLeaveTypeDetailComponent } from './pages/human-resource/hrm-configuration/leave-type/add-leave-type-detail/add-leave-type-detail.component';
import { ContractEndEmployeesComponent } from './pages/human-resource/contract-end-employees/contract-end-employees.component';
import { PlanDetailComponent } from './pages/project-managment/plans/plan-detail/plan-detail.component';
import { ActivityDetailComponent } from './pages/project-managment/plans/activity-detail/activity-detail.component';
import { TrainingDetailComponent } from './pages/training/training-detail/training-detail.component';
import { FileUploadModule } from 'primeng/fileupload';
import { NgImageSliderModule } from 'ng-image-slider';
import { WeeklyActivitiesComponent } from './pages/project-managment/weekly-activities/weekly-activities.component';
import { RequestWeeklyPlanComponent } from './pages/project-managment/weekly-activities/request-weekly-plan/request-weekly-plan.component';
import { AddWeeklyPlanComponent } from './pages/project-managment/weekly-activities/request-weekly-plan/add-weekly-plan/add-weekly-plan.component';
import { ActivityRequestsComponent } from './pages/project-managment/weekly-activities/request-weekly-plan/activity-requests/activity-requests.component';
import { ActivityStatusComponent } from './pages/project-managment/weekly-activities/request-weekly-plan/activity-status/activity-status.component';
import { UpdateTraineeComponent } from './pages/training/trainees-form/update-trainee/update-trainee.component';
import { UpdateTasksComponent } from './pages/project-managment/tasks/update-tasks/update-tasks.component';
import { UpdateActivitiesComponent } from './pages/project-managment/activity-parents/update-activities/update-activities.component';
import { AssignReplacementComponent } from './pages/human-resource/employee-managment/employee-termination/terminate-employee/assign-replacement/assign-replacement.component';

import { PlanVsAchivmentProjectComponent } from './pages/project-managment/progress-report/plan-vs-achivment-project/plan-vs-achivment-project.component';

import { ToolbarModule } from 'primeng/toolbar';
import { PlanDashboardComponent } from './pages/project-managment/plans/plan-dashboard/plan-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ResizableModule } from './components/resizable/resizable.modulte';
import { AllTrainingListComponent } from './pages/training/all-training-list/all-training-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChangePasswordComponent } from './pages/configuration/user-management/change-password/change-password.component';
import { CustomResceduleConfirtamionComponent } from './pages/project-managment/assigned-activities/custom-rescedule-confirtamion/custom-rescedule-confirtamion.component';
import { HrmDashboardComponent } from './pages/human-resource/hrm-dashboard/hrm-dashboard.component';
import { PaymentSetlmentsComponent } from './pages/users-profile/payment-setlments/payment-setlments.component';
import { RequestPaymentComponent } from './pages/users-profile/payment-setlments/request-payment/request-payment.component';
import {SidebarModule} from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { GenerateIdCardComponent } from './pages/human-resource/generate-id-card/generate-id-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { NewTaskActivityComponent } from './pages/project-managment/plans/new-task-activity/new-task-activity.component';
import { EmployeeGuaranteeComponent } from './pages/human-resource/employee-managment/employee-detail/employee-guarantee/employee-guarantee.component';
import { AddEmployeeGuaranteeComponent } from './pages/human-resource/employee-managment/employee-detail/employee-guarantee/add-employee-guarantee/add-employee-guarantee.component';
import { DocumentTypeComponent } from './pages/configuration/document-type/document-type.component';
import { DailyAttendanceReportComponent } from './pages/human-resource/attendance-report/daily-attendance-report/daily-attendance-report.component';
import { OvertimeAttendanceReportComponent } from './pages/human-resource/attendance-report/overtime-attendance-report/overtime-attendance-report.component';
// import { MonthlyAttendanceReportComponent } from './pages/human-resource/attendance-report/monthly-attendance-report/monthly-attendance-report.component';
import { AddDocumentTypeComponent } from './pages/configuration/document-type/add-document-type/add-document-type.component';
import { ExtendContractComponent } from './pages/human-resource/contract-end-employees/extend-contract/extend-contract.component';
import { LeaveSettingComponent } from './pages/human-resource/hrm-configuration/leave-setting/leave-setting.component';
import { AddLeaveSettingComponent } from './pages/human-resource/hrm-configuration/leave-setting/add-leave-setting/add-leave-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnerComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,

    HrmConfigurationComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    UpdateDepartmentComponent,
    PositionComponent,
    AddPositionComponent,
    UpdatePositionComponent,
    EmployeeManagmentComponent,
    AddEmployeeComponent,
    EmployeeDetailComponent,

    EmploymentHistoryComponent,
    AddEmploymentHistoryComponent,
    UpdateEmploymentHistoryComponent,
    EmployeeFamilyComponent,
    AddEmployeeFamilyComponent,
    UpdateEmployeeFamilyComponent,
    VacancyListComponent,
    AddVacancyComponent,
    EmployeeEducationComponent,
    AddEmployeeEducationComponent,
    UpdateEmployeeEducationComponent,
    CompanyProfileComponent,
    ConfigurationComponent,
    CommonComponent,
    AddressComponent,
    CountryComponent,
    RegionComponent,
    ZoneComponent,
    AddCountryComponent,
    UpdateCountryComponent,
    AddRegionComponent,
    UpdateRegionComponent,
    AddZoneComponent,
    UpdateZoneComponent,
    EducationalFieldComponent,
    EducationalLevelComponent,
    AddEdcuationalFieldComponent,
    UpdateEductionalFieldComponent,
    AddEdcuationalLevelComponent,
    UpdateEdcuationalLevelComponent,
    GeneralCodesComponent,
    LeaveTypeComponent,
    UpdateEmployeeComponent,
    AddLeaveTypeComponent,
    UpdateLeaveTypeComponent,
    LeaveSettingComponent,
    AddLeaveSettingComponent,
    AddVaccancyDocumentComponent,
    UserManagementComponent,
    HrmSettingComponent,
    AddHrmSettingComponent,
    UpdateHrmSettingComponent,
    AddUserComponent,
    AutocompleteComponent,
    UpdateRolesComponent,
    LeaveComponent,
    RequestLeaveComponent,
    LeaveRequestsComponent,
    AddLeaveRequestComponent,
    LeaveBalanceComponent,

    HolidaySettingComponent,
    AddHolidayComponent,
    RequestDetailComponent,
    CustomConfirmationComponent,
    ResignationLetterComponent,
    ResignationRequestComponent,
    EmployeeTerminationComponent,
    ViewPdfComponent,
    ResignationListComponent,
    TerminateEmployeeComponent,
    VaccancyPostComponent,
    VacancyDetailComponent,
    ApplicantComponent,
    ApplicantEducationComponent,
    AddApplicantEducationComponent,
    ApplicantWorkExperianceComponent,
    AddApplicantWorkComponent,
    ApplicantDocumentsComponent,
    AddApplicantDocumentsComponent,
    PerformanceSettingComponent,
    AddPerformanceSettingComponent,
    PerformancePlanComponent,
    AddPerformancePlanComponent,
    AddPerformanceDetailPlanComponent,
    EmployeeSupervisorsComponent,
    AssignSupervisorComponent,
    PerformanceManagementComponent,
    ChangeStatusComponent,
    LoanSettingComponent,
    AddLoanSettingComponent,
    HistorySalaryComponent,
    EmployeeFilesComponent,
    AddEmployeeFileComponent,
    UpdateEmployeeFileComponent,
    EmployeeSuretyComponent,
    AddEmployeeSuretyComponent,
    UpdateEmployeeSuretyComponent,
    VolunterComponent,
    AddVolunterComponent,
    UpdateVolunterComponent,
    VolunterDetailComponent,
    LoanManagementComponent,
    LoanRequestsComponent,
    EmployeeLoanComponent,
    PMConfigurationComponent,
    UnitIndicatorsComponent,
    UpdateMeasurmentComponent,
    AddMeasurementComponent,
    StrategicPlanComponent,
    AddStrategicPlanComponent,
    UpdateStrategicPlanComponent,
    PlansComponent,
    AddPlansComponent,
    CommitteeEmployeeComponent,
    AddComiteeComponent,
    UpdateCpmmitteeComponent,
    ComittesComponent,
    TasksComponent,
    AddTasksComponent,
    ActivityParentsComponent,
    AddActivitiesComponent,
    ActivityforapprovalComponent,
    AssignedActivitiesComponent,
    ViewActivtiesComponent,
    ActivityTargetComponent,
    AddProgressComponent,
    ViewProgressComponent,
    AcceptRejectComponent,
    Autocomplete2Component,
    PerformanceReportComponent,
    PlanReportTodayComponent,
    PlannedReportComponent,
    ProgressReportComponent,
    ProgressReportBystructureComponent,
    EstimatedCoastComponent,
    GetActivityProgressComponent,
    ProjectLocationComponent,
    AddProjectLocationComponent,
    StrategicPlanReportComponent,
    DisciplinaryCasesComponent,
    AddDisciplinaryCaseComponent,
    LeaveCalanderComponent,
    ActivityLocationComponent,
    ActivityMapComponent,
    StaffWeeklyPlanComponent,
    WeeklyPlanPerformanceComponent,
    ReportingPeriodComponent,
    BudgetYearComponent,
    AddReportPeriodComponent,
    AddBudgetYearComponent,
    TrainingListComponent,
    AddTrainingListComponent,
    AddTrainerComponent,
    TrainerListComponent,
    TraineesFormComponent,
    TrainingReportFormComponenT,
    BenefitListsComponent,
    AddBenefitListComponent,
    EmployeeBenefitsComponent,
    AddEmployeeBenefitComponent,
    BankListComponent,
    AddBankListComponent,
    TrainingDashboardComponent,
    RehireEmployeeComponent,
    DeviceSettingComponent,
    AddDeviceSettingsComponent,
    EmployeeFingerPrintComponent,
    AddEmployeeFingerprintComponent,
    ForgetPasswordComponent,
    ShiftSettingComponent,
    AddShiftSettingComponent,
    BindShiftComponent,
    EmployeePenaltyComponent,
    AddEmployeePenaltyComponent,
    EmployeeBanksComponent,
    AddShiftDetailComponent,
    MyLoansComponent,
    RequestLoanComponent,
    AddLeaveTypeDetailComponent,
    ContractEndEmployeesComponent,
    PlanDetailComponent,
    ActivityDetailComponent,
    TrainingDetailComponent,
    WeeklyActivitiesComponent,
    RequestWeeklyPlanComponent,
    AddWeeklyPlanComponent,
    ActivityRequestsComponent,
    ActivityStatusComponent,
    UpdateTraineeComponent,
    UpdateTasksComponent,
    UpdateActivitiesComponent,
    AssignReplacementComponent,
    PlanVsAchivmentProjectComponent,
    PlanDashboardComponent,
    AllTrainingListComponent,
    ChangePasswordComponent,
    CustomResceduleConfirtamionComponent,
    HrmDashboardComponent,
    PaymentSetlmentsComponent,
    RequestPaymentComponent,
    GenerateIdCardComponent,
    NewTaskActivityComponent,
    EmployeeGuaranteeComponent,
    AddEmployeeGuaranteeComponent,
    DocumentTypeComponent,
    DailyAttendanceReportComponent,
    OvertimeAttendanceReportComponent,
    // MonthlyAttendanceReportComponent,
        AddDocumentTypeComponent,
        ExtendContractComponent,
        ExternalVacancyApplicationComponent,
        ExternalApplicantFormComponent,
        //  AddMeasurementComponent,
        //  UpdateMeasurmentComponent
  ],
  imports: [
    SidebarModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    StepsModule,
    ConfirmDialogModule,
    ToastModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    AutoCompleteModule,
    DynamicDialogModule,
    OverlayPanelModule,
    BadgeModule,
    InputSwitchModule,
    ConfirmPopupModule,
    ListboxModule,
    InputMaskModule,
    FileUploadModule,
    NgImageSliderModule,
    TimelineModule ,
    ToolbarModule,
    ResizableModule,
    MultiSelectModule,
    DataViewModule,
    PaginatorModule,
    RippleModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderIneterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService,
    DialogService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
