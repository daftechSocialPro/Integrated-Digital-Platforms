import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HrmService } from 'src/app/services/hrm.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-overtime-attendance-report',
  templateUrl: './overtime-attendance-report.component.html',
  styleUrls: ['./overtime-attendance-report.component.css']
})
export class OvertimeAttendanceReportComponent implements OnInit {

  attendanceDate: any;
  pdfUrl: SafeResourceUrl | null = null;

  constructor(private hrmService: HrmService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  generateReport() {
    debugger;
   const dateStr = this.attendanceDate.toISOString().split('T')[0];
    this.hrmService.getDailyOvertimeReport(dateStr, "PDF").subscribe({
      next: (response: ArrayBuffer) => {
        // Convert ArrayBuffer to Blob
        const pdfBlob = new Blob([response], { type: 'application/pdf' });
        // Create safe URL for PDF display
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(pdfBlob)
        );
      },
      error: (err) => {
        console.error('Error generating report:', err);
      }
    });
  }

  exportAsExcel() {
    const dateStr = this.attendanceDate.toISOString().split('T')[0];
    this.hrmService.getDailyOvertimeReport(dateStr, "EXCELOPENXML").subscribe({
      next: (response: ArrayBuffer) => {
        // 1. Convert ArrayBuffer to Blob (Excel format)
        const excelBlob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        // 2. Trigger download using file-saver
        saveAs(excelBlob, `DailyAttendance_${this.formatDate(dateStr)}.xlsx`);
      },
      error: (err) => {
        console.error('Error generating report:', err);
      }
    });
  }
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  }

}