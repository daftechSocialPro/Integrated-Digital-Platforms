import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanSettingDto } from 'src/app/model/HRM/ILoanSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddLoanSettingComponent } from './add-loan-setting/add-loan-setting.component';

@Component({
  selector: 'app-loan-setting',
  templateUrl: './loan-setting.component.html',
  styleUrls: ['./loan-setting.component.css']
})
export class LoanSettingComponent implements OnInit {

  filterValue!:string
  loanSettings!: LoanSettingDto[]

  ngOnInit(): void {

    this.getSetting()

  }

  constructor(private hrmService: HrmService, private modalService: NgbModal) { }


  getSetting() {
    this.hrmService.getLoanSettings().subscribe({
      next: (res) => {
        this.loanSettings = res

      }, error: (err) => {
        console.log(err)
      }
    })
  }


  addNew() {
    let modalRef = this.modalService.open(AddLoanSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getSetting();
    })
  }

  update(loanSetting: LoanSettingDto) {
    let modalRef = this.modalService.open(AddLoanSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.loanSetting = loanSetting
    modalRef.result.then(() => {
      this.getSetting();
    });
  }

  get filteredLoanSettings(): any[] {
    if (!this.filterValue) {
        return this.loanSettings;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.loanSettings.filter((department: any) => {
        const departmentName = department.typeOfLoan.toLowerCase();
        const loanname = department.loanName.toLowerCase()
        
        
        return departmentName.includes(filterText)||loanname.includes(filterText) ;
    });
  }

}
