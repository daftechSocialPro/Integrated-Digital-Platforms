import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { PayrollReportGetDto } from 'src/app/model/Finance/IFinanceReportDto';
import { Column, ExportColumn } from 'src/app/model/configuration/IColumnDto';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-payroll-report',
  templateUrl: './payroll-report.component.html',
  styleUrls: ['./payroll-report.component.css']
})
export class PayrollReportComponent implements OnInit{

  payrollMonth!: any
  payrollReportList!: PayrollReportGetDto[]
  selectedPayrollReportList!: PayrollReportGetDto[]
  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private financeService : FinanceService,
  ){}

  ngOnInit(): void {
    this.cols = [
      { field: 'employeeName', header: 'Employee Name'},
      { field: 'position', header: 'Position' },
      { field: 'daysWorked', header: 'Days Worked' },
      { field: 'sourceOfFund', header: 'Source Of Fund' },
      { field: 'salary', header: 'Salary'},
      { field: 'transportFuelAllowance', header: 'Transport Fuel Allowance' },
      { field: 'communicationAllowance', header: 'Communication Allowance' },
      { field: 'positionAllowanceOT', header: 'Position Allowance OT'},
      { field: 'pFEmployerPension', header: 'PF Employer Pension' },
      { field: 'employeePension', header: 'Employee Pension' },
      { field: 'totalEarning', header: 'Total Earning'},
      { field: 'taxableIncome', header: 'Taxable Income' },
      { field: 'incomeTax', header: 'Income Tax' },
      { field: 'pension', header: 'Pension'},
      { field: 'loan', header: 'Loan' },
      { field: 'totalDeduction', header: 'Total Deduction' },
      { field: 'netPay', header: 'Net Pay' },
    ];

    
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }
  generateReport(){
    const date = new Date(this.payrollMonth);
    const formattedDate = date.toLocaleString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    this.financeService.getPayrollReport(formattedDate).subscribe({
      next: (res) => {
        this.payrollReportList = res
      }
    })
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.payrollReportList);
            doc.save('products.pdf');
        });
    });
}

exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.payrollReportList);
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
