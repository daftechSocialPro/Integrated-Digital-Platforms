import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { AddPlansComponent } from './add-plans/add-plans.component';
import { PlanService } from '../../../services/plan.service';
import { PlanView } from '../../../model/PM/PlansDto';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  
  programId!: string;
  Plans: PlanView[] = []
  constructor(
    private modalService: NgbModal,
    private planService: PlanService,
    private router: Router,
    private messageService :MessageService,
    private confirmationService : ConfirmationService,
    private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {

    this.programId = this.activeRoute.snapshot.paramMap.get('programId')!

    this.listPlans()
  }

  listPlans() {

    this.planService.getPlans().subscribe({
      next: (res) => {
        console.log("projects", res)
        this.Plans = res
      },
      error: (err) => {
        console.error(err)
      }
    })

  }

  updatePlan(plan:PlanView){

    let modalRef =this.modalService.open (AddPlansComponent,{size:'xl',backdrop:'static'})
    modalRef.componentInstance.planView = plan

    modalRef.result.then((res)=>{
      this.listPlans()
    })
  }


  addPlan() {

    let modalRef = this.modalService.open(AddPlansComponent, { size: 'xl', backdrop: 'static' });
    modalRef.result.then((res) => {
      this.listPlans()
    })

  }

  tasks(plan: PlanView) {
    const planId = plan ? plan.id : null
    if(plan.hasTask){
      this.router.navigate(['pm/task', { planId: planId }]);
    }
    else{
      this.router.navigate(['pm/activityparent',{parentId:planId,requestFrom:'PLAN'}])
    }
  }

  applyStyles(act: number, completed: number) {

    let percentage = (completed / act) * 100
    const styles = { 'width': percentage + "%" };
    return styles;
  }

  viewDetail(planId : string){

    this.router.navigate(['/pm/planDetail/',planId])
   
  }

  deletePlan(planId:string){

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Project?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.planService.deletePlan(planId).subscribe({
          next: (res) => {

            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: res.message });
              this.listPlans()
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: res.message });
            }
          }, error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: err });


          }
        })

      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: 'positionDialog'
    });


  }


}
