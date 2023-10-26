import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ApplicantListDto } from 'src/app/model/Vacancy/IApplicantDto';
import { VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';
import { Column } from 'src/app/model/configuration/IColumnDto';
import { CommonService } from 'src/app/services/common.service';
import { VacancyService } from 'src/app/services/vacancy.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})
export class VacancyDetailComponent implements OnInit {

  vacancyDetail!: VacancyListDto
  vacancyId!: string
  vaccancyEmployees!:ApplicantListDto[]
  totalRecords: number = 0;
  loading: boolean = true;
  cols!: Column[];
  selectedApplicants: ApplicantListDto[] = []
  

  ngOnInit(): void {

    this.cols = [
      { field: 'fullName', header: 'Full Name', customExportHeader: 'Full Name' },
      { field: 'gender', header: 'Gender' },
      { field: 'dateOfApplication', header: 'Application Date' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'applicantType', header: 'Applicant Type' },
      { field: 'applicantStatus', header: 'Applicant Status' }
    ];
    this.vacancyId = this.route.snapshot.paramMap.get('id')!
    this.getVacancyDetail()
    this.getApplicantList()

  }

  loadAppricants(event: any){
    this.loading = false;
  }

  constructor(
    private commonService:CommonService,
    private router : Router,
    private vacancyService: VacancyService, 
    private route: ActivatedRoute) {

  }


exportExcel() {
       var filename = "Applicant";
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.vaccancyEmployees);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, filename);
      XLSX.writeFile(wb, filename + '.xlsx');
}

 

  getVacancyDetail() {

    this.vacancyService.getVacanyDetail(this.vacancyId).subscribe({
      next: (res) => {
        this.vacancyDetail = res
       
      }
    })
  }

  goToVacancyList(){
    this.router.navigate(['/HRM/vacancyList'])

  }
  getVacancyEmployees(){

    this.vacancyService.getApplicantList(this.vacancyId).subscribe({
      next:(res)=>{
        this.vaccancyEmployees = res 
      }
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getFIle(url:string){
    return this.commonService.createImgPath(url);
  }

apply(){
  this.router.navigate(['/HRM/internalApplicant',this.vacancyId])
}

getApplicantList(){

  this.vacancyService.getApplicantList(this.vacancyId).subscribe({
    next:(res)=>{
      
      this.vaccancyEmployees = res 
    }
  })
}

goToDetails(applicantId:string){
  this.router.navigate(['/HRM/internalApplicant',this.vacancyId,applicantId])
}

}
