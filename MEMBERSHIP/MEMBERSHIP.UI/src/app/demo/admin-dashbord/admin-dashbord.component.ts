// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// Bootstrap Import
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// third party
import { NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
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
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { MemberService } from 'src/app/services/member.service';

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
};

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, SharedModule, NgApexchartsModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export default class AdminDashbordComponent {
  // private props
  @ViewChild('growthChart') growthChart: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  @ViewChild('bajajchart') bajajchart: ChartComponent;
  chartOptions1: Partial<ChartOptions>;
  monthChart: any;
  yearChart: any;
  colorChart = ['#673ab7'];

  members: IMembersGetDto[];

  pendingNumbers: number = 0;
  maleNumbers: number;
  femaleNumbers: number;

  revenue: number = 0;
  recivable: number = 0;

  currentYear:number

  // Constructor
  constructor(private memberService: MemberService) {
    this.chartOptions1 = {
      chart: {
        type: 'area',
        height: 95,
        stacked: true,
        sparkline: {
          enabled: true
        }
      },
      colors: ['#673ab7'],
      stroke: {
        curve: 'smooth',
        width: 1
      },

      series: [
        {
          data: [0, 15, 10, 50, 30, 40, 25]
        }
      ]
    };
  }

  // Life cycle events
  ngOnInit(): void {

    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    setTimeout(() => {
      this.monthChart = new ApexCharts(document.querySelector('#tab-chart-1'), this.monthOptions);
      this.monthChart.render();
    }, 500);

    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers().subscribe({
      next: (res) => {
        this.members = res;
      
        this.generate(this.currentYear.toString())
        this.getPendingMembers();
       
      }
    });
  }

  generate(passedYear:string){
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
    this.members.forEach(member => {
      const createdDate = new Date(member.createdByDate);
      const year = createdDate.getFullYear().toString();
      
      if (year === passedYear) {
        const month = createdDate.getMonth();
        data[month]++;
      }
    });

    

    this.chartOptions = {
      series: [
        {
          name: 'Members',
          data: data
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
      colors: ['#1e88e5', '#673ab7', '#ede7f6'],
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      grid: {
        strokeDashArray: 4
      },
      tooltip: {
        theme: 'dark'
      }
    };
    
  }
  // public Method
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      setTimeout(() => {
        this.monthChart = new ApexCharts(document.querySelector('#tab-chart-1'), this.monthOptions);
        this.monthChart.render();
      }, 200);
    }

    if (changeEvent.nextId === 2) {
      setTimeout(() => {
        this.yearChart = new ApexCharts(document.querySelector('#tab-chart-2'), this.yearOptions);
        this.yearChart.render();
      }, 200);
    }
  }

  ListGroup = [
    {
      name: 'Male',
      profit: '',
      invest: '4',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'Female',
      profit: '',
      invest: '3',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    }
  ];

  monthOptions = {
    chart: {
      type: 'line',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FFF'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'series1',
        data: [45, 66, 41, 89, 25, 44, 9, 54]
      }
    ],
    yaxis: {
      min: 5,
      max: 95
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return 'Total Earning';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  yearOptions = {
    chart: {
      type: 'line',
      height: 90,
      sparkline: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FFF'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    series: [
      {
        name: 'series1',
        data: [35, 44, 9, 54, 45, 66, 41, 69]
      }
    ],
    yaxis: {
      min: 5,
      max: 95
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return 'Total Earning';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  getPendingMembers() {
    this.pendingNumbers = this.members.filter((x) => x.paymentStatus != 'PAID').length;
    this.maleNumbers = this.members.filter((x) => x.gender != 'MALE').length;
    this.femaleNumbers = this.members.filter((x) => x.gender != 'FEMALE').length;
    this.members
      .filter((x) => x.paymentStatus == 'PAID')
      .map((item) => {
        this.revenue += item.amount;
      });
    this.members
      .filter((x) => x.paymentStatus != 'PAID')
      .map((item) => {
        this.recivable += item.amount;
      });
    //  this.recivable =  this.members.filter(x=>x.gender!="FEMALE").length
  }
}
