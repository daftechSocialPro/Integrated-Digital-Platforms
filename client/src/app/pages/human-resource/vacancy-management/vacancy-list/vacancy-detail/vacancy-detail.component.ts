import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ApplicantListDto } from 'src/app/model/Vacancy/IApplicantDto';
import { VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';
import { CommonService } from 'src/app/services/common.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})
export class VacancyDetailComponent implements OnInit {

  vacancyDetail!: VacancyListDto
  vacancyId!: string
  vaccancyEmployees!:ApplicantListDto[]
  ngOnInit(): void {

    this.vacancyId = this.route.snapshot.paramMap.get('id')!
    this.getVacancyDetail()
    this.getApplicantList()

  }

  constructor(
    private commonService:CommonService,
    private router : Router,
    private vacancyService: VacancyService, 
    private route: ActivatedRoute) {

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
