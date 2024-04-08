import { Component, OnInit } from '@angular/core';
import { AddUserMessageComponent } from './add-user-message/add-user-message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralInterfceDto } from 'src/models/system-control/IGeneralInterfaceDto';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.scss']
})
export class UserMessageComponent implements OnInit {

  GeneralInterfaces: IGeneralInterfceDto[]
  
  filterdInterface:IGeneralInterfceDto[]=[]
  totlRecords:number =0
  searchText: string = '';

  first: number = 0;
  rows: number = 5;
  paginationInterfce:IGeneralInterfceDto[];
  ngOnInit(): void {

    this.getGeneralInterfaces()
    
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private controlService:ScsDataService){}

    filterInterfaces() {
      if (this.searchText.trim() === '') {
        this.filterdInterface = this.GeneralInterfaces;
      } else {
        this.filterdInterface = this.GeneralInterfaces.filter((item) =>
          item.objectNameEN.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.objectNameLocalam.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.objectNameLocalen.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      this.first=0;
      this.onPageChange({first:this.first,rows:this.rows},this.filterdInterface)
     // Update pagination when the search text changes
    }

  getGeneralInterfaces(){

    this.controlService.getGeneralInterface('OBJECTMESSAGE').subscribe({
      next:(res)=>{
        this.GeneralInterfaces = res 
        this.paginatedInterface(this.GeneralInterfaces)
      }
    })
  }

  addGeneralInterface(){


    let modalRef = this.modalService.open(AddUserMessageComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getGeneralInterfaces()
    })

  }

  removeGeneralInterface(GeneralInterfaceId:number) {

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this inteerface ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteGeneralInterface(GeneralInterfaceId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getGeneralInterfaces()
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

  
  updateGeneralInterface(GeneralInterface:IGeneralInterfceDto){


    let modalRef = this.modalService.open(AddUserMessageComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.GeneralInterface=GeneralInterface

    modalRef.result.then(()=>{
      this.getGeneralInterfaces()
    })

  }


  onPageChange(event: any,gInterface?:IGeneralInterfceDto[] ) {
    this.first = event.first;
    this.rows = event.rows;
    if(gInterface){
      this.paginatedInterface(gInterface)
    }else{
    this.paginatedInterface(this.GeneralInterfaces);
    }
  }
  paginatedInterface(ginterfces:IGeneralInterfceDto[]) {
    this.totlRecords =ginterfces.length
    this.paginationInterfce= ginterfces.slice(this.first, this.first + this.rows);
  }


}
