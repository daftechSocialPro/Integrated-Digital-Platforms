import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IZoneGetDto } from 'src/models/configuration/ILocatoinDto';
import { AddZoneComponent } from './add-zone/add-zone.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  Zone:IZoneGetDto[];
  paginatedZone : IZoneGetDto[];

  ngOnInit(): void {
    this.getZones()    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,

    private controlService:ConfigurationService){}


  getZones(){

    this.controlService.getZones().subscribe({
      next:(res)=>{
        this.Zone = res 

        this.paginateZone()
      }
    })
  }

  addZone(){


    let modalRef = this.modalService.open(AddZoneComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getZones()
    })

  }

  removeZone(ZoneId:string) {

    console.log(ZoneId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Zone?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteZone(ZoneId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getZones()
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

  
  updateZone(Zone:IZoneGetDto){


    let modalRef = this.modalService.open(AddZoneComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.Zone=Zone

    modalRef.result.then(()=>{
      this.getZones()
    })

  }




  onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginateZone();
  }

  
  paginateZone() {
    this.paginatedZone = this.Zone.slice(this.first, this.first + this.rows);
  }
}
