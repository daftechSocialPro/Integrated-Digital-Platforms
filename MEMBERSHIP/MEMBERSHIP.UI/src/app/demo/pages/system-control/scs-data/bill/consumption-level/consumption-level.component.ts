import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddConsumptionLevelComponent } from './add-consumption-level/add-consumption-level.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { IConsumptionLevelDto } from 'src/models/system-control/IConsumptionLevelDto';

@Component({
  selector: 'app-consumption-level',
  templateUrl: './consumption-level.component.html',
  styleUrls: ['./consumption-level.component.scss']
})
export class ConsumptionLevelComponent implements OnInit {

  ConsumptionLevels:IConsumptionLevelDto[]
  ngOnInit(): void {

    this.getConsumptionLevels()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getConsumptionLevels(){

    this.controlService.getConsumptionLevel().subscribe({
      next:(res)=>{
        this.ConsumptionLevels = res 
      }
    })
  }

  addConsumptionLevel(){


    let modalRef = this.modalService.open(AddConsumptionLevelComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getConsumptionLevels()
    })

  }

  removeConsumptionLevel(ConsumptionLevelId:number) {

    console.log(ConsumptionLevelId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Consumption Level?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteConsumptionLevel(ConsumptionLevelId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getConsumptionLevels()
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

  
  updateConsumptionLevel(ConsumptionLevel:IConsumptionLevelDto){


    let modalRef = this.modalService.open(AddConsumptionLevelComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.ConsumptionLevel=ConsumptionLevel

    modalRef.result.then(()=>{
      this.getConsumptionLevels()
    })

  }


}
