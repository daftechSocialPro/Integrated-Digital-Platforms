import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterMetadata, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilterCriteria, FilterDetail } from 'src/app/model/FilterCriteria';
import { VacancyListDto } from 'src/app/model/Vacancy/vacancyList.Model';
import { VacancyService } from 'src/app/services/vacancy.service';
import { AddVacancyComponent } from './add-vacancy/add-vacancy.component';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})

export class VacancyListComponent implements OnInit {

  filterCriteria: FilterCriteria[] = [];
  filterDetail: FilterDetail= null!;
  vacancyList: VacancyListDto[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  filters: any [] = [];

  constructor (private vacancyService : VacancyService,private modalService:NgbModal){}

  ngOnInit() {
    this.getVacnacy();
  }

  getVacnacy (){
    this.vacancyService.getVacancyList().subscribe({
      next:(res)=>{
          this.vacancyList = res;
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  addNew() {
    let modalRef = this.modalService.open(AddVacancyComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
      this.getVacnacy()
    });
  }

  edit(vacancyId: string){
    let modalRef = this.modalService.open(AddVacancyComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.vacancyId = vacancyId
    modalRef.result.then(()=>{
      this.getVacnacy()
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
 

}
