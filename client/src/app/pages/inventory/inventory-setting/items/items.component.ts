import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategoryListDto } from 'src/app/model/Inventory/CategoryDto';
import { AddItemDto, ItemListDto } from 'src/app/model/Inventory/ItemDto';
import { InventoryService } from 'src/app/services/inventory.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements  OnInit  {

  itemList: ItemListDto[] = [];
  category: CategoryListDto[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private inventoryService: InventoryService, 
              private messageService: MessageService,
              private modalService: NgbModal) { }

  ngOnInit() {
      this.getItemList();
  }


  getItemList(){
    this.inventoryService.getItems().subscribe({
      next: (res) => {
         this.itemList = res;
      }
    });
  }


  openNew() {
    let modalRef = this.modalService.open(AddItemComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getItemList();
    });
  }

  editItem(item: ItemListDto) {
    let modalRef = this.modalService.open(AddItemComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.item = item
    modalRef.result.then(() => {
      this.getItemList();
    });
  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.itemList.length; i++) {
          if (this.itemList[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}