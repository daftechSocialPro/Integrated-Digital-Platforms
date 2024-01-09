import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AddVendorDto, VendorListDto } from 'src/app/model/Inventory/VendorDto';
import { CountryGetDto } from 'src/app/model/configuration/IAddressDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { AddVendorComponent } from './add-vendor/add-vendor.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements  OnInit  {
  submitted: boolean = false;
  vendorList: VendorListDto[] = [];
 

  addVendor: AddVendorDto = new AddVendorDto();

  rowsPerPageOptions = [5, 10, 20];

  constructor(private inventoryService: InventoryService, private messageService: MessageService,
              private generalConfigService: ConfigurationService, private modalService: NgbModal) { }

  ngOnInit() {
      this.getVendorList();

  }


  getVendorList(){
    this.inventoryService.getVendors().subscribe({
      next: (res) => {
         this.vendorList = res;
      }
    });
  }




  openNew() {
    let modalRef = this.modalService.open(AddVendorComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(()=>{
      this.getVendorList();
    })

    
  }

  editVendor(vendor: VendorListDto) {
    let modalRef = this.modalService.open(AddVendorComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.vendor = vendor
    modalRef.result.then(() => {
      this.getVendorList();
    });
  }



  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.vendorList.length; i++) {
          if (this.vendorList[i].id === id) {
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