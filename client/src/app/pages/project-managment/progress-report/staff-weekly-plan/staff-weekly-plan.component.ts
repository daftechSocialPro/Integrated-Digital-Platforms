import { Component, OnInit } from '@angular/core';
import { FilterDateCriteriaDto, StaffWeeklyPlanDto } from 'src/app/model/PM/StaffWeeklyPlanDto';
import { PMService } from 'src/app/services/pm.services';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-staff-weekly-plan',
  templateUrl: './staff-weekly-plan.component.html',
  styleUrls: ['./staff-weekly-plan.component.css']
})
export class StaffWeeklyPlanComponent implements OnInit {


  staffWeeklyPlanDto: StaffWeeklyPlanDto[] = []
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
    this.pmService.getStaffWeeklyPlans(filterCriteria).subscribe({
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
