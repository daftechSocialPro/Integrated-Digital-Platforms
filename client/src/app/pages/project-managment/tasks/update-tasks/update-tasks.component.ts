import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Task, TaskView } from 'src/app/model/PM/TaskDto';
import { PlanSingleview } from 'src/app/model/PM/PlansDto';
import { CommonService } from 'src/app/services/common.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.css']
})
export class UpdateTasksComponent implements OnInit {

  taskForm!: FormGroup;
  @Input() plan!: PlanSingleview;  
  @Input() task!: TaskView;
  

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,    
    private taskService:TaskService,
    private commonService: CommonService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {

    console.log("TASKKKK",this.task)
    this.taskForm = this.formBuilder.group({
      TaskDescription:[this.task.taskName,Validators.required],
      HasActvity: [this.task.hasActivity, Validators.required],
      PlannedBudget:[this.task.plannedBudget,[Validators.required,Validators.max(this.plan.remainingBudget+this.task.plannedBudget)]]

    })
  

  }

  submit() {

    if (this.taskForm.valid) {

      const taskValue :Task ={
        Id: this.task.id,
        TaskDescription: this.taskForm.value.TaskDescription,
        HasActvity : this.taskForm.value.HasActvity,
        PlannedBudget:this.taskForm.value.PlannedBudget,
        PlanId : this.plan.id
      } 


      this.taskService.updateTask(taskValue).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Task Successfully Updated' });        
          this.closeModal()

        }, error: (err) => {
          
          this.messageService.add({ severity: 'error', summary: 'Network error.', detail: err.message });

        }
      })
    }

  }

  checkBudget(budget:string){

  }

  closeModal() {
    this.activeModal.close();
  }
}
