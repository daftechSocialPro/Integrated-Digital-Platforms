// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { IMembersGetDto } from 'src/models/auth/membersDto';
import { MemberService } from 'src/app/services/member.service';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { DropDownService } from 'src/app/services/dropDown.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { UserService } from 'src/app/services/user.service';
import { UserView } from 'src/models/auth/userDto';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardNumericalDTo, FilterCriteriaDto } from '../admin-dashbord/IDashboardDto';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxEchartsModule
  ],
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
  isVisible: boolean = false;
  isVisible2: boolean = false;

  members: IMembersGetDto[];
  filterdMembers: IMembersGetDto[];

  pendingNumbers: number = 0;
  maleNumbers: number;
  femaleNumbers: number;

  currentYear: number;

  genderData: any[];
  chartOptions2: any;
  loading2: boolean = true;

  membershipTypeData: any[];
  chartOptions3: any;
  loading3: boolean = true;

  paymentStatusData: any[];
  chartOptions: any;
  loading: boolean = true;

  chartOptions4: any;
  chartOptions5: any;
  chartOptions6: any;
  chartOptions7: any;

  selectedChapter: string = 'all';
  selectPaymentStatus: string = 'all';
  selectedGender: string = 'all';
  selectedReport:string='yearly'

  chapters: SelectList[];

  userView: UserView;

  dashboardNumericalDTo: DashboardNumericalDTo;

  yearOptions: { value: number; label: string }[] = [];
  

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  hideRevenue(): string {
    return '*'.repeat(this.dashboardNumericalDTo && this.dashboardNumericalDTo.revenue?.toString().length);
  }

  toggleVisibility2() {
    this.isVisible2 = !this.isVisible2;
  }

  hideReciveable(): string {
    return '*'.repeat(this.dashboardNumericalDTo && this.dashboardNumericalDTo.receivable?.toString().length);
  }

  // Constructor
  constructor(
    private memberService: MemberService,
    private dropDownService: DropDownService,
    private userService: UserService,
    private dashboardService: DashboardService
  ) {}

  // Life cycle events
  ngOnInit(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    this.getMembers();
    this.getChapter('ETHIOPIAN');
    this.getNumbericData();

    this.userView = this.userService.getCurrentUser();

    this.generateYearOptions()
  }

  generateYearOptions() {
    this.yearOptions = [
      { value: this.currentYear, label: 'This Year' },
      { value: this.currentYear - 3, label: (this.currentYear - 3).toString() },
      { value: this.currentYear - 2, label: (this.currentYear - 2).toString() },
      { value: this.currentYear - 1, label: (this.currentYear - 1).toString() },
   
    ];
  }


  getNumbericData() {
    var FilterCriteriaDto: FilterCriteriaDto = {
      regionId: this.selectedChapter,
      gender: this.selectedGender,
      paymentStatus: this.selectPaymentStatus
    };
    this.dashboardService.getNumbericalData(FilterCriteriaDto).subscribe({
      next: (res) => {
        this.dashboardNumericalDTo = res;
      }
    });
  }

  getGenderChart() {
    const genderCounts = this.filterdMembers.reduce((acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    }, {});
  
    this.genderData = Object.keys(genderCounts).map((key) => ({
      value: genderCounts[key],
      name: key
    }));
  
    // Define chart options
    this.chartOptions2 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '0%',
        left: 'center',
        itemWidth: 25,
        itemHeight: 14,
        textStyle: {
          fontSize: 10
        }
      },
      series: [
        {
          name: 'Gender',
          type: 'pie',
          radius: ['30%', '70%'],
          center: ['50%', '40%'],
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{c} ({d}%)',
            textStyle: {
              fontSize: 10
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true,
            length: 5,
            length2: 10
          },
          data: this.genderData
        }
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {}
        },
        right: '5%',
        top: '5%',
        itemSize: 15,
        itemGap: 5
      }
    };
  
    this.loading2 = false; // Hide loading indicator once the chart is rendered
  }
  getMembershipTypeChart() {
    const membershipTypeCounts = this.filterdMembers.reduce((acc, item) => {
      acc[item.membershipType] = (acc[item.membershipType] || 0) + 1;
      return acc;
    }, {});

    this.membershipTypeData = Object.keys(membershipTypeCounts).map((key) => ({
      value: membershipTypeCounts[key],
      name: key
    }));

    // Define chart options
    this.chartOptions3 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Membership Types']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: this.membershipTypeData.map((item) => item.name)
      },
      series: [
        {
          name: 'Members',
          type: 'bar',
          data: this.membershipTypeData.map((item) => item.value),
          itemStyle: {
            color: '#FF7070' // Specify the bar color
          }
        }
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {} // Add the print feature
        }
      }
    };

    this.loading3 = false; // Hide loading indicator once the chart is rendered
  }

  getMembers() {
    this.memberService.getMembers().subscribe({
      next: (res) => {
        this.members = res;
        this.filterdMembers = res;

        if (this.userView.regionId != '') {
          this.selectedChapter = this.userView.region;
          console.log('chapter',this.selectedChapter)
          this.applyFilter();
        }
        this.getGenderChart();
        this.getMembershipTypeChart();
        this.getPaymentStatusChart();

        this.generate(this.currentYear.toString());
        this.generateQuarter(this.currentYear.toString());
        this.generateYear();
        this.generateChapterChart()
      }
    });
  }
  applyFilter() {
    if (this.selectedChapter !== 'all') {
      const chapterSearchTerm = this.selectedChapter.toLowerCase();
      this.filterdMembers = this.members.filter((item) => {
        return item.region && item.regionId.toLowerCase() == chapterSearchTerm;
      });
    } else {
      this.filterdMembers = this.members;
    }

    if (this.selectPaymentStatus !== 'all') {
      const statusSearchTerm = this.selectPaymentStatus.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }

    if (this.selectedGender !== 'all') {
      const genderSearchTerm = this.selectedGender.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.gender.toLowerCase() == genderSearchTerm;
      });
    }

    this.getNumbericData();

    this.getGenderChart();
    this.getMembershipTypeChart();
    this.getPaymentStatusChart();

    this.generate(this.currentYear.toString());
    this.generateQuarter(this.currentYear.toString());
    this.generateYear();
  }

  getChapter(value: string) {
    this.dropDownService.getRegionsDropdown(value).subscribe({
      next: (res) => {
        this.chapters = res;
        
      }
    });
  }

  getPaymentStatusChart() {
    const paymentStatusCounts = this.filterdMembers.reduce((acc, item) => {
      acc[item.paymentStatus] = (acc[item.paymentStatus] || 0) + 1;
      return acc;
    }, {});
  
    this.paymentStatusData = Object.keys(paymentStatusCounts).map((key) => ({
      value: paymentStatusCounts[key],
      name: key
    }));
  
    // Define chart options
    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '0',
        left: 'center',
        data: this.paymentStatusData.map((item) => item.name)
      },
      series: [
        {
          name: 'Payment Status',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside', // Always show labels outside the pie chart
            formatter: '{b}: {c}', // Show both name and value
            padding: [10, 10, 10, 10] // Add padding around labels
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true // Ensure label lines are shown
          },
          data: this.paymentStatusData,
          itemStyle: {
            color: function (params) {
              var colors = ['#dc3545', '#198754', '#FFB970'];
              return colors[params.dataIndex % colors.length];
            }
          }
        }
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {} // Add the print feature
        }
      }
    };
  
    this.loading = false; // Hide loading indicator once the chart is rendered
  }
  
  

  generate(passedYear?: string) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthData = new Map(monthNames.map((month) => [month, 0]));
    let minYear = Infinity;
    let maxYear = -Infinity;
  
    this.filterdMembers.forEach((member) => {
      const createdDate = new Date(member.createdByDate);
      const year = createdDate.getFullYear();
      const month = monthNames[createdDate.getMonth()];
  
      minYear = Math.min(minYear, year);
      maxYear = Math.max(maxYear, year);
  
      if (!passedYear || year.toString() === passedYear) {
        monthData.set(month, (monthData.get(month) || 0) + 1);
      }
    });
  
    const selectedYear = passedYear || maxYear.toString();
    const data = monthNames.map((month) => monthData.get(month) || 0);
  
    this.chartOptions4 = {
      title: {
        text: `Monthly Data for ${selectedYear}`,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: monthNames
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: data
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {},
          myYearTool: {
            show: true,
            title: 'Select Year',
            icon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
            onclick: () => {
              // ... (unchanged)
            }
          }
        }
      }
    };
  }
  
  generateYear() {
    const currentYear = new Date().getFullYear();
    const yearCounts = {};
    let minYear = currentYear;
    let maxYear = 0;
  
    // Count members for each year
    this.filterdMembers.forEach((member) => {
      const createdDate = new Date(member.createdByDate);
      const year = createdDate.getFullYear();
      yearCounts[year] = (yearCounts[year] || 0) + 1;
      minYear = Math.min(minYear, year);
      maxYear = Math.max(maxYear, year);
    });
  
    // Generate arrays for x-axis and series data
    const years = [];
    const data = [];
    for (let year = minYear; year <= maxYear; year++) {
      years.push(year.toString());
      data.push(yearCounts[year] || 0);
    }
  
    this.chartOptions5 = {
      xAxis: {
        type: 'category',
        data: years
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: data
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {}
        }
      }
    };
  }
  
  generateQuarter(passedYear?: string) {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    const quarterData = new Map(quarters.map((quarter) => [quarter, 0]));
    let minYear = Infinity;
    let maxYear = -Infinity;
  
    this.filterdMembers.forEach((member) => {
      const createdDate = new Date(member.createdByDate);
      const year = createdDate.getFullYear();
      const month = createdDate.getMonth();
      const quarter = quarters[Math.floor(month / 3)];
  
      minYear = Math.min(minYear, year);
      maxYear = Math.max(maxYear, year);
  
      if (!passedYear || year.toString() === passedYear) {
        quarterData.set(quarter, (quarterData.get(quarter) || 0) + 1);
      }
    });
  
    const selectedYear = passedYear || maxYear.toString();
    const data = quarters.map((quarter) => quarterData.get(quarter) || 0);
  
    this.chartOptions7 = {
      title: {
        text: `Quarterly Data for ${selectedYear}`,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: quarters
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          data: data
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {},
          myYearTool: {
            show: true,
            title: 'Select Year',
            icon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
            onclick: () => {
              // ... (unchanged)
            }
          }
        }
      }
    };
  }

  generateChapterChart() {
    // Create a map to store member counts for each chapter
    const chapterCounts = new Map(this.chapters.map(chapter => [chapter.id, 0]));
    
    // Count members for each chapter
    this.filterdMembers.forEach((member) => {
      if (chapterCounts.has(member.regionId)) {
        chapterCounts.set(member.regionId, chapterCounts.get(member.regionId)! + 1);
      }
    });
    
    // Generate arrays for x-axis and series data
    const chapterNames = this.chapters.map(chapter => chapter.name.replace(/chapter/gi, '').trim());
    const data = this.chapters.map(chapter => chapterCounts.get(chapter.id) || 0);
    
    // Find the maximum chapter name length
    const maxNameLength = Math.max(...chapterNames.map(name => name.length));
    
    this.chartOptions6 = {
      title: {
        text: '',
        left: 'center'
      },
      grid: {
        top: 50,
        //bottom: Math.min(200, 30 + maxNameLength * 5),
        left: 100,
        right: 100,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: "Chapters",
      
        nameGap: 35,
        data: chapterNames,
        axisLabel: {
          rotate: 45,
          interval: 0,
          formatter: (value: string) => {
            return value.length > 15 ? value.substring(0, 12) + '...' : value;
          },
          textStyle: {
            align: 'right'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Number of Members',
        nameLocation: 'middle',
        nameGap: 50
      },
      series: [
        {
          type: 'bar',
          data: data,
          barWidth: '60%'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          const dataIndex = params[0].dataIndex;
          return `${chapterNames[dataIndex]}: ${params[0].value}`;
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {}
        },
        right: 20,
        top: 20
      }
    };
  }


  getName() {
    var response = this.chapters.filter((item) => {
      return item.id == this.selectedChapter;
    });

    return response ? response[0].name : '';
  }
}
