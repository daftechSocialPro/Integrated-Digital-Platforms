import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { AddCountryOriginComponent } from './add-country-origin/add-country-origin.component';

@Component({
  selector: 'app-country-origin',
  templateUrl: './country-origin.component.html',
  styleUrls: ['./country-origin.component.scss']
})
export class CountryOriginComponent implements OnInit {

  CountyOrgins:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getCountyOrgins()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getCountyOrgins(){

    this.controlService.getGeneralSetting("COUNTRYORIGIN").subscribe({
      next:(res)=>{
        this.CountyOrgins = res 
      }
    })
  }

  addCountyOrgin(){


    let modalRef = this.modalService.open(AddCountryOriginComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getCountyOrgins()
    })

  }

  removeCountyOrgin(CountyOrginId:string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this CountyOrgin?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(CountyOrginId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getCountyOrgins()
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

  
  updateCountyOrgin(CountyOrgin:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddCountryOriginComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.CountyOrgin=CountyOrgin

    modalRef.result.then(()=>{
      this.getCountyOrgins()
    })

  }
}