import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IMeterSizeDto } from 'src/models/system-control/IMeterSizeDto';

@Component({
  selector: 'app-add-meter-size',
  templateUrl: './add-meter-size.component.html',
  styleUrls: ['./add-meter-size.component.scss']
})
export class AddMeterSizeComponent implements OnInit {

  @Input() meterSize: IMeterSizeDto
  meterSizeForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.meterSize){
      this.meterSizeForm = this.formBuilder.group({
        recordno : [this.meterSize.recordno,Validators.required],
        meterSizeCode: [this.meterSize.meterSizeCode, Validators.required],
        meterSizeName: [this.meterSize.meterSizeName, Validators.required],
      })
    }
    else{
      this.meterSizeForm = this.formBuilder.group({
        recordno : ['',Validators.required],
        meterSizeCode: ['', Validators.required],
        meterSizeName: ['', Validators.required],
         
      
      })
    }
    
  
}

submit(){

  if(  this.meterSizeForm.valid){

    let addMeterSize : IMeterSizeDto={
      recordno : this.meterSizeForm.value.recordno,
      meterSizeCode : this.meterSizeForm.value.meterSizeCode,
      meterSizeName : this.meterSizeForm.value.meterSizeName,
      
    }

    this.controlService.addMeterSize(addMeterSize).subscribe({
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
  if(  this.meterSizeForm.valid){

    let addMeterSize : IMeterSizeDto={
      recordno : this.meterSizeForm.value.recordno,
      meterSizeCode : this.meterSizeForm.value.meterSizeCode,
      meterSizeName : this.meterSizeForm.value.meterSizeName,
    
    }

    this.controlService.updateMeterSize(addMeterSize).subscribe({
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
