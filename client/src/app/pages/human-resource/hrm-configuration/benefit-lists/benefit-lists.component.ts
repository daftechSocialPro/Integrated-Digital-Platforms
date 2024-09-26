import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitListDto } from 'src/app/model/HRM/IBenefitListDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddBenefitListComponent } from './add-benefit-list/add-benefit-list.component';

@Component({
  selector: 'app-benefit-lists',
  templateUrl: './benefit-lists.component.html',
  styleUrls: ['./benefit-lists.component.css']
})
export class BenefitListsComponent implements OnInit {
  filterValue!:string
  benefitLists! : BenefitListDto[]

  ngOnInit(): void {

    this.getBenefitLists()
    
  }

  constructor (private hrmService : HrmService,private modalService:NgbModal){}

  getBenefitLists (){
    this.hrmService.getBenefitLists().subscribe({
      next:(res)=>{
          this.benefitLists = res
      },error:(err)=>{
   
      }
    })
  }

  addNew(){
    let modalRef = this.modalService.open(AddBenefitListComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{
      this.getBenefitLists()
    })
  }

  update (updateBenefit :BenefitListDto){
    let modalRef = this.modalService.open(AddBenefitListComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.benefit = updateBenefit
    modalRef.result.then(()=>{
      this.getBenefitLists()
    });
  }

  get filteredBenfitList(): any[] {
    if (!this.filterValue) {
        return this.benefitLists;
    }
    
    const filterText = this.filterValue.toLowerCase();
    
    return this.benefitLists.filter((department: any) => {
        const name = department.name.toLowerCase();
      
        
        
        return name.includes(filterText) ;
    });
  }


}