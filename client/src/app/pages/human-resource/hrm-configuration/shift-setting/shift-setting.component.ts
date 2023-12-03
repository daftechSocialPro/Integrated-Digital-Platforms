import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftListDto } from 'src/app/model/HRM/IShiftSettingDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddShiftSettingComponent } from './add-shift-setting/add-shift-setting.component';

@Component({
  selector: 'app-shift-setting',
  templateUrl: './shift-setting.component.html',
  styleUrls: ['./shift-setting.component.css']
})
export class ShiftSettingComponent implements OnInit {

  filterValue!:string
  shiftLists!: ShiftListDto[]


  constructor(private hrmService: HrmService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.getDevices();
  }


  getDevices() {
    this.hrmService.getShiftLists().subscribe({
      next: (res) => {
        this.shiftLists = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }


  addNew() {
    let modalRef = this.modalService.open(AddShiftSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getDevices()
    })
  }

  update(shiftSetting: ShiftListDto) {
    let modalRef = this.modalService.open(AddShiftSettingComponent, { size: 'lg', backdrop: 'static' })
    modalRef.componentInstance.shiftSetting = shiftSetting
    modalRef.result.then(() => {
      this.getDevices()
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
