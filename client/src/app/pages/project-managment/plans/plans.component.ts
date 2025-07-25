import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { AddPlansComponent } from './add-plans/add-plans.component';
import { PlanService } from '../../../services/plan.service';
import { PlanView } from '../../../model/PM/PlansDto';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  
  programId!: string;
  Plans: PlanView[] = []
  FilterdPlans: PlanView[] = []
  userview:UserView
  constructor(
    private modalService: NgbModal,
    private planService: PlanService,
    private router: Router,
    private messageService :MessageService,
    private userService:UserService,
    private confirmationService : ConfirmationService,
    private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.userview = this.userService.getCurrentUser()

    this.programId = this.activeRoute.snapshot.paramMap.get('programId')!

    this.listPlans()
  }

  listPlans() {
    
    if(this.userview.role.includes('PM-ADMIN')){
    this.planService.getPlans(null,0).subscribe({
      next: (res) => {
       
        this.Plans = res
        this.FilterdPlans = res
      },
      error: (err) => {
        console.error(err)
      }
    })
    }else {
      this.planService.getPlans(this.userview.employeeId,0).subscribe({
        next: (res) => {

          this.Plans = res
          this.FilterdPlans = res
        },
        error: (err) => {
          console.error(err)
        }
      })
    }

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
  viewDashboard(planId : string){

    this.router.navigate(['/pm/planDashboard/',planId])
   
  }

  deletePlan(planId:string){

    this.confirmationService.confirm({
      message: 'Are You sure you want to delete this Project?\n this project might be related to store\n, purchase , payments , salaries and training\n and there is no getting back all the data',
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


  Filter(value:string){

    const searchTerm = value.toLowerCase()

    this.FilterdPlans = this.Plans.filter((item)=> {
          return (
                  item.planName.toLowerCase().includes(searchTerm) ||
                  item.projectNumber.toLowerCase().includes(searchTerm)
                )
    })
  }

}
