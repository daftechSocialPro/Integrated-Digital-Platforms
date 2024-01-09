import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemControlRoutingModule } from './system-control-routing.module';
import { MeterSizeComponent } from './scs-data/meter/meter-size/meter-size.component';
import ScsDataComponent from './scs-data/scs-data.component';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { MeterConfigComponent } from './scs-data/meter/meter-config.component';
import { AddMeterSizeComponent } from './scs-data/meter/meter-size/add-meter-size/add-meter-size.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerCategoryComponent } from './scs-data/customer-category/add-customer-category/add-customer-category.component';
import { CustomerCategoryComponent } from './scs-data/customer-category/customer-category.component';


import { PaginatorModule } from 'primeng/paginator';
import { VillageComponent } from './scs-data/meter/village/village.component';
import { AddVillageComponent } from './scs-data/meter/village/add-village/add-village.component';
import { BillCycleComponent } from './scs-data/meter/bill-cycle/bill-cycle.component';
import { AddBillCycleComponent } from './scs-data/meter/bill-cycle/add-bill-cycle/add-bill-cycle.component';
import { MeterClassComponent } from './scs-data/meter/meter-class/meter-class.component';
import { AddMeterClassComponent } from './scs-data/meter/meter-class/add-meter-class/add-meter-class.component';
import { MeterDigitComponent } from './scs-data/meter/meter-digit/meter-digit.component';
import { AddMeterDigitComponent } from './scs-data/meter/meter-digit/add-meter-digit/add-meter-digit.component';
import { MeterModelComponent } from './scs-data/meter/meter-model/meter-model.component';
import { AddMeterModelComponent } from './scs-data/meter/meter-model/add-meter-model/add-meter-model.component';
import { MeterTypeComponent } from './scs-data/meter/meter-type/meter-type.component';
import { AddMeterTypeComponent } from './scs-data/meter/meter-type/add-meter-type/add-meter-type.component';
import { CountryOriginComponent } from './scs-data/meter/country-origin/country-origin.component';
import { AddCountryOriginComponent } from './scs-data/meter/country-origin/add-country-origin/add-country-origin.component';
import { BillConfigComponent } from './scs-data/bill/bill-config.component';
import { AddConsumptionLevelComponent } from './scs-data/bill/consumption-level/add-consumption-level/add-consumption-level.component';
import { ConsumptionLevelComponent } from './scs-data/bill/consumption-level/consumption-level.component';
import { AddInvoicePrefixComponent } from './scs-data/bill/invoice-prefix/add-invoice-prefix/add-invoice-prefix.component';
import { InvoicePrefixComponent } from './scs-data/bill/invoice-prefix/invoice-prefix.component';
import { AddMeterSizeGroupComponent } from './scs-data/bill/meter-size-group/add-meter-size-group/add-meter-size-group.component';
import { MeterSizeGroupComponent } from './scs-data/bill/meter-size-group/meter-size-group.component';
import { AddTarifRateGroupComponent } from './scs-data/bill/tarif-rate-group/add-tarif-rate-group/add-tarif-rate-group.component';
import { TarifRateGroupComponent } from './scs-data/bill/tarif-rate-group/tarif-rate-group.component';
import { AddWaterSourceComponent } from './scs-data/bill/water-source/add-water-source/add-water-source.component';
import { WaterSourceComponent } from './scs-data/bill/water-source/water-source.component';
import { AddScsPaymentComponent } from './scs-data/scs-payment/add-scs-payment/add-scs-payment.component';
import { ScsPaymentComponent } from './scs-data/scs-payment/scs-payment.component';
import { AddScsReasonComponent } from './scs-settings/scs-reason/add-scs-reason/add-scs-reason.component';
import { ScsReasonComponent } from './scs-settings/scs-reason/scs-reason.component';
import { AddScsServicchargeComponent } from './scs-settings/scs-service-charge/add-scs-serviccharge/add-scs-serviccharge.component';
import { ScsServiceChargeComponent } from './scs-settings/scs-service-charge/scs-service-charge.component';
import { ScsSettingsComponent } from './scs-settings/scs-settings.component';
import { ScsMiscellnaousCostTypeComponent } from './scs-settings/scs-miscellnaous-cost-type/scs-miscellnaous-cost-type.component';
import { AddScsMiscellnaousCostTypeComponent } from './scs-settings/scs-miscellnaous-cost-type/add-scs-miscellnaous-cost-type/add-scs-miscellnaous-cost-type.component';
import { ScsMaintainComponent } from './scs-maintain/scs-maintain.component';
import { ScsInterfaceComponent } from './scs-maintain/scs-interface/scs-interface.component';
import { AddScsInterfaceComponent } from './scs-maintain/scs-interface/add-scs-interface/add-scs-interface.component';
import { ScsRateComponent } from './scs-maintain/scs-rate/scs-rate.component';
import { ScsMonthsComponent } from './scs-maintain/scs-months/scs-months.component';
import { AddMonthsComponent } from './scs-maintain/scs-months/add-months/add-months.component';
import { ScsUsersComponent } from './scs-maintain/scs-users/scs-users.component';

import { ScsSetupComponent } from './scs-setup/scs-setup.component';
import { ScsSettingComponent } from './scs-setup/scs-setting/scs-setting.component';
import { ScsCompanyComponent } from './scs-setup/scs-company/scs-company.component';
import { ScsFontlanguageComponent } from './scs-setup/scs-fontlanguage/scs-fontlanguage.component';
// import { ScsClosingComponent } from './scs-setup/scs-closing/scs-closing.component';
import { ScsTemplatesComponent } from './scs-setup/scs-templates/scs-templates.component';
import { ScsNetworkComponent } from './scs-setup/scs-network/scs-network.component';
import { ScsBackupComponent } from './scs-setup/scs-backup/scs-backup.component';
import { ScsRefreshComponent } from './scs-setup/scs-refresh/scs-refresh.component';
import { AddInterfaceComponent } from './scs-maintain/interface/interface/add-interface/add-interface.component';
import { AddFieldNameComponent } from './scs-maintain/interface/field-name/add-field-name/add-field-name.component';
import { AddUserMessageComponent } from './scs-maintain/interface/user-message/add-user-message/add-user-message.component';
import { AddReportTitlesComponent } from './scs-maintain/interface/report-titles/add-report-titles/add-report-titles.component';
import { AddBillInterfaceComponent } from './scs-maintain/interface/bill-interface/add-bill-interface/add-bill-interface.component';
import { AddAppInterfaceComponent } from './scs-maintain/interface/app-interface/add-app-interface/add-app-interface.component';
// import { AddMeterRentComponent } from './scs-maintain/scs-rate/add-meter-rent/add-meter-rent.component';
import { AppInterfaceComponent } from './scs-maintain/interface/app-interface/app-interface.component';
import { InterfaceConfigComponent } from './scs-maintain/interface/interface-config.component';
import { BillInterfaceComponent } from './scs-maintain/interface/bill-interface/bill-interface.component';
import { FieldNameComponent } from './scs-maintain/interface/field-name/field-name.component';
import { UserMessageComponent } from './scs-maintain/interface/user-message/user-message.component';
import { ReportTitlesComponent } from './scs-maintain/interface/report-titles/report-titles.component';
import { InterfaceComponent } from './scs-maintain/interface/interface/interface.component';
import { MeterRateComponent } from './scs-maintain/scs-rate/meter-rate/meter-rate.component';
import { AddMeterRateComponent } from './scs-maintain/scs-rate/meter-rate/add-meter-rate/add-meter-rate.component';
import { ConsTariffComponent } from './scs-maintain/scs-rate/cons-tariff/cons-tariff.component';
import { AddConsTariffComponent } from './scs-maintain/scs-rate/cons-tariff/add-cons-tariff/add-cons-tariff.component';
// import { MaintainSettingConfigComponent } from './scs-maintain/scs-rate/maintain-setting-config/maintain-setting-config.component';
// import { RateSettingConfigComponent } from './scs-maintain/rate-setting-config/rate-setting-config.component';

import { SettingConfigComponent } from './scs-setup/setting/setting-config/setting-config.component';
import { OptionsComponent } from './scs-setup/setting/options/options.component';

import { StepsModule } from 'primeng/steps';

import { ScsBillSectionComponent } from './scs-maintain/scs-bill-section/scs-bill-section.component';
import { BillOfficerComponent } from './scs-maintain/scs-bill-section/bill-officer/bill-officer.component';
import { BillDutiesComponent } from './scs-maintain/scs-bill-section/bill-duties/bill-duties.component';
import { AddBillOfficerComponent } from './scs-maintain/scs-bill-section/bill-officer/add-bill-officer/add-bill-officer.component';
import { AddBillDutiesComponent } from './scs-maintain/scs-bill-section/bill-duties/add-bill-duties/add-bill-duties.component';


import { KebelesComponent } from './scs-maintain/kebeles/kebeles.component';
import { KetenaComponent } from './scs-maintain/kebeles/ketena/ketena.component';
import { AddKetenaComponent } from './scs-maintain/kebeles/ketena/add-ketena/add-ketena.component';
import { KebeleInfoComponent } from './scs-maintain/kebeles/kebele-info/kebele-info.component';
import { AddKebeleInfoComponent } from './scs-maintain/kebeles/kebele-info/add-kebele-info/add-kebele-info.component';
import { PenlityRateComponent } from './scs-setup/setting/penlity-rate/penlity-rate.component';
import { AddPenalityRateComponent } from './scs-setup/setting/penlity-rate/add-penality-rate/add-penality-rate.component';
import { ScsClosingComponent } from './scs-setup/scs-closing/scs-closing.component';
import { ScsHomeComponent } from './scs-home/scs-home.component';
import DefaultComponent from '../../default/default.component';
import { CurrentMeterRateComponent } from './scs-setup/setting/current-meter-rate/current-meter-rate.component';
import { CurrentMeterTariffComponent } from './scs-setup/setting/current-meter-tariff/current-meter-tariff.component';
import { BillTemplatesComponent } from './scs-setup/bill-templates/bill-templates.component';
import { BillOptionsComponent } from './scs-setup/setting/bill-options/bill-options.component';
@NgModule({


  declarations: [
    ScsBillSectionComponent,
    BillOfficerComponent,
    BillDutiesComponent,
    AddBillOfficerComponent,
    AddBillDutiesComponent,
    BillDutiesComponent,
    MeterSizeComponent,
    ScsDataComponent,
    MeterConfigComponent,
    AddMeterSizeComponent,
    AddCustomerCategoryComponent,
    CustomerCategoryComponent,
    VillageComponent,
    AddVillageComponent,
    BillCycleComponent,
    AddBillCycleComponent,
    MeterClassComponent,
    AddMeterClassComponent,
    MeterDigitComponent,
    AddMeterDigitComponent,
    MeterModelComponent,
    AddMeterModelComponent,
    MeterTypeComponent,
    AddMeterTypeComponent,
    CountryOriginComponent,
    AddCountryOriginComponent,
    BillConfigComponent,
    MeterSizeGroupComponent,
    AddMeterSizeGroupComponent,
    TarifRateGroupComponent,
    AddTarifRateGroupComponent,
    WaterSourceComponent,
    AddWaterSourceComponent,
    ConsumptionLevelComponent,
    AddConsumptionLevelComponent,
    InvoicePrefixComponent,
    AddInvoicePrefixComponent,
    ScsPaymentComponent,
    ScsReasonComponent,
    AddScsPaymentComponent,
    ScsSettingsComponent,
    ScsReasonComponent,
    AddScsReasonComponent,
    ScsServiceChargeComponent,
    AddScsServicchargeComponent,
    ScsMiscellnaousCostTypeComponent,
    AddScsMiscellnaousCostTypeComponent,
    ScsMaintainComponent,
    ScsMaintainComponent,
    ScsInterfaceComponent,
    AddScsInterfaceComponent,
    ScsRateComponent,
    ScsMonthsComponent,
    AddMonthsComponent,
    ScsUsersComponent,

    ScsSetupComponent,
    ScsSettingComponent,
    ScsCompanyComponent,
    ScsFontlanguageComponent,
    ScsClosingComponent,
    ScsTemplatesComponent,
    ScsNetworkComponent,
    ScsBackupComponent,
    ScsRefreshComponent,
    AddInterfaceComponent,
    AddFieldNameComponent,
    AddUserMessageComponent,
    AddReportTitlesComponent,
    AddBillInterfaceComponent,
    AddAppInterfaceComponent,
    AppInterfaceComponent,
    InterfaceConfigComponent,
    BillInterfaceComponent,
    FieldNameComponent,
    UserMessageComponent,
    AppInterfaceComponent,
    ReportTitlesComponent,
    InterfaceComponent,
    MeterRateComponent,
    AddMeterRateComponent,
    ConsTariffComponent,
    AddConsTariffComponent,
    ScsSetupComponent,
    SettingConfigComponent,
    OptionsComponent,
    KetenaComponent,
    AddKetenaComponent,
    KebelesComponent,
    KebeleInfoComponent,
    AddKebeleInfoComponent,
    PenlityRateComponent,
    AddPenalityRateComponent,
    ScsHomeComponent,
    DefaultComponent,
    CurrentMeterRateComponent,
    CurrentMeterTariffComponent,
    BillTemplatesComponent,
    BillOptionsComponent


  ],
  imports: [
    CommonModule, SystemControlRoutingModule, SharedModule, TableModule, TabViewModule, FormsModule, ReactiveFormsModule, PaginatorModule,
    StepsModule

  ]
})
export class SystemControlModule { }
