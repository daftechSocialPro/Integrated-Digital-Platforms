import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Column } from 'jspdf-autotable';
import { IncomeTaxReportGetDto, PensionReportGetDto } from 'src/app/model/Finance/IFinanceReportDto';
import { ExportColumn } from 'src/app/model/configuration/IColumnDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-income-tax-declaration',
  templateUrl: './income-tax-declaration.component.html',
  styleUrls: ['./income-tax-declaration.component.css']
})
export class IncomeTaxDeclarationComponent implements OnInit {

  @ViewChild('myTable', { static: false }) excelTable!: ElementRef;


  pensionMonth!: any
  pensionReportList!: IncomeTaxReportGetDto
  selectedPensionReportList!: IncomeTaxReportGetDto[]
  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private financeService : FinanceService,
  ){}

  ngOnInit(): void {
      
  }
  exportAsExcel(name: string) {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s: any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s: any, c: any) { return s.replace(/{(\w+)}/g, function(m: any, p: any) { return c[p]; }) };
  
    const table = document.getElementById('myTable');
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
  this.financeService.getIncomeTaxReport(formattedDate).subscribe({
    next: (res) => {
      this.pensionReportList = res

      console.log("IncomeTaxReportGetDto",res)
    }
  })
}
exportPdf() {
  window.print()
  // import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //         const doc = new jsPDF.default('p', 'px', 'a4');
  //         (doc as any).autoTable(this.exportColumns, this.pensionReportList);
  //         doc.save('products.pdf');
  //     });
  // });
}

exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.pensionReportList.incomeTaxEmployeeDto);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'products');
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
print(){

  let printContents: any;
  printContents = document.getElementById('myTable')?.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  location.reload();
}

}
