import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-add-months',
  templateUrl: './add-months.component.html',
  styleUrls: ['./add-months.component.scss']
})
export class AddMonthsComponent implements OnInit {

  @Input() FiscalMonth: IFiscalMonthDto
  FiscalMonthForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.FiscalMonth){
      this.FiscalMonthForm = this.formBuilder.group({
    
        monthCode: [this.FiscalMonth.monthCode, Validators.required],
        monthIndex: [this.FiscalMonth.monthCode, Validators.required],
        monthnameEn: [this.FiscalMonth.monthnameEn, Validators.required],
        monthnamelocal:[this.FiscalMonth.monthnamelocal,Validators.required]
      
      })
    }
    else{
      this.FiscalMonthForm = this.formBuilder.group({
     
        monthCode: ['', Validators.required],
        monthIndex:['',Validators.required],
        monthnameEn:['',Validators.required],
        monthnamelocal:['',Validators.required]
      
      })
    }
    
  
}



update(){
  if(  this.FiscalMonthForm.valid){

    let addFiscalMonth : IFiscalMonthDto={
      monthIndex:this.FiscalMonthForm.value.monthIndex,
      monthCode : this.FiscalMonthForm.value.monthCode,
      monthnameEn : this.FiscalMonthForm.value.monthnameEn,
      monthnamelocal : this.FiscalMonthForm.value.monthnamelocal,
    }

    this.controlService.updateFiscalMonth(addFiscalMonth).subscribe({
      next:(res)=>{

        if (res.success){
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail:res.message });
          
          this.closeModal()

        }else {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:res.message });

        }

      },error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err.message });

      }
    })


  }
  else {


  }

}

closeModal(){

  this.activeModal.close()

}


}
