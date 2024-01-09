import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddStoreRequestDto, AddStoreRequestListDto } from 'src/app/model/Inventory/StoreRequestDto';
import { ItemDropDownDto, SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store-request',
  templateUrl: './store-request.component.html',
  styleUrls: ['./store-request.component.css']
})
export class StoreRequestComponent implements OnInit {

  employeeList: SelectList[] = [];
  filteredEmployees: SelectList[] = [];
  employeeField: any;
  items: any;
  addStoreRequest: AddStoreRequestDto = new AddStoreRequestDto();
  currentUser: UserView;

  storeRequestList: AddStoreRequestListDto[] = [];

  addStoreRequestList: AddStoreRequestListDto = new AddStoreRequestListDto();

  branchListDropDown: SelectList[] = [];
  itemsDropDown: ItemDropDownDto[] = [];
  measurementUnitDropDown: SelectList[] = [];


  constructor(private dropDownService: DropDownService, private inventoryService: InventoryService,
    private messageService: MessageService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()

    this.getItems();
  }

  getItems() {
    this.dropDownService.getItemsDropDown().subscribe({
      next: (res) => {
        this.itemsDropDown = res;
      }
    })
  }



  changeItem(event: any) {
    this.addStoreRequestList.itemName = event.value.name;
    this.addStoreRequestList.itemId = event.value.id;
    this.dropDownService.getMeasurementUnitByType(event.value.measurementType).subscribe({
      next: (res) => {
        this.measurementUnitDropDown = res;
      }
    })
  }

  getSelectedValue(event: any) {
    if (event.id) {
      this.addStoreRequest.requesterEmployeeId = event.id;
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

  saveStore() {
    if (this.storeRequestList.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please add atleast one item', life: 3000 });
    }
    else {
      this.addStoreRequest.requestLists = this.storeRequestList;
      this.addStoreRequest.requesterEmployeeId = this.currentUser.employeeId;
      this.inventoryService.addStoreRequest(this.addStoreRequest).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Created', life: 3000 });
            this.storeRequestList = [];
            this.employeeField = "";
            this.addStoreRequest = new AddStoreRequestDto();
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
    this.storeRequestList = this.storeRequestList.filter(x => x.itemId != itemId);
  }



  newRow() {
    if (this.addStoreRequestList.itemId) {
      this.measurementUnitDropDown.some(x => {
        if (x.id == this.addStoreRequestList.measurementUnitId) {
          this.addStoreRequestList.measurementUnit = x.name;
        }
      });
      this.storeRequestList.unshift(this.addStoreRequestList);
    }
    this.items = "";
    this.addStoreRequestList = new AddStoreRequestListDto();
  }


}
