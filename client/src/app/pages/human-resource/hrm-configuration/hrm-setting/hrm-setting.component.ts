import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrmSettingDto } from 'src/app/model/HRM/IHrmSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddHrmSettingComponent } from './add-hrm-setting/add-hrm-setting.component';
import { UpdateHrmSettingComponent } from './update-hrm-setting/update-hrm-setting.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-hrm-setting',
  templateUrl: './hrm-setting.component.html',
  styleUrls: ['./hrm-setting.component.css']
})
export class HrmSettingComponent implements OnInit  {

  filterValue!:string
  hrmSettings!: HrmSettingDto[]
  constructor(private hrmService: HrmService,private modalService: NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService){}
  ngOnInit(): void {
    
    this.getHrmSettings()
  }

  getHrmSettings(){
    this.hrmService.getHrmSettings().subscribe({
      next:(res)=>{
        this.hrmSettings = res 
      }
    })
  }

  addHrmSetting(){

    let modalRef = this.modalService.open(AddHrmSettingComponent,{size:'lg', backdrop:'static'})

    modalRef.result.then(()=>{
      this.getHrmSettings()
    })

  }

  updateHrmSetting(hrmSetting:HrmSettingDto){
    let modalRef = this.modalService.open(UpdateHrmSettingComponent,{size:'lg', backdrop:'static'})
    modalRef.componentInstance.hrmSetting = hrmSetting
    modalRef.result.then(()=>{
      this.getHrmSettings()
    })
  }

  deleteHrmSetting(hrmSetting: HrmSettingDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this setting?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteHrmSetting(hrmSetting.id!).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getHrmSettings();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to delete setting" });
          }
        });
      }
    });
  }

  get filteredHrmSettings(): any[] {
    if (!this.filterValue) {
        return this.hrmSettings;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.hrmSettings.filter((department: any) => {
        const departmentName = department.generalSetting.toLowerCase();
        
        
        return departmentName.includes(filterText) ;
    });
  }

}
