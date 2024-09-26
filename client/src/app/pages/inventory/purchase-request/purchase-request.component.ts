import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddPurchaseRequestDto, AddPurchaseRequestListDto } from 'src/app/model/Inventory/PurchaseRequestDto';
import { ItemDropDownDto, SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.css']
})
export class PurchaseRequestComponent implements OnInit {

  employeeList: SelectList[] = [];
  filteredEmployees: SelectList[] = [];
  employeeField: any;
  items: any;
  addPurchaseRequest: AddPurchaseRequestDto = new AddPurchaseRequestDto();
  projectDropDown: SelectList[] = [];
  

  purchaserequesList: AddPurchaseRequestListDto[] = [];

  addPurchaseRequestList: AddPurchaseRequestListDto = new AddPurchaseRequestListDto();

  storeRequestDropdown: SelectList[] = [];
  itemsDropDown : ItemDropDownDto[] = [];
  measurementUnitDropDown: SelectList[] = [];




  constructor(private dropDownService: DropDownService, 
              private inventoryService: InventoryService,
              private messageService: MessageService){
    
  }

  ngOnInit(): void {
    this.getEmployeeDropDown();
    this.getItems();
    this.getProjectDropDowns();
  }

  getItems(){
    this.dropDownService.getItemsDropDown().subscribe({
      next: (res) => {
          this.itemsDropDown = res;
      }
    });
  }

  changeRequest(event: any){
    this.itemsDropDown = [];
    this.dropDownService.getItemByRequest(event.value).subscribe({
      next: (res) => {
          this.itemsDropDown = res;
      }
    });
  }

  changeItem(event:any){
    let item = this.itemsDropDown.find(x => x.id == event.value);
    this.addPurchaseRequestList.itemName = item.name;
    this.addPurchaseRequestList.itemId =  item.id;
    this.dropDownService.getMeasurementUnitByType(item.measurementType).subscribe({
      next: (res) => {
          this.measurementUnitDropDown = res;
      }
    })
  }

  isStoreChecked(event: any) {
    if (event.checked) {
      this.dropDownService.getStoreRequestDropDown().subscribe({
        next: (res) => {
          this.storeRequestDropdown = res;
        }
      })
    }
  }

  getEmployeeDropDown() {
    this.dropDownService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        if (res) {
          this.employeeList = res;
        }
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

  getSelectedValue(event: any){
    if(event.id){
      this.addPurchaseRequest.requesterEmployeeId = event.id;
    }
  }

  searchEmployee(event: any) {
    // in a real application, make a request to a remote url with the query and return filtered results,
    // for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.employeeList.length; i++) {
      const country = this.employeeList[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredEmployees = filtered;
  }

  savePurchase(){
    if(this.purchaserequesList.length <= 0){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one item', life: 3000 });
    }
    else{
      this.addPurchaseRequest.requestLists = this.purchaserequesList;
      this.inventoryService.addPurchaseRequest(this.addPurchaseRequest).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.purchaserequesList = [];
            this.employeeField = "";
            this.addPurchaseRequest = new AddPurchaseRequestDto();
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

  
  removeData(itemId: string) {
    this.purchaserequesList = this.purchaserequesList.filter(x => x.itemId != itemId);
  }



  newRow() {
    if (this.addPurchaseRequestList.itemId) {
      this.measurementUnitDropDown.some(x => {
        if (x.id == this.addPurchaseRequestList.measurementUnitId) {
          this.addPurchaseRequestList.measurementUnit = x.name;
        }
      });
      this.purchaserequesList.unshift(this.addPurchaseRequestList);
    }
    this.items = "";
    this.addPurchaseRequestList = new AddPurchaseRequestListDto();
  }


}