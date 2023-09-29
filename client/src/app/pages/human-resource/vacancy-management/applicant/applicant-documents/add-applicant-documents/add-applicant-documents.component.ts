import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UserView } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-add-applicant-documents',
  templateUrl: './add-applicant-documents.component.html',
  styleUrls: ['./add-applicant-documents.component.css']
})
export class AddApplicantDocumentsComponent implements OnInit {

  @Input() employeeId! : string
  @Input() applicantVacancyId!:string
  
  HistoryForm !: FormGroup;

  user ! : UserView
  fileGH! : File;
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()

  }
  constructor(
    private activeModal: NgbActiveModal, 
    private vacancyService: VacancyService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService: MessageService,
   
    ) {

      this.HistoryForm = this.formBuilder.group({      
       

        description: [null,Validators.required],
      
      })
     }

 
  closeModal() {
    this.activeModal.close()
  }
  onUpload(event: any) {
    var file: File = event.target.files[0];
    this.fileGH = file   
  }

  submit(){
    if (this.HistoryForm.valid){

   
      var formData = new FormData();
     

      formData.append('applicantVacnncyId', this.applicantVacancyId);  
      formData.append('description', this.HistoryForm.value.description);  
   
      formData.append('documentPath', this.fileGH);  


      this.vacancyService.addApplicantDocuemtns(formData).subscribe(
        {
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
        }
      )

     

    }
    

  }


}