import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';
import { IAccountPeriodDto } from 'src/models/system-control/IAccountPeriod';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-css-import',
  templateUrl: './css-import.component.html',
  styleUrls: ['./css-import.component.scss']
})
export class CssImportComponent {

  accountPeriod:IAccountPeriodDto
  months:IFiscalMonthDto[]
  monthName:string=""
 
  colorChart = ['#673ab7'];

  // Constructor
  constructor(
    private dataService :ScsDataService,
    private activeModal : NgbActiveModal,
    private controlService:ScsSetupService) {

  }

  // Life cycle events
  ngOnInit(): void {

    this.getAccountPeriod()
    this.getMonths()
  }
  getAccountPeriod(){
    this.controlService.getAccountPeriod().subscribe({
      next:(res)=>{
        this.accountPeriod=res
      }
    })
  }
  getMonths(){
    this.dataService.getFiscalMonth().subscribe({
      next:(res)=>{
        this.months=res
        this.monthName=this.months.filter((item)=>item.monthIndex==this.accountPeriod.monthIndex)[0].monthnameEn
      }
    })
  }
  
  closeModal(){

    this.activeModal.close()
  
  }

}
