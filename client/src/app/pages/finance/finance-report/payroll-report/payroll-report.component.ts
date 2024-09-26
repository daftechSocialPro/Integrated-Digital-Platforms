import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import { PayrollReportGetDto } from 'src/app/model/Finance/IFinanceReportDto';
import { Column, ExportColumn } from 'src/app/model/configuration/IColumnDto';
import { CommonService } from 'src/app/services/common.service';
import { FinanceService } from 'src/app/services/finance.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { BankListDto } from 'src/app/model/configuration/IBankListDto';
@Component({
  selector: 'app-payroll-report',
  templateUrl: './payroll-report.component.html',
  styleUrls: ['./payroll-report.component.css'],
})
export class PayrollReportComponent implements OnInit {
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  @ViewChild('excelTable2', { static: false }) excelTable2!: ElementRef;

  printing: boolean = false;
  payrollMonth!: any;
  payrollReportList!: PayrollReportGetDto[];
  selectedPayrollReportList!: PayrollReportGetDto[];
  cols!: Column[];
  imagePath: string = "'../../../../../assets/logo2.png'";
  exportColumns!: ExportColumn[];
  todayDate:Date= new Date();
  

  bankid:string
  bankList : BankListDto[]=[]
  bankReport:BankListDto

  constructor(
    private financeService: FinanceService,
    private http: HttpClient,
    private commonService: CommonService,
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigurationService, 
  ) {}

  ngOnInit(): void {
    this.getImage2();
    this.getBankList();
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }
  onBankSelect(){
    this.bankReport = this.bankList.filter((item)=>{
      return (item.id==this.bankid);
    })[0]
  }

  async getImage2() {
    const imageBlob = await this.http
      .get(this.getImage('wwwroot/logo2.png'), { responseType: 'blob' })
      .toPromise();

    const imageUrl = URL.createObjectURL(imageBlob);

    this.imagePath = imageUrl;
  }
  generateReport() {
    const date = new Date(this.payrollMonth);
    const formattedDate = date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    this.financeService.getPayrollReport(formattedDate).subscribe({
      next: (res) => {
      
        this.payrollReportList = res;
      },
    });
  }
  exportPdf() {
    const cardElement = document.getElementById('container'); 

    if (cardElement) {
      const membername = `payroll report.pdf`;
  
      html2pdf()
        .from(cardElement)
        .set({
          margin: 10, // Set margins (in mm)
          dpi: 300,
          pagebreak: { mode: 'landscape' }, // Set the DPI (dots per inch)
        })
        .save(membername)
        .then(() => {
       
  
          this.breakpointObserver.observe([
            Breakpoints.Handset,
            Breakpoints.Small,
            Breakpoints.XSmall
          ]).subscribe(result => {          
          });
         
        })
        .catch((error) => {
       
        });
   
    } else {
    
    }
  }

  exportPdf2() {
    this.printing = true;
    const month = this.payrollMonth.toLocaleString('default', { month: 'long' });
    const year = this.payrollMonth.getFullYear();
    var name = `${month} ${year} Salary Order`;

    const cardElement = document.getElementById('container2'); 

    if (cardElement) {
      const membername = `${name} Sales Order.pdf`;
  
      html2pdf()
        .from(cardElement)
        .set({
          margin: 10, // Set margins (in mm)
          dpi: 300,
          pagebreak: { mode: 'landscape' }, // Set the DPI (dots per inch)
        })
        .save(membername)
        .then(() => {
       
  
          this.breakpointObserver.observe([
            Breakpoints.Handset,
            Breakpoints.Small,
            Breakpoints.XSmall
          ]).subscribe(result => {
            this.printing = false;
            
          });
          // Handle setting this.isMobile if needed
          // For example, if you need to toggle this.isMobile after PDF generation
          // this.isMobile = false; 
        })
        .catch((error) => {
       
        });
   
    } else {
    
    }
    
  }

  exportAsExcel() {
    
    const month = this.payrollMonth.toLocaleString('default', { month: 'long' });
    const year = this.payrollMonth.getFullYear();
    var name = `${month} ${year}`;

    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function (s: any) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    const format = function (s: any, c: any) {
      return s.replace(/{(\w+)}/g, function (m: any, p: any) {
        return c[p];
      });
    };

    const table = this.excelTable.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  exportAsExcel2() {
    
    const month = this.payrollMonth.toLocaleString('default', { month: 'long' });
    const year = this.payrollMonth.getFullYear();
    var name = `${month} ${year} Salary Order`;

    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function (s: any) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    const format = function (s: any, c: any) {
      return s.replace(/{(\w+)}/g, function (m: any, p: any) {
        return c[p];
      });
    };

    const table = this.excelTable2.nativeElement;
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };

    const link = document.createElement('a');
    link.download = `${name}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.payrollReportList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  getNetPaySummation() {
    var sum = 0;
    this.payrollReportList.map((item) => {
      sum += item.netPay;
    });
    return sum;
  }

  print(){
    this.printing = true;
    let printContents: any;
    printContents = document.getElementById('contractLetter')?.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    location.reload();
  }


  getBankList () {


    this.configService.getBankList().subscribe({
      next:(res)=>{
        this.bankList = res;
      }
    })



  }
}
