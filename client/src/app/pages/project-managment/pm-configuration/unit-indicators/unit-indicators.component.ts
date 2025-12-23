import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { IndicatorGetDto } from 'src/app/model/PM/IndicatorsDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UpdateMeasurmentComponent } from './update-measurment/update-measurment.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-unit-indicators',
  templateUrl: './unit-indicators.component.html',
  styleUrls: ['./unit-indicators.component.css']
})
export class UnitIndicatorsComponent implements OnInit {

  unitOfMeasurments: IndicatorGetDto[] = [];

  constructor(private configurationService:ConfigurationService,
              private commonService: CommonService, 
              private modalService: NgbModal,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
    this.unitOfMeasurmentsList();
  }

  ngOnInit(): void {
    this.unitOfMeasurmentsList();
  }


  unitOfMeasurmentsList() {
    this.configurationService.getindicator().subscribe({
      next: (res) => {
        this.unitOfMeasurments = res       
      }, error: (err) => {
       
        
      }
    })
  }

  addUnitOfMeasurment() {

   let modalRef =  this.modalService.open(AddMeasurementComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then((res)=>{
      this.unitOfMeasurmentsList()
    })

  }

  updateindicator(unit: IndicatorGetDto) {

    let modalref = this.modalService.open(UpdateMeasurmentComponent, { size: 'lg', backdrop: 'static' })
    modalref.componentInstance.measurement = unit
    
    modalref.result.then((res)=>{
      this.unitOfMeasurmentsList();
    })
  }

  deleteindicator(id: string) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this item?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.configurationService.deleteindicator(id).subscribe({
            next: (res) => {
  
              if (res.success) {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
                this.unitOfMeasurmentsList();
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
  

}
