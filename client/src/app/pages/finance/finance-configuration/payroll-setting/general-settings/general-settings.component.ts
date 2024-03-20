import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralSettingGetDto } from 'src/app/model/Finance/IPayrollSettingDto';
import { FinanceService } from 'src/app/services/finance.service';
import { AddGeneralPayrollSettingComponent } from './add-general-payroll-setting/add-general-payroll-setting.component';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent implements OnInit {

  generalSettings!: GeneralSettingGetDto[]


  constructor(
    private financeService : FinanceService, 
    private modalService:NgbModal
  ){}

  ngOnInit(): void {
    this.getGeneralSettings()
  }

  getGeneralSettings(){
    this.financeService.getGeneralPayrollSettings().subscribe({
      next: (res) => {
        this.generalSettings = res
      }
    })
  }

  addGeneralPayrollSetting(){
    let modalRef = this.modalService.open(AddGeneralPayrollSettingComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getGeneralSettings()
    })
  }

}
