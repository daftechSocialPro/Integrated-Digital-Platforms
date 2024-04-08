import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-custom-rescedule-confirtamion',
  templateUrl: './custom-rescedule-confirtamion.component.html',
  styleUrls: ['./custom-rescedule-confirtamion.component.css']
})
export class CustomResceduleConfirtamionComponent {
  @Input() message: string;
  
  messageForm!: FormGroup
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,private formBuilder:FormBuilder) {
    this.message = config.data.message;

    this.messageForm = this.formBuilder.group({     
      
      inputValue: ['', Validators.required],
      EndDate:['',Validators.required],
      StartDate:['',Validators.required]
    
    })
  }

  accept() {
    this.ref.close(
      {
"remark": this.messageForm.value.inputValue,
"endDate": this.messageForm.value.EndDate,
"startDate":  this.messageForm.value.StartDate
      }
      
     );
  }

  reject() {
    this.ref.close();
  }
}
