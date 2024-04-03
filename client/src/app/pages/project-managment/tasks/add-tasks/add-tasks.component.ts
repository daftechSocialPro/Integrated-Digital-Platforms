import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/model/PM/TaskDto';
import { TaskService } from '../../../../services/task.service';
import { PlanSingleview } from 'src/app/model/PM/PlansDto';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent {

 
  taskForm!: FormGroup;
  @Input() plan!: PlanSingleview;  

  remainingBudget:number ;

  addedTasks:String[]=[]
  
  

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,    
    private taskService:TaskService,
    private commonService: CommonService,
    private messageService:MessageService
    ) { }

  ngOnInit(): void {

    this.remainingBudget  = this.plan.remainingBudget

    this.taskForm = this.formBuilder.group({
      TaskDescription:['',Validators.required],
      HasActvity: [false, Validators.required],
      PlannedBudget:['',[Validators.required,Validators.max(this.remainingBudget)]]

    })
  

  }

  submit() {

    if (this.taskForm.valid) {

      const taskValue :Task ={
      
        TaskDescription: this.taskForm.value.TaskDescription,
        HasActvity : this.taskForm.value.HasActvity,
        PlannedBudget:this.taskForm.value.PlannedBudget,
        PlanId : this.plan.id
      } 


      this.taskService.createTask(taskValue).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Task Successfully Created' });        
          //this.closeModal()

          this.taskForm.controls['TaskDescription'].setValue('')
          this.taskForm.controls['HasActvity'].setValue(false)
          this.taskForm.controls['PlannedBudget'].setValue('')

          
          this.addedTasks.push(taskValue.TaskDescription)
          this.remainingBudget= this.remainingBudget- Number(taskValue.PlannedBudget)
          this.taskForm.get('PlannedBudget').setValidators([Validators.required, Validators.max(this.remainingBudget)]);
      

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
