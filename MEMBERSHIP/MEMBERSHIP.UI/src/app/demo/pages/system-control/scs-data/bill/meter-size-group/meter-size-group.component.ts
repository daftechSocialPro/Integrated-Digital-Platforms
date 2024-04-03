import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { AddMeterSizeGroupComponent } from './add-meter-size-group/add-meter-size-group.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-meter-size-group',
  templateUrl: './meter-size-group.component.html',
  styleUrls: ['./meter-size-group.component.scss']
})
export class MeterSizeGroupComponent implements OnInit {

  MeterSizeGroups:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getMeterSizeGroups()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getMeterSizeGroups(){

    this.controlService.getGeneralSetting("METERRATEGROUP").subscribe({
      next:(res)=>{
        this.MeterSizeGroups = res 
      }
    })
  }

  addMeterSizeGroup(){


    let modalRef = this.modalService.open(AddMeterSizeGroupComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getMeterSizeGroups()
    })

  }

  removeMeterSizeGroup(MeterSizeGroupId:string) {

    
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this MeterSizeGroup?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(MeterSizeGroupId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMeterSizeGroups()
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

  
  updateMeterSizeGroup(MeterSizeGroup:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddMeterSizeGroupComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.MeterSizeGroup=MeterSizeGroup

    modalRef.result.then(()=>{
      this.getMeterSizeGroups()
    })

  }

}
