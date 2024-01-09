import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdjustmentDetailDto, SaveAdjustmentDetailDto, SaveAdjustmentDto } from 'src/app/model/Inventory/AdjustmentDetailDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-adjust-items',
  templateUrl: './adjust-items.component.html',
  styleUrls: ['./adjust-items.component.css']
})
export class AdjustItemsComponent implements OnInit {


  productList: AdjustmentDetailDto[] = [];
  cols: any[] = [];
  exportColumns: any[];
  selectedItems: AdjustmentDetailDto[] = [];
  saveAdjustment: SaveAdjustmentDto = new SaveAdjustmentDto();
  adjustmentDetails: SaveAdjustmentDetailDto[] = [];
  approveCurrentDialog: boolean = false;

  items: string[] = [];

  adjustmentReason: any[] = [
    { value: 0, name: "UNKNOWN" },
    { value: 1, name: "LOST" },
    { value: 2, name: "MAINTAINABLE" },
    { value: 2, name: "BROKEN" },
    { value: 2, name: "DAMAGED" },
  ]

  constructor(private inventoryService: InventoryService,
    private messageService: MessageService,
    private routerService: Router) { }

  ngOnInit() {
    this.getProductList();
    this.initCols();
  }

  goBack(){
    this.routerService.navigateByUrl('inventory/goodsRecivingNote')
  }

  getProductList() {
    this.inventoryService.getAdjustmentDetail().subscribe({
      next: (res) => {
        this.productList = res;
      }
    });
  }


  initCols() {
    this.cols = [
      { field: 'itemName', header: 'Item Name', customExportHeader: 'Item Name' },
      { field: 'itemDetailName', header: 'Item Detail Name' },
      { field: 'measurementUnit', header: 'Measurement Unit' },
      { field: 'remainingQuantity', header: 'Remaining Quantity' }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }


  SavePopUP() {
    if (this.selectedItems.length > 0) {
      this.approveCurrentDialog = true;
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select items to be approved', life: 3000 });
    }
  }

  confirmUpdateSelected() {
    console.log(this.selectedItems)
    this.selectedItems.map(x => {
      if (x.currentQuantity && x.currentQuantity >=  0 && x.adjustmentReason >= 0) {
        this.adjustmentDetails.push({
          remainingQuantity: x.currentQuantity,
          id: x.id,
          adjustementReason: x.adjustmentReason
        });
        this.items.push(x.id);

      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'please add remaining quantity to selected items', life: 3000 });
        this.approveCurrentDialog = false;
      }
    });
    this.saveProducts();
  }


  saveProducts() {
    if (this.adjustmentDetails.length > 0) {
      this.saveAdjustment.adjustmentDetails = this.adjustmentDetails;
      this.inventoryService.adjustProducts(this.saveAdjustment).subscribe({
        next: (res) => {
          if (res.success) {
            this.productList = this.productList.filter(x => !this.items.includes(x.id));
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Selected items', life: 3000 });
            this.approveCurrentDialog = false;
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select items to be updated', life: 3000 });
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
