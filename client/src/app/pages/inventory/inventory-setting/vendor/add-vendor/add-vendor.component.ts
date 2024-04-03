import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { CategoryListDto } from 'src/app/model/Inventory/CategoryDto';
import { AddVendorDto, VendorListDto } from 'src/app/model/Inventory/VendorDto';
import { CountryGetDto } from 'src/app/model/configuration/IAddressDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit{
 
@Input() vendor :VendorListDto;
 addVendor: AddVendorDto = new AddVendorDto();
 countryList: CountryGetDto[] = [];

 constructor(private inventoryService: InventoryService, private messageService: MessageService,
              private generalConfigService: ConfigurationService,private activeModal: NgbActiveModal){}
 
  ngOnInit(): void {
    this.getCountryDropDown();
  }

  getCountryDropDown(){
    this.generalConfigService.getCountries().subscribe({
      next: (res) => {
         this.countryList = res;
         if(this.vendor && this.vendor.id){
          this.addVendor = {
              address: this.vendor.address,
              countryId: this.countryList.find(x => this.vendor.countryName == x.countryName).id,
              email: this.vendor.email,
              id: this.vendor.id,
              name: this.vendor.name,
              phoneNumber: this.vendor.phoneNumber,
              tinNumber: this.vendor.tinNumber,
              createdById: ""
          };
        }
      }
    });
  }

  saveVendor() {

      if (this.addVendor.id) {
      this.inventoryService.updateVendor(this.addVendor).subscribe({
        next: (res) => {
          if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Updated', life: 3000 });
          this.closeModal()
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
      this.inventoryService.addVendor(this.addVendor).subscribe({
        next: (res) => {
          if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vendor Created', life: 3000 });
          this.closeModal()
    
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
        },error: (res) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
        }
      });
    }
    this.closeModal();
  }


  closeModal() {
    this.addVendor = new AddVendorDto();
    this.activeModal.close();
  }

}
