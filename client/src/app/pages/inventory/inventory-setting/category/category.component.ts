import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {  CategoryListDto } from 'src/app/model/Inventory/CategoryDto';
import { InventoryService } from 'src/app/services/inventory.service';
import { AddItemCategoryComponent } from './add-item-category/add-item-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit  {
  
  submitted: boolean = false;
  categoryList: CategoryListDto[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private inventoryService: InventoryService,
             private messageService: MessageService,
             private modalService: NgbModal ) { }

  ngOnInit() {
    this.getCategories();
  }


  getCategories(){
    this.inventoryService.getCategoryList().subscribe({
      next: (res) => {
         this.categoryList = res;
      }
    });
  }

  openNew() {
    let modalRef = this.modalService.open(AddItemCategoryComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      
    });
    this.getCategories();
  }

  editCategory(addCategory: CategoryListDto) {
    let modalRef = this.modalService.open(AddItemCategoryComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.category = addCategory
    modalRef.result.then(() => {
      this.getCategories();
    });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryList[i].id === id) {
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