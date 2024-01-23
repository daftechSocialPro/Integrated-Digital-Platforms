import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { IndicatorGetDto } from 'src/app/model/PM/IndicatorsDto';
import { SelectList } from 'src/app/model/common';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DropDownService } from 'src/app/services/dropDown.service';


@Component({
  selector: 'app-update-measurment',
  templateUrl: './update-measurment.component.html',
  styleUrls: ['./update-measurment.component.css']
})
export class UpdateMeasurmentComponent {

  stratgicPlans :SelectList[]


  @Output() result = new EventEmitter<boolean>();
  @Input() measurement !: IndicatorGetDto;

  measurmentForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder, 
    private configurationService: ConfigurationService,
    private dropdownService:DropDownService, 
    private messageService: MessageService, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log("measurment", this.measurement)
    this.getStratgicPlan()
    this.measurmentForm = this.formBuilder.group({
      name: [this.measurement.name, Validators.required],
      stratgicPlanId: ['', Validators.required],
      type: [this.measurement.type, Validators.required]
    
    });

   
  }

  
  getStratgicPlan(){
    this.dropdownService.getStrategicPlans().subscribe({
      next:(res)=>{

        this.stratgicPlans=res
        console.log(res)
        this.measurmentForm.controls['stratgicPlanId'].setValue(this.measurement.stratgicPlanId)

      }
    })
  }

  submit() {

    if (this.measurmentForm.valid) {
      var value = this.measurmentForm.value;
      var unitmeasure: IndicatorGetDto = {
        id: this.measurement.id,
        name: value.name,
        stratgicPlanId: value.stratgicPlanId,
        type: value.type,
      
      }


      this.configurationService.updateUnitOfMeasurment(unitmeasure).subscribe({

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
