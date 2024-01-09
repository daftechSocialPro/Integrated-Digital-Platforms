import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApprovePurchaseRequestDto, PurchaseRequestListDto } from 'src/app/model/Inventory/PurchaseRequestDto';
import { InventoryService } from 'src/app/services/inventory.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-approve-purchase-request',
    templateUrl: './approve-purchase-request.component.html',
    styleUrls: ['./approve-purchase-request.component.css']
})
export class ApprovePurchaseRequestComponent implements OnInit {

    approveProductDialog: boolean = false;
    requestItems: PurchaseRequestListDto[] = [];
    selectedItems: PurchaseRequestListDto[] = [];
    requestId: string[] = [];


    approveList: ApprovePurchaseRequestDto[] = [];
    cols: any[] = [];
    exportColumns: any[];

    constructor(
        private inventoryService: InventoryService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private userService: UserService) { }

    ngOnInit() {
        this.inventoryService.getPurchasePendingRequests().subscribe({
            next: (res) => {
                this.requestItems = res;
            }
        });
        this.initCols();
    }


    initCols() {
        this.cols = [
            { field: 'itemCode', header: 'Request Number', customExportHeader: 'Request Number' },
            { field: 'requesterEmployee', header: 'Requester Employee' },
            { field: 'itemName', header: 'Item Name' },
            { field: 'measurementUnitName', header: 'Measurement Unit' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'singlePrice', header: 'Single Price' }
        ];

        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    }


    approvePopup() {










        if (this.selectedItems.length > 0) {


            this.confirmationService.confirm({
                message: 'Are you sure you want to Approve selected products??',
                header: 'Purchase Approval !',
                icon: 'pi pi-info-circle',
                accept: () => {
                    this.confirmApporveSelected()

                },
                reject: (type: ConfirmEventType) => {
                    switch (type) {
                        case ConfirmEventType.REJECT:
                            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                            break;
                        case ConfirmEventType.CANCEL:
                            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                            break;
                    }
                },
                key: 'positionDialog'
            });

        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select items to be approved', life: 3000 });
        }
    }

    confirmApporveSelected() {
        const employeeid = this.userService.getCurrentUser().employeeId;
        this.selectedItems.map(x => {
            if (x.aPrrovedQuantity && x.aPrrovedQuantity > 0) {
                this.approveList.push({
                    approverEmployeeId: employeeid,
                    aPrrovedQuantity: x.aPrrovedQuantity,
                    id: x.id
                });
                this.requestId.push(x.id);
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'please add aprroved quantity to selected items', life: 3000 });
                this.approveProductDialog = false;
            }
        });
        this.approveRequests();
    }


    approveRequests() {
        if (this.approveList.length > 0) {
            this.inventoryService.approvePurchaseRequest(this.approveList).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.requestItems = this.requestItems.filter(x => !this.requestId.includes(x.id));
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Approved Selected items', life: 3000 });
                        this.approveProductDialog = false;
                    }
                    else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
                    }
                }, error: (res) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
                }
            });
        }
        else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select items to be approved', life: 3000 });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}