// Angular Import
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-default', 
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export default class AdminDashbordComponent implements OnInit {

  members: IMembersGetDto[];
  filterdMembers:IMembersGetDto[]

  pendingNumbers: number = 0;
  maleNumbers: number;
  femaleNumbers: number;
  revenue: number = 0;
  recivable: number = 0;
  currentYear:number;

  genderData: any[];
  chartOptions2: any;
  loading2:boolean=true;

  membershipTypeData: any[];
  chartOptions3: any;
  loading3: boolean = true;


  paymentStatusData: any[];
  chartOptions: any;
  loading:boolean=true

  chartOptions4: any;

  selectedChapter:string='all'
  selectPaymentStatus:string='all'

  chapters:SelectList[]

  userView : UserView
  

  // Constructor
  constructor(private memberService: MemberService,private dropDownService:DropDownService,private userService : UserService) {

  }
  

  // Life cycle events
  ngOnInit(): void {

    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();   

    this.getMembers();
    this.getChapter('ETHIOPIAN')

    this.userView = this.userService.getCurrentUser()



  }
  getGenderChart(){
    const genderCounts = this.filterdMembers.reduce((acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    }, {});

    this.genderData = Object.keys(genderCounts).map(key => ({
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
        data: this.genderData.map(item => item.name)
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
          data: this.genderData,
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

  getMembershipTypeChart(){
    const membershipTypeCounts = this.filterdMembers.reduce((acc, item) => {
      acc[item.membershipType] = (acc[item.membershipType] || 0) + 1;
      return acc;
    }, {});

    this.membershipTypeData = Object.keys(membershipTypeCounts).map(key => ({
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
        data: this.membershipTypeData.map(item => item.name)
      },
      series: [
        {
          name: 'Members',
          type: 'bar',
          data: this.membershipTypeData.map(item => item.value),
          itemStyle: {
            color: '#FF7070' // Specify the bar color
          }
        }
      ],toolbox: {
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
        this.filterdMembers=res

        if (this.userView.regionId!=""){
          this.selectedChapter = this.userView.regionId
          this.applyFilter()
        }
        this.getGenderChart();
        this.getMembershipTypeChart();
        this.getPaymentStatusChart();        
        this.getPendingMembers();
        this.generate(this.currentYear.toString())

       
      }
    });
  }
  applyFilter(){

    
    if (this.selectedChapter !== "all") {
      const chapterSearchTerm = this.selectedChapter.toLowerCase();
      this.filterdMembers = this.members.filter((item) => {
        return item.region && item.region.toLowerCase().includes(chapterSearchTerm);
      });
    
    }
    else{
      this.filterdMembers=this.members
    }

    if (this.selectPaymentStatus !== "all") {
      const statusSearchTerm = this.selectPaymentStatus.toLowerCase();
      this.filterdMembers = this.filterdMembers.filter((item) => {
        return item.paymentStatus.toLowerCase().includes(statusSearchTerm);
      });
    }

    
    this.getGenderChart()
    this.getMembershipTypeChart()
    this.getPaymentStatusChart()
    this.getPendingMembers()
    this.generate(this.currentYear.toString())
  }
  getChapter(value:string) {
    this.dropDownService.getRegionsDropdown(value).subscribe({
      next: (res) => {
        this.chapters = res
      }
    })
  }

  getPaymentStatusChart(){
    const paymentStatusCounts = this.filterdMembers.reduce((acc, item) => {
      acc[item.paymentStatus] = (acc[item.paymentStatus] || 0) + 1;
      return acc;
    }, {});

    this.paymentStatusData = Object.keys(paymentStatusCounts).map(key => ({
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
        data: this.paymentStatusData.map(item => item.name)
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
            color: function(params) {
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
 



  getPendingMembers() {
    this.pendingNumbers = this.filterdMembers.filter((x) => x.paymentStatus != 'PAID').length;

    this.revenue=0
    this.filterdMembers
      .filter((x) => x.paymentStatus == 'PAID')
      .map((item) => {
        this.revenue += item.amount;
      });
      this.recivable=0
    this.filterdMembers
      .filter((x) => x.paymentStatus != 'PAID')
      .map((item) => {
        this.recivable += item.amount;
      });
    //  this.recivable =  this.members.filter(x=>x.gender!="FEMALE").length
  }

  generate(passedYear:string){
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
  this.filterdMembers.forEach(member => {
    const createdDate = new Date(member.createdByDate);
    const year = createdDate.getFullYear().toString();

    if (year === passedYear) {
      const month = createdDate.getMonth();
      data[month]++;
    }
  });

  this.chartOptions4 = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
        print: {} // Add the print feature
      }
    }
  };
}
}
