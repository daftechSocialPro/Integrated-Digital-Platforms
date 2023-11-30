import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DeviceSettingDto } from 'src/app/model/HRM/IDeviceSettingDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-device-settings',
  templateUrl: './add-device-settings.component.html',
  styleUrls: ['./add-device-settings.component.css']
})

export class AddDeviceSettingsComponent implements OnInit {


  deviceFormGroup!: FormGroup;
  user !: UserView;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private toastService: CommonService,
    private userService: UserService,
    private messageService: MessageService) {

    this.deviceFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      ip: ['', Validators.required],
      port: ['', Validators.required],
      com: ['', Validators.required],
    })

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.deviceFormGroup.valid) {

      var devicePost: DeviceSettingDto = {
        name: this.deviceFormGroup.value.name,
        ip: this.deviceFormGroup.value.ip,
        port: this.deviceFormGroup.value.port,
        model: this.deviceFormGroup.value.model,
        com: this.deviceFormGroup.value.com,
        createdById: this.user.userId
      }
      this.hrmService.addDeviceSetting(devicePost).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
        }
      })
    }

  }

}
