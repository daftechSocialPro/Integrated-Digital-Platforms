import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { PensionReportGetDto } from 'src/app/model/Finance/IFinanceReportDto';
import { Column, ExportColumn } from 'src/app/model/configuration/IColumnDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-pension-report',
  templateUrl: './pension-report.component.html',
  styleUrls: ['./pension-report.component.css']
})
export class PensionReportComponent implements OnInit {
  pensionMonth!: any
  pensionReportList!: PensionReportGetDto[]
  selectedPensionReportList!: PensionReportGetDto[]
  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private financeService : FinanceService,
  ){}

  ngOnInit(): void {
    this.cols = [
      { field: 'totalEmployees', header: 'Total Employees'},
      { field: 'totalEmployeePension', header: 'Total Employee Pension' },
      { field: 'totalEmployerPension', header: 'Total Employer Pension' },
      { field: 'totalPension', header: 'Total Pension' }
    ];

    
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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
        
      }
    })
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        // import('jspdf-autotable').then((x) => {
        //     const doc = new jsPDF.default('p', 'px', 'a4');
        //     (doc as any).autoTable(this.exportColumns, this.pensionReportList);
        //     doc.save('products.pdf');
        // });
    });
  }

  exportExcel() {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.pensionReportList);
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
