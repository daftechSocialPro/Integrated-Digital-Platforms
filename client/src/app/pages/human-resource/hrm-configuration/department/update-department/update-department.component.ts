import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualConfig } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { DepartmentGetDto, DepartmentPostDto } from 'src/app/model/HRM/IDepartmentDto';
import { UserView } from 'src/app/model/user';
import { toastPayload, CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';


@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  @Input() department !: DepartmentGetDto

  departmentForm!: FormGroup;

  ngOnInit(): void {

    this.departmentForm = this.formBuilder.group({
      DepartmentName: [this.department.departmentName, Validators.required],
      amharicName: [this.department.amharicName, Validators.required],
      Remark: [this.department.remark]
    })
  }

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private hrmService: HrmService,
    private messageService: MessageService) {

  }

  closeModal() {
    this.activeModal.close();
  }
  submit() {

    if (this.departmentForm.valid) {

      var departmentUpdate: DepartmentGetDto = {
        departmentName: this.departmentForm.value.DepartmentName,
        amharicName: this.departmentForm.value.amharicName,
        remark: this.departmentForm.value.Remark,
        id: this.department.id
      }

      this.hrmService.updateDepratment(departmentUpdate).subscribe({
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
