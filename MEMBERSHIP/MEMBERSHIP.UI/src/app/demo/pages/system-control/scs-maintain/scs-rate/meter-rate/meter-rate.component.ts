import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { AddMeterRateComponent } from './add-meter-rate/add-meter-rate.component';
import { IMeterSizeRentDto } from 'src/models/system-control/IMeterSizeRentDto';

@Component({
  selector: 'app-meter-rate',
  templateUrl: './meter-rate.component.html',
  styleUrls: ['./meter-rate.component.scss']
})
export class MeterRateComponent implements OnInit {

@Input() isFromDashboard:boolean=false
@Input() isFromCurrentMeterRate:boolean=false

  MeterRates:IMeterSizeRentDto[]
  // selectedGroup: string = ''
  searchText: string []= [];
  first: number = 0;
  rows: number = 5;
  totlRecords: number = 0;
  paginationMeterRate:IMeterSizeRentDto[];
  filterdMeterRate:IMeterSizeRentDto[]=[];
  distinctRentGroupCodes: string[]=[];

  ngOnInit(): void {

    this.getMeterRates()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}



    filter(value:string){
      // this.paginationMeterRate= this.paginationMeterRate.filter((item)=>item.rentGroupCode==value)

      if (value || this.searchText.length>0) {
        this.filterdMeterRate = this.MeterRates.filter((item) =>
          item.rentGroupCode.toLowerCase().includes(value.toLocaleLowerCase()) ||
          this.searchText.some((searchTerm)=>item.rentGroupCode.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())));
      }
      else{
        this.filterdMeterRate=this.MeterRates;
      }
      this.first=0;
      this.onPageChange({first:this.first,rows:this.rows},this.filterdMeterRate)
     // Update pagination when the search text changes
    }



  getMeterRates(){

    this.controlService.getMeterSizeRents().subscribe({
      next:(res)=>{
        console.log(res)
        this.MeterRates = res 
        this.distinctRentGroupCodes = [...new Set(res.map(record => record.rentGroupCode))];
        this.paginatedMeterRate(this.MeterRates)
      }
    })
  }

  addMeterRate(){


    let modalRef = this.modalService.open(AddMeterRateComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getMeterRates()
    })

  }

  removeMeterRate(MeterRateId:number) {

    console.log(MeterRateId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Meter Size Rate?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteMetersizeRent(MeterRateId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getMeterRates()
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

  
  updateMeterRate(MeterRateId:number){


    let modalRef = this.modalService.open(AddMeterRateComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.recordNo=MeterRateId

    modalRef.result.then(()=>{
      this.getMeterRates()
    })  }


    onPageChange(event: any, gInterface?: IMeterSizeRentDto[]) {
      this.first = event.first;
    this.rows = event.rows;
    if (gInterface) {
      this.paginatedMeterRate(gInterface)
    } else {
      this.paginatedMeterRate(this.MeterRates);
    }
  }
  paginatedMeterRate(ginterfces: IMeterSizeRentDto[]) {
    this.totlRecords = ginterfces.length
    this.paginationMeterRate = ginterfces.slice(this.first, this.first + this.rows);
  }


}
