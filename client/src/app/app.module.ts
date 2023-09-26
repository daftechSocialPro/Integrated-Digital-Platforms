import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHeaderIneterceptor } from './http-interceptors/auth-header-interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesLoginComponent } from './auth/pages-login/pages-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HrmConfigurationComponent } from './pages/human-resource/hrm-configuration/hrm-configuration/hrm-configuration.component';
import { DepartmentComponent } from './pages/human-resource/hrm-configuration/department/department.component';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
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
import { ToastModule} from 'primeng/toast';
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
import { TabViewModule} from 'primeng/tabview';
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

import { AutoCompleteModule } from 'primeng/autocomplete';
import { UpdateRolesComponent } from './pages/configuration/user-management/update-roles/update-roles.component';
import { LeaveComponent } from './pages/human-resource/leave/leave.component';
import { RequestLeaveComponent } from './pages/human-resource/leave/request-leave/request-leave.component';
import { LeaveRequestsComponent } from './pages/human-resource/leave/leave-requests/leave-requests.component';
import { AddLeaveRequestComponent } from './pages/human-resource/leave/request-leave/add-leave-request/add-leave-request.component';
import { LeaveBalanceComponent } from './pages/human-resource/leave/request-leave/leave-balance/leave-balance.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
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
    
     
     
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
   
    ToastrModule.forRoot({
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderIneterceptor,
      multi: true,
    },
    ConfirmationService,
    MessageService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
