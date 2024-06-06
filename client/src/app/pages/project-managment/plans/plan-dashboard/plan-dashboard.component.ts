import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PlanBarChartPostDto,
  PlanPieChartPostDto,
  PlanView,
} from 'src/app/model/PM/PlansDto';
import { UserView } from 'src/app/model/user';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';
import { EChartsOption } from 'echarts';
import { DropDownService } from 'src/app/services/dropDown.service';
import { SelectList } from 'src/app/model/common';
import { DOCUMENT } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  activityStatusCheckBox: boolean = true;
  budgetCheckeBox: boolean = true;
  accomplitiomentCheckBox: boolean = true;
  overAllProgress: boolean = true;

  strategicPlans: SelectList[];
  selectedStrategicPlan: string;

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

    this.listPlans();
    this.getStrategicPlans();
  }

  getStrategicPlans() {
    this.dropDownService.getStrategicPlans().subscribe({
      next: (res) => {
   
        this.strategicPlans = res;
      },
    });
  }

  filterStrategicPlans() {
    this.selectedProject = '00000000-0000-0000-0000-000000000000';
    this.planId = this.selectedProject;
    this.getPieChatData(this.planId, 0);
    this.getBarChatData(this.planId);
  }

  listPlans() {
    if (this.user.role.includes('PM-ADMIN')) {
      this.planService.getPlans().subscribe({
        next: (res) => {
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
              .getPlanPieCharts(item.id, "00000000-0000-0000-0000-000000000000", 0)
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
              .getPlanBarCharts(item.id, "00000000-0000-0000-0000-000000000000")
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
        
                  let barChartOption =
                  {
                    tooltip: {
                      planid:item.id,
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow'
                      }
                    },
                    legend: {
                      data: ['Actual Progress','Planned Progress']
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
                      data: this.chartdata1Act
                    },
        
                    {
                      name: 'Planned Progress',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata1Pla
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
             
        
                  let bar2ChartOption = 

                  {
                    tooltip: {
                      planid:item.id,
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow'
                      }
                    },
                    legend: {
                      data: ['Actual Budget','Planned Budget']
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
                      name: 'Actual Budget',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata2Act
                    },
                    {
                      name: 'Planned Budget',
                      type: 'bar',
                      barWidth: '60%',
                      data: this.chartdata2Pla
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
                  

                  this.barChartOptions.push(barChartOption)
                  this.bar2ChartOptions.push(bar2ChartOption)
                },
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
      this.planService.getPlans(this.user.employeeId).subscribe({
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
      .getPlanPieCharts(planId, this.selectedStrategicPlan, quarter)
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
      .getPlanBarCharts(planId, this.selectedStrategicPlan)
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
              }
            },
            legend: {
              data: ['Actual Progress','Planned Progress']
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
              data: this.chartdata1Act
            },

            {
              name: 'Planned Progress',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata1Pla
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
         
          this.bar2ChartOption =

        {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['Actual Budget','Planned Budget']
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
              name: 'Actual Budget',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata2Act
            },
            {
              name: 'Planned Budget',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata2Pla
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
          
          
       
        },
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


}
