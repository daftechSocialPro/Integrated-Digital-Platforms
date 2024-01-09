import { Component, OnInit } from '@angular/core';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { IDWMPendingLogReportDto } from 'src/models/dwm/IDWMReportDto';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';

@Component({
  selector: 'app-pending-log',
  templateUrl: './pending-log.component.html',
  styleUrls: ['./pending-log.component.scss']
})
export class PendingLogComponent implements OnInit {

  first: number = 0;
  rows: number = 5;
  pendingLogs: IDWMPendingLogReportDto[];
  paginatedpendingLogs: IDWMPendingLogReportDto[];

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

    this.dwmService.getPendingLog(this.selectedMonth, this.year).subscribe({

      next:(res)=>{
        this.pendingLogs =res 
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
    this.paginatedpendingLogs = this.pendingLogs.slice(this.first, this.first + this.rows);
  }


}
