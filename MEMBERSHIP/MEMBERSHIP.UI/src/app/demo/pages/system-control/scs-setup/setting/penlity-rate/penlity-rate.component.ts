import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IPenalityRateDto } from 'src/models/system-control/IPenalityRateDto';
import { AddPenalityRateComponent } from './add-penality-rate/add-penality-rate.component';

@Component({
  selector: 'app-penlity-rate',
  templateUrl: './penlity-rate.component.html',
  styleUrls: ['./penlity-rate.component.scss']
})
export class PenlityRateComponent implements OnInit {

  PenalityRates:IPenalityRateDto[]
  first: number = 0;
  rows: number = 5;
  paginationPenalityRate:IPenalityRateDto[];
  ngOnInit(): void {

    this.getPenalityRates()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getPenalityRates(){

    this.controlService.getPenalityRates().subscribe({
      next:(res)=>{
        console.log(res)
        this.PenalityRates = res 
        this.paginatedPenalityRate()
      }
    })
  }

  addPenalityRate(){


    let modalRef = this.modalService.open(AddPenalityRateComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getPenalityRates()
    })

  }

  removePenalityRate(PenalityRateId:number) {

    console.log(PenalityRateId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Penality Rate?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deletePenalityRate(PenalityRateId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getPenalityRates()
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

  
  updatePenalityRate(PenalityRateId:number){


    let modalRef = this.modalService.open(AddPenalityRateComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.recordNo=PenalityRateId

    modalRef.result.then(()=>{
      this.getPenalityRates()
    })  }


    onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginatedPenalityRate();
    }
    paginatedPenalityRate() {
      this.paginationPenalityRate= this.PenalityRates.slice(this.first, this.first + this.rows);
    }
  

  

}
