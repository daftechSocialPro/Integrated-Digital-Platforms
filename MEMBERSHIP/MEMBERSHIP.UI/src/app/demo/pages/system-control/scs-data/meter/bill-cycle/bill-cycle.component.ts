import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

import { AddBillCycleComponent } from './add-bill-cycle/add-bill-cycle.component';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-bill-cycle',
  templateUrl: './bill-cycle.component.html',
  styleUrls: ['./bill-cycle.component.scss']
})
export class BillCycleComponent implements OnInit {

  BillCycles:IGeneralSettingDto[]
  ngOnInit(): void {

    this.getBillCycles()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getBillCycles(){

    this.controlService.getGeneralSetting("BOOK NUMBER").subscribe({
      next:(res)=>{
        this.BillCycles = res 
      }
    })
  }

  addBillCycle(){


    let modalRef = this.modalService.open(AddBillCycleComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getBillCycles()
    })

  }

  removeBillCycle(BillCycleId:string) {

    console.log(BillCycleId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this BillCycle?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralSetting(BillCycleId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getBillCycles()
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

  
  updateBillCycle(BillCycle:IGeneralSettingDto){


    let modalRef = this.modalService.open(AddBillCycleComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.BillCycle=BillCycle

    modalRef.result.then(()=>{
      this.getBillCycles()
    })

  }
}
