import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-country-origin',
  templateUrl: './add-country-origin.component.html',
  styleUrls: ['./add-country-origin.component.scss']
})
export class AddCountryOriginComponent implements OnInit {

  @Input() CountyOrgin: IGeneralSettingDto
  CountyOrginForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.CountyOrgin) {
      this.CountyOrginForm = this.formBuilder.group({

        digit: [this.CountyOrgin.inputValues, Validators.required],

      })
    }
    else {
      this.CountyOrginForm = this.formBuilder.group({

        digit: ['', Validators.required],

      })
    }


  }

  submit() {

    if (this.CountyOrginForm.valid) {

      let addCountyOrgin: IGeneralSettingDto = {
        inputValues: this.CountyOrginForm.value.digit,
        inputCategory: "COUNTRYORIGIN"
      }

      this.controlService.addGeneralSetting(addCountyOrgin).subscribe({
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
    if (this.CountyOrginForm.valid) {

      let addCountyOrgin: IGeneralSettingDto = {
        inputValues: this.CountyOrginForm.value.digit,
        inputCategory: "COUNTRYORIGIN",
        recordno: this.CountyOrgin.recordno
      }

      this.controlService.updateGeneralSetting(addCountyOrgin).subscribe({
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