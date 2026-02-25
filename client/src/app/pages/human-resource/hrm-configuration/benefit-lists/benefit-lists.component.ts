import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BenefitListDto } from 'src/app/model/HRM/IBenefitListDto';
import { HrmService } from 'src/app/services/hrm.service';
import { AddBenefitListComponent } from './add-benefit-list/add-benefit-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';

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

  constructor (private hrmService : HrmService,private modalService:NgbModal, private confirmationService: ConfirmationService, private messageService: MessageService){}

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

  delete(benefitList: BenefitListDto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this benefit list?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.hrmService.deleteBenefitList(benefitList.id!).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.getBenefitLists();
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            }
          }, error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unable to delete benefit list" });
          }
        });
      }
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