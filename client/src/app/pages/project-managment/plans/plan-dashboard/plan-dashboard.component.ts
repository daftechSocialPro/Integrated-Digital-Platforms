import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PlanBarChartPostDto,
  PlanPieChartPostDto,
  PlanView,
  StrategicPlanReportDto,
} from 'src/app/model/PM/PlansDto';
import { UserView } from 'src/app/model/user';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';
import { EChartsOption } from 'echarts';
import { DropDownService } from 'src/app/services/dropDown.service';
import { SelectList } from 'src/app/model/common';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css'],
})
export class PlanDashboardComponent implements OnInit {
  user!: UserView;
  planId!: string;
  pieChartData!: PlanPieChartPostDto;
  barChartData!: PlanBarChartPostDto;
  pieChartOption!: EChartsOption;

  pieChartOptions: any[]=[]

  barChartOptions: any[]=[]
  bar2ChartOptions: any[]=[];


  barChartOption!: EChartsOption;
  bar2ChartOption!: EChartsOption;

  Quarter: number = 0;
  chartdata: any[];
  chartdata1
  chartdata1Act: any[];
  chartdata1Pla: any[];
  chartdata2: any[];
  chartdata2Act: any[];
  chartdata2Pla: any[];
  Plans: PlanView[] = [];
  selectedProject: string;
  selectedYear:number =0

  activityStatusCheckBox: boolean = true;
  budgetCheckeBox: boolean = true;
  accomplitiomentCheckBox: boolean = true;
  overAllProgress: boolean = true;

  strategicPlans: SelectList[];
  selectedStrategicPlan: string='';
  currentYear : number 
  yearOptions:any[]=[]

  strategicPlanReportDtos :StrategicPlanReportDto[]=[]


  budgetOption:any;
  progressOption:any;



  constructor(
    @Inject(DOCUMENT) private document: Document,
    private planService: PlanService,
    private dropDownService: DropDownService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.document.body.classList.toggle('toggle-sidebar');
    this.user = this.userService.getCurrentUser();
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();

    this.generateYearOptions();

    this.selectedYear= this.currentYear
    this.listPlans()
    this.getStrategicPlans()
    
  }

  generateYearOptions() {
    this.yearOptions = [
      { value: this.currentYear, label: 'This Year' },
      { value: this.currentYear - 1, label: (this.currentYear - 1).toString() },
      { value: this.currentYear - 2, label: (this.currentYear - 2).toString() },
      { value: this.currentYear - 3, label: (this.currentYear - 3).toString() },
   
    ];
  }

  getStrategicPlans() {
    this.dropDownService.getStrategicPlans().subscribe({
      next: (res) => {
   
        this.strategicPlans = res;
      },
    });
  }

  getStrategicPlanReports (){
    this.planService.getStrategicPlanReport().subscribe({
      next:(res)=>{
        this.strategicPlanReportDtos = res;
        this.initCharts();
      }
    })
  }


afterSelectedYear(){

  this.listPlans()
}

  resetVariables() {
    this.planId = '';
    this.pieChartData = {} as PlanPieChartPostDto;
    this.barChartData = {} as PlanBarChartPostDto;
    this.pieChartOption = {} as EChartsOption;
  
    this.pieChartOptions = [];
  
    this.barChartOptions = [];
    this.bar2ChartOptions = [];
  
    this.barChartOption = {} as EChartsOption;
    this.bar2ChartOption = {} as EChartsOption;
  
    this.Quarter = 0;
    this.chartdata = [];
    this.chartdata1 = null;
    this.chartdata1Act = [];
    this.chartdata1Pla = [];
    this.chartdata2 = [];
    this.chartdata2Act = [];
    this.chartdata2Pla = [];
    this.Plans = [];
    this.selectedProject = '';
     // this.selectedYear = 0;
  
    this.activityStatusCheckBox = true;
    this.budgetCheckeBox = true;
    this.accomplitiomentCheckBox = true;
    this.overAllProgress = true;
  
    // this.strategicPlans = [];
    // this.selectedStrategicPlan = '';
 
  }
  

  filterStrategicPlans() {

if(this.selectedStrategicPlan=="ALL") {

  this.getStrategicPlanReports()
}else {


    this.selectedProject = '00000000-0000-0000-0000-000000000000';
    this.planId = this.selectedProject;
    this.getPieChatData(this.planId, 0);
    this.getBarChatData(this.planId);
}
  }

  listPlans() {
    debugger
    this.resetVariables();
    if (this.user.role.includes('PM-ADMIN')) {
      this.planService.getPlans(null,this.selectedYear).subscribe({
        next: (res) => {

          console.log(res)
          var plan = {
            id: '30fc30dc-eb56-4f40-9510-54ad983e759a',
            planName: 'ALL',
            plandBudget: 0,
            remainingBudget: 0,
            projectManager: '',
            planWeight: 0,
            financeManager: '',
            director: '',
            structureName: '',
            projectType: '',
            numberOfTask: 0,
            numberOfActivities: 0,
            numberOfTaskCompleted: 0,
            hasTask: 1,
            goal: '',
            objective: '',
            startDate: '',
            endDate: '',
            projectNumber: '',
            projectFunds: [''],
            projectFundIds: [''],
            projectManagerId: '',
            structureId: '',
          };
          this.Plans.push(plan);
          res.map((item) => {
            this.Plans.push(item);
            this.planService
              .getPlanPieCharts(item.id, "00000000-0000-0000-0000-000000000000", 0,this.selectedYear)
              .subscribe({
                next: (res) => {
                  let pieChartData = res;
                  let chartdata = pieChartData?.chartDataSets?.map((x) => ({
                    value: x.data,
                    name: x.label,
                  }));
                  let pieChartOption = 
                  {
                    title: { planId: item.id},
                    tooltip: {
                      trigger: 'item',
                      formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                      orient: 'vertical',
                      left: 'left',
                     
                      //data: this.paymentStatusData.map(item => item.name)
                    },
                    series: [
                      {
                        name: '',
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
                        data: chartdata,
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
                
                  this.pieChartOptions.push(pieChartOption);
                },
              });


              this.planService
              .getPlanBarCharts(item.id, "00000000-0000-0000-0000-000000000000",this.selectedYear)
              .subscribe({
                next: (res) => {
                  let barChartData = res;
                  this.chartdata1Act = barChartData?.progressChartDataSets?.map(
                    (x) => ({ value: x.data.actual })
                  );
                
                  this.chartdata1Pla = barChartData?.progressChartDataSets?.map(
                    (x) => ({ value: x.data.planned })
                  );
                
                  this.chartdata2Act = barChartData?.budgetChartDataSets?.map(
                    (x) => ({ value: x.data.actual })
                  );
                  this.chartdata2Pla = barChartData?.budgetChartDataSets?.map(
                    (x) => ({ value: x.data.planned })
                  );
                
                  let barChartOption = {
                    tooltip: {
                      planid: item.id,
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow'
                      },
                      formatter: (params) => {
                        let result = `${params[0].axisValue}<br/>`;
                        params.forEach(item => {
                          let percentage = 0;
                          if (item.seriesName === 'Actual Progress') {
                            let planned = this.chartdata1Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                            percentage = Number(((item.value / planned) * 100).toFixed(2));
                          }
                          result += `${item.marker} ${item.seriesName}: ${item.value}  ${item.seriesName === 'Actual Progress' ? percentage + '%' : ''}<br/>`;
                        });
                        return result;
                      }
                    },
                    legend: {
                      data: ['Actual Progress', 'Planned Progress']
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    xAxis: [{
                      type: 'category',
                      data: [
                        'January - March',
                        'April - June',
                        'July - September',
                        'October - December',
                      ],
                      axisTick: {
                        alignWithLabel: true
                      }
                    }],
                    yAxis: [{
                      type: 'value'
                    }],
                    series: [{
                      name: 'Actual Progress',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata1Act,
                      label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                      }
                    },
                    {
                      name: 'Planned Progress',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata1Pla,
                      label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                      }
                    }],
                    toolbox: {
                      feature: {
                        saveAsImage: {},
                        restore: {},
                        dataView: {},
                        print: {}
                      }
                    }
                  };
                
                  let bar2ChartOption = {
                    tooltip: {
                      planid: item.id,
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow'
                      },
                      formatter: (params) => {
                        let result = `${params[0].axisValue}<br/>`;
                        params.forEach(item => {
                          let percentage = 0;
                          if (item.seriesName === 'Utilized Budget') {
                            let planned = this.chartdata2Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                            percentage = Number(((item.value / planned) * 100).toFixed(2));
                          }
                          result += `${item.marker} ${item.seriesName}: ${item.value}  ${item.seriesName === 'Utilized Budget' ? percentage + '%' : ''}<br/>`;
                        });
                        return result;
                      }
                    },
                    legend: {
                      data: ['Utilized Budget', 'Planned Budget']
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    xAxis: [{
                      type: 'category',
                      data: [
                        'January - March',
                        'April - June',
                        'July - September',
                        'October - December',
                      ],
                      axisTick: {
                        alignWithLabel: true
                      }
                    }],
                    yAxis: [{
                      type: 'value'
                    }],
                    series: [{
                      name: 'Utilized Budget',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata2Act,
                      label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                      }
                    },
                    {
                      name: 'Planned Budget',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata2Pla,
                      label: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}'
                      }
                    }],
                    toolbox: {
                      feature: {
                        saveAsImage: {},
                        restore: {},
                        dataView: {},
                        print: {}
                      }
                    }
                  };
                
                  this.barChartOptions.push(barChartOption);
                  this.bar2ChartOptions.push(bar2ChartOption);
                }
                
                
              });
          });

       

          if (res) {
            this.selectedProject = plan.id;
            this.onProjectChange();
          }
        },
        error: (err) => {
       
        },
      });
    } else {
      this.planService.getPlans(this.user.employeeId,this.selectedYear).subscribe({
        next: (res) => {   
          this.Plans = res;
          if (res) {
            this.selectedProject = res[0].id;
            this.onProjectChange();
          }
        },
        error: (err) => {
        
        },
      });
    }
  }

  

  onProjectChange() {
    this.selectedStrategicPlan = '00000000-0000-0000-0000-000000000000';
    this.planId = this.selectedProject;
    this.getPieChatData(this.planId, 0);
    this.getBarChatData(this.planId);

    if (this.planId != '30fc30dc-eb56-4f40-9510-54ad983e759a') {

      this.overAllProgress= false
    }

    if (this.planId == '30fc30dc-eb56-4f40-9510-54ad983e759a') {
      //this.fetchPieChartOptions()
     
    }
  }

  getPieChatData(planId: string, quarter: number) {
    this.planService
      .getPlanPieCharts(planId, this.selectedStrategicPlan, quarter,this.selectedYear)
      .subscribe({
        next: (res) => {
          (this.pieChartData = res),
            (this.chartdata = this.pieChartData?.chartDataSets?.map((x) => ({
              value: x.data,
              name: x.label,
            })));
       

          this.pieChartOption = 

          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              //data: this.paymentStatusData.map(item => item.name)
            },
            series: [
              {
                name: '',
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
                data: this.chartdata,
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
          
          // {
          //   title: {
          //     // text: this.pieChartData.planName.length > 30 ? this.pieChartData.planName.slice(0, 30) + '...' : this.pieChartData.planName,
          //     // subtext: 'Data',
          //     left: 'right',
          //   },
          //   tooltip: {
          //     trigger: 'item',
          //   },
          //   legend: {
          //     orient: 'vertical',
          //     left: 'left',
          //   },
          //   series: [
          //     {
          //       name: 'Access From',
          //       type: 'pie',
          //       radius: '75%',
          //       data: this.chartdata,
          //       emphasis: {
          //         itemStyle: {
          //           shadowBlur: 10,
          //           shadowOffsetX: 0,
          //           shadowColor: 'rgba(0, 0, 0, 0.5)',
          //         },
          //       },
          //     },
          //   ],
          // };
        },
      });
  }

  getBarChatData(planId: string) {
    this.planService
      .getPlanBarCharts(planId, this.selectedStrategicPlan, this.selectedYear)
      .subscribe({
        next: (res) => {
          this.barChartData = res;
          this.chartdata1Act = this.barChartData?.progressChartDataSets?.map(
            (x) => ({ value: x.data.actual })
          );
        
          this.chartdata1Pla = this.barChartData?.progressChartDataSets?.map(
            (x) => ({ value: x.data.planned })
          );
        
          this.chartdata2Act = this.barChartData?.budgetChartDataSets?.map(
            (x) => ({ value: x.data.actual })
          );
          this.chartdata2Pla = this.barChartData?.budgetChartDataSets?.map(
            (x) => ({ value: x.data.planned })
          );
        
          this.barChartOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              formatter: (params) => {
                let result = `${params[0].axisValue}<br/>`;
                params.forEach(item => {
                  let percentage = 0;
                  if (item.seriesName === 'Actual Progress') {
                    let planned = this.chartdata1Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                    percentage = Number(((item.value / planned) * 100).toFixed(2));
                  }
                  result += `${item.marker} ${item.seriesName}: ${item.value}  ${item.seriesName === 'Actual Progress' ? percentage + '%' : ''}<br/>`;
                });
                return result;
              }
            },
            legend: {
              data: ['Actual Progress', 'Planned Progress']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: [
                'January - March',
                'April - June',
                'July - September',
                'October - December',
              ],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: 'Actual Progress',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata1Act,
              label: {
                show: true,
                position: 'inside',
                formatter: '{c}'
              }
            },
            {
              name: 'Planned Progress',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata1Pla,
              label: {
                show: true,
                position: 'inside',
                formatter: '{c}'
              }
            }],
            toolbox: {
              feature: {
                saveAsImage: {},
                restore: {},
                dataView: {},
                print: {}
              }
            }
          };
        
          this.bar2ChartOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              formatter: (params) => {
                let result = `${params[0].axisValue}<br/>`;
                params.forEach(item => {
                  let percentage = 0;
                  if (item.seriesName === 'Utilized Budget') {
                    let planned = this.chartdata2Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                    percentage = Number(((item.value / planned) * 100).toFixed(2));
                  }
                  result += `${item.marker} ${item.seriesName}: ${item.value}  ${item.seriesName === 'Utilized Budget' ? percentage + '%' : ''}<br/>`;
                });
                return result;
              }
            },
            legend: {
              data: ['Utilized Budget', 'Planned Budget']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: [
                'January - March',
                'April - June',
                'July - September',
                'October - December',
              ],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: 'Utilized Budget',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata2Act,
              label: {
                show: true,
                position: 'inside',
                formatter: '{c}'
              }
            },
            {
              name: 'Planned Budget',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata2Pla,
              label: {
                show: true,
                position: 'inside',
                formatter: '{c}'
              }
            }],
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
        
        
        
      });
  }

  onQuarterChange(event: any) {
    var quarter = event.value;

    this.getPieChatData(this.planId, quarter);
  }
  getPieChatData2(planId:string){
    return this.pieChartOptions.filter((item)=> {
      
      return (item.title.planId==planId)
    })[0]
  }

  getBarChatOption(planId: string) {

    return this.barChartOptions.filter((item)=> {
      return (item.tooltip.planid==planId)
    })[0]

   
  }
  getBarChatOption2(planId: string) {

    return this.bar2ChartOptions.filter((item)=> {
      return (item.tooltip.planid==planId)
    })[0]

   
  }


  
  private initCharts(): void {
   
   

    this.progressOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Actual Progress', 'Planned Progress']
      },
      xAxis: {
        type: 'category',
        data: this.strategicPlanReportDtos.map(plan => plan.strategicPlanName)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Actual Progress',
          type: 'bar',
          data: this.strategicPlanReportDtos.map(plan => plan.actualProgress),
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
        },
        {
          name: 'Planned Progress',
          type: 'bar',
          data: this.strategicPlanReportDtos.map(plan => plan.plannedProgress),
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
        }
      ]
    };

    this.budgetOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params) => {
          let result = `${params[0].axisValue}<br/>`;
          params.forEach(item => {
            let percentage = 0;
            if (item.seriesName === 'Utilized Budget') {
              let planned = this.strategicPlanReportDtos[item.dataIndex]?.plannedBudget || 1; // Avoid division by zero
              percentage = Number(((item.value / planned) * 100).toFixed(2));
            }
            result += `${item.marker} ${item.seriesName}: ${item.value} ${item.seriesName === 'Utilized Budget' ? percentage + '%' : ''}<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['Utilized Budget', 'Planned Budget']
      },
      xAxis: {
        type: 'category',
        data: this.strategicPlanReportDtos.map(plan => plan.strategicPlanName)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Utilized Budget',
          type: 'bar',
          data: this.strategicPlanReportDtos.map(plan => plan.actualBudget),
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
        },
        {
          name: 'Planned Budget',
          type: 'bar',
          data: this.strategicPlanReportDtos.map(plan => plan.plannedBudget),
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
        }
      ]
    };

 }


}
