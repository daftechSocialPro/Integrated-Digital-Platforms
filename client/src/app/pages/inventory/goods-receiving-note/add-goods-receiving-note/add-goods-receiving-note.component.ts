import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddProductDto, AddProductTagsDto, ViewProductDto } from 'src/app/model/Inventory/ProductDto';
import { ItemDropDownDto, SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-goods-receiving-note',
  templateUrl: './add-goods-receiving-note.component.html',
  styleUrls: ['./add-goods-receiving-note.component.css']
})
export class AddGoodsReceivingNoteComponent implements OnInit{
  
  isExpirable: boolean = false;
  measurementType: number = 0;
  itemsDropDown : ItemDropDownDto[] = [];
  selectedItem: any;
  vendorDropDown: SelectList[] = [];
  projectDropDown: SelectList[] = [];
  purchaseRequestDropDown: SelectList[] = [];
  employeeList: SelectList[] = [];
  measurementUnitDropDown: SelectList[] = [];
  addProduct: AddProductDto = new AddProductDto() ;
  productViews: ViewProductDto[] = [];
  itemId: string = "";
  totalQuantity: number;
serialList: string[] = []
  tagNumberDialog: boolean = false;
  hasSerial: boolean = false;
  productTag: AddProductTagsDto = new AddProductTagsDto();

  sourceOFProduct: any[] = [
    { value: 0, name: "Project" },
    { value: 1, name: "Admin" },
    { value: 2, name: "Donation" },
    { value: 2, name: "other" },
  ]
  
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
    this.getProjectDropDowns();
    this.getEmployeeDropDown();

  }

getVendordropDown(){
  this.dropDownService.getVendorDropDown().subscribe({
    next: (res) => {
        this.vendorDropDown = res;
    }
  })
}

getProjectDropDowns(){
  this.dropDownService.getProjectDropDowns().subscribe({
    next: (res) => {
        this.projectDropDown = res;
    }
  })
}

getEmployeeDropDown(){
  this.dropDownService.GetEmployeeDropDown().subscribe({
    next: (res) => {
      this.employeeList = res;
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
            this.totalQuantity = this.addProduct.quantity * this.addProduct.packet * this.addProduct.cartoon;
            let item = this.itemsDropDown.find(x => x.id == this.addProduct.itemId);
            if (item && item.isAsset) {
              this.tagNumberDialog = true;
              this.productTag.productId = res.data.id;
              this.productTag.totalQuantity = this.totalQuantity;

            }
            else{
                this.savedProductResult();
            }
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

  handleCheckboxChange(checked: any){

    if(checked.checked){
      this.productTag.serialNumber.length = this.totalQuantity;
      this.serialList.length = this.totalQuantity;
    }
    else{
      this.productTag.serialNumber.length = 0;
    }
  }

  savedProductResult(){
    this.hideDialog();
    this.productViews.unshift({
      employeeName: this.employeeList.find(x => x.id == this.addProduct.employeeId)?.name,
      receivedDate: this.addProduct.recivingDateTime,
      totalPrice: this.totalQuantity * this.addProduct.singlePrice,
      totalquantity: this.totalQuantity,
      itemName: this.itemsDropDown.find(x => x.id == this.addProduct.itemId)?.name,
      project: this.projectDropDown.find(x => x.id == this.addProduct.projectId)?.name,
      projectSource: this.sourceOFProduct.find(x => x.id == this.addProduct.sourceOfProduct)?.name,
      vendor: this.vendorDropDown.find(x => x.id == this.addProduct.vendorId)?.name
    })
    this.addProduct = new AddProductDto();
    this.productTag = new AddProductTagsDto();
    this.totalQuantity = 0;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Created', life: 3000 });
  }


  GenerateTagNumber(){
   
    this.inventoryService.AddProductTag(this.productTag).subscribe({
      next: (res) => {
        if (res.success) {
          this.savedProductResult()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      }, error: (res) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.tagNumberDialog = false;
    this.productTag = new AddProductTagsDto();
  }

}