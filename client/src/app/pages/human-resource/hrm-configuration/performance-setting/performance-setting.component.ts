import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceSettingDto } from 'src/app/model/HRM/IPerformanceSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddPerformanceSettingComponent } from './add-performance-setting/add-performance-setting.component';

@Component({
  selector: 'app-performance-setting',
  templateUrl: './performance-setting.component.html',
  styleUrls: ['./performance-setting.component.css']
})
export class PerformanceSettingComponent implements OnInit  {

  performanceSettings!: PerformanceSettingDto[]
  constructor(private hrmService: HrmService,private modalService: NgbModal){}
  ngOnInit(): void {
    this.getPerformanceSetting()
  }

  getPerformanceSetting(){
    this.hrmService.getPerformanceSettings().subscribe({
      next:(res)=>{
        this.performanceSettings = res 
      }
    })
  }

  addPerformanceSetting(){
    let modalRef = this.modalService.open(AddPerformanceSettingComponent,{size:'lg', backdrop:'static'})
    modalRef.result.then(()=>{
      this.getPerformanceSetting()
    })

  }

  

}
