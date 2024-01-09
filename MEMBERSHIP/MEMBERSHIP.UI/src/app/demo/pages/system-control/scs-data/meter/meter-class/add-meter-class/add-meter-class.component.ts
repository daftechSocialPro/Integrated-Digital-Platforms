import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-meter-class',
  templateUrl: './add-meter-class.component.html',
  styleUrls: ['./add-meter-class.component.scss']
})
export class AddMeterClassComponent implements OnInit {

  @Input() MeterClass: IGeneralSettingDto
  MeterClassForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.MeterClass){
      this.MeterClassForm = this.formBuilder.group({
    
        name: [this.MeterClass.inputValues, Validators.required],
      
      })
    }
    else{
      this.MeterClassForm = this.formBuilder.group({
     
        name: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.MeterClassForm.valid){

    let addMeterClass : IGeneralSettingDto={
      inputValues : this.MeterClassForm.value.name,
      inputCategory:"METERCLASS"
    }

    this.controlService.addGeneralSetting(addMeterClass).subscribe({
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
  if(  this.MeterClassForm.valid){

    let addMeterClass : IGeneralSettingDto={
      inputValues : this.MeterClassForm.value.name,
      inputCategory:"METERCLASS",
      recordno:this.MeterClass.recordno
    }

    this.controlService.updateGeneralSetting(addMeterClass).subscribe({
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
