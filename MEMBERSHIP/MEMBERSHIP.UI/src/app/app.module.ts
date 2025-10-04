import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHeaderIneterceptor } from './http-interceptors/auth-header-interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

import { AddUserComponent } from './demo/pages/users/add-user/add-user.component';
import { UserRoleComponent } from './demo/pages/users/user-role/user-role.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DatePipe } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { OnConstructionComponent } from './demo/on-construction/on-construction.component';
import { BoardMemberDashbaordComponent } from './demo/board-member-dashbaord/board-member-dashbaord.component';


// import { ConsTariffComponent } from './cons-tariff/cons-tariff.component'
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
    ConfigurationComponent,
    GuestComponent,
    SpinnerComponent,   
    AddUserComponent,
    UserRoleComponent,
    AutoCompleteComponent,
    OnConstructionComponent,
    BoardMemberDashbaordComponent
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
    NgApexchartsModule,
    QRCodeModule,
    NgxEchartsModule.forRoot({ echarts })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderIneterceptor,
      multi: true
    },
    MessageService,
    NavigationItem,
    ConfirmationService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
