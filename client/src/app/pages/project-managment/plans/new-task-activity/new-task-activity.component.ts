import { Component, Input, OnInit } from '@angular/core';
import { ActivityView } from '../../view-activties/activityview';
import { GetStartEndDate, SelectList } from 'src/app/model/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserView } from 'src/app/model/user';
import { toastPayload } from 'src/app/services/hrm.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { PMService } from 'src/app/services/pm.services';
import { DropDownService } from 'src/app/services/dropDown.service';
import { MessageService } from 'primeng/api';
import { TaskService } from 'src/app/services/task.service';
import { TaskNewDto } from 'src/app/model/PM/TaskNewDto';

@Component({
  selector: 'app-new-task-activity',
  templateUrl: './new-task-activity.component.html',
  styleUrls: ['./new-task-activity.component.css']
})
export class NewTaskActivityComponent implements OnInit {

  @Input() activity!: ActivityView;
  @Input() dateAndTime!:GetStartEndDate



  taskForm!: FormGroup;
  selectedEmployee: SelectList[] = [];
  user !: UserView;
  committees: SelectList[] = [];
  toast!: toastPayload;
  comitteEmployees : SelectList[]=[];


  Employees: SelectList[] = [];
  minDate!: Date;

  maxDate!: Date ;

  addedTasks:String[]=[]
 
  remainingBudget:number ;
  initialFormValues: any;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private pmService: PMService,
    private dropDownService : DropDownService,
    private messageService : MessageService,
    private modalService : NgbModal,
    private dropService: DropDownService,
    private taskService : TaskService
  ) {}


  ngOnInit(): void {
    
    this.remainingBudget=this.activity?.plannedBudget!

    this.initialFormValues = {
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      taskNumber: ['', Validators.required],
      plannedBudget: ['', [Validators.required, Validators.max(this.remainingBudget)]],
      baseLine: [0, [Validators.required, Validators.min(0)]],
      target: [0, [Validators.required, Validators.min(0)]],
      assignedEmployee: []
    };
      this.resetForm()

    this.user = this.userService.getCurrentUser()

    this.ListofEmployees()
    this.pmService.getComitteeSelectList().subscribe({
      next: (res) => {
        this.committees = res
      }, error: (err) => {
        
      }
    })

    this.minDate = new Date();
    this.maxDate = new Date();

    this.minDate.setDate(1)
    this.minDate.setMonth(1)
    this.minDate.setFullYear(Number(this.dateAndTime.fromDate));

    this.maxDate.setDate(1)
    this.maxDate.setMonth(1)
    this.maxDate.setFullYear(Number(this.dateAndTime.endDate));
  }

    
  resetForm() {
    this.taskForm = this.formBuilder.group(this.initialFormValues);
  }

 

  ListofEmployees() {
    this.taskService.getEmployeeNoActivityMembers(this.activity.id!).subscribe({
      next: (res) => {
        this.Employees = res
      }
      , error: (err) => {
        console.error(err)
      }
    })
  }

  selectEmployee(event: SelectList) {
    this.selectedEmployee.push(event)
    this.activity.members = this.activity.members!.filter(x => x.id != event.id)
  }

  removeSelected(emp: SelectList) {
    this.selectedEmployee = this.selectedEmployee.filter(x => x.id != emp.id)
    this.activity.members!.push(emp)
  }

  submit() {
    if (this.taskForm.value.Goal <= this.taskForm.value.PreviousPerformance) {
      this.messageService.add({ severity: 'error', summary: "Baseline Target Error", detail: 'Baseline can not be Greater or equal to Target !!' })
      return
    }
    if (this.taskForm.valid) {
      let addTask: TaskNewDto = {
        description: this.taskForm.value.description,
        startDate: this.taskForm.value.startDate,
        endDate: this.taskForm.value.endDate,
        plannedBudget: this.taskForm.value.plannedBudget,
        taskNumber: this.taskForm.value.taskNumber,
        activityId: this.activity.id,
        employees: this.taskForm.value.assignedEmployee,
        baseLine: this.taskForm.value.baseline,
        target: this.taskForm.value.target,
        createdById: this.user.userId,
      };
      this.pmService.addnewTask(addTask).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Activity Successfully Created' });
          this.remainingBudget -= addTask.plannedBudget
          this.resetForm()
          this.addedTasks.push(addTask.description)
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err.message });
          console.error(err)
        }
      })
    }
  }

  closeModal() {
    window.location.reload()
    this.activeModal.close()
  }

  onCommiteChange(comitteId :string){
    this.pmService.getComitteEmployees(comitteId).subscribe({
      next:(res)=>{
        this.comitteEmployees = res 
      },
      error:(err)=>{    
      }
    })
  }

}