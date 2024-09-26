import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Column } from 'jspdf-autotable';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ExportColumn } from 'src/app/model/configuration/IColumnDto';
import { BalanceTempData, GroupedGoodsReceivingReport } from 'src/app/model/Inventory/BalanceReportDto';
import { CommonService } from 'src/app/services/common.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { InventoryService } from 'src/app/services/inventory.service';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-goods-receiving-report',
  templateUrl: './goods-receiving-report.component.html',
  styleUrls: ['./goods-receiving-report.component.css']
})
export class GoodsReceivingReportComponent implements OnInit {

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
  @ViewChild('excelTable2', { static: false }) excelTable2!: ElementRef;

  printing: boolean = false;
  goodsRecivingReportList!: GroupedGoodsReceivingReport[];
  cols!: Column[];
  imagePath: string = "'../../../../../assets/logo2.png'";
  exportColumns!: ExportColumn[];
  todayDate:Date= new Date();
  fromDate!: string  
  toDate!: string 



  constructor(
    private inventoryService: InventoryService,
    private http: HttpClient,
    private commonService: CommonService,
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigurationService, 
  ) {}

  ngOnInit(): void {
    this.getImage2();
  }
  getImage(url: string) {
    return this.commonService.createImgPath(url);
  }

  async getImage2() {
    const imageBlob = await this.http
      .get(this.getImage('wwwroot/logo2.png'), { responseType: 'blob' })
      .toPromise();

    const imageUrl = URL.createObjectURL(imageBlob);

    this.imagePath = imageUrl;
  }
  generateReport() {
    
    this.inventoryService.getGroupedGoodsReceivingReport(this.fromDate, this.toDate).subscribe({
      next: (res) => {
        this.goodsRecivingReportList = res;
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
    
    const cardElement = document.getElementById('container2'); 

    if (cardElement) {
      const membername = `Goods Reciving Report From ${this.fromDate} To ${this.toDate}.pdf`;
  
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
    link.download = `Goods Reciving Report From ${this.fromDate} To ${this.toDate}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
  exportAsExcel2() {
   
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
    link.download = `Goods Reciving Report From ${this.fromDate} To ${this.toDate}.xls`;
    link.href = uri + base64(format(template, ctx));
    link.click();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.goodsRecivingReportList);
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


}
