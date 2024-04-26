import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventorySettingComponent } from './inventory-setting/inventory-setting.component';
import { CategoryComponent } from './inventory-setting/category/category.component';
import { ItemsComponent } from './inventory-setting/items/items.component';
import { VendorComponent } from './inventory-setting/vendor/vendor.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { AddItemCategoryComponent } from './inventory-setting/category/add-item-category/add-item-category.component';
import { AddItemComponent } from './inventory-setting/items/add-item/add-item.component';
import { AddVendorComponent } from './inventory-setting/vendor/add-vendor/add-vendor.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { MeasurementUnitComponent } from './inventory-setting/measurement-unit/measurement-unit.component';
import { AddMeasurementunitComponent } from './inventory-setting/measurement-unit/add-measurementunit/add-measurementunit.component';
import { ApprovePurchaseRequestComponent } from './approve-purchase-request/approve-purchase-request.component';
import { DialogModule } from 'primeng/dialog';
import { GoodsReceivingNoteComponent } from './goods-receiving-note/goods-receiving-note.component';
import { AddGoodsReceivingNoteComponent } from './goods-receiving-note/add-goods-receiving-note/add-goods-receiving-note.component';
import { AdjustItemsComponent } from './goods-receiving-note/adjust-items/adjust-items.component';
import { CalendarModule } from 'primeng/calendar';
import { StoreRequestComponent } from './store-request/store-request.component';
import { ApproveStoreRequestComponent } from './approve-store-request/approve-store-request.component';
import { IssueItemsComponent } from './issue-items/issue-items.component';
import { ReceivedItemsComponent } from './received-items/received-items.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TabViewModule } from 'primeng/tabview';
import { ApprovedPurchaseRequestsComponent } from './approved-purchase-requests/approved-purchase-requests.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { TagNumberComponent } from './tag-number/tag-number.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';

@NgModule({
  declarations: [
    InventorySettingComponent,
    CategoryComponent,
    ItemsComponent,
    VendorComponent,
    AddItemCategoryComponent,
    AddItemComponent,
    AddVendorComponent,
    PurchaseRequestComponent,
    MeasurementUnitComponent,
    AddMeasurementunitComponent,
    ApprovePurchaseRequestComponent,
    GoodsReceivingNoteComponent,
    AddGoodsReceivingNoteComponent,
    AdjustItemsComponent,
    StoreRequestComponent,
    ApproveStoreRequestComponent,
    IssueItemsComponent,
    ReceivedItemsComponent,
    ApprovedPurchaseRequestsComponent,
    InventoryDashboardComponent,
    TagNumberComponent,
    BalanceReportComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    TableModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    DialogModule,
    CalendarModule,
    ConfirmPopupModule,
    TabViewModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ]
})
export class InventoryModule { }
