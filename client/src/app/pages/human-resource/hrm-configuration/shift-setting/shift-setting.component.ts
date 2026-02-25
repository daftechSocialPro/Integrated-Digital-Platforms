import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftListDto } from 'src/app/model/HRM/IShiftSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddShiftSettingComponent } from './add-shift-setting/add-shift-setting.component';
import { AddShiftDetailComponent } from './add-shift-detail/add-shift-detail.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-shift-setting',
  templateUrl: './shift-setting.component.html',
  styleUrls: ['./shift-setting.component.css']
})
export class ShiftSettingComponent implements OnInit {

  filterValue!:string
  shiftLists!: ShiftListDto[]


  constructor(private hrmService: HrmService, private modalService: NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getDevices();
  }


  getDevices() {
    this.hrmService.getShiftLists().subscribe({
      next: (res) => {
        this.shiftLists = res;
      }, error: (err) => {
       
      }
    })
  }


  addNew() {
    let modalRef = this.modalService.open(AddShiftSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getDevices()
    })
  }

  addNewDetail(shiftId: string){
    let modalRef = this.modalService.open(AddShiftDetailComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.shiftId = shiftId
    modalRef.result.then(() => {
      this.getDevices()
    });
  }

  update(shiftSetting: ShiftListDto) {
    let modalRef = this.modalService.open(AddShiftSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.shiftSetting = shiftSetting
    modalRef.result.then(() => {
      this.getDevices()
    });
  }

  delete(shiftSetting: ShiftListDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this shift setting?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteShift(shiftSetting.id!).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getDevices();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to delete shift setting" });
          }
        });
      }
    });
  }

  get filteredShiftSettings(): any[] {
    if (!this.filterValue) {
        return this.shiftLists;
    }
    
    const filterText = this.filterValue.toLowerCase();
    return this.shiftLists.filter((department: any) => {
        const shiftName = department.shiftName.toLowerCase();
        return shiftName.includes(filterText) ;
    });
  }



}
