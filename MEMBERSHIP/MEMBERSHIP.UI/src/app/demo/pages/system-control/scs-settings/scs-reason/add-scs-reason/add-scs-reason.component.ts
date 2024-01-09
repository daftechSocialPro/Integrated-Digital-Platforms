import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-scs-reason',
  templateUrl: './add-scs-reason.component.html',
  styleUrls: ['./add-scs-reason.component.scss']
})
export class AddScsReasonComponent implements OnInit {

  @Input() SCReason: IGeneralSettingDto
  SCReasonForm!: FormGroup;
  Reasons=[
    {value:'BILLVOIDINVESTIGATE',name:'Investigation',},
    {value:'RECONNECTREASON',name:'Reconnect'},
    {value:'METERCHANGEREASON',name:'Meter Change'},
    {value:'METERTERMINATEREASON',name:'Terminate'},
    {value:'BILLPENALITY',name:'Penality'},
    {value:'BillUnsoldReason',name:'Unsold'},
    {value:'BILLVOIDREASON',name:'Void'}]

  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.SCReason){
      console.log(this.SCReason)
      this.SCReasonForm = this.formBuilder.group({
        reason: [this.SCReason.inputValues, Validators.required],
        reasonType: [this.SCReason.inputCategory, Validators.required],
      
      })
    }
    else{
      this.SCReasonForm = this.formBuilder.group({
        reason : ['',Validators.required],
        reasonType: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.SCReasonForm.valid){

    let addSCReason : IGeneralSettingDto={
      inputCategory : this.SCReasonForm.value.reasonType,
      inputValues:this.SCReasonForm.value.reason
    }

    this.controlService.addGeneralSetting(addSCReason).subscribe({
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
  if(  this.SCReasonForm.valid){

    let addSCReason : IGeneralSettingDto={
      inputValues : this.SCReasonForm.value.reason,
      inputCategory:this.SCReasonForm.value.reasonType,      
      recordno:this.SCReason.recordno,

    }

    this.controlService.updateGeneralSetting(addSCReason).subscribe({
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
