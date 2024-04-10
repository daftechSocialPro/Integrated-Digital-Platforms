import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { IncomeTaxReportGetDto } from 'src/app/model/Finance/IFinanceReportDto';
import { Column, ExportColumn } from 'src/app/model/configuration/IColumnDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-income-tax-report',
  templateUrl: './income-tax-report.component.html',
  styleUrls: ['./income-tax-report.component.css']
})
export class IncomeTaxReportComponent implements OnInit {
  incomeTaxMonth!: any
  incomeTaxReportList!: IncomeTaxReportGetDto
  selectedincomeTaxReportList!: IncomeTaxReportGetDto[]
  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private financeService : FinanceService,
  ){}

  ngOnInit(): void {
    this.cols = [
      { field: 'totalNoEmployee', header: 'Total Number Of Employee' },
      { field: 'totalIncome', header: 'Total Income' },
      { field: 'totalTax', header: 'Total Tax' },
      { field: 'month', header: 'Month' },
      { field: 'year', header: 'Year' },
    ];

    
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }
  generateReport(){
    const date = new Date(this.incomeTaxMonth);
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
        this.incomeTaxReportList = res
      }
    })
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.incomeTaxReportList);
            doc.save('products.pdf');
        });
    });
  }

  exportExcel() {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.incomeTaxReportList.incomeTaxEmployeeDto);
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

}
