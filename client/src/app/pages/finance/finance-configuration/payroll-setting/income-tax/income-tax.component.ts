import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IncomeTaxDto } from 'src/app/model/Finance/IPayrollSettingDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddIncomeTaxComponent } from './add-income-tax/add-income-tax.component';

@Component({
  selector: 'app-income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.css']
})
export class IncomeTaxComponent implements OnInit {

  incomeTaxs!: IncomeTaxDto[]

  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal
  ){}

  ngOnInit(): void {
    this.getIncomeTaxs()
  }

  getIncomeTaxs(){
    this.financeService.getIncomeTax().subscribe({
      next : (res) => {
        this.incomeTaxs = res
      }
    })
  }

  addIncomeTax(){
    let modalRef = this.modalService.open(AddIncomeTaxComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getIncomeTaxs()
    })
  }

  updateIncomeTax (incomeTax :IncomeTaxDto){
    let modalRef = this.modalService.open(AddIncomeTaxComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.incomeTax = incomeTax
    modalRef.result.then(()=>{
      this.getIncomeTaxs()
    });
  }

}
