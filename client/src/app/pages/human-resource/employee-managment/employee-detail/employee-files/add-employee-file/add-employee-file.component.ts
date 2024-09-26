import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeFilePostDto } from 'src/app/model/HRM/IEmployeeDto';
import { UserView } from 'src/app/model/user';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-employee-file',
  templateUrl: './add-employee-file.component.html',
  styleUrls: ['./add-employee-file.component.css']
})
export class AddEmployeeFileComponent implements OnInit {

  @Input() employeeId!: string

  FileForm !: FormGroup;
  fileGH!: File;
  ngOnInit(): void { }
  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {

    this.FileForm = this.formBuilder.group({

      fileName: [null, Validators.required],

    })
  }


  onUpload(event: any) {

    var file: File = event.target.files[0];
    this.fileGH = file

  }

  closeModal() {
    this.activeModal.close()
  }

  submit() {
    if (this.FileForm.valid) {


      var formData = new FormData();

      formData.append('filePath', this.fileGH);
      formData.append('fileName',this.FileForm.value.fileName)
      formData.append('employeeId',this.employeeId)
      this.hrmService.addEmployeeFile(formData).subscribe(
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

}