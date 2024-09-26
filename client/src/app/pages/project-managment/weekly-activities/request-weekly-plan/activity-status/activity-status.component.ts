import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { PMService } from 'src/app/services/pm.services';

@Component({
  selector: 'app-activity-status',
  templateUrl: './activity-status.component.html',
  styleUrls: ['./activity-status.component.css'],
})
export class ActivityStatusComponent implements OnInit {

  @Input() type!: string
  @Input() weeklyPlanId!: string

  type2 !: string
  remark: any 

  statusForm!: FormGroup
  ngOnInit(): void {

    if (this.type == "Approve") {
      this.type2 = "APPROVED"
    } else {
      this.type2 = "REJECTED"
    }

  }

  constructor(
    private activeModal: NgbActiveModal,
    private pmService: PMService,
    private messageService: MessageService,
    private formBuilder:FormBuilder
  ) { 


    this.statusForm= this.formBuilder.group({
      remark:['']
    })
  }


  closeModal() {
    this.activeModal.close()
  }

  submit() {

    this.pmService.updateStatusWeeklyPlan(this.weeklyPlanId,this.statusForm.value.remark, this.type2 ).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'weekly plan status', detail: res.message })
          this.closeModal()
        }
      }
    })
  }

}
