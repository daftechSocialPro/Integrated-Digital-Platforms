import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { PositionPostDto } from 'src/app/model/HRM/IPositionDto';
import { UserView } from 'src/app/model/user';
import { toastPayload, CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {


  PositionForm!: FormGroup;
  user !: UserView
  fromSalary: boolean = false;

  ngOnInit(): void {
    this.user  = this.userService.getCurrentUser()   
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService : HrmService,
    private messageService : MessageService,
    private userService : UserService) { 

      this.PositionForm = this.formBuilder.group({
        PositionName: ['', Validators.required],
        amharicName: ['', Validators.required],
        hasSeverance: [false,Validators.required],
        severancePercentage: [null]
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.PositionForm.valid){

      var PositionPost : PositionPostDto ={
        
        positionName : this.PositionForm.value.PositionName,
        amharicName : this.PositionForm.value.amharicName,
        hasSeverance: this.PositionForm.value.hasSeverance,
        severancePercentage: this.PositionForm.value.severancePercentage,
        createdById : this.user.userId

      }

      this.hrmService.addPosition(PositionPost).subscribe({
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

  fromSalaryChange(e: any){
    this.fromSalary = e.checked
    if(this.fromSalary == true){
      this.PositionForm.get('severancePercentage').setValidators([Validators.required])
    }
    else{
      this.PositionForm.get('severancePercentage').clearValidators()
    }
    this.PositionForm.get('severancePercentage').updateValueAndValidity()
  }
}
