import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IConsumptionLevelDto } from 'src/models/system-control/IConsumptionLevelDto';
import { IConsumptionTariffDto } from 'src/models/system-control/IConsumptionTariffDto';
import { ICustomerCategoryDto } from 'src/models/system-control/ICustomerCategoryDto';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';
import { IMeterSizeRentDto } from 'src/models/system-control/IMeterSizeRentDto';
@Component({
  selector: 'app-add-cons-tariff',
  templateUrl: './add-cons-tariff.component.html',
  styleUrls: ['./add-cons-tariff.component.scss']
})
export class AddConsTariffComponent implements OnInit {

  @Input() recordNo: number
  ConsumptionTariffForm!: FormGroup;
  ConsumptionTariff: IConsumptionTariffDto
  CustomerCategories: ICustomerCategoryDto[]
  ConsLevels: IConsumptionLevelDto[]
  RateGroup: IGeneralSettingDto[]
  ConsRanges: IConsumptionTariffDto[]
  Tarrif:IConsumptionTariffDto[]

  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.ConsumptionTariffForm = this.formBuilder.group({

      custCategoryCode: ['', Validators.required],
      tariffRate: ['', Validators.required],
      recordno: ['', Validators.required],
      consumption: ['', Validators.required],
      consRanges: ['', Validators.required],
      consLevels: ['', Validators.required],
      rateGroupCode: ['', Validators.required],
      
    })



    if (this.recordNo) {

      this.controlService.getConsumptionTariffForUpdate(this.recordNo).subscribe({
        next: (res) => {
         
          this.ConsumptionTariff = res
          this.ConsumptionTariffForm.controls['recordno'].setValue(this.ConsumptionTariff.recordno)
          this.ConsumptionTariffForm.controls['tariffRate'].setValue(this.ConsumptionTariff.tariffRate)
          this.ConsumptionTariffForm.controls['consumption'].setValue(this.ConsumptionTariff.consumption)
          this.ConsumptionTariffForm.controls['consRanges'].setValue(this.ConsumptionTariff.consRanges)
          this.ConsumptionTariffForm.controls['consLevels'].setValue(this.ConsumptionTariff.consLevels)
          this.ConsumptionTariffForm.controls['rateGroupCode'].setValue(this.ConsumptionTariff.rateGroupCode)
          this.ConsumptionTariffForm.controls['custCategoryCode'].setValue(this.ConsumptionTariff.custCategoryCode)


        }
      })

    }




    this.getCustomerCategories()
    this.getConsumptionLevels()
    this.getRentGroup()

  }


  getCustomerCategories() {
    this.controlService.getCustomerCategory().subscribe({
      next: (res) => {
        this.CustomerCategories = res
      }
    })
  }
  getConsumptionLevels() {
    this.controlService.getConsumptionLevel().subscribe({
      next: (res) => {
        this.ConsLevels = res
      }
    })
  }
  getRentGroup() {
    this.controlService.getGeneralSetting('TARIFFRATEGROUP').subscribe({
      next: (res) => {
        this.RateGroup = res
      }
    })

  }

  submit() {

    if (this.ConsumptionTariffForm.valid) {

      let addConsumptionTariff: IConsumptionTariffDto = {
        recordno: this.ConsumptionTariffForm.value.recordno,
        custCategoryCode: this.ConsumptionTariffForm.value.custCategoryCode,
        consumption: this.ConsumptionTariffForm.value.consumption,
        consRanges: this.ConsumptionTariffForm.value.consRanges,
        consLevels: this.ConsumptionTariffForm.value.consLevels,
        rateGroupCode: this.ConsumptionTariffForm.value.rateGroupCode,
        tariffRate: this.ConsumptionTariffForm.value.tariffRate
      }

      this.controlService.addConsumptionTariff(addConsumptionTariff).subscribe({
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
    if (this.ConsumptionTariffForm.valid) {

      let addConsumptionTariff: IConsumptionTariffDto = {
        recordno: this.ConsumptionTariffForm.value.recordno,
        custCategoryCode: this.ConsumptionTariffForm.value.custCategoryCode,
        consumption: this.ConsumptionTariffForm.value.consumption,
        consRanges: this.ConsumptionTariffForm.value.consRanges,
        consLevels: this.ConsumptionTariffForm.value.consLevels,
        rateGroupCode: this.ConsumptionTariffForm.value.rateGroupCode,
        tariffRate: this.ConsumptionTariffForm.value.tariffRate
      }

      this.controlService.updateConsumptionTariff(addConsumptionTariff).subscribe({
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
