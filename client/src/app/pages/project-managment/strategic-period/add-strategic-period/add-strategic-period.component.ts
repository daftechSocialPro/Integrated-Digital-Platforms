import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { StrategicPeriodPostDto } from 'src/app/model/PM/StrategicPlanDto';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-strategic-period',
  templateUrl: './add-strategic-period.component.html',
  styleUrls: ['./add-strategic-period.component.css']
})
export class AddStrategicPeriodComponent implements OnInit {

  strategicPeriodForm!: FormGroup
  minDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private pmService: ProjectmanagementService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.strategicPeriodForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
    });
  }

  submit() {
    if (this.strategicPeriodForm.valid) {
      const startDate = new Date(this.strategicPeriodForm.value.startDate);
      
      var strategicPeriodPost: StrategicPeriodPostDto = {
        name: this.strategicPeriodForm.value.name,
        description: this.strategicPeriodForm.value.description,
        startDate: startDate,
        createdById: this.userService.getCurrentUser()?.userId
      }

      this.pmService.addStrategicPeriod(strategicPeriodPost).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
            this.closeModal();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });
          }
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
        }
      });
    }
  }

  closeModal() {
    this.activeModal.close()
  }
}

