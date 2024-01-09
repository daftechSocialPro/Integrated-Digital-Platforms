import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-meter-size-group',
  templateUrl: './add-meter-size-group.component.html',
  styleUrls: ['./add-meter-size-group.component.scss']
})
export class AddMeterSizeGroupComponent implements OnInit {

  @Input() MeterSizeGroup: IGeneralSettingDto
  MeterSizeGroupForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.MeterSizeGroup){
      this.MeterSizeGroupForm = this.formBuilder.group({
    
        MeterRateGroup: [this.MeterSizeGroup.inputValues, Validators.required],
      
      })
    }
    else{
      this.MeterSizeGroupForm = this.formBuilder.group({
     
        MeterRateGroup: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.MeterSizeGroupForm.valid){

    let addMeterSizeGroup : IGeneralSettingDto={
      inputValues : this.MeterSizeGroupForm.value.MeterRateGroup,
      inputCategory:"METERRATEGROUP"
    }

    this.controlService.addGeneralSetting(addMeterSizeGroup).subscribe({
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
  if(  this.MeterSizeGroupForm.valid){

    let addMeterSizeGroup : IGeneralSettingDto={
      inputValues : this.MeterSizeGroupForm.value.MeterRateGroup,
      inputCategory:"METERRATEGROUP",      
      recordno:this.MeterSizeGroup.recordno
    }

    this.controlService.updateGeneralSetting(addMeterSizeGroup).subscribe({
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
}{


}
