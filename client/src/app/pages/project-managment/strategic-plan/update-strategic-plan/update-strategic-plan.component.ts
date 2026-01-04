import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DepartmentGetDto } from 'src/app/model/HRM/IDepartmentDto';
import { StrategicPlanGetDto, StrategicPeriodGetDto } from 'src/app/model/PM/StrategicPlanDto';
import { HrmService } from 'src/app/services/hrm.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';

@Component({
  selector: 'app-update-strategic-plan',
  templateUrl: './update-strategic-plan.component.html',
  styleUrls: ['./update-strategic-plan.component.css']
})
export class UpdateStrategicPlanComponent implements OnInit {

  @Input() strategicPlan !: StrategicPlanGetDto

  strategicPlanForm!: FormGroup;
  strategicPeriods: StrategicPeriodGetDto[] = []

  ngOnInit(): void {

    this.strategicPlanForm = this.formBuilder.group({
      name: [this.strategicPlan.name, Validators.required],
      description: [this.strategicPlan.description],
      strategicPeriodId: [this.strategicPlan.strategicPeriodId || '', Validators.required],
      isActive:[this.strategicPlan.rowStatus]
    })

    this.loadStrategicPeriods();
  }

  loadStrategicPeriods() {
    this.pmService.getStrategicPeriods().subscribe({
      next: (res) => {
        this.strategicPeriods = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
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

    if (this.strategicPlanForm.valid) {

      var strategicplanUpdate: StrategicPlanGetDto = {
        name: this.strategicPlanForm.value.name,
        description: this.strategicPlanForm.value.description,
        id: this.strategicPlan.id,
        strategicPeriodId: this.strategicPlanForm.value.strategicPeriodId,
        rowStatus :this.strategicPlanForm.value.isActive
      }

      this.pmService.updateStrategicPlan(strategicplanUpdate).subscribe({
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

