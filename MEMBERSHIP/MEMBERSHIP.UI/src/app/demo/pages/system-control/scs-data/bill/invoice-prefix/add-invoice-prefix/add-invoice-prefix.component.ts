import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-invoice-prefix',
  templateUrl: './add-invoice-prefix.component.html',
  styleUrls: ['./add-invoice-prefix.component.scss']
})
export class AddInvoicePrefixComponent implements OnInit {

  @Input() InvoicePrefix: IGeneralSettingDto
  InvoicePrefixForm!: FormGroup;
  constructor(
    private activeModal : NgbActiveModal,
    private messageService: MessageService,
    private controlService : ScsDataService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {

    if(this.InvoicePrefix){
      this.InvoicePrefixForm = this.formBuilder.group({
    
        name: [this.InvoicePrefix.inputValues, Validators.required],
      
      })
    }
    else{
      this.InvoicePrefixForm = this.formBuilder.group({
     
        name: ['', Validators.required],
      
      })
    }
    
  
}

submit(){

  if(  this.InvoicePrefixForm.valid){

    let addInvoicePrefix : IGeneralSettingDto={
      inputValues : this.InvoicePrefixForm.value.name,
      inputCategory:"InvoicePrefix"
    }

    this.controlService.addGeneralSetting(addInvoicePrefix).subscribe({
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
  if(  this.InvoicePrefixForm.valid){

    let addInvoicePrefix : IGeneralSettingDto={
      inputValues : this.InvoicePrefixForm.value.name,
      inputCategory:"InvoicePrefix",      
      recordno:this.InvoicePrefix.recordno
    }

    this.controlService.updateGeneralSetting(addInvoicePrefix).subscribe({
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
