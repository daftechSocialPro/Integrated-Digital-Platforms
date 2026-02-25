import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceSettingDto } from 'src/app/model/HRM/IPerformanceSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddPerformanceSettingComponent } from './add-performance-setting/add-performance-setting.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-performance-setting',
  templateUrl: './performance-setting.component.html',
  styleUrls: ['./performance-setting.component.css']
})
export class PerformanceSettingComponent implements OnInit  {

  filterValue!:string
  performanceSettings!: PerformanceSettingDto[]
  constructor(private hrmService: HrmService,private modalService: NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService){}
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

  deletePerformanceSetting(performanceSetting: PerformanceSettingDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this setting?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deletePerformanceSetting(performanceSetting.id!).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getPerformanceSetting();
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

  get filteredPerformanceSettings(): any[] {
    if (!this.filterValue) {
        return this.performanceSettings;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.performanceSettings.filter((department: any) => {
        const performanceMonth = department.performanceMonth.toLowerCase();
       
        
        
        return performanceMonth.includes(filterText);
    });
  } 
  

}
