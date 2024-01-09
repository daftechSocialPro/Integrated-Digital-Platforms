import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-tarif-rate-group',
  templateUrl: './add-tarif-rate-group.component.html',
  styleUrls: ['./add-tarif-rate-group.component.scss']
})
export class AddTarifRateGroupComponent implements OnInit {

  @Input() TarifRateGroup: IGeneralSettingDto
  TarifRateGroupForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.TarifRateGroup){
      this.TarifRateGroupForm = this.formBuilder.group({
    
        name: [this.TarifRateGroup.inputValues, Validators.required],
      
      })
    }
    else{
      this.TarifRateGroupForm = this.formBuilder.group({
     
        name: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.TarifRateGroupForm.valid){

    let addTarifRateGroup : IGeneralSettingDto={
      inputValues : this.TarifRateGroupForm.value.name,
      inputCategory:"TARIFFRATEGROUP"
    }

    this.controlService.addGeneralSetting(addTarifRateGroup).subscribe({
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
  if(  this.TarifRateGroupForm.valid){

    let addTarifRateGroup : IGeneralSettingDto={
      inputValues : this.TarifRateGroupForm.value.name,   
      inputCategory: "TARIFFRATEGROUP", 
      recordno:this.TarifRateGroup.recordno
    }

    this.controlService.updateGeneralSetting(addTarifRateGroup).subscribe({
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
