import { Component, OnInit } from '@angular/core';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IDwmReadingAccuracyReportDto } from 'src/models/dwm/IDWMReportDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-reading-accuracy',
  templateUrl: './reading-accuracy.component.html',
  styleUrls: ['./reading-accuracy.component.scss']
})
export class ReadingAccuracyComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  AcurracyReadings: IDwmReadingAccuracyReportDto[];
  paginatedAcurracyReadings: IDwmReadingAccuracyReportDto[];

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

    this.dwmService.getGetReadingAccuracyReport(this.selectedMonth, this.year).subscribe({

      next:(res)=>{
        this.AcurracyReadings =res 
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
    this.paginatedAcurracyReadings = this.AcurracyReadings.slice(this.first, this.first + this.rows);
  }


}

