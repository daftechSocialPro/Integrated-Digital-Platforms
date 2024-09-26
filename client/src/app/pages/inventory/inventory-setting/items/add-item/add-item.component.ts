import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CategoryListDto } from 'src/app/model/Inventory/CategoryDto';
import { AddItemDto } from 'src/app/model/Inventory/ItemDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit{
 
  category: CategoryListDto[] = [];
  measurementType: any[] = [
    { value: 0, name: "LENGTH" },
    { value: 1, name: "MASS" },
    { value: 2, name: "VOLUME" },
    { value: 3, name: "PIECE" },
  ]

  stateType: any[] = [
    { value: 0, name: "SOLID" },
    { value: 1, name: "LIQUID" },
    { value: 2, name: "GAS" },
  ]

  addItem: AddItemDto = new AddItemDto();
  constructor(private inventoryService: InventoryService,
             private messageService: MessageService,
             private activeModal: NgbActiveModal){

  }
 
  ngOnInit(): void {
    this.getCategoryDropDown();
  }

  getCategoryDropDown(){
    this.inventoryService.getCategoryList().subscribe({
      next: (res) => {
         this.category = res;
         
      }
    });
  }

  
  saveItem() {
    if (this.addItem.id) {
      this.inventoryService.updateItem(this.addItem).subscribe({
        next: (res) => {
          if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Updated', life: 3000 });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
          }
        },error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
     
    }
    else {
      this.inventoryService.addItem(this.addItem).subscribe({
        next: (res) => {
          if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Created', life: 3000 });
          this.addItem = new AddItemDto();
          this.closeModal();
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
        },error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
    }
  
  }

  closeModal(){
    this.activeModal.close();
    this.addItem = new AddItemDto();
  }

}
