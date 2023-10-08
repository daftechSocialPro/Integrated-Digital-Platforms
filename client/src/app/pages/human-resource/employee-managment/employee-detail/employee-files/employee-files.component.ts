import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { EmployeeFilePostDto, EmployeeFileGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { HrmService } from 'src/app/services/hrm.service';

import { AddEmployeeFileComponent } from './add-employee-file/add-employee-file.component';
import { UpdateEmployeeFileComponent } from './update-employee-file/update-employee-file.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-employee-files',
  templateUrl: './employee-files.component.html',
  styleUrls: ['./employee-files.component.css']
})
export class EmployeeFilesComponent implements OnInit {


  @Input() employeeId!: string;
  files!: EmployeeFileGetDto[]
  position: string = 'center';

  ngOnInit(): void {
    this.getEmployeeFile()
  }

  constructor(
    private hrmService: HrmService,
    private modalService: NgbModal,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  getEmployeeFile() {
    this.hrmService.getEmployeeFile(this.employeeId).subscribe({
      next: (res) => {
        this.files = res
      }
    })
  }

  addEmployeeFile() {
    let modalRef = this.modalService.open(AddEmployeeFileComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(() => {
      this.getEmployeeFile()
    })
  }

  updateEmployeeFile(employeeFile: EmployeeFileGetDto) {
    let modalRef = this.modalService.open(UpdateEmployeeFileComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.employeeFile = employeeFile
    modalRef.result.then(() => {
      this.getEmployeeFile()
    })
  }


  deleteEmployeeFile(FileId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this File?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployeeFile(FileId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEmployeeFile()
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

  createImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }

}
