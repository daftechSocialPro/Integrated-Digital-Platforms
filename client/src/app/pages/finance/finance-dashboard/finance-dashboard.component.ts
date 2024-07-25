import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { SelectList } from 'src/app/model/common';
import { FinanceBarChartPostDto, FinanceDashboardDTO } from 'src/app/model/Finance/IFinanceDashboard';
import { PlanBarChartPostDto, PlanView } from 'src/app/model/PM/PlansDto';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { FinanceService } from 'src/app/services/finance.service';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css']
})
export class FinanceDashboardComponent implements OnInit {
  user!: UserView;
  planId = '00000000-0000-0000-0000-000000000000';
  selectedProject = '00000000-0000-0000-0000-000000000000';

  barChartData!: FinanceBarChartPostDto;
  budgetChartOption!: EChartsOption;
  budgetChartOptions: any[]=[];

  plans: PlanView[] = [];
  strategicPlans: SelectList[] = [];
  overAllProgress: boolean = true;
  financeDashboardData!: FinanceDashboardDTO
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private planService: PlanService,
    private dropDownService: DropDownService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {

    this.user = this.userService.getCurrentUser();
    this.listPlans();
    this.getDashboardData()
  }

  getDashboardData(){
    this.financeService.getDashboardData().subscribe({
      next : (res) => {
        this.financeDashboardData = res
      }
    })
  }

  listPlans(): void {
    
    this.planService.getPlans()
      .subscribe({
      next: (res) => {
        
        this.plans = [this.createAllPlan(), ...res];
       
        this.processPlanData();
      },
      error: (err) => console.error('Error fetching plans:', err),
    });
  }

  private createAllPlan(): PlanView {
    return {
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
  }

  private processPlanData(): void {
    this.plans.forEach((plan) => {
      this.fetchBudgetChartData(plan.id);
    });

    if (this.plans.length > 0) {
      this.selectedProject = this.plans[0].id;
      this.onProjectChange();
    }
  }

  private fetchBudgetChartData(planId: string): void {
    this.financeService.getDashboardChart(planId)
      .subscribe({
        next: (res) => {
          const budgetData = {
            actual: res.budgetChartDataSets?.map((x) => ({ value: x.data.actual })),
            planned: res.budgetChartDataSets?.map((x) => ({ value: x.data.planned })),
          };
          this.budgetChartOptions.push(this.createBudgetChartOption(planId, budgetData));
        },
      });
  }

  onProjectChange(): void {
    
    this.planId = this.selectedProject;
    if (this.planId != '30fc30dc-eb56-4f40-9510-54ad983e759a') {

      this.overAllProgress= false
    }
    else{
      this.overAllProgress = true
    }
    this.getBudgetChartData(this.planId);
    
  }

  getBudgetChartData(planId: string): void {
    this.financeService
      .getDashboardChart(planId)
      .subscribe({
        next: (res) => {
          this.barChartData = res;
          const budgetData = {
            actual: this.barChartData?.budgetChartDataSets?.map((x) => ({ value: x.data.actual })),
            planned: this.barChartData?.budgetChartDataSets?.map((x) => ({ value: x.data.planned })),
          };
          this.budgetChartOption = this.createBudgetChartOption(planId, budgetData);
        },
      });
  }

  getBudgetChartOption(planId: string): EChartsOption | undefined {
    return this.budgetChartOptions.find((item) => item.tooltip?.planid == planId);
  }

  private createBudgetChartOption(planId: string, data: any): any {
    return {
      tooltip: {
        planid: planId,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Actual Budget', 'Planned Budget'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [{
        type: 'category',
        data: [''],
        axisTick: {
          alignWithLabel: true,
        },
      }],
      yAxis: [{
        type: 'value',
      }],
      series: [
        {
          name: 'Actual Budget',
          type: 'bar',
          barWidth: '50%',
          data: data.actual,
        },
        {
          name: 'Planned Budget',
          type: 'bar',
          barWidth: '50%',
          data: data.planned,
        },
      ],
      toolbox: {
        feature: {
          saveAsImage: {},
          restore: {},
          dataView: {},
          print: {},
        },
      },
    };
  }
}
