import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IGeneralSettingDto } from 'src/models/system-control/IGeneralSettingDto';

@Component({
  selector: 'app-add-scs-miscellnaous-cost-type',
  templateUrl: './add-scs-miscellnaous-cost-type.component.html',
  styleUrls: ['./add-scs-miscellnaous-cost-type.component.scss']
})
export class AddScsMiscellnaousCostTypeComponent implements OnInit {

  @Input() ServiceCharge: IGeneralSettingDto
  ServiceChargeForm!: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private controlService: ScsDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.ServiceCharge) {
      this.ServiceChargeForm = this.formBuilder.group({
        name: [this.ServiceCharge.inputValues, Validators.required],

      })
    }
    else {
      this.ServiceChargeForm = this.formBuilder.group({

        name: ['', Validators.required],

      })
    }


  }

  submit() {

    if (this.ServiceChargeForm.valid) {

      let addServiceCharge: IGeneralSettingDto = {
        inputValues: this.ServiceChargeForm.value.name,
        inputCategory: "BILLADDITIONALCOSTNAME"
      }

      this.controlService.addGeneralSetting(addServiceCharge).subscribe({
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
    if (this.ServiceChargeForm.valid) {

      let addServiceCharge: IGeneralSettingDto = {
        inputValues: this.ServiceChargeForm.value.name,
        inputCategory: "SERVICECHARGENAME",
        recordno: this.ServiceCharge.recordno
      }

      this.controlService.updateGeneralSetting(addServiceCharge).subscribe({
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
    else { }
  }
  closeModal() {
    this.activeModal.close()
  }



}
