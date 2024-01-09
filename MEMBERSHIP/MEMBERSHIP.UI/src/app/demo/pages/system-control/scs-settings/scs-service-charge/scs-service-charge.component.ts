import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { AddScsServicchargeComponent } from './add-scs-serviccharge/add-scs-serviccharge.component';

@Component({
  selector: 'app-scs-service-charge',
  templateUrl: './scs-service-charge.component.html',
  styleUrls: ['./scs-service-charge.component.scss']
})
export class ScsServiceChargeComponent implements  OnInit {

  ServiceCharges:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getServiceCharges()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getServiceCharges(){

    this.controlService.getGeneralSetting("SERVICECHARGENAME").subscribe({
      next:(res)=>{
        this.ServiceCharges = res 
      }
    })
  }

  addServiceCharge(){


    let modalRef = this.modalService.open(AddScsServicchargeComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getServiceCharges()
    })

  }

  removeServiceCharge(ServiceChargeId:string) {

    console.log(ServiceChargeId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this ServiceCharge?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(ServiceChargeId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getServiceCharges()
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

  
  updateServiceCharge(ServiceCharge:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddScsServicchargeComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.ServiceCharge=ServiceCharge

    modalRef.result.then(()=>{
      this.getServiceCharges()
    })

  }
}