import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { AddMeterTypeComponent } from './add-meter-type/add-meter-type.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-meter-type',
  templateUrl: './meter-type.component.html',
  styleUrls: ['./meter-type.component.scss']
})
export class MeterTypeComponent  implements OnInit {

  MeterTypes:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getMeterTypes()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getMeterTypes(){

    this.controlService.getGeneralSetting("METERTYPE").subscribe({
      next:(res)=>{
        this.MeterTypes = res 
      }
    })
  }

  addMeterType(){


    let modalRef = this.modalService.open(AddMeterTypeComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getMeterTypes()
    })

  }

  removeMeterType(MeterTypeId:string) {


    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Meter Type?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(MeterTypeId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMeterTypes()
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

  
  updateMeterType(MeterType:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddMeterTypeComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.MeterType=MeterType

    modalRef.result.then(()=>{
      this.getMeterTypes()
    })

  } 

}
