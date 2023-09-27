
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-custom-confirmation',
  templateUrl: './custom-confirmation.component.html',
  styleUrls: ['./custom-confirmation.component.css']
})
export class CustomConfirmationComponent {
  @Input() message: string;
  
  messageForm!: FormGroup
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,private formBuilder:FormBuilder) {
    this.message = config.data.message;

    this.messageForm = this.formBuilder.group({     
      
      inputValue: ['', Validators.required],
    
    })
  }

  accept() {
    this.ref.close(this.messageForm.value.inputValue);
  }

  reject() {
    this.ref.close();
  }
}
