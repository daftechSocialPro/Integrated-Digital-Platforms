import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IConsumptionLevelDto } from 'src/models/system-control/IConsumptionLevelDto';

@Component({
  selector: 'app-add-consumption-level',
  templateUrl: './add-consumption-level.component.html',
  styleUrls: ['./add-consumption-level.component.scss']
})
export class AddConsumptionLevelComponent implements OnInit {

  @Input() ConsumptionLevel: IConsumptionLevelDto
  ConsumptionLevelForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.ConsumptionLevel){
      this.ConsumptionLevelForm = this.formBuilder.group({
    
        name: [this.ConsumptionLevel.levelNameEN, Validators.required],
        nameLocal: [this.ConsumptionLevel.levelNameLocal, Validators.required],
        recordno:[this.ConsumptionLevel.recordno,Validators.required]
      
      })
    }
    else{
      this.ConsumptionLevelForm = this.formBuilder.group({
     
        name: ['', Validators.required],
        nameLocal:['',Validators.required],
        recordno:['',Validators.required]
      
      })
    }
    
  
}

submit(){

  if(  this.ConsumptionLevelForm.valid){

    let addConsumptionLevel : IConsumptionLevelDto={
      recordno:this.ConsumptionLevelForm.value.recordno,
      levelNameEN : this.ConsumptionLevelForm.value.name,
      levelNameLocal : this.ConsumptionLevelForm.value.nameLocal,
    }

    this.controlService.addConsumptionLevel(addConsumptionLevel).subscribe({
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
  if(  this.ConsumptionLevelForm.valid){

    let addConsumptionLevel : IConsumptionLevelDto={
      recordno:this.ConsumptionLevelForm.value.recordno,
      levelNameEN : this.ConsumptionLevelForm.value.name,
      levelNameLocal : this.ConsumptionLevelForm.value.nameLocal,
    }

    this.controlService.updateConsumptionLevel(addConsumptionLevel).subscribe({
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
