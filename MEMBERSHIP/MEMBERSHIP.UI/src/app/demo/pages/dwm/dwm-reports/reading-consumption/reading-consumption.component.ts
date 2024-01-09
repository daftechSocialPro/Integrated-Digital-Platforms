import { Component, OnInit } from '@angular/core';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IDwmReadingConsumptionReportDto } from 'src/models/dwm/IDWMReportDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-reading-consumption',
  templateUrl: './reading-consumption.component.html',
  styleUrls: ['./reading-consumption.component.scss']
})
export class ReadingConsumptionComponent implements OnInit {

  totalConsumption=0
  first: number = 0;
  rows: number = 5;
  ConsumptionReadings: IDwmReadingConsumptionReportDto[];
  paginatedConsumptionReadings: IDwmReadingConsumptionReportDto[];

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

    this.dwmService.getReadingConsumptionReport(this.selectedMonth, this.year).subscribe({

      next:(res)=>{
        this.ConsumptionReadings =res 
        this.totalConsumption = this.ConsumptionReadings.reduce((sum, item) => sum + item.consumption, 0);
        
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
    this.paginatedConsumptionReadings = this.ConsumptionReadings.slice(this.first, this.first + this.rows);
  }


}


