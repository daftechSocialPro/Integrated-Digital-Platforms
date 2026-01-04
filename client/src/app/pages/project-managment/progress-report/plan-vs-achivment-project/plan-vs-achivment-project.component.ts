import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { PlanView } from 'src/app/model/PM/PlansDto';
import { PlanService } from 'src/app/services/plan.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { ActivityView, MonthPerformanceView } from '../../view-activties/activityview';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UpdateActivityProgressDto, StrategicPeriodGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';
import { ViewProgressComponent } from '../../view-activties/view-progress/view-progress.component';
import { SelectList } from 'src/app/model/common';
import { DropDownService } from 'src/app/services/dropDown.service';

@Component({
  selector: 'app-plan-vs-achivment-project',
  templateUrl: './plan-vs-achivment-project.component.html',
  styleUrls: ['./plan-vs-achivment-project.component.css']
})
export class PlanVsAchivmentProjectComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  Quarter: number = 1
  user !: UserView
  Activties!: ActivityView[]
  filterdActivities: any
  selectedProject: string = ''
  selectedProjectId: string = ''
  selectedStrategicPlan: string = ''
  currentYear: number
  selectedMonth:number=13

  Projects :string[]=[]
  ProjectsWithIds: {name: string, id: string}[] = []
  strategicPlans: SelectList[] = []
  strategicPeriods: StrategicPeriodGetDto[] = []
  selectedStrategicPeriod: string = 'ALL'

 
  

  months = [{ value: 0, label: "January" }, { value: 1, label: "Feburary" }, { value: 2, label: "March" }]



  constructor(
    @Inject(DOCUMENT) private document: Document,
    private projectService: ProjectmanagementService,
    private pmService: PMService,
    private userService: UserService,
    private planService : PlanService,
    private modalService : NgbModal,
    private messageService: MessageService,
    private dropDownService: DropDownService

  ) {

  }

  ngOnInit(): void {

    this.document.body.classList.toggle('toggle-sidebar');

    this.user = this.userService.getCurrentUser();
    this.getAssignedActivites()
    this.currentYear = new Date().getFullYear();
    this.getStrategicPeriods();
    this.loadStrategicPlans();

  }

  getStrategicPeriods() {
    this.projectService.getStrategicPeriods().subscribe({
      next: (res) => {
        this.strategicPeriods = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadStrategicPlans() {
    // Get full strategic plans list with period information
    this.projectService.getStragegicPlan().subscribe({
      next: (res) => {
        this.applyStrategicPeriodFilter(res);
      },
      error: (err) => {
        // Fallback to dropdown service if pmService fails
        this.dropDownService.getStrategicPlans().subscribe({
          next: (res) => {
            this.strategicPlans = res;
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  onStrategicPeriodChange() {
    // Reload strategic plans and apply filter
    this.projectService.getStragegicPlan().subscribe({
      next: (res) => {
        this.applyStrategicPeriodFilter(res);
        // Reset strategic plan selection when period changes
        this.selectedStrategicPlan = 'ALL';
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  applyStrategicPeriodFilter(allPlans: any[]) {
    if (this.selectedStrategicPeriod === 'ALL' || !this.selectedStrategicPeriod) {
      // Show all strategic plans
      this.strategicPlans = allPlans.map(plan => ({
        id: plan.id,
        name: plan.name
      }));
    } else {
      // Filter strategic plans by period
      const filteredPlans = allPlans.filter(
        plan => plan.strategicPeriodId === this.selectedStrategicPeriod
      );
      // Update strategicPlans dropdown with filtered list
      this.strategicPlans = filteredPlans.map(plan => ({
        id: plan.id,
        name: plan.name
      }));
    }
  }



  onMonthSelected(){

  }
  ViewProgress(actView:ActivityView) {

    let modalRef = this.modalService.open(ViewProgressComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.activity = actView

  }

  getAssignedActivites() {
    this.pmService.GetActivityForPlan(this.user.employeeId,this.user.role).subscribe({
      next: (res) => {

       
        this.Activties = res
        this.filterdActivities = res
        this.Projects = [...new Set(res.map((item)=>item.projectName))]

        // Get projects list with IDs to match project names to IDs
        this.planService.getPlans().subscribe({
          next: (projects) => {
            this.ProjectsWithIds = projects.map(p => ({
              name: p.planName,
              id: p.id
            }))
          }
        })

        this.filterActivites("")
      }, error: (err) => {
      
      }
    })
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Activties.length; i++) {
      if (this.Activties[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }


  getMonthPeroformance(monthPerformance: MonthPerformanceView[], order: number) {

    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }
    return monthPerformance[order]?.planned




  }

  getMonthPeroformance2(monthPerformance: MonthPerformanceView[], order: number) {

    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }
    return monthPerformance[order]?.actual




  }

  getMonthPeroformance3(monthPerformance: MonthPerformanceView[], order: number) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }

    return monthPerformance[order]?.plannedBudget


  }
  getMonthPeroformance4(monthPerformance: MonthPerformanceView[], order: number) {
    if (monthPerformance.length == 0 || !monthPerformance) {
      return 0

    }

    return monthPerformance[order]?.usedBudget


  }

  onProjectChange(){
    this.applyFilters();
  }

  onStrategicPlanChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.Activties];

    // Filter by project
    if (this.selectedProject && this.selectedProject !== '' && this.selectedProject !== 'ALL') {
      const selectedProjectData = this.ProjectsWithIds.find(p => p.name === this.selectedProject);
      if (selectedProjectData && selectedProjectData.id) {
        // Fetch activities from the selected project using API
        this.projectService.getActivitiesFromProject(selectedProjectData.id).subscribe({
          next: (res) => {
            filtered = res;
            // Apply strategic plan filter if selected
            if (this.selectedStrategicPlan && this.selectedStrategicPlan !== '' && this.selectedStrategicPlan !== 'ALL') {
              filtered = filtered.filter((item) => 
                item.strategicPlan && item.strategicPlan === this.selectedStrategicPlan
              );
            }
            this.filterdActivities = filtered;
          },
          error: (err) => {
            // Fallback to filtering by name if API fails
            filtered = filtered.filter((item) => 
              item.projectName && item.projectName.includes(this.selectedProject)
            );
            // Apply strategic plan filter if selected
            if (this.selectedStrategicPlan && this.selectedStrategicPlan !== '' && this.selectedStrategicPlan !== 'ALL') {
              filtered = filtered.filter((item) => 
                item.strategicPlan && item.strategicPlan === this.selectedStrategicPlan
              );
            }
            this.filterdActivities = filtered;
          }
        });
        return;
      } else {
        // Fallback to filtering by name if project ID not found
        filtered = filtered.filter((item) => 
          item.projectName && item.projectName.includes(this.selectedProject)
        );
      }
    }

    // Filter by strategic plan
    if (this.selectedStrategicPlan && this.selectedStrategicPlan !== '' && this.selectedStrategicPlan !== 'ALL') {
      filtered = filtered.filter((item) => 
        item.strategicPlan && item.strategicPlan === this.selectedStrategicPlan
      );
    }

    this.filterdActivities = filtered;
  }

  onQuarterChange() {


    if (this.Quarter == 1) {
      this.months = [{ value: 0, label: "January" }, { value: 1, label: "Feburary" }, { value: 2, label: "March" }]
      this.selectedMonth = 0 
    }
    else if (this.Quarter == 2) {

      this.months = [{ value: 3, label: "April" }, { value: 4, label: "May" }, { value: 5, label: "June" }]

      this.selectedMonth = 3

    }
    else if (this.Quarter == 3) {

      this.months = [{ value: 6, label: "July" }, { value: 7, label: "Augest" }, { value: 8, label: "September" }]

      this.selectedMonth = 6 

    }
    else {
      this.months = [{ value: 9, label: "October" }, { value: 10, label: "November" }, { value: 11, label: "December" }]
      this.selectedMonth = 9
    }

 





    // this.filterProjects()

  }

  filterActivites(value: string) {

    

    // First apply project and strategic plan filters
    this.applyFilters();

    // Then apply text search filter
    if (value && value.trim() !== '') {
      var searchTerm = value.toLowerCase().trim();
      this.filterdActivities = this.filterdActivities.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          item.activityNumber.toLowerCase().includes(searchTerm)
        );
      });
    }

    



  }


  onProgressAdded(activityId: string, month: any, target: any) {

    var actprogress: UpdateActivityProgressDto = {
      activityId: activityId,
      usedBudget: 0,
      actualWorked: target.value,
      employeeId:this.user.employeeId,
      createdBy: this.user.userId,
      order: month.value,
      progressType: 1
    }

    this.projectService.updateActivityProgress(actprogress).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfully Updated', detail: res.message })
          // Refresh the activities data to show updated values
          this.refreshActivitiesData()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: res.message })
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: err.message })
      }
    })

  }

  onProgressBudgetAdded(activityId: string, month: any, target: any) {

    var actprogress: UpdateActivityProgressDto = {
      activityId: activityId,
      usedBudget: target.value,
      actualWorked: 0,
      employeeId:this.user.employeeId,
      createdBy: this.user.userId,
      order: month.value,
      progressType: 0
    }

    this.projectService.updateActivityProgress(actprogress).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Successfully Updated', detail: res.message })
          // Refresh the activities data to show updated values
          this.refreshActivitiesData()
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: res.message })
        }
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something Went Wrong', detail: err.message })
      }
    })

  }

  refreshActivitiesData() {
    // Refresh activities data to get updated monthPerformance after task time changes
    this.getAssignedActivites()
  }

  getMonthName (){

    var k =  this.months.filter((item)=> 
    {
    return (item.value == this.selectedMonth )
    })
  
    return k[0].label
  }

    exportAsExcel(name:string) {
  
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s:any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s:any, c:any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };
    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
}

 

}

