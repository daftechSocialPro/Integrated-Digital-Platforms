import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { SelectList } from 'src/models/ResponseMessage.Model';
import { IMembersGetDto } from 'src/models/auth/membersDto';
import { UserView } from 'src/models/auth/userDto';
import { PaginationRequest, PaginatedResponse } from 'src/models/pagination.model';

@Component({
  selector: 'app-membership-report',
  templateUrl: './membership-report.component.html',
  styleUrls: ['./membership-report.component.scss']
})
export class MembershipReportComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  Members: IMembersGetDto[];
  allMembersForCharts: IMembersGetDto[] = []; // Keep all data for charts
  searchTerm: string = '';
  chapters: SelectList[];
  memberships: SelectList[];
  selectedMembership: string = '';
  loading: boolean = false;

  memberType: string = '';
  @ViewChild('stockReportIframe') stockReportIframe: ElementRef;
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  selectedChapter: string = '';
  selectedGender: string = '';
  selectedStatus: string = '';
  fromDate: string;
  toDate: string;

  paymentStatusData: any[];
  chartOptions: any;
  chartLoading: boolean = true;
  chartsLoaded: boolean = false;
  loadingCompleteData: boolean = false;

  genderData: any[];
  chartOptions2: any;
  loading2: boolean = true;

  membershipTypeData: any[];
  chartOptions3: any;
  loading3: boolean = true;
  userView: UserView;

  ngOnInit(): void {
    this.userView = this.userService.getCurrentUser();
    
    // Load table data first (fast)
    this.loadMembers();

    if (this.userView.regionId != '') {
      this.getRegions('ETHIOPIAN');
    }
    
    // Load chart data in background using Promise to avoid blocking main thread
    Promise.resolve().then(() => {
      this.loadAllMembersForCharts();
    });
  }

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private controlService: MemberService,
    private dropDownService: DropDownService
  ) {}

  loadMembers() {
    this.loading = true;
    const request: PaginationRequest = {
      pageNumber: Math.floor(this.first / this.rows) + 1,
      pageSize: this.rows,
      searchTerm: this.searchTerm || undefined,
      regionId: this.selectedChapter || undefined,
      gender: this.selectedGender || undefined,
      paymentStatus: this.selectedStatus || undefined,
      membershipTypeId: this.selectedMembership || undefined,
      fromDate: this.fromDate ? new Date(this.fromDate) : undefined,
      toDate: this.toDate ? new Date(this.toDate) : undefined,
      sortBy: 'fullname',
      sortDirection: 'asc'
    };

    // Apply user role filtering
    if (this.userView && this.userView.role && this.userView.role.includes('RegionAdmin')) {
      request.regionId = this.userView.region;
    }

    this.controlService.getMembersPaginated(request).subscribe({
      next: (response: PaginatedResponse<IMembersGetDto>) => {
        this.Members = response.data;
        this.totalRecords = response.totalCount;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading members:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load members'
        });
      }
    });
  }

  loadAllMembersForCharts() {
    // Load chart data with a more efficient approach - get summary data instead of all records
    this.loadChartDataEfficiently();
  }

  private loadChartDataEfficiently() {
    // For charts, we don't need all individual records, just aggregated data
    // Load a smaller sample for chart generation
    const request: PaginationRequest = {
      pageNumber: 1,
      pageSize: 200, // Much smaller sample for charts
      regionId: this.userView && this.userView.role && this.userView.role.includes('RegionAdmin') ? this.userView.region : undefined,
      sortBy: 'fullname',
      sortDirection: 'asc'
    };

    this.controlService.getMembersPaginated(request).subscribe({
      next: (response: PaginatedResponse<IMembersGetDto>) => {
        // Use the sample data for charts - this is much faster
        this.allMembersForCharts = response.data;
        this.getPaymentStatusChart();
        this.getGenderChart();
        this.getMembershipTypeChart();
        this.chartsLoaded = true;
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        this.chartLoading = false;
        this.loading2 = false;
        this.loading3 = false;
        this.chartsLoaded = true; // Show charts even if there's an error
      }
    });
  }

  private loadAllMembersRecursively(pageNumber: number, allMembers: IMembersGetDto[]) {
    const request: PaginationRequest = {
      pageNumber: pageNumber,
      pageSize: 500, // Smaller page size for faster loading
      regionId: this.userView && this.userView.role && this.userView.role.includes('RegionAdmin') ? this.userView.region : undefined,
      sortBy: 'fullname',
      sortDirection: 'asc'
    };

    this.controlService.getMembersPaginated(request).subscribe({
      next: (response: PaginatedResponse<IMembersGetDto>) => {
        allMembers = allMembers.concat(response.data);
        
        // Check if we need to fetch more pages
        const totalPages = Math.ceil(response.totalCount / 500);
        if (pageNumber < totalPages) {
          // Fetch next page
          this.loadAllMembersRecursively(pageNumber + 1, allMembers);
        } else {
          // All data loaded, generate charts
          this.allMembersForCharts = allMembers;
          this.getPaymentStatusChart();
          this.getGenderChart();
          this.getMembershipTypeChart();
          this.chartsLoaded = true;
          this.loadingCompleteData = false;
        }
      },
      error: (error) => {
        console.error('Error loading all members for charts:', error);
        this.chartLoading = false;
        this.loading2 = false;
        this.loading3 = false;
      }
    });
  }

  loadCompleteChartData() {
    this.loadingCompleteData = true;
    // Load all data for complete chart accuracy
    this.loadAllMembersRecursively(1, []);
  }

  getMemberss() {
    this.loadMembers();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.loadMembers();
  }

  applyFilter() {
    this.first = 0; // Reset to first page when filtering
    this.loadMembers();
  }

  getPaymentStatusChart() {
    const paymentStatusCounts = this.allMembersForCharts.reduce((acc, item) => {
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

    this.chartLoading = false; // Hide loading indicator once the chart is rendered
  }

  getGenderChart() {
    const genderCounts = this.allMembersForCharts.reduce((acc, item) => {
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
    const membershipTypeCounts = this.allMembersForCharts.reduce((acc, item) => {
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

  getRegions(countryType: string) {
    this.getChapter(countryType);
  }

  getChapter(value: string) {
    this.dropDownService.getRegionsDropdown(value).subscribe({
      next: (res) => {
        this.chapters = res;

        if (this.userView.regionId != '') {
          this.selectedChapter = this.userView.regionId;
        }
      }
    });
  }

  getMemberships(category: string) {
    this.dropDownService.getMembershipDropDown(category).subscribe({
      next: (res) => {
        this.memberships = res;
      }
    });
  }

  reset() {
    this.searchTerm = '';
    this.selectedChapter = '';
    this.selectedGender = '';
    this.selectedStatus = '';
    this.selectedMembership = '';
    this.fromDate = '';
    this.toDate = '';
    this.first = 0;
    this.loadMembers();
  }

  exportAsExcel(name: string) {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function (s: any) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    const format = function (s: any, c: any) {
      return s.replace(/{(\w+)}/g, function (m: any, p: any) {
        return c[p];
      });
    };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
}
