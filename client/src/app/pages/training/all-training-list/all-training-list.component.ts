import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IAllTraineeReportDto } from './IAllTraineeReportDto';
import { TrainingService } from 'src/app/services/training.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DropDownService } from 'src/app/services/dropDown.service';
import { SelectList } from 'src/app/model/common';

@Component({
  selector: 'app-all-training-list',
  templateUrl: './all-training-list.component.html',
  styleUrls: ['./all-training-list.component.css'],
})
export class AllTrainingListComponent implements OnInit {
  trainees: IAllTraineeReportDto[] = [];
  filterdTraines: IAllTraineeReportDto[] = [];

  trainings: SelectList[];

  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;

  ngOnInit(): void {
    this.getTrainees();
    this.getTraining();
  }

  constructor(
    private route: Router,
    private trainingService: TrainingService,
    private dropDownService: DropDownService
  ) {}

  getTraining() {
    this.dropDownService.getTrainingDropdown().subscribe({
      next: (res) => {
        this.trainings = res;
      },
    });
  }

  getTrainees() {
    this.trainingService.getAllReportTrainees().subscribe({
      next: (res) => {
        this.trainees = res;
        this.filterdTraines = res;
      },
      error: (err) => {},
    });
  }

  filterTrainees(value: string) {
    var searchTerm = value.toLowerCase();
    this.filterdTraines = this.trainees.filter((item) => {
      return (
        item.fullName.toLowerCase().includes(searchTerm) ||
        item.phoneNumber.toLowerCase().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm) ||
        item.project.toLowerCase().includes(searchTerm)
      );
    });
  }

  goToTrainingDashboard() {
    this.route.navigate(['pm/training-dashboard']);
  }
  exportAsExcel(name: string) {
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

  SelectItems(event: any) {
    var trainingNames = event.value.map((item) => item.name);
    this.filterdTraines = this.trainees.filter((item) =>
      trainingNames.includes(item.title)
    );
  }
}
