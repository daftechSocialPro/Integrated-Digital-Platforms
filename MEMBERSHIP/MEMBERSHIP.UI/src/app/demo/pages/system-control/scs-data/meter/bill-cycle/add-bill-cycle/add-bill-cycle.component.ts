import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-bill-cycle',
  templateUrl: './add-bill-cycle.component.html',
  styleUrls: ['./add-bill-cycle.component.scss']
})
export class AddBillCycleComponent implements OnInit {

  @Input() BillCycle: IGeneralSettingDto
  BillCycleForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.BillCycle){
      this.BillCycleForm = this.formBuilder.group({
    
        bookNumber: [this.BillCycle.inputValues, Validators.required],
      
      })
    }
    else{
      this.BillCycleForm = this.formBuilder.group({
     
        bookNumber: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.BillCycleForm.valid){

    let addBillCycle : IGeneralSettingDto={
      inputValues : this.BillCycleForm.value.bookNumber,
      inputCategory:"BOOK NUMBER"
    }

    this.controlService.addGeneralSetting(addBillCycle).subscribe({
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

update(){
  if(  this.BillCycleForm.valid){

    let addBillCycle : IGeneralSettingDto={
      inputValues : this.BillCycleForm.value.bookNumber,
      inputCategory: "BOOK NUMBER",
      recordno:this.BillCycle.recordno
    }

    this.controlService.updateGeneralSetting(addBillCycle).subscribe({
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
