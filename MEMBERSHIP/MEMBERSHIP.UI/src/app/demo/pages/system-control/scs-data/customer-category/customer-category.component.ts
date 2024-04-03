import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { AddCustomerCategoryComponent } from './add-customer-category/add-customer-category.component';

@Component({
  selector: 'app-customer-category',
  templateUrl: './customer-category.component.html',
  styleUrls: ['./customer-category.component.scss']
})
export class CustomerCategoryComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  CustomerCategories:ICustomerCategoryDto[];
  paginatedCustomerCategories : ICustomerCategoryDto[];

  ngOnInit(): void {
    this.getCustomerCategoriess()    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getCustomerCategoriess(){

    this.controlService.getCustomerCategory().subscribe({
      next:(res)=>{
        this.CustomerCategories = res 

        this.paginateCustomerCategories()
      }
    })
  }

  addCustomerCategories(){


    let modalRef = this.modalService.open(AddCustomerCategoryComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getCustomerCategoriess()
    })

  }

  removeCustomerCategories(CustomerCategoriesId:number) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Customer Category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteCustomerCategory(CustomerCategoriesId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getCustomerCategoriess()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });

  }

  
  updateCustomerCategories(CustomerCategories:ICustomerCategoryDto){


    let modalRef = this.modalService.open(AddCustomerCategoryComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.CustomerCategory=CustomerCategories

    modalRef.result.then(()=>{
      this.getCustomerCategoriess()
    })

  }




  onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginateCustomerCategories();
  }

  
  paginateCustomerCategories() {
    this.paginatedCustomerCategories = this.CustomerCategories.slice(this.first, this.first + this.rows);
  }
}
