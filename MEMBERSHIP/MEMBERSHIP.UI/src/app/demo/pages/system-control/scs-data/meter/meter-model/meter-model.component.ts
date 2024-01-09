import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddMeterModelComponent } from './add-meter-model/add-meter-model.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-meter-model',
  templateUrl: './meter-model.component.html',
  styleUrls: ['./meter-model.component.scss']
})
export class MeterModelComponent  implements OnInit {

  MeterModels:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getMeterModels()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getMeterModels(){

    this.controlService.getGeneralSetting("METERMODEL").subscribe({
      next:(res)=>{
        this.MeterModels = res 
      }
    })
  }

  addMeterModel(){


    let modalRef = this.modalService.open(AddMeterModelComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getMeterModels()
    })

  }

  removeMeterModel(MeterModelId:string) {

    console.log(MeterModelId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this MeterModel?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(MeterModelId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMeterModels()
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

  
  updateMeterModel(MeterModel:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddMeterModelComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.MeterModel=MeterModel

    modalRef.result.then(()=>{
      this.getMeterModels()
    })

  }
}
