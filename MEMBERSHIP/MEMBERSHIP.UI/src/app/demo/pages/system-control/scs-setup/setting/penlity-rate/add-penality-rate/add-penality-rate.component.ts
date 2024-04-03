import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { IMeterSizeRentDto } from 'src/models/system-control/IMeterSizeRentDto';
import { IPenalityRateDto } from 'src/models/system-control/IPenalityRateDto';

@Component({
  selector: 'app-add-penality-rate',
  templateUrl: './add-penality-rate.component.html',
  styleUrls: ['./add-penality-rate.component.scss']
})
export class AddPenalityRateComponent implements OnInit {

  @Input() recordNo: number
  PenalityRate: IPenalityRateDto
  PenalityRateForm!: FormGroup;
  customerCategories: ICustomerCategoryDto[]
  MeterSizeRents: IMeterSizeRentDto[]

  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.PenalityRateForm = this.formBuilder.group({

      custCategoryCode: ['', Validators.required],
      penalityGroupCode: ['', Validators.required],
      recordno: ['', Validators.required],
      penalityAmount: ['', Validators.required],
      noOfMonth: ['', Validators.required, Validators.maxLength(10)],


    })

    if (this.recordNo) {

      this.controlService.getPenalityRateForUpdate(this.recordNo).subscribe({
        next: (res) => {
         
          this.PenalityRate = res
          this.PenalityRateForm.controls['recordno'].setValue(this.PenalityRate.recordno)
          this.PenalityRateForm.controls['penalityGroupCode'].setValue(this.PenalityRate.penalityGroupCode)
          this.PenalityRateForm.controls['noOfMonth'].setValue(this.PenalityRate.noOfMonth)
          this.PenalityRateForm.controls['penalityAmount'].setValue(this.PenalityRate.penalityAmount)
          this.PenalityRateForm.controls['custCategoryCode'].setValue(this.PenalityRate.custCategoryCode)


        }
      })

    }




    this.getCustomerCategories()
    this.getMeterSizeRents()

  }

  getCustomerCategories() {
    this.controlService.getCustomerCategory().subscribe({
      next: (res) => {
        this.customerCategories = res
      }
    })
  }
  getMeterSizeRents() {
    this.controlService.getMeterSizeRents().subscribe({
      next: (res) => {
        this.MeterSizeRents = res
      }
    })
  }
  // getMeterSizeRentForUpdate(){
  //   this.controlService.getMeterSizeRentForUpdate(this.recordNo).subscribe({
  //     next:(res)=>{
  //       this.MeterSizeRents =res
  //     }
  //   })
  // }

  submit() {

    if (this.PenalityRateForm.valid) {

      let addPenalityRate: IPenalityRateDto = {
        recordno: this.PenalityRateForm.value.recordno,
        custCategoryCode: this.PenalityRateForm.value.custCategoryCode,
        penalityAmount: this.PenalityRateForm.value.penalityAmount,
        noOfMonth: this.PenalityRateForm.value.noOfMonth,
        penalityGroupCode: this.PenalityRateForm.value.penalityGroupCode
      }

      this.controlService.addPenalityRate(addPenalityRate).subscribe({
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
    if (this.PenalityRateForm.valid) {

      let addPenalityRate: IPenalityRateDto = {
        custCategoryCode: this.PenalityRateForm.value.custCategoryCode,
        penalityAmount: this.PenalityRateForm.value.penalityAmount,
        noOfMonth: this.PenalityRateForm.value.noOfMonth,
        penalityGroupCode: this.PenalityRateForm.value.penalityGroupCode,
        recordno: this.PenalityRate.recordno
      }

      this.controlService.updatePenalityRate(addPenalityRate).subscribe({
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
