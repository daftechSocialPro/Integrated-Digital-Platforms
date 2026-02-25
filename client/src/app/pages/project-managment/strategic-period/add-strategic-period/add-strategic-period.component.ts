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

  durationOptions = [3, 5];
  selectedDuration: number = 5;
  calculatedEndDate: string = '';

  ngOnInit(): void {
    this.strategicPeriodForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      durationInYears: [5, Validators.required],
    });

    // Watch for start date and duration changes to calculate end date
    this.strategicPeriodForm.get('startDate')?.valueChanges.subscribe(() => {
      this.calculateEndDate();
    });
    this.strategicPeriodForm.get('durationInYears')?.valueChanges.subscribe(() => {
      this.calculateEndDate();
    });
  }

  calculateEndDate() {
    const startDate = this.strategicPeriodForm.get('startDate')?.value;
    const duration = this.strategicPeriodForm.get('durationInYears')?.value || 5;
    
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setFullYear(end.getFullYear() + duration);
      end.setDate(end.getDate() - 1); // Subtract 1 day to get the last day of the period
      
      const year = end.getFullYear();
      const month = String(end.getMonth() + 1).padStart(2, '0');
      const day = String(end.getDate()).padStart(2, '0');
      this.calculatedEndDate = `${year}-${month}-${day}`;
    } else {
      this.calculatedEndDate = '';
    }
  }

  submit() {
    if (this.strategicPeriodForm.valid) {
      const startDate = new Date(this.strategicPeriodForm.value.startDate);
      
      var strategicPeriodPost: StrategicPeriodPostDto = {
        name: this.strategicPeriodForm.value.name,
        description: this.strategicPeriodForm.value.description,
        startDate: startDate,
        durationInYears: this.strategicPeriodForm.value.durationInYears,
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

