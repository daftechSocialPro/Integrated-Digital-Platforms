import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { IMeterSizeDto } from 'src/models/system-control/IMeterSizeDto';
import { IMeterSizeRentDto } from 'src/models/system-control/IMeterSizeRentDto';

@Component({
  selector: 'app-add-meter-rate',
  templateUrl: './add-meter-rate.component.html',
  styleUrls: ['./add-meter-rate.component.scss']
})
export class AddMeterRateComponent implements OnInit {

  @Input() recordNo  :number 
  MeterRate: IMeterSizeRentDto
  MeterRateForm!: FormGroup;
  customerCategories:ICustomerCategoryDto[]
  meterRents :IGeneralSettingDto[]
  meterSizes:IMeterSizeDto[]
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.MeterRateForm = this.formBuilder.group({

      custCategoryCode: ['', Validators.required],
      meterRent: ['', Validators.required],
      recordno: ['', Validators.required],
      meterSizeCode: ['', Validators.required],        
      rentGroupCode: ['', Validators.required],     
     

    })

    if (this.recordNo){

      this.controlService.getMeterSizeRentForUpdate(this.recordNo).subscribe({
        next:(res)=>{
        
          this.MeterRate=res
          this.MeterRateForm.controls['recordno'].setValue(this.MeterRate.recordno)
          this.MeterRateForm.controls['rentGroupCode'].setValue(this.MeterRate.rentGroupCode)
          this.MeterRateForm.controls['meterSizeCode'].setValue(this.MeterRate.meterSizeCode)
          this.MeterRateForm.controls['meterRent'].setValue(this.MeterRate.meterRent)          
          this.MeterRateForm.controls['custCategoryCode'].setValue(this.MeterRate.custCategoryCode)
          

        }
      })    
    
    }

   
   

    this.getCustomerCategories()
    this.getMeterRents()
    this.getMeterSizes()

  }

  getCustomerCategories(){
    this.controlService.getCustomerCategory().subscribe({
      next:(res)=>{
        this.customerCategories =res
      }
    })
  }
  getMeterRents(){
    this.controlService.getGeneralSetting("METERRATEGROUP").subscribe({
      next:(res)=>{
        this.meterRents =res
      }
    })
  }
  getMeterSizes(){
    this.controlService.getMeterSize().subscribe({
      next:(res)=>{
        this.meterSizes =res
      }
    })
  }

  submit() {

    if (this.MeterRateForm.valid) {

      let addMeterRate: IMeterSizeRentDto = {
        recordno:this.MeterRateForm.value.recordno,
        custCategoryCode: this.MeterRateForm.value.custCategoryCode,
        meterRent: this.MeterRateForm.value.meterRent,
        meterSizeCode: this.MeterRateForm.value.meterSizeCode,
        rentGroupCode:this.MeterRateForm.value.rentGroupCode
      }

      this.controlService.addMetersizeRent(addMeterRate).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })


    }
    else {


    }
  }

  update() {
    if (this.MeterRateForm.valid) {

      let addMeterRate: IMeterSizeRentDto = {
        custCategoryCode: this.MeterRateForm.value.custCategoryCode,
        meterRent: this.MeterRateForm.value.meterRent,
        meterSizeCode: this.MeterRateForm.value.meterSizeCode,
        rentGroupCode:this.MeterRateForm.value.rentGroupCode,
        recordno:this.MeterRate.recordno
      }

      this.controlService.updateMetersizeRent(addMeterRate).subscribe({
        next: (res) => {

          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal()

          } else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

          }

        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });

        }
      })


    }
    else {


    }

  }

  closeModal() {

    this.activeModal.close()

  }

}
