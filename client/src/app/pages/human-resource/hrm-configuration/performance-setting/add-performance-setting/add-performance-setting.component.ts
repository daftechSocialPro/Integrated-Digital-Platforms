import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { PerformanceSettingDto } from 'src/app/model/HRM/IPerformanceSettingDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-performance-setting',
  templateUrl: './add-performance-setting.component.html',
  styleUrls: ['./add-performance-setting.component.css']
})

export class AddPerformanceSettingComponent implements OnInit {

 
  performanceFormG!: FormGroup;
  user !: UserView
  
  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser();
    this.performanceFormG = this.formBuilder.group({
      performanceMonth: ['', Validators.required],
      performanceIndex: ['', Validators.required],
      performanceStartDate:['', Validators.required],
      performanceEndDate:['', Validators.required],
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
      var performance : PerformanceSettingDto ={
        performanceIndex : this.performanceFormG.value.performanceIndex,
        performanceMonth : this.performanceFormG.value.performanceMonth,
        performanceEndDate: this.performanceFormG.value.performanceEndDate,
        performanceStartDate: this.performanceFormG.value.performanceStartDate,
        createdById : this.user.userId
      }
      this.hrmService.addPerformanceSetting(performance).subscribe({
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