import { Component, Input, OnInit } from '@angular/core';
import { GetEmployeeGuaranteeDto } from './employee-guarantee.model';
import { CommonService } from 'src/app/services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrmService } from 'src/app/services/hrm.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AddEmployeeGuaranteeComponent } from './add-employee-guarantee/add-employee-guarantee.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employee-guarantee',
  templateUrl: './employee-guarantee.component.html',
  styleUrls: ['./employee-guarantee.component.css']
})
export class EmployeeGuaranteeComponent implements OnInit {

  @Input() employeeId!: string;
  @Input() employmentStatus!: string;
  @Input() fullName!: string;

  employeeGuarantee: GetEmployeeGuaranteeDto[]
  constructor(
    private commonService: CommonService,
    private modalService: NgbModal,
    private hrmService: HrmService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployeeGuarantee();
  }

  getEmployeeGuarantee() {
    this.hrmService.getEmployeeGuarantee(this.employeeId).subscribe({
      next: (res) => {
        if (res) {
          this.employeeGuarantee = res
        }
      }
    })
  }

  addEmployeeGuarantee() {
    let modalRef = this.modalService.open(AddEmployeeGuaranteeComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(() => {
      this.getEmployeeGuarantee()
    })
  }


  updateEmployeeGuarantee() {
    let modalRef = this.modalService.open(AddEmployeeGuaranteeComponent, { size: 'lg', backdrop: 'static' });
   
    modalRef.result.then(() => {
      this.getEmployeeGuarantee()
    })
  }

 
 returnGuarantee(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to return this Guarantee  letter?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.returnEmployeeGuarantee(id).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEmployeeGuarantee()
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
  
  printLetter(guarantee: GetEmployeeGuaranteeDto){
    guarantee.employeeName = this.fullName;
    const queryParams = JSON.stringify(guarantee);
    const url = this.router.createUrlTree(['/printout/guaranteeLetter'], {
      queryParams: { data: queryParams }
    }).toString();
    window.open(url, '_blank');
  }




}