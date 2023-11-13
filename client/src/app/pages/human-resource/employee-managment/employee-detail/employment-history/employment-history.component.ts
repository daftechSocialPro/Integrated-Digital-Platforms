import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmploymentHistoryComponent } from './add-employment-history/add-employment-history.component';
import { UpdateEmploymentHistoryComponent } from './update-employment-history/update-employment-history.component';
import { EmployeeHistoryDto } from 'src/app/model/HRM/IEmployeeDto';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { HistorySalaryComponent } from './history-salary/history-salary.component';



@Component({
  selector: 'app-employment-history',
  templateUrl: './employment-history.component.html',
  styleUrls: ['./employment-history.component.css']
})
export class EmploymentHistoryComponent implements OnInit {


  @Input() employeeId!: string;
  histories!: EmployeeHistoryDto[]
  position: string = 'center';

  ngOnInit(): void {
    this.getEmployeeHistory()
  }

  constructor(
    private hrmService: HrmService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  getEmployeeHistory() {
    this.hrmService.getEmployeeHistory(this.employeeId).subscribe({
      next: (res) => {
        this.histories = res

      }
    })
  }

  addEmploymentHistory() {
    let modalRef = this.modalService.open(AddEmploymentHistoryComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(() => {
      this.getEmployeeHistory()
    })
  }

  updateEmploymentHistory(employeeHistory: EmployeeHistoryDto) {
    let modalRef = this.modalService.open(UpdateEmploymentHistoryComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.employeeHistory = employeeHistory
    modalRef.result.then(() => {
      this.getEmployeeHistory()
    })
  }


  printContractLetter(historyId: string) {
    const url = `/printout/contractLetter?historyId=${historyId}`;
    window.open( url, '_blank');
  }

  deleteEmployeeHistory(historyId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployeeHistory(historyId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEmployeeHistory()
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
  addProjectSalary(employeeHistory: EmployeeHistoryDto) {
    let modalRef = this.modalService.open(HistorySalaryComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.empHistory = employeeHistory
    modalRef.result.then(() => {
      this.getEmployeeHistory()
    })
  }

}
