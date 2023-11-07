import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { IReportingPeriodGetDto, IReportingPeriodPostDto } from 'src/app/model/PM/ITimePeriodDto';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-report-period',
  templateUrl: './add-report-period.component.html',
  styleUrls: ['./add-report-period.component.css']
})
export class AddReportPeriodComponent implements OnInit {

  ReportingPeriod!: IReportingPeriodGetDto
  ReportingPeriodForm!: FormGroup;
  user !: UserView;

  reportingTypes = [
    {value:"FROMACTIVITYENDDATE",name:"From Activity End Date"},
    {value:"FROMQUARTEENDDATE",name:"From Quarter End Date"}]
    
    
   


  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
    if (this.ReportingPeriod) {
      this.ReportingPeriodForm = this.formBuilder.group({
        numberOfDays: [this.ReportingPeriod.numberOfDays, Validators.required],
        reportingType: [this.ReportingPeriod.reportingType]
      })
    }
    else {
      this.ReportingPeriodForm = this.formBuilder.group({
        numberOfDays: ['', Validators.required],
        reportingType: ['']


      })
    }

  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private pmService: PMService,
    private userService: UserService,
    private messageService: MessageService) {

    console.log(this.ReportingPeriod)
   

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.ReportingPeriodForm.valid) {

      if (this.ReportingPeriod) {
        var ReportingPeriodPost: IReportingPeriodGetDto = {
          numberOfDays: this.ReportingPeriodForm.value.numberOfDays,
          reportingType: this.ReportingPeriodForm.value.reportingType,
          id:this.ReportingPeriod.id

        }

        this.pmService.updateReportingPeriod(ReportingPeriodPost).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })
      }
      else {
        var reportingPeriodPost: IReportingPeriodPostDto = {
          reportingType: this.ReportingPeriodForm.value.reportingType,
          numberOfDays: this.ReportingPeriodForm.value.numberOfDays,          
          createdById: this.user.userId
        }

        this.pmService.addReportingPeriod(reportingPeriodPost).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });

              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        })
      }

    }

  }

}

