import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { AddEmployeeSuretyComponent } from './add-employee-surety/add-employee-surety.component';
import { EmployeeSuertyGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UpdateEmployeeSuretyComponent } from './update-employee-surety/update-employee-surety.component';

@Component({
  selector: 'app-employee-surety',
  templateUrl: './employee-surety.component.html',
  styleUrls: ['./employee-surety.component.css']
})
export class EmployeeSuretyComponent implements OnInit {

  @Input() employeeId!: string;
  @Input() employmentStatus!: string;
  employeeSurity!: EmployeeSuertyGetDto
  constructor(
    private commonService: CommonService,
    private modalService: NgbModal,
    private hrmService: HrmService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {

    this.getEmployeeSurity()
  }

  getEmployeeSurity() {

    this.hrmService.getEmployeeSurety(this.employeeId).subscribe({

      next: (res) => {
        if (res) {
          this.employeeSurity = res[0]
        }
      }
    })

  }
  addEmployeeSurety() {

    let modalRef = this.modalService.open(AddEmployeeSuretyComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(() => {
      this.getEmployeeSurity()
    })
  }
  updateEmployeeSurety() {

    let modalRef = this.modalService.open(UpdateEmployeeSuretyComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employeeSurety = this.employeeSurity
    modalRef.result.then(() => {
      this.getEmployeeSurity()
    })
  }

  removeSurety() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Employee Surity?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployeeSurety(this.employeeSurity.id!).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEmployeeSurity()
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
  getImagePath(url: string) {

    return this.commonService.createImgPath(url)
  }


}
