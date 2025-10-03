import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { ExtendContractDto } from './extendcontract.model';

@Component({
  selector: 'app-extend-contract',
  templateUrl: './extend-contract.component.html',
  styleUrls: ['./extend-contract.component.css']
})
export class ExtendContractComponent implements OnInit {

  @Input() empId !: string

  HistoryForm !: FormGroup;
  user ! : UserView;
  today: Date = new Date();
  minDate: Date = new Date();
  added: boolean = false; 

  constructor(
    private activeModal: NgbActiveModal, 
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService : UserService,
    private messageService: MessageService,
    private dropService: DropDownService
    ) { }

    ngOnInit(): void {
      this.user = this.userService.getCurrentUser()
      this.HistoryForm = this.formBuilder.group({  
        startDate:[null,Validators.required],
        endDate: [null,Validators.required],
      })
    }
  
  

  closeModal() {
    this.activeModal.close()
  }

  submit(){
   if (this.HistoryForm.valid){

      var employeeHistory : ExtendContractDto = {     
        employeeId : this.empId,
        createdById: this.user.userId,
        startDate: this.HistoryForm.value.startDate,
        endDate: this.HistoryForm.value.endDate,
      }
      this.hrmService.extendContract(employeeHistory).subscribe(
        {
          next:(res)=>{
            if (res.success){
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });  
             this.added = true;
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message }); 
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail:err });
          }
        }
      )
    }
  }

  getminEndDate(date: any){
    this.minDate = date;
}

printLetter(){
  const url = `/printout/contractExtentionLetter?employeeId=${this.empId}`;
  window.open( url, '_blank');
}

}
