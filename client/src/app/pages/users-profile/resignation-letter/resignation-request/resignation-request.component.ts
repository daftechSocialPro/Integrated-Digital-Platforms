import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DepartmentPostDto } from 'src/app/model/HRM/IDepartmentDto';
import { ResignationRequestDto } from 'src/app/model/HRM/IResignationDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resignation-request',
  templateUrl: './resignation-request.component.html',
  styleUrls: ['./resignation-request.component.css']
})
export class ResignationRequestComponent implements OnInit {

 
  resignationtForm!: FormGroup;
  user !: UserView
  fileGH! : File;

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

      this.resignationtForm = this.formBuilder.group({
        resignationDate: ['', Validators.required],
        reasonForResignation: ['',Validators.required]
        
    })
  
  }

  closeModal() {
    this.activeModal.close();
  }
  onUpload(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file
   
  }
  submit (){

    if (this.resignationtForm.valid){

      var requestReisgnation : ResignationRequestDto ={
        
        employeeId : this.user.employeeId,
        resignationDate:this.resignationtForm.value.resignationDate,
        reasonForResignation:this.resignationtForm.value.reasonForResignation,
        createdById : this.user.userId

      }


      var formData = new FormData();
      for (let key in requestReisgnation) {
        if (requestReisgnation.hasOwnProperty(key)) {
          formData.append(key, (requestReisgnation as any)[key]);
        }
      }

      // Append the file to the form data
      formData.append('resignationLetterPath', this.fileGH);  

      this.hrmService.requestResignation(formData).subscribe({
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