import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { AddCategoryDto, CategoryListDto } from 'src/app/model/Inventory/CategoryDto';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrls: ['./add-item-category.component.css']
})
export class AddItemCategoryComponent implements OnInit {
  
  @Input() category :CategoryListDto;
  submitted: boolean = false;
  popupDialog: boolean = false;
  
  addCategory: AddCategoryDto = new AddCategoryDto();

  rowsPerPageOptions = [5, 10, 20];

  constructor(private inventoryService: InventoryService, 
              private messageService: MessageService,
              private activeModal: NgbActiveModal){
  }
  
  ngOnInit(): void {
      if(this.category && this.category.id){
        this.addCategory = {
          id: this.category.id,
          name: this.category.name,
          description: this.category.description,
          rowStatus: 0,
          categoryType: this.category.categoryType == "RAW_MATERIAL" ? 0 : this.category.categoryType == "ASSET" ? 1 : 2,
          createdById: ""
        }
      }
  }

  saveCategory() {
    this.submitted = true;
    if (this.addCategory.id) {
      this.inventoryService.updateCategory(this.addCategory).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Updated', life: 3000 });
        }
      });

    }
    else {
      this.inventoryService.addCategory(this.addCategory).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Created', life: 3000 });
            this.popupDialog = false;
            this.addCategory = {
              id: "",
              categoryType: -1,
              createdById: "",
              description: "",
              name: "",
              rowStatus: 0
            };
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Check Your Fields', life: 3000 });
          }
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Check Your Fields', life: 3000 });
        }
      });

    }
    this.closeModal();
  }

  closeModal() {
    this.addCategory = new AddCategoryDto();
    this.activeModal.close();
  }

}
