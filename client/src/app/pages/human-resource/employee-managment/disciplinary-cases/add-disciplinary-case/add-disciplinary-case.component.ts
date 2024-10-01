import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { AddDisciplinaryCaseDto } from 'src/app/model/HRM/IDisplinaryCaseDto';
import { SelectList } from 'src/app/model/common';
import { UserView } from 'src/app/model/user';
import { DropDownService } from 'src/app/services/dropDown.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-disciplinary-case',
  templateUrl: './add-disciplinary-case.component.html',
  styleUrls: ['./add-disciplinary-case.component.css']
})

export class AddDisciplinaryCaseComponent implements OnInit {


  disciplinaryCaseForm !: FormGroup;
  user !: UserView
  employeeDropDown: SelectList[] = [];
  employee!: string;


  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private dropService: DropDownService,
  ) {
    this.disciplinaryCaseForm = this.formBuilder.group({
      employeeId: [null],
      date: [null, Validators.required],
      warningType: [null, Validators.required],
      fault: [null, Validators.required],
      detailDescription: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.empDropDown();
    this.user = this.userService.getCurrentUser()
  }

  closeModal() {
    this.activeModal.close()
  }

  empDropDown(){
    this.dropService.GetEmployeeDropDown().subscribe({
      next: (res) => {
        this.employeeDropDown = res;
      }
    });
  }

  submit() {
    if (this.disciplinaryCaseForm.valid) {

      var disciplinaryCase: AddDisciplinaryCaseDto = {

        employeeId: this.disciplinaryCaseForm.value.employeeId,
        date: this.disciplinaryCaseForm.value.date,
        warningType: Number(this.disciplinaryCaseForm.value.warningType),
        fault: this.disciplinaryCaseForm.value.fault,
        detailDescription: this.disciplinaryCaseForm.value.detailDescription,
        createdById: this.user.userId
      }
      this.hrmService.addDisciplinaryCase(disciplinaryCase).subscribe(
        {
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Successfull', detail: res.message });
              this.closeModal();
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: res.message });

            }
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Something went Wrong', detail: err });
          }
        }
      )
    }
  }

  selectEmployee(event: string) {
    this.employee = event

  }

}
