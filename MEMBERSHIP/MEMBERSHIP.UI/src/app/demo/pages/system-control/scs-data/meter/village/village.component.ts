import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddVillageComponent } from './add-village/add-village.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {

  Villages:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getVillages()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getVillages(){

    this.controlService.getGeneralSetting("Village").subscribe({
      next:(res)=>{
        this.Villages = res 
      }
    })
  }

  addVillage(){


    let modalRef = this.modalService.open(AddVillageComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getVillages()
    })

  }

  removeVillage(VillageId:string) {

  
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Village?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(VillageId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getVillages()
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

  
  updateVillage(Village:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddVillageComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.Village=Village

    modalRef.result.then(()=>{
      this.getVillages()
    })

  }
}
