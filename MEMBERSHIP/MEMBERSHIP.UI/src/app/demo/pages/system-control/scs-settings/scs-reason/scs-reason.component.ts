import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddScsReasonComponent } from './add-scs-reason/add-scs-reason.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-scs-reason',
  templateUrl: './scs-reason.component.html',
  styleUrls: ['./scs-reason.component.scss']
})
export class ScsReasonComponent implements OnInit {

  SCReasons:IGeneralSettingDto[]
  selectedReason:string
  Reasons=[
    {value:'BILLVOIDINVESTIGATE',name:'Investigation',},
    {value:'RECONNECTREASON',name:'Reconnect'},
    {value:'METERCHANGEREASON',name:'Meter Change'},
    {value:'METERTERMINATEREASON',name:'Terminate'},
    {value:'BILLPENALITY',name:'Penality'},
    {value:'BillUnsoldReason',name:'Unsold'},
    {value:'BILLVOIDREASON',name:'Void'}]
  ngOnInit(): void {

    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getSCReasons(reason:string){
    this.selectedReason = reason

    this.controlService.getGeneralSetting(reason).subscribe({
      next:(res)=>{
        this.SCReasons = res 
      }
    })
  }

  addSCReason(){


    let modalRef = this.modalService.open(AddScsReasonComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getSCReasons(this.selectedReason)
    })

  }

  removeSCReason(SCReasonId:string) {

    console.log(SCReasonId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this SCReason?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(SCReasonId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getSCReasons(this.selectedReason)
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

  
  updateSCReason(SCReason:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddScsReasonComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.SCReason=SCReason

    modalRef.result.then(()=>{
      this.getSCReasons(this.selectedReason)
    })

  }

}
