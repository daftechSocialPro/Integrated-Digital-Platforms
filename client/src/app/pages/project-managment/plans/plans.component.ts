import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { AddPlansComponent } from './add-plans/add-plans.component';
import { PlanService } from '../../../services/plan.service';
import { PlanView } from '../../../model/PM/PlansDto';

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
    private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {

    this.programId = this.activeRoute.snapshot.paramMap.get('programId')!

    this.listPlans()
  }

  listPlans() {

    this.planService.getPlans(this.programId).subscribe({
      next: (res) => {
        console.log("projects", res)
        this.Plans = res
      },
      error: (err) => {
        console.error(err)
      }
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

}
