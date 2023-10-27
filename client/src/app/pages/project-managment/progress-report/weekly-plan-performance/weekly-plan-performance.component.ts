import { Component, OnInit } from '@angular/core';
import { FilterDateCriteriaDto, PlanPerformanceListDto } from 'src/app/model/PM/StaffWeeklyPlanDto';
import { PMService } from 'src/app/services/pm.services';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-weekly-plan-performance',
  templateUrl: './weekly-plan-performance.component.html',
  styleUrls: ['./weekly-plan-performance.component.css']
})
export class WeeklyPlanPerformanceComponent implements OnInit {


  staffWeeklyPlanDto: PlanPerformanceListDto[] = []
  rangeDates: Date[] = [];


  constructor(private pmService: PMService) {
  }

  ngOnInit(): void {

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
    this.pmService.getWeeklyPerformancePlans(filterCriteria).subscribe({
      next: (res) => {
        this.staffWeeklyPlanDto = res
      }, error: (err) => {
        console.error(err)
      }
    });
  }


  range(length: number) {
    return Array.from({ length }, (_, i) => i);
  }

}
