import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { IRegionGetDto } from 'src/models/configuration/ILocatoinDto';
import { AddRegionComponent } from './add-region/add-region.component';
import { UserView } from 'src/models/auth/userDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  Region:IRegionGetDto[];
  paginatedRegion : IRegionGetDto[];

  userView : UserView

  ngOnInit(): void {
    this.getRegions()   
    this.userView = this.userService.getCurrentUser() 
  }

  constructor(
    private modalService : NgbModal,
    private confirmationService: ConfirmationService,
    private messageService : MessageService,
    private userService : UserService,
    private controlService:ConfigurationService){}


  getRegions(){

    this.controlService.getRegions().subscribe({
      next:(res)=>{
        this.Region = res 

        this.paginateRegion()
      }
    })
  }

  addRegion(){


    let modalRef = this.modalService.open(AddRegionComponent,  {size:'lg',backdrop:'static'})

    modalRef.result.then(()=>{
      this.getRegions()
    })

  }

  removeRegion(RegionId:string) {

    console.log(RegionId)
    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Region?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.controlService.deleteRegion(RegionId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getRegions()
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

  
  updateRegion(Region:IRegionGetDto){


    let modalRef = this.modalService.open(AddRegionComponent,  {size:'lg',backdrop:'static'})

    modalRef.componentInstance.Region=Region

    modalRef.result.then(()=>{
      this.getRegions()
    })

  }




  onPageChange(event: any ) {
      this.first = event.first;
      this.rows = event.rows;
      this.paginateRegion();
  }

  
  paginateRegion() {
    this.paginatedRegion = this.Region.slice(this.first, this.first + this.rows);
  }
}
