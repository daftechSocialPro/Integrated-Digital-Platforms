import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StrategicPlanGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { AddStrategicPlanComponent } from './add-strategic-plan/add-strategic-plan.component';
import { UpdateStrategicPlanComponent } from './update-strategic-plan/update-strategic-plan.component';

@Component({
  selector: 'app-strategic-plan',
  templateUrl: './strategic-plan.component.html',
  styleUrls: ['./strategic-plan.component.css']
})
export class StrategicPlanComponent implements OnInit {
  
  strategicPlans! : StrategicPlanGetDto[]

  ngOnInit(): void {

    this.getStragegicPlan()
    
  }

  constructor (private pmService : ProjectmanagementService,private modalService:NgbModal){}


  getStragegicPlan (){
    this.pmService.getStragegicPlan() .subscribe({
      next:(res)=>{     
          this.strategicPlans = res       
      
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addStrategicPlan(){

    let modalRef = this.modalService.open(AddStrategicPlanComponent,{size:'lg',backdrop:'static'})
    modalRef.result.then(()=>{

      this.getStragegicPlan()
    })
  }

  updateStrategicPlan (department :StrategicPlanGetDto){
    let modalRef = this.modalService.open(UpdateStrategicPlanComponent,{size:'lg',backdrop:'static'})
    modalRef.componentInstance.strategicPlan  = department
    modalRef.result.then(()=>{
      this.getStragegicPlan()
    });
  }




}
