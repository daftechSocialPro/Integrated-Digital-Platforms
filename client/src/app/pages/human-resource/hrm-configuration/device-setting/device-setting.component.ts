import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceSettingDto } from 'src/app/model/HRM/IDeviceSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddDeviceSettingsComponent } from './add-device-settings/add-device-settings.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-device-setting',
  templateUrl: './device-setting.component.html',
  styleUrls: ['./device-setting.component.css']
})

export class DeviceSettingComponent implements OnInit {

  filterValue!:string
  deviceSettings!: DeviceSettingDto[]


  constructor(private hrmService: HrmService, private modalService: NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getDevices();
  }


  getDevices() {
    this.hrmService.getDeviceSettingList().subscribe({
      next: (res) => {
        this.deviceSettings = res;
      }, error: (err) => {
        
      }
    })
  }



  addNew() {
    let modalRef = this.modalService.open(AddDeviceSettingsComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getDevices()
    })
  }

  update(deviceSetting: DeviceSettingDto) {
    let modalRef = this.modalService.open(AddDeviceSettingsComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.deviceSetting = deviceSetting
    modalRef.result.then(() => {
      this.getDevices()
    });
  }

  delete(deviceSetting: DeviceSettingDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this device setting?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteDeviceSetting(deviceSetting.id!).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getDevices();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to delete device setting" });
          }
        });
      }
    });
  }

  get filteredDeviceSettings(): any[] {
    if (!this.filterValue) {
        return this.deviceSettings;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.deviceSettings.filter((department: any) => {
        const name = department.name.toLowerCase();
        const model = department.model.toLowerCase()
        
        
        return name.includes(filterText)||model.includes(filterText) ;
    });
  }


}
