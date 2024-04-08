import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { IndicatorPostDto } from 'src/app/model/PM/IndicatorsDto';
import { StrategicPlanPostDto } from 'src/app/model/PM/StrategicPlanDto';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ProjectmanagementService } from 'src/app/services/projectmanagement.service';

@Component({
  selector: 'app-add-strategic-plan',
  templateUrl: './add-strategic-plan.component.html',
  styleUrls: ['./add-strategic-plan.component.css']
})
export class AddStrategicPlanComponent implements OnInit {

  strategicPlanForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
    private pmService: ProjectmanagementService,
    private messageService: MessageService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

    this.strategicPlanForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  submit() {

    if (this.strategicPlanForm.valid) {

      var strategicPlanpost: StrategicPlanPostDto = {

        name: this.strategicPlanForm.value.name,
        description: this.strategicPlanForm.value.description,


      }


      this.pmService.addStrategicPlan(strategicPlanpost).subscribe({

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
      }
      );
    }

  }
  closeModal() {

    this.activeModal.close()
  }
}
