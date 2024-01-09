import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-water-source',
  templateUrl: './add-water-source.component.html',
  styleUrls: ['./add-water-source.component.scss']
})
export class AddWaterSourceComponent implements OnInit {

  @Input() WaterSource: IGeneralSettingDto
  WaterSourceForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.WaterSource){
      this.WaterSourceForm = this.formBuilder.group({
    
        name: [this.WaterSource.inputValues, Validators.required],
      
      })
    }
    else{
      this.WaterSourceForm = this.formBuilder.group({
     
        name: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.WaterSourceForm.valid){

    let addWaterSource : IGeneralSettingDto={
      inputValues : this.WaterSourceForm.value.name,
      inputCategory:"SOURCEOFWATER"
    }

    this.controlService.addGeneralSetting(addWaterSource).subscribe({
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
  if(  this.WaterSourceForm.valid){

    let addWaterSource : IGeneralSettingDto={
      inputValues : this.WaterSourceForm.value.name,
      inputCategory:"SOURCEOFWATER",      
      recordno:this.WaterSource.recordno
    }

    this.controlService.updateGeneralSetting(addWaterSource).subscribe({
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
