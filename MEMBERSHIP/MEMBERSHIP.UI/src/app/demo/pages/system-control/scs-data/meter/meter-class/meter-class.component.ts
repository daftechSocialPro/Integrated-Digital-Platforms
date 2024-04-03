import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { AddMeterClassComponent } from './add-meter-class/add-meter-class.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-meter-class',
  templateUrl: './meter-class.component.html',
  styleUrls: ['./meter-class.component.scss']
})
export class MeterClassComponent  implements OnInit {

  MeterClasses:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getMeterClasses()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getMeterClasses(){

    this.controlService.getGeneralSetting("METERCLASS").subscribe({
      next:(res)=>{
        this.MeterClasses = res 
      }
    })
  }

  addMeterClass(){


    let modalRef = this.modalService.open(AddMeterClassComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getMeterClasses()
    })

  }

  removeMeterClass(MeterClassId:string) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Meter Class?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(MeterClassId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMeterClasses()
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

  
  updateMeterClass(MeterClass:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddMeterClassComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.MeterClass=MeterClass

    modalRef.result.then(()=>{
      this.getMeterClasses()
    })

  } 

}
