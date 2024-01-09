import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-village',
  templateUrl: './add-village.component.html',
  styleUrls: ['./add-village.component.scss']
})
export class AddVillageComponent implements OnInit {

  @Input() Village: IGeneralSettingDto
  VillageForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.Village){
      this.VillageForm = this.formBuilder.group({
    
        name: [this.Village.inputValues, Validators.required],
      
      })
    }
    else{
      this.VillageForm = this.formBuilder.group({
     
        name: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.VillageForm.valid){

    let addVillage : IGeneralSettingDto={
      inputValues : this.VillageForm.value.name,
      inputCategory:'VILLAGE'
    }

    this.controlService.addGeneralSetting(addVillage).subscribe({
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
  if(  this.VillageForm.valid){

    let addVillage : IGeneralSettingDto={
      inputValues : this.VillageForm.value.name,
      inputCategory:'VILLAGE',      
      recordno:this.Village.recordno
    }

    this.controlService.updateGeneralSetting(addVillage).subscribe({
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