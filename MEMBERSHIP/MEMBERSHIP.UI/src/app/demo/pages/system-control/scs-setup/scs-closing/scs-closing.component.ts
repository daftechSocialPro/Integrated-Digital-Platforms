import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IAccountPeriodDto } from 'src/models/system-control/IAccountPeriod';
import { ScsSetupComponent } from '../scs-setup.component';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-scs-closing',
  templateUrl: './scs-closing.component.html',
  styleUrls: ['./scs-closing.component.scss']
})
export class ScsClosingComponent implements OnInit {
  
  AccountPeriods: IAccountPeriodDto;
  closingPeriodForm:FormGroup;
  months:IFiscalMonthDto[]

  ngOnInit(): void {
                   
    this.getAccountPeriods()
    this.getMonths()

  }

  constructor(
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private dataService:ScsDataService,
    private controlService: ScsSetupService) {

      this.closingPeriodForm= this.formBuilder.group({
        fiscalYear:['',Validators.required],
        monthIndex:['',Validators.required]

      })  
     }


  getAccountPeriods() {

    this.controlService.getAccountPeriod().subscribe({
      next: (res) => {
        console.log(res);
        this.AccountPeriods = res

        this.closingPeriodForm.controls['fiscalYear'].setValue(this.AccountPeriods.fiscalYear)
        this.closingPeriodForm.controls['monthIndex'].setValue(this.AccountPeriods.monthIndex)
      }
    })
  }

  getMonths(){
    this.dataService.getFiscalMonth().subscribe({
      next:(res)=>{
        this.months=res
      }
    })
  }

 

  updateAccountPeriod() {
    

if(this.closingPeriodForm.valid){

  let closingp:IAccountPeriodDto={
    recordno:this.AccountPeriods.recordno,
    userID:this.AccountPeriods.userID,
    fiscalYear:this.closingPeriodForm.value.fiscalYear,
    monthIndex:this.closingPeriodForm.value.monthIndex
  }
  console.log(closingp)
  this.controlService.updateAccountPeriod(closingp).subscribe({
    next:(res)=>{
      if(res.success){
        this.messageService.add({severity:'success',summary:'Successfully Updated!!!',detail:res.message})

      }else{
        this.messageService.add({severity:'error',summary:'Something went wrong!!!',detail:res.message})

      }
    },error:(err)=>{
      this.messageService.add({severity:'error',summary:'Something went wrong!!!',detail:err})
      console.log(err)
    }
  })

}
 

  }

 


}
