import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBudgetYearDto } from 'src/app/model/PM/ITimePeriodDto';
import { PMService } from 'src/app/services/pm.services';
import { AddBudgetYearComponent } from './add-budget-year/add-budget-year.component';

@Component({
  selector: 'app-budget-year',
  templateUrl: './budget-year.component.html',
  styleUrls: ['./budget-year.component.css']
})
export class BudgetYearComponent implements OnInit {
  
  BudgetYears! : IBudgetYearDto[]

  ngOnInit(): void {

    this.getBudgetYears()
    
  }

  constructor (private pmService : PMService,private modalService:NgbModal){}


  getBudgetYears (){
    this.pmService.getBudgetyear().subscribe({
      next:(res)=>{      
          this.BudgetYears = res       
      
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addBudgetYear(){

    let modalRef = this.modalService.open(AddBudgetYearComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getBudgetYears()
    })
  }

  updateBudgetYear (BudgetYear :IBudgetYearDto){
    let modalRef = this.modalService.open(AddBudgetYearComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.BudgetYear = BudgetYear
    modalRef.result.then(()=>{
      this.getBudgetYears()
    });
  }




}