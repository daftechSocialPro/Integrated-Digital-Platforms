import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdjustReceivedITemsDto, EmployeeReceivedITemsDto } from 'src/app/model/Inventory/StoreReceivalListDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-received-items',
  templateUrl: './received-items.component.html',
  styleUrls: ['./received-items.component.css']
})
export class ReceivedItemsComponent implements OnInit {

 
  receivedItems: EmployeeReceivedITemsDto[] = [];
  confirmDialog: boolean = false;
  adjustReceivedItems: AdjustReceivedITemsDto = new AdjustReceivedITemsDto();

  usedItemStatus: any[] = [
    { value: 0, name: "USED" },
    { value: 1, name: "SOLD" },
    { value: 2, name: "LOST" },
    { value: 3, name: "BROKEEN" },
    { value: 4, name: "DAMAGED" },
    { value: 5, name: "MAINTAINABLE" },
    { value: 6, name: "RETURNED" },
  ]
  
  constructor(private inventoryService: InventoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.inventoryService.getEmployeeReceivedItems().subscribe({
      next: (res) => {
        this.receivedItems = res;
      }
    });
  }

  ConfirmAdjust(id: string) {
    this.adjustReceivedItems.id  = id;
    this.confirmDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  saveAdjustment() {
    this.inventoryService.adjustReceivedItems(this.adjustReceivedItems).subscribe({
      next: (res) => {
        if (res.success) {
          this.receivedItems.some(x => {
              if(x.id == res.data){
                  x.remainingQuantity = x.remainingQuantity - this.adjustReceivedItems.usedQuantity
              }
            });
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
          this.confirmDialog = false;
          this.adjustReceivedItems = new AdjustReceivedITemsDto();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      }, error: (res) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
      }
    });
  }

}