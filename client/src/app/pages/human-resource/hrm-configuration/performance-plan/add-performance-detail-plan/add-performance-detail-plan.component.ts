import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddPerformancePlanDetailDto } from 'src/app/model/HRM/IPerformancePlanDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-performance-detail-plan',
  templateUrl: './add-performance-detail-plan.component.html',
  styleUrls: ['./add-performance-detail-plan.component.css']
})
export class AddPerformanceDetailPlanComponent implements OnInit {

  performanceFormG!: FormGroup;
  user !: UserView
  @Input() planId !: string 

  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser();
    this.performanceFormG = this.formBuilder.group({
      name: ['', Validators.required],
      description:[''],
      target:['', Validators.required],
  });
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private userService : UserService,
    private messageService: MessageService) { 
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.performanceFormG.valid){
      var performance : AddPerformancePlanDetailDto ={
        name : this.performanceFormG.value.name,
        description: this.performanceFormG.value.description,
        target: this.performanceFormG.value.target,
        performancePlanId: this.planId,
        createdById : this.user.userId
      }
      this.hrmService.addPerformancePlanDetail(performance).subscribe({
        next:(res)=>{
          if (res.success){
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });              
            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
          }
        },
        error:(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
        }
      });
    }
  }
}