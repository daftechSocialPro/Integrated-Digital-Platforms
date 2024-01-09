import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IKebelesDto } from 'src/models/system-control/IKebelesDto';

@Component({
  selector: 'app-add-kebele-info',
  templateUrl: './add-kebele-info.component.html',
  styleUrls: ['./add-kebele-info.component.scss']
})
export class AddKebeleInfoComponent implements OnInit {

  @Input() Kebeles: IKebelesDto
  KebelesForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.Kebeles){
      this.KebelesForm = this.formBuilder.group({
        kebeleCode : [this.Kebeles.kebeleCode,Validators.required],
        kebeleName: [this.Kebeles.kebeleName, Validators.required],
        ketenaCode: [this.Kebeles.ketenaCode, Validators.required],
      })
    }
    else{
      this.KebelesForm = this.formBuilder.group({
        kebeleCode : ['',Validators.required],
        kebeleName: ['', Validators.required],
        ketenaCode: ['', Validators.required],
         
      
      })
    }
    
  
}

submit(){

  if(  this.KebelesForm.valid){

    let addKebeles : IKebelesDto={
      kebeleCode : this.KebelesForm.value.kebeleCode,
      kebeleName : this.KebelesForm.value.kebeleName,
      ketenaCode : this.KebelesForm.value.ketenaCode,
      
    }

    this.controlService.addKebeles(addKebeles).subscribe({
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
  if(  this.KebelesForm.valid){

    let addKebeles : IKebelesDto={
      kebeleCode : this.KebelesForm.value.kebeleCode,
      kebeleName : this.KebelesForm.value.kebeleName,
      ketenaCode : this.KebelesForm.value.ketenaCode,
    
    }

    this.controlService.updateKebeles(addKebeles).subscribe({
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
