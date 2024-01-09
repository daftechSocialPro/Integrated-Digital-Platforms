import { Component, OnInit } from '@angular/core';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import {  IDwmReadingEfficencyReportDto } from 'src/models/dwm/IDWMReportDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-reading-efficency',
  templateUrl: './reading-efficency.component.html',
  styleUrls: ['./reading-efficency.component.scss']
})
export class ReadingEfficencyComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  EfficencyReadings: IDwmReadingEfficencyReportDto[];
  paginatedEfficencyReadings: IDwmReadingEfficencyReportDto[];

  months: IFiscalMonthDto[]
  selectedMonth: number
  year: number

  ngOnInit(): void {
    this.getMonth()
  }

  constructor(private dwmService: DWMService, private dataService: ScsDataService) {

  }

  getMonth() {

    this.dataService.getFiscalMonth().subscribe({
      next: (res) => {
        this.months = res
      }
    })
  }

  filter() {

    this.dwmService.getReadingEfficencyReport(this.selectedMonth, this.year).subscribe({

      next:(res)=>{
        this.EfficencyReadings =res 
        this.paginateCustomerCategories() 
      }

    })
  }


  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateCustomerCategories();
  }


  paginateCustomerCategories() {
    this.paginatedEfficencyReadings = this.EfficencyReadings.slice(this.first, this.first + this.rows);
  }


}

