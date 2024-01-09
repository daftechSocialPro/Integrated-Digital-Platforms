// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexGrid,
  ApexStroke,
  ApexTooltip
} from 'ng-apexcharts';
import { IAccountPeriodDto } from 'src/models/system-control/IAccountPeriod';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  colors: string[];
  grid: ApexGrid;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  labels:any
};

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent {

  accountPeriod:IAccountPeriodDto
  months:IFiscalMonthDto[]
  monthName:string=""
 
  colorChart = ['#673ab7'];

  // Constructor
  constructor(
    private dataService :ScsDataService,
    private controlService:ScsSetupService) {

  }

  // Life cycle events
  ngOnInit(): void {

    
    
  }



}
