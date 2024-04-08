import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { SelectList, TerminatedEmployeeReplacmentDto } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { PMService } from 'src/app/services/pm.services';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-assign-replacement',
  templateUrl: './assign-replacement.component.html',
  styleUrls: ['./assign-replacement.component.css']
})
export class AssignReplacementComponent implements OnInit {

  @Input() TerminatedEmployeeActivites!:TerminatedEmployeeReplacmentDto[] 
  empId!:string[];
  selectedTars: TerminatedEmployeeReplacmentDto[] = [];
  user!: UserView

  selectedEmployees : any[]=[]

  constructor(
    private activeModal:NgbActiveModal,
    private pmService:PMService,
    private userService: UserService,
    private messageService: MessageService
  ){}
  ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      
  }
  selectEmployee(tar: TerminatedEmployeeReplacmentDto){

   
     
    const foundTarIndex = this.selectedTars.findIndex(t => t.activity.id === tar.activity.id);

  
    // if (foundTarIndex === -1) {
    //   // Create a new object with updated employees data
    //   const updatedTar: TerminatedEmployeeReplacmentDto = {
    //     activity : tar.activity,
    //     terminatedEmployee : tar.terminatedEmployee,
    //     replaceEmployees: [{ id:this.empId, name: this.empId }] 
    //   };
      
    //   this.selectedTars.push(updatedTar);
    // } else {
    //   const empSel: SelectList = {
    //     id:this.empId, name: this.empId
    //   }
    //   this.selectedTars[foundTarIndex].replaceEmployees.push(empSel);
    // }
   


  }

  submit(){
    this.pmService.replaceTerminatedEmployee(this.selectedEmployees,this.user.userId).subscribe({
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
  closeModal() {
    this.activeModal.close();
  }
}
