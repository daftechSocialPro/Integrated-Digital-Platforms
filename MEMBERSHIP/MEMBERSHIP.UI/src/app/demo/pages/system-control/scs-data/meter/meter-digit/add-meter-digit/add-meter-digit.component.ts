import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';


@Component({
  selector: 'app-add-meter-digit',
  templateUrl: './add-meter-digit.component.html',
  styleUrls: ['./add-meter-digit.component.scss']
})
export class AddMeterDigitComponent implements OnInit {

  @Input() MeterDigit: IGeneralSettingDto
  MeterDigitForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.MeterDigit) {
      this.MeterDigitForm = this.formBuilder.group({

        digit: [this.MeterDigit.inputValues, Validators.required],

      })
    }
    else {
      this.MeterDigitForm = this.formBuilder.group({

        digit: ['', Validators.required],

      })
    }


  }

  submit() {

    if (this.MeterDigitForm.valid) {

      let addMeterDigit: IGeneralSettingDto = {
        inputValues: this.MeterDigitForm.value.digit,
        inputCategory: "METERDIGIT"
      }

      this.controlService.addGeneralSetting(addMeterDigit).subscribe({
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
    if (this.MeterDigitForm.valid) {

      let addMeterDigit: IGeneralSettingDto = {
        inputValues: this.MeterDigitForm.value.digit,
        inputCategory: "METERDIGIT",
        recordno: this.MeterDigit.recordno
      }

      this.controlService.updateGeneralSetting(addMeterDigit).subscribe({
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


