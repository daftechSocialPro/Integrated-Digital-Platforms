import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitPayrollGetDto } from 'src/app/model/Finance/IPayrollSettingDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddBenefitPayrollComponent } from './add-benefit-payroll/add-benefit-payroll.component';

@Component({
  selector: 'app-benefit-payroll',
  templateUrl: './benefit-payroll.component.html',
  styleUrls: ['./benefit-payroll.component.css']
})
export class BenefitPayrollComponent implements OnInit {

  benefitPayroll!: BenefitPayrollGetDto[]

  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal
  ){}

  ngOnInit(): void {
    this.getBenefitPayroll()
  }

  getBenefitPayroll(){
    this.financeService.getBenefitPayrolls().subscribe({
      next : (res) => {
        this.benefitPayroll = res
      }
    })
  }

  addBenefitPayroll(){
    let modalRef = this.modalService.open(AddBenefitPayrollComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getBenefitPayroll()
    })
  }

}
