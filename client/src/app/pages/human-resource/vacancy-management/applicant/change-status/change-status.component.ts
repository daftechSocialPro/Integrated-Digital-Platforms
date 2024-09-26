import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ApplicantProcessDto } from 'src/app/model/Vacancy/IApplicantDto';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { VacancyService } from 'src/app/services/vacancy.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent implements OnInit{

  @Input() applicantStatus !: number;
  @Input() applicantId !: string;
  @Input() vacancyId !: string;
  user !: UserView;
  statusForm!: FormGroup;


  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder, 
              private vacancyService: VacancyService,
              private userService: UserService,
              private messageService: MessageService){}    
  
  
  
  ngOnInit() {
    this.initStatusForm();
    this.user = this.userService.getCurrentUser();
  }

  

  initStatusForm() {
    this.statusForm = this.formBuilder.group({
      subject: [''],
      sendEmail: [false],
      description: [''],
      scheduleDate: [null],
      hireDate: [null],
    });
  }


  closeModal() {
    this.activeModal.close()
  }

  submit() {

    if (this.statusForm.valid) {
      
      var applicantStatus: ApplicantProcessDto = {
        applicantId: this.applicantId,
        vacancyId: this.vacancyId,
        applicantStatus: this.applicantStatus,
        subject: this.statusForm.value.subject,
        description: this.statusForm.value.description,
        sendEmail: this.statusForm.value.sendEmail,
        userId: this.user.userId,
        scheduleDate: this.statusForm.value.scheduleDate,
        hireDate: this.statusForm.value.hireDate
      }
      this.vacancyService.changeApplicantStatus(applicantStatus).subscribe(
        {
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: "Success!!", detail: res.message });
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: "Error!!", detail: res.message });
            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        }
      );
    }
  }
}
