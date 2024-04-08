import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayListDto } from 'src/app/model/configuration/IHolidayDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';

@Component({
  selector: 'app-holiday-setting',
  templateUrl: './holiday-setting.component.html',
  styleUrls: ['./holiday-setting.component.css']
})
export class HolidaySettingComponent  implements OnInit {
  
  holidays! : HolidayListDto[]

  constructor (private configService : ConfigurationService,private modalService:NgbModal){}


  ngOnInit(): void {

    this.getHolidayList()
    
  }

  

  getHolidayList (){
    this.configService.getHolidayList().subscribe({
      next:(res)=>{
          this.holidays = res
      },error:(err)=>{
        
      }
    })
  }


  addHoliday(){
    let modalRef = this.modalService.open(AddHolidayComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getHolidayList()
    })
  }

  updateHoliday (holiday :HolidayListDto){
    let modalRef = this.modalService.open(AddHolidayComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.holidayField = holiday
    modalRef.result.then(()=>{
      this.getHolidayList()
    })

  }




}