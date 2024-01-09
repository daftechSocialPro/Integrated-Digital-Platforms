import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FilterDateCriteriaDto, StaffWeeklyPlanDto } from 'src/app/model/PM/StaffWeeklyPlanDto';
import { IWeeklyPlanDto } from 'src/app/model/PM/WeeklyPlanDto';
import { PMService } from 'src/app/services/pm.services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-staff-weekly-plan',
  templateUrl: './staff-weekly-plan.component.html',
  styleUrls: ['./staff-weekly-plan.component.css']
})
export class StaffWeeklyPlanComponent implements OnInit {

  @ViewChild('dt') table!: Table;
  staffWeeklyPlanDto: IWeeklyPlanDto[] = []
  filterdPlans: IWeeklyPlanDto[] = []
  rangeDates: Date[] = [];
  selectedFilterOption: string = 'all';

  currentDate: Date=  new Date();
  constructor(private pmService: PMService) {
  }

  ngOnInit(): void {

    this.getWeeklyPlan()
   


  }

  getWeeklyPlan(){

    this.pmService.getWeeklyPlans().subscribe({
      next:(res)=>{
        this.staffWeeklyPlanDto = res
        this.filterTable()
      }
    })
  }

  exportExcel() {
    var filename = "Weekly Plan Report";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.staffWeeklyPlanDto);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, filename + '.xlsx');
  }


  Search() {
     var filterCriteria : FilterDateCriteriaDto = {
        fromDate : this.rangeDates[0],
        toDate : this.rangeDates[1],

    }
  
  }


  range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }

  filterTable() {
    this.filterdPlans = this.staffWeeklyPlanDto
    if (this.selectedFilterOption === 'weekly') {
      // Filter for the current week (Monday to Sunday)
      const firstDayOfWeek = new Date(this.currentDate);
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() - this.currentDate.getDay() + 1); // Set to Monday
  
      firstDayOfWeek.setHours(0, 0, 0, 0); 
      const lastDayOfWeek = new Date(this.currentDate);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (7 - this.currentDate.getDay())); // Set to Sunday
      lastDayOfWeek.setHours(0, 0, 0, 0); 

      console.log(firstDayOfWeek)
      console.log(lastDayOfWeek)
      this.filterdPlans = this.staffWeeklyPlanDto.filter((item) => {
        const fromDate = new Date(item.fromDate);
        fromDate.setHours(0, 0, 0, 0); 
        return fromDate >= firstDayOfWeek && fromDate <= lastDayOfWeek;
      });
    
    } else if (this.selectedFilterOption === 'monthly') {
      // Filter for the current month
      const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0); 
      const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      lastDayOfMonth.setHours(0, 0, 0, 0); 

      this.filterdPlans = this.staffWeeklyPlanDto.filter((item) => {
        const fromDate = new Date(item.fromDate);
        fromDate.setHours(0, 0, 0, 0); 
        return fromDate >= firstDayOfMonth && fromDate <= lastDayOfMonth;
      });
      //this.applyFilter(firstDayOfMonth, lastDayOfMonth);
    } else {
      // No filter selected, show all rows
    
    }
  }
}
