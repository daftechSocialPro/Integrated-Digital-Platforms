import { Component, OnInit } from '@angular/core';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IDWMReadingLogReportDto } from 'src/models/dwm/IDWMReportDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-reading-log',
  templateUrl: './reading-log.component.html',
  styleUrls: ['./reading-log.component.scss']
})
export class ReadingLogComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  readingLogs: IDWMReadingLogReportDto[];
  paginatedReadingLogs: IDWMReadingLogReportDto[];

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

    this.dwmService.getReadingLog(this.selectedMonth, this.year).subscribe({

      next: (res) => {
        this.readingLogs = res
        this.paginateReadingLogs()
      }

    })
  }


  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateReadingLogs();
  }


  paginateReadingLogs() {
    this.paginatedReadingLogs = this.readingLogs.slice(this.first, this.first + this.rows);
  }


}
