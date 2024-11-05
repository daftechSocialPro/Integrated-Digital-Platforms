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

  progressOptionQ1: any;
  progressOptionQ2: any;
  progressOptionQ3: any;
  progressOptionQ4: any;

  pieChartOptions: any[] = [];

  pieChartOptions2: EChartsOption[] = [];

  barChartOptions: any[] = [];
  bar2ChartOptions: any[] = [];

  barChartOption!: EChartsOption;
  bar2ChartOption!: EChartsOption;

  Quarter: number = 0;
  chartdata: any[];
  chartdata1;
  chartdata1Act: any[];
  chartdata1Pla: any[];
  chartdata2: any[];
  chartdata2Act: any[];
  chartdata2Pla: any[];
  Plans: PlanView[] = [];
  selectedProject: string;
  selectedYear: number = 0;

  activityStatusCheckBox: boolean = true;
  budgetCheckeBox: boolean = true;
  accomplitiomentCheckBox: boolean = true;
  overAllProgress: boolean = true;

  strategicPlans: SelectList[];
  selectedStrategicPlan: string = '';
  currentYear: number;
  yearOptions: any[] = [];

  strategicPlanReportDtos: StrategicPlanReportDto[] = [];

  budgetOption: any;
  progressOption: any;

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
    // this.generateYearOptions();
    this.selectedYear = this.currentYear;
    // this.listPlans();
    // this.getStrategicPlans();
  }

  getPieChartData(planId: string) {
    const quarters = [1, 2, 3, 4]; // Including option for 'All Quarters'

    this.pieChartOptions2 = [];
    // Clear the previous chart options

    quarters.forEach((quarter) => {
      this.planService
        .getPlanPieCharts(
          planId,
          this.selectedStrategicPlan,
          quarter,
          this.selectedYear
        )
        .subscribe({
          next: (res) => {
            const chartData = res?.chartDataSets?.map((x) => ({
              value: x.data,
              name: x.label,
            }));

            // Create a new pie chart option for each quarter
            const pieChartOption: EChartsOption = {
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
              },
              legend: {
                orient: 'horizontal',
                bottom: '0',
                left: 'center',
                textStyle: {
                  fontSize: 11,
                  fontWeight: 'bold',
                },
              },
              series: [
                {
                  name: `Project Status Q${quarter}`,
                  type: 'pie',
                  radius: ['35%', '60%'],
                  center: ['50%', '50%'], // Adjusted center to align properly
                  avoidLabelOverlap: false,
                  label: {
                    show: true,
                    position: 'outside',
                    formatter: '{b}: {c}\n({d}%)',
                    fontSize: 11,
                    fontWeight: 'bold',
                  },
                  labelLine: {
                    show: true,
                    length: 10,
                    length2: 15,
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: 13,
                      fontWeight: 'bold',
                    },
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  },
                  data: chartData,
                  itemStyle: {
                    color: (params) => {
                      const colors = ['#FF9800', '#4CAF50', '#F44336'];
                      return colors[params.dataIndex % colors.length];
                    },
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2,
                  },
                },
              ],
              toolbox: {
                feature: {
                  saveAsImage: { title: 'Save as Image' },
                  restore: { title: 'Restore' },
                  dataView: { title: 'Data View' },
                  print: { title: 'Print' },
                },
                right: '5%',
                top: '5%',
              },
              backgroundColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: '#f7f8fa' },
                  { offset: 1, color: '#e6e9ee' },
                ],
              },
              grid: {
                top: '10%',
                bottom: '10%',
                left: '0%',
                right: '10%',
              },
            };

            // Add the pie chart option to the array
            this.pieChartOptions2.push(pieChartOption);
          },
        });
    });
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

  getStrategicPlanReports() {
    this.planService.getStrategicPlanReport().subscribe({
      next: (res) => {
        this.strategicPlanReportDtos = res;
        this.initCharts();
      },
    });
  }

  afterSelectedYear() {
    this.listPlans();
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
    if (this.selectedStrategicPlan == 'ALL') {
      this.getStrategicPlanReports();
    } else {
      this.selectedProject = '00000000-0000-0000-0000-000000000000';
      this.planId = this.selectedProject;
      this.getPieChartData(this.planId);
      this.getBarChatData(this.planId);
    }
  }

  listPlans() {
    this.resetVariables();
    if (this.user.role.includes('PM-ADMIN')) {
      this.planService.getPlans(null, this.selectedYear).subscribe({
        next: (res) => {
          console.log(res);
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

            // this.pieChartOptions.push(pieChartOption);

            const quarters = [1, 2, 3, 4]; // Including option for 'All Quarters'

            quarters.forEach((quarter) => {
              this.planService
                .getPlanPieCharts(
                  item.id,
                  '00000000-0000-0000-0000-000000000000',
                  quarter,
                  this.selectedYear
                )
                .subscribe({
                  next: (res) => {
                    const chartData = res?.chartDataSets?.map((x) => ({
                      value: x.data,
                      name: x.label,
                    }));

                    // Create a new pie chart option for each quarter
                    let pieChartOption: any = {
                      title: {
                        planId: item.id,
                      },
                      tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                      },
                      legend: {
                        orient: 'horizontal',
                        bottom: '0',
                        left: 'center',
                        textStyle: {
                          fontSize: 11,
                          fontWeight: 'bold',
                        },
                      },
                      series: [
                        {
                          name: `Project Status Q${quarter}`,
                          type: 'pie',
                          radius: ['35%', '60%'],
                          center: ['50%', '50%'], // Adjusted center to align properly
                          avoidLabelOverlap: false,
                          label: {
                            show: true,
                            position: 'outside',
                            formatter: '{b}: {c}\n({d}%)',
                            fontSize: 11,
                            fontWeight: 'bold',
                          },
                          labelLine: {
                            show: true,
                            length: 10,
                            length2: 15,
                          },
                          emphasis: {
                            label: {
                              show: true,
                              fontSize: 13,
                              fontWeight: 'bold',
                            },
                            itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                          },
                          data: chartData,
                          itemStyle: {
                            color: (params) => {
                              const colors = ['#FF9800', '#4CAF50', '#F44336'];
                              return colors[params.dataIndex % colors.length];
                            },
                            borderRadius: 8,
                            borderColor: '#fff',
                            borderWidth: 2,
                          },
                        },
                      ],
                      toolbox: {
                        feature: {
                          saveAsImage: { title: 'Save as Image' },
                          restore: { title: 'Restore' },
                          dataView: { title: 'Data View' },
                          print: { title: 'Print' },
                        },
                        right: '5%',
                        top: '5%',
                      },
                      backgroundColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                          { offset: 0, color: '#f7f8fa' },
                          { offset: 1, color: '#e6e9ee' },
                        ],
                      },
                      grid: {
                        top: '10%',
                        bottom: '10%',
                        left: '0%',
                        right: '10%',
                      },
                    };

                    // Add the pie chart option to the array
                    this.pieChartOptions.push(pieChartOption);
                  },
                });
            });

            this.planService
              .getPlanBarCharts(
                item.id,
                '00000000-0000-0000-0000-000000000000',
                this.selectedYear
              )
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
                        type: 'shadow',
                      },
                      backgroundColor: 'rgba(0,0,0,0.7)', // Darker background for tooltip
                      borderColor: '#777',
                      borderWidth: 1,
                      textStyle: {
                        color: '#fff',
                      },
                      formatter: (params) => {
                        let result = `${params[0].axisValue}<br/>`;
                        params.forEach((item) => {
                          let percentage = 0;
                          if (item.seriesName === 'Actual Progress') {
                            let planned =
                              this.chartdata1Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                            percentage = Number(
                              ((item.value / planned) * 100).toFixed(2)
                            );
                          }
                          result += `${item.marker} ${item.seriesName}: ${
                            item.value
                          } ${
                            item.seriesName === 'Actual Progress'
                              ? percentage + '%'
                              : ''
                          }<br/>`;
                        });
                        return result;
                      },
                    },
                    legend: {
                      data: ['Actual Progress', 'Planned Progress'],
                      textStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#333', // Darker color for better contrast
                      },
                      bottom: 0, // Position legend at the bottom for better layout
                    },
                    grid: {
                      left: '5%',
                      right: '5%',
                      bottom: '15%', // Adjusted to make room for legend
                      top: '10%',
                      containLabel: true,
                      backgroundColor: '#fff', // Light background for grid
                      borderColor: '#ccc',
                    },
                    xAxis: [
                      {
                        type: 'category',
                        data: [
                          'January - March',
                          'April - June',
                          'July - September',
                          'October - December',
                        ],
                        axisTick: {
                          alignWithLabel: true,
                        },
                        axisLine: {
                          lineStyle: {
                            color: '#888',
                          },
                        },
                        axisLabel: {
                          fontSize: 12,
                          fontWeight: 'bold',
                        },
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        axisLine: {
                          lineStyle: {
                            color: '#888',
                          },
                        },
                        axisLabel: {
                          fontSize: 12,
                          fontWeight: 'bold',
                        },
                        splitLine: {
                          lineStyle: {
                            type: 'dashed',
                          },
                        },
                      },
                    ],
                    series: [
                      {
                        name: 'Actual Progress',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.chartdata1Act,
                        itemStyle: {
                          color: '#2196F3', // Custom color for actual progress
                        },
                        label: {
                          show: true,
                          position: 'top', // Position label on top of the bars
                          formatter: '{c}',
                          color: '#000', // Label color for better contrast
                          fontSize: 11,
                          fontWeight: 'bold',
                        },
                      },
                      {
                        name: 'Planned Progress',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.chartdata1Pla,
                        itemStyle: {
                          color: '#4CAF50', // Custom color for planned progress
                        },
                        label: {
                          show: true,
                          position: 'top', // Position label on top of the bars
                          formatter: '{c}',
                          color: '#000', // Label color for better contrast
                          fontSize: 11,
                          fontWeight: 'bold',
                        },
                      },
                    ],
                    toolbox: {
                      feature: {
                        saveAsImage: { title: 'Save as Image' },
                        restore: { title: 'Restore' },
                        dataView: { title: 'Data View' },
                        print: { title: 'Print' },
                      },
                      right: '5%',
                      top: '5%',
                    },
                    backgroundColor: '#f0f0f0', // Set background color to gray
                  };

                  let bar2ChartOption = {
                    tooltip: {
                      planid: item.id,
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow',
                      },
                      backgroundColor: 'rgba(0,0,0,0.7)', // Darker background for tooltip
                      borderColor: '#777',
                      borderWidth: 1,
                      textStyle: {
                        color: '#fff',
                      },
                      formatter: (params) => {
                        let result = `${params[0].axisValue}<br/>`;
                        params.forEach((item) => {
                          let percentage = 0;
                          if (item.seriesName === 'Utilized Budget') {
                            let planned =
                              this.chartdata2Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                            percentage = Number(
                              ((item.value / planned) * 100).toFixed(2)
                            );
                          }
                          result += `${item.marker} ${item.seriesName}: ${
                            item.value
                          } ${
                            item.seriesName === 'Utilized Budget'
                              ? percentage + '%'
                              : ''
                          }<br/>`;
                        });
                        return result;
                      },
                    },
                    legend: {
                      data: ['Utilized Budget', 'Planned Budget'],
                      textStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#333', // Darker color for better contrast
                      },
                      bottom: 0, // Position legend at the bottom for better layout
                    },
                    grid: {
                      left: '5%',
                      right: '5%',
                      bottom: '15%', // Adjusted to make room for legend
                      top: '10%',
                      containLabel: true,
                      backgroundColor: '#fff', // Light background for grid
                      borderColor: '#ccc',
                    },
                    xAxis: [
                      {
                        type: 'category',
                        data: [
                          'January - March',
                          'April - June',
                          'July - September',
                          'October - December',
                        ],
                        axisTick: {
                          alignWithLabel: true,
                        },
                        axisLine: {
                          lineStyle: {
                            color: '#888',
                          },
                        },
                        axisLabel: {
                          fontSize: 12,
                          fontWeight: 'bold',
                        },
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        axisLine: {
                          lineStyle: {
                            color: '#888',
                          },
                        },
                        axisLabel: {
                          fontSize: 12,
                          fontWeight: 'bold',
                        },
                        splitLine: {
                          lineStyle: {
                            type: 'dashed',
                          },
                        },
                      },
                    ],
                    series: [
                      {
                        name: 'Utilized Budget',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.chartdata2Act,
                        itemStyle: {
                          color: '#F44336', // Custom color for utilized budget
                        },
                        label: {
                          show: true,
                          position: 'top', // Position label on top of the bars
                          formatter: '{c}',
                          color: '#000', // Label color for better contrast
                          fontSize: 11,
                          fontWeight: 'bold',
                        },
                      },
                      {
                        name: 'Planned Budget',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.chartdata2Pla,
                        itemStyle: {
                          color: '#4CAF50', // Custom color for planned budget
                        },
                        label: {
                          show: true,
                          position: 'top', // Position label on top of the bars
                          formatter: '{c}',
                          color: '#000', // Label color for better contrast
                          fontSize: 11,
                          fontWeight: 'bold',
                        },
                      },
                    ],
                    toolbox: {
                      feature: {
                        saveAsImage: { title: 'Save as Image' },
                        restore: { title: 'Restore' },
                        dataView: { title: 'Data View' },
                        print: { title: 'Print' },
                      },
                      right: '5%',
                      top: '5%',
                    },
                    backgroundColor: '#f0f0f0', // Set background color to gray
                  };

                  this.barChartOptions.push(barChartOption);
                  this.bar2ChartOptions.push(bar2ChartOption);
                },
              });
          });

          if (res) {
            this.selectedProject = plan.id;
            this.onProjectChange();
          }
        },
        error: (err) => {},
      });
    } else {
      this.planService
        .getPlans(this.user.employeeId, this.selectedYear)
        .subscribe({
          next: (res) => {
            this.Plans = res;
            if (res) {
              this.selectedProject = res[0].id;
              this.onProjectChange();
            }
          },
          error: (err) => {},
        });
    }
  }

  onProjectChange() {
    this.selectedStrategicPlan = '00000000-0000-0000-0000-000000000000';
    this.planId = this.selectedProject;
    this.getPieChartData(this.planId);
    // this.getPieChatData(this.planId, 0);
    this.getBarChatData(this.planId);

    if (this.planId != '30fc30dc-eb56-4f40-9510-54ad983e759a') {
      this.overAllProgress = false;
    }

    if (this.planId == '30fc30dc-eb56-4f40-9510-54ad983e759a') {
      //this.fetchPieChartOptions()
    }
  }

  getPieChatData(planId: string, quarter: number) {
    this.planService
      .getPlanPieCharts(
        planId,
        this.selectedStrategicPlan,
        quarter,
        this.selectedYear
      )
      .subscribe({
        next: (res) => {
          (this.pieChartData = res),
            (this.chartdata = this.pieChartData?.chartDataSets?.map((x) => ({
              value: x.data,
              name: x.label,
            })));

          // Enhanced Pie Chart Option with Padding and Smaller Content
          this.pieChartOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            legend: {
              orient: 'horizontal',
              bottom: '0',
              left: 'center',
              textStyle: {
                fontSize: 11,
                fontWeight: 'bold',
              },
            },
            series: [
              {
                name: 'Project Status',
                type: 'pie',
                radius: ['35%', '60%'],
                center: ['50%', '50%'], // Adjusted center to align properly
                avoidLabelOverlap: false,
                label: {
                  show: true,
                  position: 'outside',
                  formatter: '{b}: {c}\n({d}%)',
                  fontSize: 11,
                  fontWeight: 'bold',
                },
                labelLine: {
                  show: true,
                  length: 10,
                  length2: 15,
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 13,
                    fontWeight: 'bold',
                  },
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
                },
                data: this.chartdata,
                itemStyle: {
                  color: (params) => {
                    const colors = ['#FF9800', '#4CAF50', '#F44336'];
                    return colors[params.dataIndex % colors.length];
                  },
                  borderRadius: 8,
                  borderColor: '#fff',
                  borderWidth: 2,
                },
              },
            ],
            toolbox: {
              feature: {
                saveAsImage: { title: 'Save as Image' },
                restore: { title: 'Restore' },
                dataView: { title: 'Data View' },
                print: { title: 'Print' },
              },
              right: '5%',
              top: '5%',
            },
            backgroundColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: '#f7f8fa' },
                { offset: 1, color: '#e6e9ee' },
              ],
            },
            grid: {
              top: '10%',
              bottom: '10%',
              left: '0%',
              right: '10%',
            },
          };
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
                type: 'shadow',
              },
              backgroundColor: 'rgba(0,0,0,0.7)', // Darker background for tooltip
              borderColor: '#777',
              borderWidth: 1,
              textStyle: {
                color: '#fff',
              },
              formatter: (params) => {
                let result = `${params[0].axisValue}<br/>`;
                params.forEach((item) => {
                  let percentage = 0;
                  if (item.seriesName === 'Actual Progress') {
                    let planned =
                      this.chartdata1Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                    percentage = Number(
                      ((item.value / planned) * 100).toFixed(2)
                    );
                  }
                  result += `${item.marker} ${item.seriesName}: ${
                    item.value
                  }  ${
                    item.seriesName === 'Actual Progress'
                      ? percentage + '%'
                      : ''
                  }<br/>`;
                });
                return result;
              },
            },
            legend: {
              data: ['Actual Progress', 'Planned Progress'],
              textStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#333', // Darker color for better contrast
              },
              bottom: 0, // Position legend at the bottom for better layout
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '15%', // Adjusted to make room for legend
              top: '10%',
              containLabel: true,
              backgroundColor: '#fff', // Light background for grid
              borderColor: '#ccc',
            },
            xAxis: [
              {
                type: 'category',
                data: [
                  'January - March',
                  'April - June',
                  'July - September',
                  'October - December',
                ],
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: '#888',
                  },
                },
                axisLabel: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#888',
                  },
                },
                axisLabel: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                  },
                },
              },
            ],
            series: [
              {
                name: 'Actual Progress',
                type: 'bar',
                barWidth: '60%',
                data: this.chartdata1Act,
                itemStyle: {
                  color: '#2196F3', // Changed color to blue for actual progress
                },
                label: {
                  show: true,
                  position: 'top', // Moved labels to the top of the bars
                  formatter: '{c}',
                  color: '#000', // Changed label color to black for better contrast
                  fontSize: 11,
                  fontWeight: 'bold',
                },
              },
              {
                name: 'Planned Progress',
                type: 'bar',
                barWidth: '60%',
                data: this.chartdata1Pla,
                itemStyle: {
                  color: '#4CAF50', // Changed color to green for planned progress
                },
                label: {
                  show: true,
                  position: 'top', // Moved labels to the top of the bars
                  formatter: '{c}',
                  color: '#000', // Changed label color to black for better contrast
                  fontSize: 11,
                  fontWeight: 'bold',
                },
              },
            ],
            toolbox: {
              feature: {
                saveAsImage: { title: 'Save as Image' },
                restore: { title: 'Restore' },
                dataView: { title: 'Data View' },
                print: { title: 'Print' },
              },
              right: '5%',
              top: '5%',
            },
            backgroundColor: '#f0f0f0', // Set background color to gray
          };

          this.bar2ChartOption = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
              backgroundColor: 'rgba(0,0,0,0.7)', // Darker background for tooltip
              borderColor: '#777',
              borderWidth: 1,
              textStyle: {
                color: '#fff',
              },
              formatter: (params) => {
                let result = `${params[0].axisValue}<br/>`;
                params.forEach((item) => {
                  let percentage = 0;
                  if (item.seriesName === 'Utilized Budget') {
                    let planned =
                      this.chartdata2Pla[item.dataIndex]?.value || 1; // Avoid division by zero
                    percentage = Number(
                      ((item.value / planned) * 100).toFixed(2)
                    );
                  }
                  result += `${item.marker} ${item.seriesName}: ${
                    item.value
                  }  ${
                    item.seriesName === 'Utilized Budget'
                      ? percentage + '%'
                      : ''
                  }<br/>`;
                });
                return result;
              },
            },
            legend: {
              data: ['Utilized Budget', 'Planned Budget'],
              textStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#333', // Darker color for better contrast
              },
              bottom: 0, // Position legend at the bottom for better layout
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '15%', // Adjusted to make room for legend
              top: '10%',
              containLabel: true,
              backgroundColor: '#fff', // Light background for grid
              borderColor: '#ccc',
            },
            xAxis: [
              {
                type: 'category',
                data: [
                  'January - March',
                  'April - June',
                  'July - September',
                  'October - December',
                ],
                axisTick: {
                  alignWithLabel: true,
                },
                axisLine: {
                  lineStyle: {
                    color: '#888',
                  },
                },
                axisLabel: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#888',
                  },
                },
                axisLabel: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                  },
                },
              },
            ],
            series: [
              {
                name: 'Utilized Budget',
                type: 'bar',
                barWidth: '60%',
                data: this.chartdata2Act,
                itemStyle: {
                  color: '#F44336', // Changed color to red for utilized budget
                },
                label: {
                  show: true,
                  position: 'top', // Moved labels to the top of the bars
                  formatter: '{c}',
                  color: '#000', // Changed label color to black for better contrast
                  fontSize: 11,
                  fontWeight: 'bold',
                },
              },
              {
                name: 'Planned Budget',
                type: 'bar',
                barWidth: '60%',
                data: this.chartdata2Pla,
                itemStyle: {
                  color: '#4CAF50', // Changed color to green for planned budget
                },
                label: {
                  show: true,
                  position: 'top', // Moved labels to the top of the bars
                  formatter: '{c}',
                  color: '#000', // Changed label color to black for better contrast
                  fontSize: 11,
                  fontWeight: 'bold',
                },
              },
            ],
            toolbox: {
              feature: {
                saveAsImage: { title: 'Save as Image' },
                restore: { title: 'Restore' },
                dataView: { title: 'Data View' },
                print: { title: 'Print' },
              },
              right: '5%',
              top: '5%',
            },
            backgroundColor: '#f0f0f0', // Set background color to gray
          };
        },
      });
  }

  onQuarterChange(event: any) {
    var quarter = event.value;
    this.getPieChatData(this.planId, quarter);
  }
  getPieChatData2(planId: string) {
    return this.pieChartOptions.filter((item) => {
      return item.title.planId == planId;
    });
  }

  getBarChatOption(planId: string) {
    return this.barChartOptions.filter((item) => {
      return item.tooltip.planid == planId;
    })[0];
  }
  getBarChatOption2(planId: string) {
    return this.bar2ChartOptions.filter((item) => {
      return item.tooltip.planid == planId;
    })[0];
  }

  private initCharts(): void {
    this.progressOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(0,0,0,0.7)', // Darker background for tooltip
        borderColor: '#777',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
        },
        formatter: (params) => {
          let result = `${params[0].axisValue}<br/>`;
          params.forEach((item) => {
            let percentage = 0;
            if (item.seriesName === 'Actual Progress') {
              let planned =
                this.strategicPlanReportDtos[item.dataIndex]?.plannedProgress ||
                1; // Avoid division by zero
              percentage = Number(((item.value / planned) * 100).toFixed(2));
            }
            result += `${item.marker} ${item.seriesName}: ${item.value} ${
              item.seriesName === 'Actual Progress' ? percentage + '%' : ''
            }<br/>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Actual Progress', 'Planned Progress'],
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333', // Darker color for better contrast
        },
        bottom: 0, // Position legend at the bottom for better layout
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%', // Adjusted to make room for legend
        top: '10%',
        containLabel: true,
        backgroundColor: '#fff', // Light background for grid
        borderColor: '#ccc',
      },
      xAxis: [
        {
          type: 'category',
          data: this.strategicPlanReportDtos.map(
            (plan) => plan.strategicPlanName
          ),
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#888',
            },
          },
          axisLabel: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#888',
            },
          },
          axisLabel: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
      ],
      series: [
        {
          name: 'Actual Progress',
          type: 'bar',
          barWidth: '60%',
          data: this.strategicPlanReportDtos.map((plan) => plan.actualProgress),
          itemStyle: {
            color: '#2196F3', // Changed color to blue for actual progress
          },
          label: {
            show: true,
            position: 'top', // Moved labels to the top of the bars
            formatter: '{c}',
            color: '#000', // Changed label color to black for better contrast
            fontSize: 11,
            fontWeight: 'bold',
          },
        },
        {
          name: 'Planned Progress',
          type: 'bar',
          barWidth: '60%',
          data: this.strategicPlanReportDtos.map(
            (plan) => plan.plannedProgress
          ),
          itemStyle: {
            color: '#4CAF50', // Changed color to green for planned progress
          },
          label: {
            show: true,
            position: 'top', // Moved labels to the top of the bars
            formatter: '{c}',
            color: '#000', // Changed label color to black for better contrast
            fontSize: 11,
            fontWeight: 'bold',
          },
        },
      ],
      toolbox: {
        feature: {
          saveAsImage: { title: 'Save as Image' },
          restore: { title: 'Restore' },
          dataView: { title: 'Data View' },
          print: { title: 'Print' },
        },
        right: '5%',
        top: '5%',
      },
      backgroundColor: '#f0f0f0', // Set background color to gray
    };

    this.budgetOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(0,0,0,0.7)', // Darker background for tooltip
        borderColor: '#777',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
        },
        formatter: (params) => {
          let result = `${params[0].axisValue}<br/>`;
          params.forEach((item) => {
            let percentage = 0;
            if (item.seriesName === 'Utilized Budget') {
              let planned =
                this.strategicPlanReportDtos[item.dataIndex]?.plannedBudget ||
                1; // Avoid division by zero
              percentage = Number(((item.value / planned) * 100).toFixed(2));
            }
            result += `${item.marker} ${item.seriesName}: ${item.value} ${
              item.seriesName === 'Utilized Budget' ? percentage + '%' : ''
            }<br/>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Utilized Budget', 'Planned Budget'],
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333', // Darker color for better contrast
        },
        bottom: 0, // Position legend at the bottom for better layout
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%', // Adjusted to make room for legend
        top: '10%',
        containLabel: true,
        backgroundColor: '#fff', // Light background for grid
        borderColor: '#ccc',
      },
      xAxis: [
        {
          type: 'category',
          data: this.strategicPlanReportDtos.map(
            (plan) => plan.strategicPlanName
          ),
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#888',
            },
          },
          axisLabel: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#888',
            },
          },
          axisLabel: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
      ],
      series: [
        {
          name: 'Utilized Budget',
          type: 'bar',
          barWidth: '60%',
          data: this.strategicPlanReportDtos.map((plan) => plan.actualBudget),
          itemStyle: {
            color: '#FF5722', // Changed color to orange for utilized budget
          },
          label: {
            show: true,
            position: 'top', // Moved labels to the top of the bars
            formatter: '{c}',
            color: '#000', // Changed label color to black for better contrast
            fontSize: 11,
            fontWeight: 'bold',
          },
        },
        {
          name: 'Planned Budget',
          type: 'bar',
          barWidth: '60%',
          data: this.strategicPlanReportDtos.map((plan) => plan.plannedBudget),
          itemStyle: {
            color: '#4CAF50', // Changed color to green for planned budget
          },
          label: {
            show: true,
            position: 'top', // Moved labels to the top of the bars
            formatter: '{c}',
            color: '#000', // Changed label color to black for better contrast
            fontSize: 11,
            fontWeight: 'bold',
          },
        },
      ],
      toolbox: {
        feature: {
          saveAsImage: { title: 'Save as Image' },
          restore: { title: 'Restore' },
          dataView: { title: 'Data View' },
          print: { title: 'Print' },
        },
        right: '5%',
        top: '5%',
      },
      backgroundColor: '#f0f0f0', // Set background color to gray
    };
  }
}
