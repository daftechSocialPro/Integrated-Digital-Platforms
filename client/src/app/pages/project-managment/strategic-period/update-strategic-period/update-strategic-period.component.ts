import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { StrategicPeriodGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';

@Component({
  selector: 'app-update-strategic-period',
  templateUrl: './update-strategic-period.component.html',
  styleUrls: ['./update-strategic-period.component.css']
})
export class UpdateStrategicPeriodComponent implements OnInit {

  @Input() strategicPeriod !: StrategicPeriodGetDto

  strategicPeriodForm!: FormGroup;
  minDate: Date = new Date();

  ngOnInit(): void {
    const startDate = new Date(this.strategicPeriod.startDate);
    this.strategicPeriodForm = this.formBuilder.group({
      name: [this.strategicPeriod.name, Validators.required],
      description: [this.strategicPeriod.description, Validators.required],
      startDate: [this.formatDateForInput(startDate), Validators.required],
      isActive: [this.strategicPeriod.rowStatus]
    })
  }

  formatDateForInput(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private pmService: ProjectmanagementService,
    private messageService: MessageService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  submit() {
    if (this.strategicPeriodForm.valid) {
      const startDate = new Date(this.strategicPeriodForm.value.startDate);

      var strategicPeriodUpdate: StrategicPeriodGetDto = {
        name: this.strategicPeriodForm.value.name,
        description: this.strategicPeriodForm.value.description,
        id: this.strategicPeriod.id,
        startDate: startDate,
        endDate: new Date(), // Will be calculated on backend
        rowStatus: this.strategicPeriodForm.value.isActive
      }

      this.pmService.updateStrategicPeriod(strategicPeriodUpdate).subscribe({
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

