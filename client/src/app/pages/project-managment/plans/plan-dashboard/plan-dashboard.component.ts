import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanBarChartPostDto, PlanPieChartPostDto } from 'src/app/model/PM/PlansDto';
import { UserView } from 'src/app/model/user';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-plan-dashboard',
  templateUrl: './plan-dashboard.component.html',
  styleUrls: ['./plan-dashboard.component.css']
})
export class PlanDashboardComponent implements OnInit {

  user!: UserView
  planId!: string;
  pieChartData!:PlanPieChartPostDto
  barChartData!:PlanBarChartPostDto
  pieChartOption!: EChartsOption
  barChartOption!: EChartsOption
  bar2ChartOption!: EChartsOption
  Quarter: number = 0;
  chartdata: any []
  chartdata1: any []
  chartdata2: any []

  constructor(
    private planService:PlanService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute, 
  ){}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    this.planId = this.activatedRoute.snapshot.paramMap.get('planId')!
    this.getPieChatData(this.planId,0)
    this.getBarChatData(this.planId)
    
  }


  getPieChatData(planId:string,quarter:number){
    this.planService.getPlanPieCharts(planId,quarter).subscribe({
      next : (res) => {
        this.pieChartData = res,
        this.chartdata = this.pieChartData?.chartDataSets?.map(x => ({ value: x.data, name: x.label }))
        console.log("this.chartdata",this.chartdata)

        this.pieChartOption= {
          title: {
            text: this.pieChartData.planName,
            // subtext: 'Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '75%',
              data: this.chartdata,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

      }
        
    })
  }

  getBarChatData(planId:string){
    this.planService.getPlanBarCharts(planId).subscribe({
      next : (res) => {
        this.barChartData = res
        this.chartdata1 = this.barChartData?.progressChartDataSets?.map(x => ({ value: x.data }))
        this.chartdata2 = this.barChartData?.budgetChartDataSets?.map(x => ({ value: x.data }))

        console.log("this.barChartData",this.barChartData)


        this.barChartOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['January - March', 'April - June', 'July - September', 'October - December', ],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Accomplishment Rate',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata1
            }
          ]
        };

        this.bar2ChartOption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['January - March', 'April - June', 'July - Sep', 'Oct - Dec', ],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'Budget Utilization',
              type: 'bar',
              barWidth: '60%',
              data: this.chartdata2
            }
          ]
        };

      }
        
    })
  }

  onQuarterChange(event: any){
    var quarter = event.value
    console.log("quarter",quarter)
    this.getPieChatData(this.planId,quarter)
  }
}
