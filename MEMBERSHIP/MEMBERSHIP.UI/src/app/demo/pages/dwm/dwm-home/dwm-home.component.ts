import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import ApexCharts from 'apexcharts';
import { ChartComponent, ApexChart } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/demo/default/default.component';
import { DWMService } from 'src/app/services/dwm/dwm.service';
import { ScsDataService } from 'src/app/services/system-control/scs-data.service';
import { ScsSetupService } from 'src/app/services/system-control/scs-setup.service';
import { IDWMDashboardDto } from 'src/models/dwm/IDWMDashboardDto';
import { IMobileUsersDto } from 'src/models/dwm/IMobileUsersDto';
import { IAccountPeriodDto } from 'src/models/system-control/IAccountPeriod';
import { IFiscalMonthDto } from 'src/models/system-control/IFiscalMonthDto';


export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dwm-home',
  templateUrl: './dwm-home.component.html',
  styleUrls: ['./dwm-home.component.scss']
})
export class DwmHomeComponent implements OnInit {
  // Constructor

  @ViewChild('growthChart') growthChart: ChartComponent;
  chartOptions: Partial<ChartOptions>;


  @ViewChild('growthChart2') growthChart2: ChartComponent;
  chartOptions2: Partial<ChartOptions>;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions4: Partial<ChartOptions2>;

  @ViewChild("chart1") chart2: ChartComponent;
  public chartOptions5: Partial<ChartOptions2>;



  // Constructor
  constructor(private dataService: ScsDataService,
    private dwmService: DWMService,
    private controlService: ScsSetupService) {

    this.chartOptions2 = {
      series: [
        {
          name: 'Customers',
          data: [35, 125, 35]
        }
      ],
      dataLabels: {
        enabled: false,

      },
      chart: {
        type: 'bar',
        height: 480,
        stacked: true,
        toolbar: {
          show: true
        }
      },
      colors: ['#1e88e5', '#ede7f6'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['Collected', 'Pending', 'Gps Encoded']
      },
      grid: {
        strokeDashArray: 4
      },
      tooltip: {
        theme: 'dark'
      }
    };


    this.chartOptions4 = {
      series: [35, 125, 35, 125, 50],
      chart: {
        width: 480,
        type: "pie"
      },
      labels: ["Zero Reading", "Reason Code", "Above Avg", "Below Avg", "Normal"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    
    this.chartOptions5 = {
      series: [35, 125],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Pending", "Collected"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getAccountPeriod()

  }


  accountPeriod: IAccountPeriodDto
  dashboardDetail: IDWMDashboardDto



  // Life cycle events

  getAccountPeriod() {
    this.controlService.getAccountPeriod().subscribe({
      next: (res) => {
        this.accountPeriod = res
        this.getDWMDashboardDetail()
      }
    })
  }


  getDWMDashboardDetail() {

    this.dwmService.getDWMDashboardDetail(this.accountPeriod.fiscalYear, this.accountPeriod.monthIndex).subscribe({
      next: (res) => {
        this.dashboardDetail = res

        this.chartOptions = {
          series: [
            {
              name: 'Consumptions',
              data: this.dashboardDetail.annuallyConsumption.map((item) => {
                return item.consumption
              })
            }
          ],
          dataLabels: {
            enabled: false
          },
          chart: {
            type: 'bar',
            height: 480,
            stacked: true,
            toolbar: {
              show: true
            }
          },
          colors: ['#673ab7', '#ede7f6'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }
          ],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%'
            }
          },
          xaxis: {
            type: 'category',
            categories: this.dashboardDetail.annuallyConsumption.map((item) => {
              return item.month_Name
            })
          },
          grid: {
            strokeDashArray: 4
          },
          tooltip: {
            theme: 'dark'
          }
        };
        this.chartOptions5.series = [this.dashboardDetail.pending, this.dashboardDetail.readed]
       
        this.chartOptions4.series = [this.dashboardDetail.readingTypeRatio.zeroReading, this.dashboardDetail.readingTypeRatio.reasonOfCode,
        this.dashboardDetail.readingTypeRatio.aboveAVG, this.dashboardDetail.readingTypeRatio.belowAVG, this.dashboardDetail.readingTypeRatio.normal]
        this.chartOptions2.series[0].data = [this.dashboardDetail.readed, this.dashboardDetail.gpsEncoded, this.dashboardDetail.pending]


      }
    })
  }
}
