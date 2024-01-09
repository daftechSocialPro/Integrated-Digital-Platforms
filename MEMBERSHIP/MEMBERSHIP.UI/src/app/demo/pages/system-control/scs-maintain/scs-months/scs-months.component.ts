import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';
import { AddMonthsComponent } from './add-months/add-months.component';

@Component({
  selector: 'app-scs-months',
  templateUrl: './scs-months.component.html',
  styleUrls: ['./scs-months.component.scss']
})
export class ScsMonthsComponent implements OnInit {

  FiscalMonths:IFiscalMonthDto[]
  first: number = 0;
  rows: number = 5;
  paginationFiscalMonth:IFiscalMonthDto[];
  ngOnInit(): void {

    this.getFiscalMonths()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}


  getFiscalMonths(){

    this.controlService.getFiscalMonth().subscribe({
      next:(res)=>{
        this.FiscalMonths = res 
        this.paginatedFiscalMonth()
      }
    })
  }

  
  

  removeFiscalMonth(FiscalMonthId:number) {

    console.log(FiscalMonthId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Consumption Level?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteFiscalMonth(FiscalMonthId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getFiscalMonths()
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

  
  updateFiscalMonth(FiscalMonth:IFiscalMonthDto){


    let modalRef = this.modalService.open(AddMonthsComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.FiscalMonth=FiscalMonth

    modalRef.result.then(()=>{
      this.getFiscalMonths()
    })

  }


   
  onPageChange(event: any ) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginatedFiscalMonth();
  }
  paginatedFiscalMonth() {
    this.paginationFiscalMonth= this.FiscalMonths.slice(this.first, this.first + this.rows);
  }



}
