import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DepartmentPostDto } from 'src/app/model/HRM/IDepartmentDto';
import { UserView } from 'src/app/model/user';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

 
  departmentForm!: FormGroup;
  user !: UserView;
  
  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser()   
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private toastService : CommonService,
    private userService : UserService,
    private messageService: MessageService) { 

      this.departmentForm = this.formBuilder.group({
        DepartmentName: ['', Validators.required],
        Remark: ['']
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.departmentForm.valid){

      var departmentPost : DepartmentPostDto ={
        
        DepartmentName : this.departmentForm.value.DepartmentName,
        Remark : this.departmentForm.value.Remark,
        CreatedById : this.user.userId

      }

      this.hrmService.addDepratment(departmentPost).subscribe({
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
      })

    }

  }

}
