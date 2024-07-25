import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { DashboardNumericalDTo, FilterCriteriaDto } from '../admin-dashbord/IDashboardDto';

@Component({
  selector: 'app-board-member-dashbaord',
  templateUrl: './board-member-dashbaord.component.html',
  styleUrls: ['./board-member-dashbaord.component.scss']
})
export class BoardMemberDashbaordComponent implements OnInit {
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
    var filterCriteriaDto: FilterCriteriaDto = {
      regionId: this.selectedChapter,
      gender: this.selectedGender,
      paymentStatus: this.selectPaymentStatus
    };
    this.dashboardService.getNumbericalData(filterCriteriaDto).subscribe({
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
        orient: 'vertical',
        left: 'left',
        data: this.genderData.map((item) => item.name)
      },
      series: [
        {
          name: 'Gender',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: '{b}: {c}' // Add the value placeholder {c}
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
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
        }
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
          this.selectedChapter = this.userView.regionId;
          this.applyFilter();
        }
        this.getGenderChart();
        this.getMembershipTypeChart();
        this.getPaymentStatusChart();

        this.generate(this.currentYear.toString());
        this.generateYear();
        this.generateChapterChart()
      }
    });
  }
  applyFilter() {
    if (this.selectedChapter !== 'all') {
      const chapterSearchTerm = this.selectedChapter.toLowerCase();
      this.filterdMembers = this.members.filter((item) => {
        return item.region && item.regionId.toLowerCase() == this.selectedChapter.toLowerCase();
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
        orient: 'vertical',
        left: 'left',
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
            position: 'center',
            formatter: '{b}: {c}' // Add the value placeholder {c}
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: this.paymentStatusData,
          itemStyle: {
            color: function (params) {
              var colors = ['#FFB970', '#198754', '#dc3545'];
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
          type: 'bar',
          data: data
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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
              const yearSelect = document.createElement('select');
              for (let year = minYear; year <= maxYear; year++) {
                const option = document.createElement('option');
                option.value = year.toString();
                option.text = year.toString();
                if (year.toString() === selectedYear) {
                  option.selected = true;
                }
                yearSelect.appendChild(option);
              }
              yearSelect.onchange = (event) => {
                const target = event.target as HTMLSelectElement;
                this.generate(target.value);
              };
              const existingSelect = document.getElementById('yearSelect');
              if (existingSelect) {
                existingSelect.replaceWith(yearSelect);
              } else {
                yearSelect.id = 'yearSelect';
                document.body.appendChild(yearSelect);
              }
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
          type: 'bar',
          data: data
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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
    const chapterNames = this.chapters.map(chapter => chapter.name);
    const data = this.chapters.map(chapter => chapterCounts.get(chapter.id) || 0);

    this.chartOptions6 = {
      title: {
        text: '',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: chapterNames,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Number of Members'
      },
      series: [
        {
          type: 'bar',
          data: data
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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


  getName() {
    var response = this.chapters.filter((item) => {
      return item.id == this.selectedChapter;
    });

    return response ? response[0].name : '';
  }
}
