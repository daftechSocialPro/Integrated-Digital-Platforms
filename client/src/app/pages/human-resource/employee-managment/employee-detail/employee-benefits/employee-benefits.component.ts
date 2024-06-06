import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
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

 

}
