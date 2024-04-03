import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddMeterDigitComponent } from './add-meter-digit/add-meter-digit.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-meter-digit',
  templateUrl: './meter-digit.component.html',
  styleUrls: ['./meter-digit.component.scss']
})
export class MeterDigitComponent implements OnInit {

    MeterDigits:IGeneralSettingDto[]
    ngOnInit(): void {
  
      this.getMeterDigits()
      
    }
  
    constructor(
      private modalService : NgbModal,
      private confirmationService: ConfirmationService,
      private messageService : MessageService,
      private controlService:ScsDataService){}
  
  
    getMeterDigits(){
  
      this.controlService.getGeneralSetting("METERDIGIT").subscribe({
        next:(res)=>{
          this.MeterDigits = res 
        }
      })
    }
  
    addMeterDigit(){
  
  
      let modalRef = this.modalService.open(AddMeterDigitComponent,  {size:'lg',backdrop:'static'})
  
      modalRef.result.then(()=>{
        this.getMeterDigits()
      })
  
    }
  
    removeMeterDigit(MeterDigitId:string) {

      this.confirmationService.confirm({
        message: 'Are You sure you want to delete this MeterDigit?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.controlService.deleteGeneralSetting(MeterDigitId).subscribe({
            next: (res) => {
  
              if (res.success) {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
                this.getMeterDigits()
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
  
    
    updateMeterDigit(MeterDigit:IGeneralSettingDto){
  
  
      let modalRef = this.modalService.open(AddMeterDigitComponent,  {size:'lg',backdrop:'static'})
  
      modalRef.componentInstance.MeterDigit=MeterDigit
  
      modalRef.result.then(()=>{
        this.getMeterDigits()
      })
  
    }

}






