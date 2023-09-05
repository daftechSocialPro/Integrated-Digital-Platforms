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
        JobTitle: ['']
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  submit (){

    if (this.PositionForm.valid){

      var PositionPost : PositionPostDto ={
        
        positionName : this.PositionForm.value.PositionName,
        jobTitle : this.PositionForm.value.JobTitle,
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

}
