import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddWaterSourceComponent } from './add-water-source/add-water-source.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-water-source',
  templateUrl: './water-source.component.html',
  styleUrls: ['./water-source.component.scss']
})
export class WaterSourceComponent implements OnInit {

  WaterSources:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getWaterSources()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getWaterSources(){

    this.controlService.getGeneralSetting("SOURCEOFWATER").subscribe({
      next:(res)=>{
        this.WaterSources = res 
      }
    })
  }

  addWaterSource(){


    let modalRef = this.modalService.open(AddWaterSourceComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getWaterSources()
    })

  }

  removeWaterSource(WaterSourceId:string) {


    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Water Source?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(WaterSourceId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getWaterSources()
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

  
  updateWaterSource(WaterSource:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddWaterSourceComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.WaterSource=WaterSource

    modalRef.result.then(()=>{
      this.getWaterSources()
    })

  }

}
