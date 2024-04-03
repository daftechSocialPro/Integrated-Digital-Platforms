import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddActivitiesComponent } from './add-activities/add-activities.component';
import { IndividualConfig } from 'ngx-toastr';
import { IActivityAttachment } from 'src/app/model/PM/ActivityAttachment';
import { TaskView, TaskMembers } from 'src/app/model/PM/TaskDto';
import { GetStartEndDate, SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { CommonService } from 'src/app/services/common.service';
import { toastPayload } from 'src/app/services/hrm.service';
import { PMService } from 'src/app/services/pm.services';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';





@Component({
  selector: 'app-activity-parents',
  templateUrl: './activity-parents.component.html',
  styleUrls: ['./activity-parents.component.css']
})
export class ActivityParentsComponent implements OnInit {

  @ViewChild('taskMemoDesc') taskMemoDesc!: ElementRef
  task: TaskView = {};
  parentId: string = "";
  requestFrom: string = "";
  Employees: SelectList[] = [];
  selectedEmployee: SelectList[] = [];
  user!: UserView;
  isUserTaskMember: boolean = false;
  toast!: toastPayload
  attachments !: IActivityAttachment[]
  dateAndTime !: GetStartEndDate



  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private pmService: PMService,
    private messageService : MessageService

  ) { }

  ngOnInit(): void {

    this.parentId = this.route.snapshot.paramMap.get('parentId')!
    this.requestFrom = this.route.snapshot.paramMap.get('requestFrom')!
    const encodedDateAndTime = this.route.snapshot.paramMap.get('datee')!;
    const decodedDateAndTime = decodeURIComponent(encodedDateAndTime);
    this.dateAndTime = JSON.parse(decodedDateAndTime);

   


    this.getSingleTask();
    this.ListofEmployees();
    this.user = this.userService.getCurrentUser();
    this.getAttachments()

  }

  getDateDiff(startDate: string) {
    var date = this.commonService.getDataDiff(startDate, new Date().toString())
    return date.day + " days " + date.hour + " hours " + date.minute + " minutes a go "
  }

  getAttachments() {

    this.pmService.getActivityAttachments(this.parentId).subscribe({
      next: (res) => {
        this.attachments = res
   
      }, error: (err) => {
        console.error(err)
      }

    })
  }

  ListofEmployees() {

    this.taskService.getEmployeeNoTaskMembers(this.parentId).subscribe({
      next: (res) => {
        this.Employees = res
      }
      , error: (err) => {
        console.error(err)
      }
    })

  }



  getSingleTask() {

    this.taskService.getSingleTask(this.parentId).subscribe({
      next: (res) => {
        this.task = res
        this.selectedEmployee = []
        if (this.task.taskMembers!.find(x => x.employeeId?.toLowerCase() == this.user.employeeId.toLowerCase())) {
          this.isUserTaskMember = true;
        }
      }, error: (err) => {
        console.error(err)
      }
    })

  }

  selectEmployee(event: SelectList) {
    this.selectedEmployee.push(event)
    this.Employees = this.Employees.filter(x => x.id != event.id)

  }

  removeSelected(emp: SelectList) {
    this.selectedEmployee = this.selectedEmployee.filter(x => x.id != emp.id)
    this.Employees.push(emp)

  }


  AddMembers() {

    let taskMembers: TaskMembers = {
      employee: this.selectedEmployee,
      taskId: this.parentId,
      requestFrom: this.requestFrom
    }

    this.taskService.addTaskMembers(taskMembers).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Successfully Added', detail: 'Members Successfully Created' });            
        this.getSingleTask();
        this.ListofEmployees();
      }, error: (err) => {
        this.messageService.add({ severity: 'success', summary: 'Network Error', detail: err.message });        
      }
    })
  }
  getImage(value: string) {
    return this.commonService.createImgPath(value)
  }

  taskMemo(value: string) {


    let taskMemo: any = {
      EmployeeId: this.user.employeeId,
      Description: value,
      TaskId: this.parentId,
      RequestFrom: this.requestFrom,
    }

    return this.taskService.addTaskMemos(taskMemo).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Successfull', detail: 'Task Memo Successfully Created' });        
        
      
        this.taskMemoDesc.nativeElement.value = '';
        this.getSingleTask()
      }
      , error: (err) => {
        this.messageService.add({ severity: 'success', summary: 'Network Error', detail: err.message });        
        
      
      }
    })


  }

  addActivity() {
    let modalRef = this.modalService.open(AddActivitiesComponent, { size: "xxl", backdrop: 'static' })
    modalRef.componentInstance.task = this.task
    modalRef.componentInstance.requestFrom = this.requestFrom;
    modalRef.componentInstance.requestFromId = this.parentId;
    modalRef.componentInstance.dateAndTime = this.dateAndTime
  }

  getFilePath(value: string) {

    return this.commonService.createImgPath(value);
  }

}
