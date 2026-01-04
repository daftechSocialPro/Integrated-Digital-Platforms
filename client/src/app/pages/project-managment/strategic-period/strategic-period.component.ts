import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StrategicPeriodGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { AddStrategicPeriodComponent } from './add-strategic-period/add-strategic-period.component';
import { UpdateStrategicPeriodComponent } from './update-strategic-period/update-strategic-period.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-strategic-period',
  templateUrl: './strategic-period.component.html',
  styleUrls: ['./strategic-period.component.css']
})
export class StrategicPeriodComponent implements OnInit {
  
  strategicPeriods! : StrategicPeriodGetDto[]

  ngOnInit(): void {
    this.getStrategicPeriods()
  }

  constructor (
    private pmService : ProjectmanagementService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  getStrategicPeriods() {
    this.pmService.getStrategicPeriods().subscribe({
      next: (res) => {
        this.strategicPeriods = res
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addStrategicPeriod() {
    let modalRef = this.modalService.open(AddStrategicPeriodComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(()=>{
      this.getStrategicPeriods()
    });
  }

  updateStrategicPeriod(period: StrategicPeriodGetDto) {
    let modalRef = this.modalService.open(UpdateStrategicPeriodComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.strategicPeriod = period
    modalRef.result.then(()=>{
      this.getStrategicPeriods()
    });
  }

  deleteStrategicPeriod(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this strategic period?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.pmService.deleteStrategicPeriod(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getStrategicPeriods();
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

  getDuration(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.round(diffDays / 365.25);
  }
}

