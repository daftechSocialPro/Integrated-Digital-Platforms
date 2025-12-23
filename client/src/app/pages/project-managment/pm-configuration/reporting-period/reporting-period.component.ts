import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IReportingPeriodGetDto } from 'src/app/model/PM/ITimePeriodDto';
import { PMService } from 'src/app/services/pm.services';
import { AddReportPeriodComponent } from './add-report-period/add-report-period.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reporting-period',
  templateUrl: './reporting-period.component.html',
  styleUrls: ['./reporting-period.component.css']
})
export class ReportingPeriodComponent implements OnInit {
  
  ReportingPeriods! : IReportingPeriodGetDto[]

  ngOnInit(): void {

    this.getReportingPeriods()
    
  }

  constructor(private pmService: PMService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }


  getReportingPeriods (){
    this.pmService.getReportingPeriod().subscribe({
      next:(res)=>{      
          this.ReportingPeriods = res       
      
      },error:(err)=>{
    
      }
    })
  }
  addReportingPeriod(){

    let modalRef = this.modalService.open(AddReportPeriodComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getReportingPeriods()
    })
  }

  updateReportingPeriod (ReportingPeriod :IReportingPeriodGetDto){
    let modalRef = this.modalService.open(AddReportPeriodComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.ReportingPeriod = ReportingPeriod
    modalRef.result.then(()=>{
      this.getReportingPeriods()
    });
  }

   deleteReportingPeriod(id: string) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this item?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.pmService.deleteReportingPeriod(id).subscribe({
              next: (res) => {
    
                if (res.success) {
                  this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
                  this.getReportingPeriods();
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
