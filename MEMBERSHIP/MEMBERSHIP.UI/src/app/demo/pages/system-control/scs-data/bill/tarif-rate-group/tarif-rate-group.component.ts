import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { AddTarifRateGroupComponent } from './add-tarif-rate-group/add-tarif-rate-group.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-tarif-rate-group',
  templateUrl: './tarif-rate-group.component.html',
  styleUrls: ['./tarif-rate-group.component.scss']
})
export class TarifRateGroupComponent  implements OnInit {

  TarifRateGroups:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getTarifRateGroups()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getTarifRateGroups(){

    this.controlService.getGeneralSetting("TARIFFRATEGROUP").subscribe({
      next:(res)=>{
        this.TarifRateGroups = res 
      }
    })
  }

  addTarifRateGroup(){


    let modalRef = this.modalService.open(AddTarifRateGroupComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getTarifRateGroups()
    })

  }

  removeTarifRateGroup(TarifRateGroupId:string) {

   
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Trif Rate Group?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(TarifRateGroupId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getTarifRateGroups()
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

  
  updateTarifRateGroup(TarifRateGroup:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddTarifRateGroupComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.TarifRateGroup=TarifRateGroup

    modalRef.result.then(()=>{
      this.getTarifRateGroups()
    })

  } 
}