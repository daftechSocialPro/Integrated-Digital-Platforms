import { Component, OnInit } from '@angular/core';
import { ICustomerGetDto } from 'src/models/customer-service/ICustomerGetDto';
import { AddCountryComponent } from './add-country/add-country.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { AddCustomerCategoryComponent } from '../../../system-control/scs-data/customer-category/add-customer-category/add-customer-category.component';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ICountryGetDto } from 'src/models/configuration/ILocatoinDto';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  Country:ICountryGetDto[];
  paginatedCountry : ICountryGetDto[];

  ngOnInit(): void {
    this.getCountrys()    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ConfigurationService){}


  getCountrys(){

    this.controlService.getCountries().subscribe({
      next:(res)=>{
        this.Country = res 

        this.paginateCountry()
      }
    })
  }

  addCountry(){


    let modalRef = this.modalService.open(AddCountryComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getCountrys()
    })

  }

  removeCountry(CountryId:string) {

    console.log(CountryId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Country?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteCountry(CountryId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getCountrys()
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

  
  updateCountry(Country:ICountryGetDto){


    let modalRef = this.modalService.open(AddCountryComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.Country=Country

    modalRef.result.then(()=>{
      this.getCountrys()
    })

  }




  onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginateCountry();
  }

  
  paginateCountry() {
    this.paginatedCountry = this.Country.slice(this.first, this.first + this.rows);
  }
}
