import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { AddConsTariffComponent } from './add-cons-tariff/add-cons-tariff.component';
import { IConsumptionTariffDto } from 'src/models/system-control/IConsumptionTariffDto';

@Component({
  selector: 'app-cons-tariff',
  templateUrl: './cons-tariff.component.html',
  styleUrls: ['./cons-tariff.component.scss']
})
export class ConsTariffComponent implements OnInit {

  @Input() isFromDashboard:boolean=false
  @Input() isFromCurrentMeterTariff:boolean=false
  searchText: string []= [];
  first: number = 0;
  rows: number = 5;
  totlRecords: number = 0;
  ConsumptionTariffs:IConsumptionTariffDto[]
  paginationconstariff:IConsumptionTariffDto[];
  filteredTariff:IConsumptionTariffDto[]=[]
  distinctRentGroupCodes: string[]=[];
  ngOnInit(): void {

    this.getConsumptionTariffs()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}

    
    filter(value:string){
      // this.paginationMeterRate= this.paginationMeterRate.filter((item)=>item.rentGroupCode==value)

      if (value || this.searchText.length>0) {
        this.filteredTariff = this.ConsumptionTariffs.filter((item) =>
          item.rateGroupCode.toLowerCase().includes(value.toLocaleLowerCase()) ||
          this.searchText.some((searchTerm)=>item.rateGroupCode.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())));
      }
      else{
        this.filteredTariff=this.ConsumptionTariffs;
      }
      this.first=0;
      this.onPageChange({first:this.first,rows:this.rows},this.filteredTariff)
     // Update pagination when the search text changes
    }


  getConsumptionTariffs(){

    this.controlService.getConsumptionTariffs().subscribe({
      next:(res)=>{
        console.log(res)
        this.ConsumptionTariffs = res 
        this.distinctRentGroupCodes = [...new Set(res.map(record => record.rateGroupCode))];

        this.paginatedConsumptionTariff(this.ConsumptionTariffs)
      }
    })
  }

  addConsumptionTariff(){


    let modalRef = this.modalService.open(AddConsTariffComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getConsumptionTariffs()
    })

  }

  removeConsumptionTariff(ConsumptionTariffId:number) {

    console.log(ConsumptionTariffId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Consumption Tariff?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteConsumptionTariff(ConsumptionTariffId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getConsumptionTariffs()
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

  
  updateConsumptionTariff(ConsumptionTariffId:number){


    let modalRef = this.modalService.open(AddConsTariffComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.recordNo=ConsumptionTariffId

    modalRef.result.then(()=>{
      this.getConsumptionTariffs()
    }) 
   }
  
   onPageChange(event: any, gInterface?: IConsumptionTariffDto[]) {
    this.first = event.first;
  this.rows = event.rows;
  if (gInterface) {
    this.paginatedConsumptionTariff(gInterface)
  } else {
    this.paginatedConsumptionTariff(this.ConsumptionTariffs);
  }
}
paginatedConsumptionTariff(ginterfces: IConsumptionTariffDto[]) {
  this.totlRecords = ginterfces.length
  this.paginationconstariff = ginterfces.slice(this.first, this.first + this.rows);
}

}
