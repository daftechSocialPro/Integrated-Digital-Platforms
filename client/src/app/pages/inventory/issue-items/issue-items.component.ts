import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StoreReceivalListDto, StoreRequestIssueDto } from 'src/app/model/Inventory/StoreReceivalListDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-issue-items',
  templateUrl: './issue-items.component.html',
  styleUrls: ['./issue-items.component.css']
})
export class IssueItemsComponent implements OnInit {


  requestItems: StoreReceivalListDto[] = [];
  storeRequests: StoreRequestIssueDto = new StoreRequestIssueDto();

  cols: any[] = [];
  exportColumns: any[];


  constructor(private inventoryService: InventoryService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.inventoryService.getStoreApprovedItems().subscribe({
      next: (res) => {
        this.requestItems = res;
      }
    });
    this.initCols();
  }

  initCols() {
    this.cols = [
      { field: 'requestNumber', header: 'Request Number', customExportHeader: 'Request Number' },
      { field: 'itemName', header: 'Item Name' },
      { field: 'approvedQuantity', header: 'Approved Quantity' },
      { field: 'measurementUnitName', header: 'Measurement Unit' },
      { field: 'requesterEmployee', header: 'Requester Employee' },
      { field: 'approverEmployee', header: 'Approver Employee' }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  confirm2(event: Event, storeRequestId: string, quantity: number) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.storeRequests.id = storeRequestId
        this.storeRequests.quantity = quantity
        this.inventoryService.issueStoreApprovedItems(this.storeRequests).subscribe({
          next: (res) => {
            if (res.success) {
              this.storeRequests = new StoreRequestIssueDto();
              this.requestItems = this.requestItems.filter(x => x.id != storeRequestId);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Try again' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

