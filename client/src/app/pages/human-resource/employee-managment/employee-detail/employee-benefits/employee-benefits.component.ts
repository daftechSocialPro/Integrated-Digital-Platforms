import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeBenefitListDto } from 'src/app/model/HRM/IEmployeeBenefitDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddEmployeeBenefitComponent } from './add-employee-benefit/add-employee-benefit.component';

@Component({
  selector: 'app-employee-benefits',
  templateUrl: './employee-benefits.component.html',
  styleUrls: ['./employee-benefits.component.css']
})
export class EmployeeBenefitsComponent implements OnInit {


  @Input() employeeId!: string;
  @Input() employmentStatus!: string;
  benefits!: EmployeeBenefitListDto[]
  position: string = 'center';

  ngOnInit(): void {
    this.getEmployeeBenefits()
  }

  constructor(
    private hrmService: HrmService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

    getEmployeeBenefits() {
    this.hrmService.getEmployeeBenefits(this.employeeId).subscribe({
      next: (res) => {
        this.benefits = res
      }
    })
  }

  addNew() {
    let modalRef = this.modalService.open(AddEmployeeBenefitComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.employeeId = this.employeeId
    modalRef.result.then(() => {
      this.getEmployeeBenefits()
    });
  }

  deleteEmployeeBenefit(benefitId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this benefit?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteEmployeeBenefit(benefitId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getEmployeeBenefits()
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
