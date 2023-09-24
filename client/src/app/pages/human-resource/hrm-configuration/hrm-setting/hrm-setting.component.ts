import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HrmSettingDto } from 'src/app/model/HRM/IHrmSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddHrmSettingComponent } from './add-hrm-setting/add-hrm-setting.component';
import { UpdateHrmSettingComponent } from './update-hrm-setting/update-hrm-setting.component';

@Component({
  selector: 'app-hrm-setting',
  templateUrl: './hrm-setting.component.html',
  styleUrls: ['./hrm-setting.component.css']
})
export class HrmSettingComponent implements OnInit  {

  hrmSettings!: HrmSettingDto[]
  constructor(private hrmService: HrmService,private modalService: NgbModal){}
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

}
