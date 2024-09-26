import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductListDto } from 'src/app/model/Inventory/ProductDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-goods-receiving-note',
  templateUrl: './goods-receiving-note.component.html',
  styleUrls: ['./goods-receiving-note.component.css']
})
export class GoodsReceivingNoteComponent implements  OnInit  {


  productList: ProductListDto[] = [];

  constructor(private inventoryService: InventoryService, 
              private messageService: MessageService,
              private routerService: Router) { }

  ngOnInit() {
      this.getProductList();
  }


  getProductList(){
    this.inventoryService.getProducts().subscribe({
      next: (res) => {
         this.productList = res;
      }
    });
  }

  

  openNew(){
    this.routerService.navigateByUrl('inventory/addGoodsRecivingNote')
  }

  editProduct(productId: any){
    this.routerService.navigateByUrl(`inventory/addGoodsRecivingNote?productId=${productId}`)
  }

  Adjustment(){
    this.routerService.navigateByUrl('inventory/productAdjustment')
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
