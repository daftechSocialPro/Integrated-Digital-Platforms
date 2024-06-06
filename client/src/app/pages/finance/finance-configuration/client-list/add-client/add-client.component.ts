import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddClientDto, ClientsListDto } from 'src/app/model/Finance/IFinanceSettingDto';
import { CountryGetDto } from 'src/app/model/configuration/IAddressDto';
import { UserView } from 'src/app/model/user';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { FinanceService } from 'src/app/services/finance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent  implements OnInit{
 
   @Input() client :ClientsListDto;
   addClient: AddClientDto = new AddClientDto();
   countryList: CountryGetDto[] = [];
   user!: UserView
  
   constructor(
    private financeService: FinanceService, 
    private messageService: MessageService,
    private generalConfigService: ConfigurationService,
    private activeModal: NgbActiveModal,
    private userService: UserService,
  ){}
   
    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.getCountryDropDown();
    }
  
    getCountryDropDown(){
      this.generalConfigService.getCountries().subscribe({
        next: (res) => {
           this.countryList = res;
           if(this.client && this.client.id){
            this.addClient = {
                address: this.client.address,
                countryId: this.countryList.find(x => this.client.countryName == x.countryName).id,
                emailAddress: this.client.emailAddress,
                id: this.client.id,
                name: this.client.name,
                phoneNumber: this.client.phoneNumber,
                tinNumber: this.client.tinNumber,
                typeOfCustomer: 1,
                createdById: ""
            };
          }
        }
      });
    }
  
    saveVendor() {
  
        if (this.addClient.id) {
        this.financeService.updateClient(this.addClient).subscribe({
          next: (res) => {
            if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
            this.closeModal()
            }
            else{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
            }
          },error: (res) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
          }
        });
       
      }
      else {
        this.addClient.createdById = this.user.userId
        this.financeService.addClient(this.addClient).subscribe({
          next: (res) => {
            if(res.success){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message, life: 3000 });
            this.closeModal()
      
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message, life: 3000 });
          }
          },error: (res) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error please check your fields', life: 3000 });
          }
        });
      }
      //this.closeModal();
    }
  
  
    closeModal() {
      this.addClient = new AddClientDto();
      this.activeModal.close();
    }
  
  }
