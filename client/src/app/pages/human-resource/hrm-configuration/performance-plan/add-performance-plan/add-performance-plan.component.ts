import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { AddPerformancePlanDto } from 'src/app/model/HRM/IPerformancePlanDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-performance-plan',
  templateUrl: './add-performance-plan.component.html',
  styleUrls: ['./add-performance-plan.component.css']
})
export class AddPerformancePlanComponent implements OnInit {

 
  performanceFormG!: FormGroup;
  user !: UserView
  
  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser();
    this.performanceFormG = this.formBuilder.group({
      index: ['', Validators.required],
      name: ['', Validators.required],
      description:[''],
      totalTarget:['', Validators.required],
  });
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private toastService : CommonService,
    private userService : UserService,
    private messageService: MessageService) { 
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.performanceFormG.valid){
      var performance : AddPerformancePlanDto ={
        index : this.performanceFormG.value.index,
        name : this.performanceFormG.value.name,
        description: this.performanceFormG.value.description,
        totalTarget: this.performanceFormG.value.totalTarget,
        createdById : this.user.userId
      }
      this.hrmService.addPerformancePlan(performance).subscribe({
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