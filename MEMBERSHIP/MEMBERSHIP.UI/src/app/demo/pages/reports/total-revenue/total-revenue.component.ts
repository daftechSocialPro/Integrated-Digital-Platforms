import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { IRegionRevenueDto } from 'src/models/configuration/IMembershipDto';

@Component({
  selector: 'app-total-revenue',
  templateUrl: './total-revenue.component.html',
  styleUrls: ['./total-revenue.component.scss']
})
export class TotalRevenueComponent implements OnInit {


  reportRevenues: IRegionRevenueDto[]
  regionRevenueSum:number = 0
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;


  ngOnInit(): void {
    this.getRevenueReport()

  }
  constructor(private memberService: MemberService) { }


  getRevenueReport() {

    this.memberService.GetRegionReportRevenue().subscribe({
      next: (res) => {
        this.reportRevenues = res
        this.reportRevenues.map((item) => {
        console.log(item.regionRevenue)
          this.regionRevenueSum += item.regionRevenue
        }
        )
      }
    })
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
