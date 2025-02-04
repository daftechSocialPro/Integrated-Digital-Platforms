import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { InventorySettingComponent } from './inventory-setting/inventory-setting.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { ApprovePurchaseRequestComponent } from './approve-purchase-request/approve-purchase-request.component';
import { GoodsReceivingNoteComponent } from './goods-receiving-note/goods-receiving-note.component';
import { StoreRequestComponent } from './store-request/store-request.component';
import { IssueItemsComponent } from './issue-items/issue-items.component';
import { AddGoodsReceivingNoteComponent } from './goods-receiving-note/add-goods-receiving-note/add-goods-receiving-note.component';
import { AdjustItemsComponent } from './goods-receiving-note/adjust-items/adjust-items.component';
import { ApproveStoreRequestComponent } from './approve-store-request/approve-store-request.component';
import { ReceivedItemsComponent } from './received-items/received-items.component';
import { ApprovedPurchaseInvoiceComponent } from '../finance/purchase-invoice/approved-purchase-invoice/approved-purchase-invoice.component';
import { ApprovedPurchaseRequestsComponent } from './approved-purchase-requests/approved-purchase-requests.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { TagNumberComponent } from './tag-number/tag-number.component';
import { BalanceReportComponent } from './balance-report/balance-report.component';
import { GoodsReceivingReportComponent } from './goods-receiving-report/goods-receiving-report.component';
import { SettelmentReportComponent } from './settelment-report/settelment-report.component';

const routes: Routes = [
  { path: 'inventorysetting', canActivate: [AuthGuard], component: InventorySettingComponent },
  { path: 'purchaseRequest', canActivate: [AuthGuard], component: PurchaseRequestComponent },
  { path: 'approvePurchaseRequest', canActivate: [AuthGuard], component: ApprovePurchaseRequestComponent },
  { path: 'approvedPurchaseRequests', canActivate: [AuthGuard], component: ApprovedPurchaseRequestsComponent },
  { path: 'goodsRecivingNote', canActivate: [AuthGuard], component: GoodsReceivingNoteComponent },
  { path: 'storeRequest', canActivate: [AuthGuard], component: StoreRequestComponent },
  { path: 'approveStoreRequest', canActivate: [AuthGuard], component: ApproveStoreRequestComponent },
  { path: 'issueItems', canActivate: [AuthGuard], component: IssueItemsComponent },
  { path: 'receivedItems', canActivate: [AuthGuard], component: ReceivedItemsComponent },
  { path: 'addGoodsRecivingNote', canActivate: [AuthGuard], component: AddGoodsReceivingNoteComponent },
  { path: 'productAdjustment', canActivate: [AuthGuard], component: AdjustItemsComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: InventoryDashboardComponent },
  { path: 'items-tag-number', canActivate: [AuthGuard], component: TagNumberComponent },
  { path: 'balanceReport', canActivate: [AuthGuard], component: BalanceReportComponent },
  { path: 'goodsReceivingReport', canActivate: [AuthGuard], component: GoodsReceivingReportComponent },
  { path: 'settelmentReport', canActivate: [AuthGuard], component: SettelmentReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
