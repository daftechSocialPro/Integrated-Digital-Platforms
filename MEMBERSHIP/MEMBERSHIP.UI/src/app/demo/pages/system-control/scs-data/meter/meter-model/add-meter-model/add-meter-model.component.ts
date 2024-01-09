import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';


@Component({
  selector: 'app-add-meter-model',
  templateUrl: './add-meter-model.component.html',
  styleUrls: ['./add-meter-model.component.scss']
})
export class AddMeterModelComponent implements OnInit {

  @Input() MeterModel: IGeneralSettingDto
  MeterModelForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.MeterModel){
      this.MeterModelForm = this.formBuilder.group({
    
        name: [this.MeterModel.inputValues, Validators.required],
      
      })
    }
    else{
      this.MeterModelForm = this.formBuilder.group({
     
        name: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.MeterModelForm.valid){

    let addMeterModel : IGeneralSettingDto={
      inputValues : this.MeterModelForm.value.name,
      inputCategory:"METERMODEL"
    }

    this.controlService.addGeneralSetting(addMeterModel).subscribe({
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
  if(  this.MeterModelForm.valid){

    let addMeterModel : IGeneralSettingDto={
      inputValues : this.MeterModelForm.value.name,
      inputCategory:'METERMODEL',           
      recordno:this.MeterModel.recordno
    }

    this.controlService.updateGeneralSetting(addMeterModel).subscribe({
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



