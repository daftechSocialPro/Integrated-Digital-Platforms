import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddProductDto } from 'src/app/model/Inventory/ProductDto';
import { ItemDropDownDto, SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-goods-receiving-note',
  templateUrl: './add-goods-receiving-note.component.html',
  styleUrls: ['./add-goods-receiving-note.component.css']
})
export class AddGoodsReceivingNoteComponent implements OnInit{
  
  index: number = 0;
  isExpirable: boolean = false;
  measurementType: number = 0;
  itemsDropDown : ItemDropDownDto[] = [];
  selectedItem: any;
  vendorDropDown: SelectList[] = [];
  purchaseRequestDropDown: SelectList[] = [];
  measurementUnitDropDown: SelectList[] = [];
  addProduct: AddProductDto = new AddProductDto() ;
  itemId: string = "";
  
  constructor(private inventoryService: InventoryService,
    private messageService: MessageService,
    private dropDownService: DropDownService,
    private routerService:Router,
    private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getItems();
    this.getVendordropDown();
    this.getCurrentProd();
  }

getVendordropDown(){
  this.dropDownService.getVendorDropDown().subscribe({
    next: (res) => {
        this.vendorDropDown = res;
    }
  })
}

goBack(){
  this.routerService.navigateByUrl('inventory/goodsRecivingNote')
}

  getItems(){
    this.dropDownService.getItemsDropDown().subscribe({
      next: (res) => {
          this.itemsDropDown = res;
      }
    })
  }



  openNext(){
    this.index ++;
  }

  openPreviuous(){
    this.index --;
  }

  changeItem(event:any){
    this.selectedItem =  this.itemsDropDown.find(x => x.id == event);
    this.isExpirable = this.selectedItem.isExpirable;
    this.itemId =  this.selectedItem.id;
    this.addProduct.itemId =  this.selectedItem.id;
    this.measurementType =  this.selectedItem.measurementType;
    this.dropDownService.getMeasurementUnitByType( this.selectedItem.measurementType).subscribe({
      next: (res) => {
          this.measurementUnitDropDown = res;
      }
    });
  }


  getCurrentProd() {
    let productId = this.route.snapshot.queryParamMap.get('productId')?.toString();
    if (productId) {
      this.inventoryService.getProductDetail(productId).subscribe({
        next: (res) => {
          this.addProduct = res
          this.addProduct.expireDateTime = new Date(res.expireDateTime);
          this.addProduct.manufactureDate = new Date(res.manufactureDate);
          this.addProduct.recivingDateTime = new Date(res.recivingDateTime);
          this.changeItem(res.itemId);
        }
      })
    }
  }


  changePurchaseSwitch(event:any){
    if(event.checked){
      this.dropDownService.getPurchaseRequestDropDown(this.itemId).subscribe({
        next: (res) => {
            this.purchaseRequestDropDown = res;
        }
      })
    }
  }

  SaveChanges() {
    if(this.addProduct.id){

      this.inventoryService.updateProduct(this.addProduct).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
            this.goBack();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
          }
        }, error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
    }
    else{
      this.inventoryService.addProduct(this.addProduct).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Created', life: 3000 });
            this.index = 0;
            this.addProduct = new AddProductDto();
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


}