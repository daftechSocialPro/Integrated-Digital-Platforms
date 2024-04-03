import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { IndicatorPostDto } from 'src/app/model/PM/IndicatorsDto';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent {

  stratgicPlans :SelectList[]


  @Output() result = new EventEmitter<boolean>();

  measurmentForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
     private configurationService:ConfigurationService ,
     private dropdownService:DropDownService,
     private messageService : MessageService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.getStratgicPlan()

    this.measurmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      stratgicPlanId: ['', Validators.required],
      type: ['', Validators.required],
   
    });
  }

  getStratgicPlan(){
    this.dropdownService.getStrategicPlans().subscribe({
      next:(res)=>{

        this.stratgicPlans=res

      }
    })
  }

  submit() {

    if (this.measurmentForm.valid) {

    var measurementpost : IndicatorPostDto={

      name : this.measurmentForm.value.name,
      stratgicPlanId: this.measurmentForm.value.stratgicPlanId,
      type : this.measurmentForm.value.type

    }


      this.configurationService.addUnitOfMeasurment(measurementpost).subscribe({

        next: (res) => {
 
          if (res.success){

     
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
