import { Component, ElementRef, ViewChild } from '@angular/core';
import { PensionReportGetDto } from 'src/app/model/Finance/IFinanceReportDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-pension-declaration',
  templateUrl: './pension-declaration.component.html',
  styleUrls: ['./pension-declaration.component.css']
})
export class PensionDeclarationComponent {
  @ViewChild('myTable', { static: false }) excelTable!: ElementRef;
  pensionMonth!: any
  pensionReportList!: PensionReportGetDto

  constructor(
    private financeService: FinanceService,
  ){}

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
generateReport(){
  const date = new Date(this.pensionMonth);
  const formattedDate = date.toLocaleString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  this.financeService.getPensionReport(formattedDate).subscribe({
    next: (res) => {
      this.pensionReportList = res
     
    }
  })
}


}
