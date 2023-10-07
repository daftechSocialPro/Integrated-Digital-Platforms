import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { EmployeeFileGetDto } from 'src/app/model/HRM/IEmployeeDto';
import { CommonService } from 'src/app/services/common.service';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-employee-file',
  templateUrl: './update-employee-file.component.html',
  styleUrls: ['./update-employee-file.component.css']
})
export class UpdateEmployeeFileComponent implements OnInit {

  @Input() employeeFile!: EmployeeFileGetDto

  FileForm !: FormGroup;
  fileGH!: File;
  ngOnInit(): void { 

    this.FileForm.controls['fileName'].setValue(this.employeeFile.fileName)
  }
  constructor(
    private activeModal: NgbActiveModal,
    private hrmService: HrmService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
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

      formData.append('file', this.fileGH);
      formData.append('fileName',this.FileForm.value.fileName)
      formData.append('id',this.employeeFile.id)
      this.hrmService.updateEmployeeFile(formData).subscribe(
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
  createImagePath(url: string) {
    return this.commonService.createImgPath(url)
  }
}
