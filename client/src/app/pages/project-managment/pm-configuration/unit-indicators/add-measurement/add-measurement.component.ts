import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { IndicatorPostDto } from 'src/app/model/PM/IndicatorsDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent {



  @Output() result = new EventEmitter<boolean>();

  measurmentForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
     private configurationService:ConfigurationService ,
     private messageService : MessageService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.measurmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      localName: ['', Validators.required],
      type: ['', Validators.required],
   
    });
  }

  submit() {

    if (this.measurmentForm.valid) {

    var measurementpost : IndicatorPostDto={

      name : this.measurmentForm.value.name,
      localName: this.measurmentForm.value.localName,
      type : this.measurmentForm.value.type

    }


      this.configurationService.addUnitOfMeasurment(measurementpost).subscribe({

        next: (res) => {
 
          if (res.success){

            console.log(res)
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });             
          
          this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });              
          
          }
 

        }, error: (err) => {
        
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });              
          

        }
      }
      );
    }

  }
  closeModal() {

    this.activeModal.close()
  }


}
